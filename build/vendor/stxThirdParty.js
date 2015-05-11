(function(){

	function _stxThirdParty_js(_exports) {
		// IE8 shim, http://stackoverflow.com/questions/10173236/window-innerheight-ie8-alternative
		(function (window, document) {
			var html = document.documentElement;
			  var body = document.body;

			var define = function (object, property, getter) {
				if (typeof object[property] === 'undefined') {
					Object.defineProperty(object, property, { get: getter });
				}
			};

			define(window, 'innerWidth', function () { return html.clientWidth });
			define(window, 'innerHeight', function () { return html.clientHeight });

			define(window, 'scrollX', function () { return window.pageXOffset || html.scrollLeft });
			define(window, 'scrollY', function () { return window.pageYOffset || html.scrollTop });

			define(document, 'width', function () { return Math.max(body.scrollWidth, html.scrollWidth, body.offsetWidth, html.offsetWidth, body.clientWidth, html.clientWidth) });
			define(document, 'height', function () { return Math.max(body.scrollHeight, html.scrollHeight, body.offsetHeight, html.offsetHeight, body.clientHeight, html.clientHeight) });

			return define;
		}(window, document));

		// IE8 addEventListener polyfill https://gist.github.com/jonathantneal/3748027
		!window.addEventListener && (function (WindowPrototype, DocumentPrototype, ElementPrototype, addEventListener, removeEventListener, dispatchEvent, registry) {
			WindowPrototype[addEventListener] = DocumentPrototype[addEventListener] = ElementPrototype[addEventListener] = function (type, listener) {
				var target = this;

				registry.unshift([target, type, listener, function (event) {
					event.currentTarget = target;
					event.preventDefault = function () { event.returnValue = false };
					event.stopPropagation = function () { event.cancelBubble = true };
					event.target = event.srcElement || target;
					if(typeof listener=="function")
						listener.call(target, event);
					else if(typeof listener=="object" && typeof listener.handleEvent=="function")
						listener.handleEvent.call(listener, event);
				}]);

				this.attachEvent("on" + type, registry[0][3]);
			};

			WindowPrototype[removeEventListener] = DocumentPrototype[removeEventListener] = ElementPrototype[removeEventListener] = function (type, listener) {
				for (var index = 0, register; register = registry[index]; ++index) {
					if (register[0] == this && register[1] == type && register[2] == listener) {
						return this.detachEvent("on" + type, registry.splice(index, 1)[0][3]);
					}
				}
			};

			WindowPrototype[dispatchEvent] = DocumentPrototype[dispatchEvent] = ElementPrototype[dispatchEvent] = function (eventObject) {
				return this.fireEvent("on" + eventObject.type, eventObject);
			};
		})(Window.prototype, HTMLDocument.prototype, Element.prototype, "addEventListener", "removeEventListener", "dispatchEvent", []);

		// IE8 bind() support: http://stackoverflow.com/questions/11054511/how-to-handle-lack-of-javascript-object-bind-method-in-ie-8
		if (!Function.prototype.bind) {
			Function.prototype.bind = function(oThis) {
			    if (typeof this !== 'function') {
			      // closest thing possible to the ECMAScript 5
			      // internal IsCallable function
			      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
			    }

			    var aArgs   = Array.prototype.slice.call(arguments, 1),
			        fToBind = this,
			        fNOP    = function() {},
			        fBound  = function() {
			          return fToBind.apply(this instanceof fNOP && oThis
			                 ? this
			                 : oThis,
			                 aArgs.concat(Array.prototype.slice.call(arguments)));
			        };

			    fNOP.prototype = this.prototype;
			    fBound.prototype = new fNOP();

			    return fBound;
			};
		}


		/*jshint proto:true, eqnull:true, boss:true, laxbreak:true, newcap:false, shadow:true, funcscope:true */
		if (typeof window !== 'undefined')
		    window.OldIntl = window.Intl;
		
		window.Intl = window.Intl || (function (Intl) {
		
		/**
		 * @license Copyright 2013 Andy Earnshaw, MIT License
		 *
		 * Implements the ECMAScript Internationalization API in ES5-compatible environments,
		 * following the ECMA-402 specification as closely as possible
		 *
		 * ECMA-402: http://ecma-international.org/ecma-402/1.0/
		 *
		 * CLDR format locale data should be provided using Intl.__addLocaleData().
		 */
		
		"use strict";
		var
		    // We use this a lot (and need it for proto-less objects)
		    hop = Object.prototype.hasOwnProperty,
		
		    // Naive defineProperty for compatibility
		    defineProperty = (!window.isIE8 && Object.defineProperty) || function (obj, name, desc) {
		        if (desc.get && obj.__defineGetter__)
		            obj.__defineGetter__(name, desc.get);
		        else if (desc.value || desc.get)
		            obj[name] = desc.value || desc.get;
		    },
		
		    // Array.prototype.indexOf, as good as we need it to be
		    arrIndexOf = Array.prototype.indexOf || function (search) {
		        /*jshint validthis:true */
		        var t = this;
		        if (!t.length)
		            return -1;
		
		        for (var i = arguments[1] || 0, max = t.length; i < max; i++) {
		            if (t[i] === search)
		                return i;
		        }
		    },
		
		    // Create an object with the specified prototype (2nd arg required for Record)
		    objCreate = Object.create || function (proto, props) {
		        var obj;
		
		        function F() {}
		        F.prototype = proto;
		        obj = new F();
		
		        for (var k in props) {
		            if (hop.call(props, k))
		                defineProperty(obj, k, props[k]);
		        }
		
		        return obj;
		    },
		
		    // Snapshot some (hopefully still) native built-ins
		    arrSlice  = Array.prototype.slice,
		    arrConcat = Array.prototype.concat,
		    arrPush   = Array.prototype.push,
		    arrJoin   = Array.prototype.join,
		    arrShift  = Array.prototype.shift,
		
		    // Naive Function.prototype.bind for compatibility
		    fnBind = Function.prototype.bind || function (thisObj) {
		        var fn = this,
		            args = arrSlice.call(arguments, 1);
		
		        return function () {
		            fn.apply(thisObj, arrConcat.call(args, arrSlice.call(arguments)));
		        };
		    },
		
		    // Default locale is the first-added locale data for us
		    defaultLocale,
		
		    // Object housing internal properties for constructors
		    internals = objCreate(null),
		
		    // Keep internal properties internal
		    secret = Math.random(),
		
		    // An object map of date component keys, saves using a regex later
		    dateWidths = objCreate(null, { narrow:{}, short:{}, long:{} }),
		
		    // Each constructor prototype should be an instance of the constructor itself, but we
		    // can't initialise them as such until some locale data has been added, so this is how
		    // we keep track
		    numberFormatProtoInitialised = false,
		    dateTimeFormatProtoInitialised = false,
		
		    // Some regular expressions we're using
		    expInsertGroups = /(?=(?!^)(?:\d{3})+(?!\d))/g,
		    expCurrencyCode = /^[A-Z]{3}$/,
		    expUnicodeExSeq = /-u(?:-[0-9a-z]{2,8})+/gi, // See `extension` below
		
		    expBCP47Syntax,
		    expExtSequences,
		    expVariantDupes,
		    expSingletonDupes,
		
		    // IANA Subtag Registry redundant tag and subtag maps
		    redundantTags = {
		        tags: {
		            "art-lojban":   "jbo",       "i-ami":        "ami",       "i-bnn":       "bnn",  "i-hak":      "hak",
		            "i-klingon":    "tlh",       "i-lux":        "lb",        "i-navajo":    "nv",   "i-pwn":      "pwn",
		            "i-tao":        "tao",       "i-tay":        "tay",       "i-tsu":       "tsu",  "no-bok":     "nb",
		            "no-nyn":       "nn",        "sgn-BE-FR":    "sfb",       "sgn-BE-NL":   "vgt",  "sgn-CH-DE":  "sgg",
		            "zh-guoyu":     "cmn",       "zh-hakka":     "hak",       "zh-min-nan":  "nan",  "zh-xiang":   "hsn",
		            "sgn-BR":       "bzs",       "sgn-CO":       "csn",       "sgn-DE":      "gsg",  "sgn-DK":     "dsl",
		            "sgn-ES":       "ssp",       "sgn-FR":       "fsl",       "sgn-GB":      "bfi",  "sgn-GR":     "gss",
		            "sgn-IE":       "isg",       "sgn-IT":       "ise",       "sgn-JP":      "jsl",  "sgn-MX":     "mfs",
		            "sgn-NI":       "ncs",       "sgn-NL":       "dse",       "sgn-NO":      "nsl",  "sgn-PT":     "psr",
		            "sgn-SE":       "swl",       "sgn-US":       "ase",       "sgn-ZA":      "sfs",  "zh-cmn":     "cmn",
		            "zh-cmn-Hans":  "cmn-Hans",  "zh-cmn-Hant":  "cmn-Hant",  "zh-gan":      "gan",  "zh-wuu":     "wuu",
		            "zh-yue":       "yue"
		        },
		        subtags: {
		              BU: "MM",   DD: "DE",   FX: "FR",   TP: "TL",   YD: "YE",   ZR: "CD",  heploc: "alalc97",
		            'in': "id",   iw: "he",   ji:  "yi",  jw: "jv",   mo: "ro",  ayx: "nun", bjd: "drl",
		             ccq: "rki", cjr: "mom", cka: "cmr", cmk: "xch", drh: "khk", drw: "prs", gav: "dev",
		             hrr: "jal", ibi: "opa", kgh: "kml", lcq: "ppr", mst: "mry", myt: "mry", sca: "hle",
		             tie: "ras", tkk: "twm", tlw: "weo", tnf: "prs", ybd: "rki", yma: "lrr"
		        },
		        extLang: {
		            aao: [ "aao", "ar"  ], abh: [ "abh", "ar"  ], abv: [ "abv", "ar"  ], acm: [ "acm", "ar"  ],
		            acq: [ "acq", "ar"  ], acw: [ "acw", "ar"  ], acx: [ "acx", "ar"  ], acy: [ "acy", "ar"  ],
		            adf: [ "adf", "ar"  ], ads: [ "ads", "sgn" ], aeb: [ "aeb", "ar"  ], aec: [ "aec", "ar"  ],
		            aed: [ "aed", "sgn" ], aen: [ "aen", "sgn" ], afb: [ "afb", "ar"  ], afg: [ "afg", "sgn" ],
		            ajp: [ "ajp", "ar"  ], apc: [ "apc", "ar"  ], apd: [ "apd", "ar"  ], arb: [ "arb", "ar"  ],
		            arq: [ "arq", "ar"  ], ars: [ "ars", "ar"  ], ary: [ "ary", "ar"  ], arz: [ "arz", "ar"  ],
		            ase: [ "ase", "sgn" ], asf: [ "asf", "sgn" ], asp: [ "asp", "sgn" ], asq: [ "asq", "sgn" ],
		            asw: [ "asw", "sgn" ], auz: [ "auz", "ar"  ], avl: [ "avl", "ar"  ], ayh: [ "ayh", "ar"  ],
		            ayl: [ "ayl", "ar"  ], ayn: [ "ayn", "ar"  ], ayp: [ "ayp", "ar"  ], bbz: [ "bbz", "ar"  ],
		            bfi: [ "bfi", "sgn" ], bfk: [ "bfk", "sgn" ], bjn: [ "bjn", "ms"  ], bog: [ "bog", "sgn" ],
		            bqn: [ "bqn", "sgn" ], bqy: [ "bqy", "sgn" ], btj: [ "btj", "ms"  ], bve: [ "bve", "ms"  ],
		            bvl: [ "bvl", "sgn" ], bvu: [ "bvu", "ms"  ], bzs: [ "bzs", "sgn" ], cdo: [ "cdo", "zh"  ],
		            cds: [ "cds", "sgn" ], cjy: [ "cjy", "zh"  ], cmn: [ "cmn", "zh"  ], coa: [ "coa", "ms"  ],
		            cpx: [ "cpx", "zh"  ], csc: [ "csc", "sgn" ], csd: [ "csd", "sgn" ], cse: [ "cse", "sgn" ],
		            csf: [ "csf", "sgn" ], csg: [ "csg", "sgn" ], csl: [ "csl", "sgn" ], csn: [ "csn", "sgn" ],
		            csq: [ "csq", "sgn" ], csr: [ "csr", "sgn" ], czh: [ "czh", "zh"  ], czo: [ "czo", "zh"  ],
		            doq: [ "doq", "sgn" ], dse: [ "dse", "sgn" ], dsl: [ "dsl", "sgn" ], dup: [ "dup", "ms"  ],
		            ecs: [ "ecs", "sgn" ], esl: [ "esl", "sgn" ], esn: [ "esn", "sgn" ], eso: [ "eso", "sgn" ],
		            eth: [ "eth", "sgn" ], fcs: [ "fcs", "sgn" ], fse: [ "fse", "sgn" ], fsl: [ "fsl", "sgn" ],
		            fss: [ "fss", "sgn" ], gan: [ "gan", "zh"  ], gds: [ "gds", "sgn" ], gom: [ "gom", "kok" ],
		            gse: [ "gse", "sgn" ], gsg: [ "gsg", "sgn" ], gsm: [ "gsm", "sgn" ], gss: [ "gss", "sgn" ],
		            gus: [ "gus", "sgn" ], hab: [ "hab", "sgn" ], haf: [ "haf", "sgn" ], hak: [ "hak", "zh"  ],
		            hds: [ "hds", "sgn" ], hji: [ "hji", "ms"  ], hks: [ "hks", "sgn" ], hos: [ "hos", "sgn" ],
		            hps: [ "hps", "sgn" ], hsh: [ "hsh", "sgn" ], hsl: [ "hsl", "sgn" ], hsn: [ "hsn", "zh"  ],
		            icl: [ "icl", "sgn" ], ils: [ "ils", "sgn" ], inl: [ "inl", "sgn" ], ins: [ "ins", "sgn" ],
		            ise: [ "ise", "sgn" ], isg: [ "isg", "sgn" ], isr: [ "isr", "sgn" ], jak: [ "jak", "ms"  ],
		            jax: [ "jax", "ms"  ], jcs: [ "jcs", "sgn" ], jhs: [ "jhs", "sgn" ], jls: [ "jls", "sgn" ],
		            jos: [ "jos", "sgn" ], jsl: [ "jsl", "sgn" ], jus: [ "jus", "sgn" ], kgi: [ "kgi", "sgn" ],
		            knn: [ "knn", "kok" ], kvb: [ "kvb", "ms"  ], kvk: [ "kvk", "sgn" ], kvr: [ "kvr", "ms"  ],
		            kxd: [ "kxd", "ms"  ], lbs: [ "lbs", "sgn" ], lce: [ "lce", "ms"  ], lcf: [ "lcf", "ms"  ],
		            liw: [ "liw", "ms"  ], lls: [ "lls", "sgn" ], lsg: [ "lsg", "sgn" ], lsl: [ "lsl", "sgn" ],
		            lso: [ "lso", "sgn" ], lsp: [ "lsp", "sgn" ], lst: [ "lst", "sgn" ], lsy: [ "lsy", "sgn" ],
		            ltg: [ "ltg", "lv"  ], lvs: [ "lvs", "lv"  ], lzh: [ "lzh", "zh"  ], max: [ "max", "ms"  ],
		            mdl: [ "mdl", "sgn" ], meo: [ "meo", "ms"  ], mfa: [ "mfa", "ms"  ], mfb: [ "mfb", "ms"  ],
		            mfs: [ "mfs", "sgn" ], min: [ "min", "ms"  ], mnp: [ "mnp", "zh"  ], mqg: [ "mqg", "ms"  ],
		            mre: [ "mre", "sgn" ], msd: [ "msd", "sgn" ], msi: [ "msi", "ms"  ], msr: [ "msr", "sgn" ],
		            mui: [ "mui", "ms"  ], mzc: [ "mzc", "sgn" ], mzg: [ "mzg", "sgn" ], mzy: [ "mzy", "sgn" ],
		            nan: [ "nan", "zh"  ], nbs: [ "nbs", "sgn" ], ncs: [ "ncs", "sgn" ], nsi: [ "nsi", "sgn" ],
		            nsl: [ "nsl", "sgn" ], nsp: [ "nsp", "sgn" ], nsr: [ "nsr", "sgn" ], nzs: [ "nzs", "sgn" ],
		            okl: [ "okl", "sgn" ], orn: [ "orn", "ms"  ], ors: [ "ors", "ms"  ], pel: [ "pel", "ms"  ],
		            pga: [ "pga", "ar"  ], pks: [ "pks", "sgn" ], prl: [ "prl", "sgn" ], prz: [ "prz", "sgn" ],
		            psc: [ "psc", "sgn" ], psd: [ "psd", "sgn" ], pse: [ "pse", "ms"  ], psg: [ "psg", "sgn" ],
		            psl: [ "psl", "sgn" ], pso: [ "pso", "sgn" ], psp: [ "psp", "sgn" ], psr: [ "psr", "sgn" ],
		            pys: [ "pys", "sgn" ], rms: [ "rms", "sgn" ], rsi: [ "rsi", "sgn" ], rsl: [ "rsl", "sgn" ],
		            sdl: [ "sdl", "sgn" ], sfb: [ "sfb", "sgn" ], sfs: [ "sfs", "sgn" ], sgg: [ "sgg", "sgn" ],
		            sgx: [ "sgx", "sgn" ], shu: [ "shu", "ar"  ], slf: [ "slf", "sgn" ], sls: [ "sls", "sgn" ],
		            sqk: [ "sqk", "sgn" ], sqs: [ "sqs", "sgn" ], ssh: [ "ssh", "ar"  ], ssp: [ "ssp", "sgn" ],
		            ssr: [ "ssr", "sgn" ], svk: [ "svk", "sgn" ], swc: [ "swc", "sw"  ], swh: [ "swh", "sw"  ],
		            swl: [ "swl", "sgn" ], syy: [ "syy", "sgn" ], tmw: [ "tmw", "ms"  ], tse: [ "tse", "sgn" ],
		            tsm: [ "tsm", "sgn" ], tsq: [ "tsq", "sgn" ], tss: [ "tss", "sgn" ], tsy: [ "tsy", "sgn" ],
		            tza: [ "tza", "sgn" ], ugn: [ "ugn", "sgn" ], ugy: [ "ugy", "sgn" ], ukl: [ "ukl", "sgn" ],
		            uks: [ "uks", "sgn" ], urk: [ "urk", "ms"  ], uzn: [ "uzn", "uz"  ], uzs: [ "uzs", "uz"  ],
		            vgt: [ "vgt", "sgn" ], vkk: [ "vkk", "ms"  ], vkt: [ "vkt", "ms"  ], vsi: [ "vsi", "sgn" ],
		            vsl: [ "vsl", "sgn" ], vsv: [ "vsv", "sgn" ], wuu: [ "wuu", "zh"  ], xki: [ "xki", "sgn" ],
		            xml: [ "xml", "sgn" ], xmm: [ "xmm", "ms"  ], xms: [ "xms", "sgn" ], yds: [ "yds", "sgn" ],
		            ysl: [ "ysl", "sgn" ], yue: [ "yue", "zh"  ], zib: [ "zib", "sgn" ], zlm: [ "zlm", "ms"  ],
		            zmi: [ "zmi", "ms"  ], zsl: [ "zsl", "sgn" ], zsm: [ "zsm", "ms"  ]
		        }
		    },
		
		    // Currency minor units output from tools/getISO4217data.js, formatted
		    currencyMinorUnits = {
		        BHD: 3, BYR: 0, XOF: 0, BIF: 0, XAF: 0, CLF: 0, CLP: 0, KMF: 0, DJF: 0,
		        XPF: 0, GNF: 0, ISK: 0, IQD: 3, JPY: 0, JOD: 3, KRW: 0, KWD: 3, LYD: 3,
		        OMR: 3, PYG: 0, RWF: 0, TND: 3, UGX: 0, UYI: 0, VUV: 0, VND: 0
		    };
		
		/**
		 * Defines regular expressions for various operations related to the BCP 47 syntax,
		 * as defined at http://tools.ietf.org/html/bcp47#section-2.1
		 */
		(function () {
		    var
		        // extlang       = 3ALPHA              ; selected ISO 639 codes
		        //                 *2("-" 3ALPHA)      ; permanently reserved
		        extlang = '[a-z]{3}(?:-[a-z]{3}){0,2}',
		
		        // language      = 2*3ALPHA            ; shortest ISO 639 code
		        //                 ["-" extlang]       ; sometimes followed by
		        //                                     ; extended language subtags
		        //               / 4ALPHA              ; or reserved for future use
		        //               / 5*8ALPHA            ; or registered language subtag
		        language = '(?:[a-z]{2,3}(?:-' + extlang + ')?|[a-z]{4}|[a-z]{5,8})',
		
		        // script        = 4ALPHA              ; ISO 15924 code
		        script = '[a-z]{4}',
		
		        // region        = 2ALPHA              ; ISO 3166-1 code
		        //               / 3DIGIT              ; UN M.49 code
		        region = '(?:[a-z]{2}|\\d{3})',
		
		        // variant       = 5*8alphanum         ; registered variants
		        //               / (DIGIT 3alphanum)
		        variant = '(?:[a-z0-9]{5,8}|\\d[a-z0-9]{3})',
		
		        //                                     ; Single alphanumerics
		        //                                     ; "x" reserved for private use
		        // singleton     = DIGIT               ; 0 - 9
		        //               / %x41-57             ; A - W
		        //               / %x59-5A             ; Y - Z
		        //               / %x61-77             ; a - w
		        //               / %x79-7A             ; y - z
		        singleton = '[0-9a-wy-z]',
		
		        // extension     = singleton 1*("-" (2*8alphanum))
		        extension = singleton + '(?:-[a-z0-9]{2,8})+',
		
		        // privateuse    = "x" 1*("-" (1*8alphanum))
		        privateuse = 'x(?:-[a-z0-9]{1,8})+',
		
		        // irregular     = "en-GB-oed"         ; irregular tags do not match
		        //               / "i-ami"             ; the 'langtag' production and
		        //               / "i-bnn"             ; would not otherwise be
		        //               / "i-default"         ; considered 'well-formed'
		        //               / "i-enochian"        ; These tags are all valid,
		        //               / "i-hak"             ; but most are deprecated
		        //               / "i-klingon"         ; in favor of more modern
		        //               / "i-lux"             ; subtags or subtag
		        //               / "i-mingo"           ; combination
		        //               / "i-navajo"
		        //               / "i-pwn"
		        //               / "i-tao"
		        //               / "i-tay"
		        //               / "i-tsu"
		        //               / "sgn-BE-FR"
		        //               / "sgn-BE-NL"
		        //               / "sgn-CH-DE"
		        irregular = '(?:en-GB-oed'
		                  + '|i-(?:ami|bnn|default|enochian|hak|klingon|lux|mingo|navajo|pwn|tao|tay|tsu)'
		                  + '|sgn-(?:BE-FR|BE-NL|CH-DE))',
		
		        // regular       = "art-lojban"        ; these tags match the 'langtag'
		        //               / "cel-gaulish"       ; production, but their subtags
		        //               / "no-bok"            ; are not extended language
		        //               / "no-nyn"            ; or variant subtags: their meaning
		        //               / "zh-guoyu"          ; is defined by their registration
		        //               / "zh-hakka"          ; and all of these are deprecated
		        //               / "zh-min"            ; in favor of a more modern
		        //               / "zh-min-nan"        ; subtag or sequence of subtags
		        //               / "zh-xiang"
		        regular = '(?:art-lojban|cel-gaulish|no-bok|no-nyn'
		                + '|zh-(?:guoyu|hakka|min|min-nan|xiang))',
		
		        // grandfathered = irregular           ; non-redundant tags registered
		        //               / regular             ; during the RFC 3066 era
		        grandfathered = '(?:' + irregular + '|' + regular + ')',
		
		        // langtag       = language
		        //                 ["-" script]
		        //                 ["-" region]
		        //                 *("-" variant)
		        //                 *("-" extension)
		        //                 ["-" privateuse]
		        langtag = language + '(?:-' + script + ')?(?:-' + region + ')?(?:-'
		                + variant + ')*(?:-' + extension + ')*(?:-' + privateuse + ')?';
		
		    // Language-Tag  = langtag             ; normal language tags
		    //               / privateuse          ; private use tag
		    //               / grandfathered       ; grandfathered tags
		    expBCP47Syntax = RegExp('^(?:'+langtag+'|'+privateuse+'|'+grandfathered+')$', 'i');
		
		    // Match duplicate variants in a language tag
		    expVariantDupes = RegExp('^(?!x).*?-('+variant+')-(?:\\w{4,8}-(?!x-))*\\1\\b', 'i');
		
		    // Match duplicate singletons in a language tag (except in private use)
		    expSingletonDupes = RegExp('^(?!x).*?-('+singleton+')-(?:\\w+-(?!x-))*\\1\\b', 'i');
		
		    // Match all extension sequences
		    expExtSequences = RegExp('-'+extension, 'ig');
		})();
		
		// Sect 6.2 Language Tags
		// ======================
		
		/**
		 * The IsStructurallyValidLanguageTag abstract operation verifies that the locale
		 * argument (which must be a String value)
		 *
		 * - represents a well-formed BCP 47 language tag as specified in RFC 5646 section
		 *   2.1, or successor,
		 * - does not include duplicate variant subtags, and
		 * - does not include duplicate singleton subtags.
		 *
		 * The abstract operation returns true if locale can be generated from the ABNF
		 * grammar in section 2.1 of the RFC, starting with Language-Tag, and does not
		 * contain duplicate variant or singleton subtags (other than as a private use
		 * subtag). It returns false otherwise. Terminal value characters in the grammar are
		 * interpreted as the Unicode equivalents of the ASCII octet values given.
		 */
		function /* 6.2.2 */IsStructurallyValidLanguageTag(locale) {
		    // represents a well-formed BCP 47 language tag as specified in RFC 5646
		    if (!expBCP47Syntax.test(locale))
		        return false;
		
		    // does not include duplicate variant subtags, and
		    if (expVariantDupes.test(locale))
		        return false;
		
		    // does not include duplicate singleton subtags.
		    if (expSingletonDupes.test(locale))
		        return false;
		
		    return true;
		}
		
		/**
		 * The CanonicalizeLanguageTag abstract operation returns the canonical and case-
		 * regularized form of the locale argument (which must be a String value that is
		 * a structurally valid BCP 47 language tag as verified by the
		 * IsStructurallyValidLanguageTag abstract operation). It takes the steps
		 * specified in RFC 5646 section 4.5, or successor, to bring the language tag
		 * into canonical form, and to regularize the case of the subtags, but does not
		 * take the steps to bring a language tag into “extlang form” and to reorder
		 * variant subtags.
		
		 * The specifications for extensions to BCP 47 language tags, such as RFC 6067,
		 * may include canonicalization rules for the extension subtag sequences they
		 * define that go beyond the canonicalization rules of RFC 5646 section 4.5.
		 * Implementations are allowed, but not required, to apply these additional rules.
		 */
		function /* 6.2.3 */CanonicalizeLanguageTag (locale) {
		    var match, parts;
		
		    // A language tag is in 'canonical form' when the tag is well-formed
		    // according to the rules in Sections 2.1 and 2.2
		
		    // Section 2.1 says all subtags use lowercase...
		    locale = locale.toLowerCase();
		
		    // ...with 2 exceptions: 'two-letter and four-letter subtags that neither
		    // appear at the start of the tag nor occur after singletons.  Such two-letter
		    // subtags are all uppercase (as in the tags "en-CA-x-ca" or "sgn-BE-FR") and
		    // four-letter subtags are titlecase (as in the tag "az-Latn-x-latn").
		    parts = locale.split('-');
		    for (var i = 1, max = parts.length; i < max; i++) {
		        // Two-letter subtags are all uppercase
		        if (parts[i].length === 2)
		            parts[i] = parts[i].toUpperCase();
		
		        // Four-letter subtags are titlecase
		        else if (parts[i].length === 4)
		            parts[i] = parts[i].charAt(0).toUpperCase() + parts[i].slice(1);
		
		        // Is it a singleton?
		        else if (parts[i].length === 1 && parts[i] != 'x')
		            break;
		    }
		    locale = arrJoin.call(parts, '-');
		
		    // The steps laid out in RFC 5646 section 4.5 are as follows:
		
		    // 1.  Extension sequences are ordered into case-insensitive ASCII order
		    //     by singleton subtag.
		    if ((match = locale.match(expExtSequences)) && match.length > 1) {
		        // The built-in sort() sorts by ASCII order, so use that
		        match.sort();
		
		        // Replace all extensions with the joined, sorted array
		        locale = locale.replace(
		            RegExp('(?:' + expExtSequences.source + ')+', 'i'),
		            arrJoin.call(match, '')
		        );
		    }
		
		    // 2.  Redundant or grandfathered tags are replaced by their 'Preferred-
		    //     Value', if there is one.
		    if (hop.call(redundantTags.tags, locale))
		        locale = redundantTags.tags[locale];
		
		    // 3.  Subtags are replaced by their 'Preferred-Value', if there is one.
		    //     For extlangs, the original primary language subtag is also
		    //     replaced if there is a primary language subtag in the 'Preferred-
		    //     Value'.
		    parts = locale.split('-');
		
		    for (var i = 1, max = parts.length; i < max; i++) {
		        if (hop.call(redundantTags.subtags, parts[i]))
		            parts[i] = redundantTags.subtags[parts[i]];
		
		        else if (hop.call(redundantTags.extLang, parts[i])) {
		            parts[i] = redundantTags.extLang[parts[i]][0];
		
		            // For extlang tags, the prefix needs to be removed if it is redundant
		            if (i === 1 && redundantTags.extLang[parts[1]][1] === parts[0]) {
		                parts = arrSlice.call(parts, i++);
		                max -= 1;
		            }
		        }
		    }
		
		    return arrJoin.call(parts, '-');
		}
		
		/**
		 * The DefaultLocale abstract operation returns a String value representing the
		 * structurally valid (6.2.2) and canonicalized (6.2.3) BCP 47 language tag for the
		 * host environment’s current locale.
		 */
		function /* 6.2.4 */DefaultLocale () {
		    return defaultLocale;
		}
		
		// Sect 6.3 Currency Codes
		// =======================
		
		/**
		 * The IsWellFormedCurrencyCode abstract operation verifies that the currency argument
		 * (after conversion to a String value) represents a well-formed 3-letter ISO currency
		 * code. The following steps are taken:
		 */
		function /* 6.3.1 */IsWellFormedCurrencyCode(currency) {
		    var
		        // 1. Let `c` be ToString(currency)
		        c = String(currency),
		
		        // 2. Let `normalized` be the result of mapping c to upper case as described
		        //    in 6.1.
		        normalized = toLatinUpperCase(c);
		
		    // 3. If the string length of normalized is not 3, return false.
		    // 4. If normalized contains any character that is not in the range "A" to "Z"
		    //    (U+0041 to U+005A), return false.
		    if (expCurrencyCode.test(normalized) === false)
		        return false;
		
		    // 5. Return true
		    return true;
		}
		
		// Sect 9.2 Abstract Operations
		// ============================
		function /* 9.2.1 */CanonicalizeLocaleList (locales) {
		// The abstract operation CanonicalizeLocaleList takes the following steps:
		
		    // 1. If locales is undefined, then a. Return a new empty List
		    if (locales === undefined)
		        return new List();
		
		    var
		        // 2. Let seen be a new empty List.
		        seen = new List(),
		
		        // 3. If locales is a String value, then
		        //    a. Let locales be a new array created as if by the expression new
		        //    Array(locales) where Array is the standard built-in constructor with
		        //    that name and locales is the value of locales.
		        locales = typeof locales === 'string' ? [ locales ] : locales,
		
		        // 4. Let O be ToObject(locales).
		        O = toObject(locales),
		
		        // 5. Let lenValue be the result of calling the [[Get]] internal method of
		        //    O with the argument "length".
		        // 6. Let len be ToUint32(lenValue).
		        len = O.length,
		
		        // 7. Let k be 0.
		        k = 0;
		
		    // 8. Repeat, while k < len
		    while (k < len) {
		        var
		            // a. Let Pk be ToString(k).
		            Pk = String(k),
		
		            // b. Let kPresent be the result of calling the [[HasProperty]] internal
		            //    method of O with argument Pk.
		            kPresent = Pk in O;
		
		        // c. If kPresent is true, then
		        if (kPresent) {
		            var
		                // i. Let kValue be the result of calling the [[Get]] internal
		                //     method of O with argument Pk.
		                kValue = O[Pk];
		
		            // ii. If the type of kValue is not String or Object, then throw a
		            //     TypeError exception.
		            if (kValue == null || (typeof kValue !== 'string' && typeof kValue !== 'object'))
		                throw new TypeError('String or Object type expected');
		
		            var
		                // iii. Let tag be ToString(kValue).
		                tag = String(kValue);
		
		            // iv. If the result of calling the abstract operation
		            //     IsStructurallyValidLanguageTag (defined in 6.2.2), passing tag as
		            //     the argument, is false, then throw a RangeError exception.
		            if (!IsStructurallyValidLanguageTag(tag))
		                throw new RangeError("'" + tag + "' is not a structurally valid language tag");
		
		            // v. Let tag be the result of calling the abstract operation
		            //    CanonicalizeLanguageTag (defined in 6.2.3), passing tag as the
		            //    argument.
		            tag = CanonicalizeLanguageTag(tag);
		
		            // vi. If tag is not an element of seen, then append tag as the last
		            //     element of seen.
		            if (arrIndexOf.call(seen, tag) === -1)
		                arrPush.call(seen, tag);
		        }
		
		        // d. Increase k by 1.
		        k++;
		    }
		
		    // 9. Return seen.
		    return seen;
		}
		
		/**
		 * The BestAvailableLocale abstract operation compares the provided argument
		 * locale, which must be a String value with a structurally valid and
		 * canonicalized BCP 47 language tag, against the locales in availableLocales and
		 * returns either the longest non-empty prefix of locale that is an element of
		 * availableLocales, or undefined if there is no such element. It uses the
		 * fallback mechanism of RFC 4647, section 3.4. The following steps are taken:
		 */
		function /* 9.2.2 */BestAvailableLocale (availableLocales, locale) {
		    var
		       // 1. Let candidate be locale
		       candidate = locale;
		
		    // 2. Repeat
		    while (true) {
		        // a. If availableLocales contains an element equal to candidate, then return
		        // candidate.
		        if (arrIndexOf.call(availableLocales, candidate) > -1)
		            return candidate;
		
		        var
		            // b. Let pos be the character index of the last occurrence of "-"
		            // (U+002D) within candidate. If that character does not occur, return
		            // undefined.
		            pos = candidate.lastIndexOf('-');
		
		        if (pos < 0)
		            return;
		
		        // c. If pos ≥ 2 and the character "-" occurs at index pos-2 of candidate,
		        //    then decrease pos by 2.
		        if (pos >= 2 && candidate.charAt(pos - 2) == '-')
		            pos -= 2;
		
		        // d. Let candidate be the substring of candidate from position 0, inclusive,
		        //    to position pos, exclusive.
		        candidate = candidate.substring(0, pos);
		    }
		}
		
		/**
		 * The LookupMatcher abstract operation compares requestedLocales, which must be
		 * a List as returned by CanonicalizeLocaleList, against the locales in
		 * availableLocales and determines the best available language to meet the
		 * request. The following steps are taken:
		 */
		function /* 9.2.3 */LookupMatcher (availableLocales, requestedLocales) {
		    var
		        // 1. Let i be 0.
		        i = 0,
		
		        // 2. Let len be the number of elements in requestedLocales.
		        len = requestedLocales.length,
		
		        // 3. Let availableLocale be undefined.
		        availableLocale;
		
		    // 4. Repeat while i < len and availableLocale is undefined:
		    while (i < len && !availableLocale) {
		        var
		            // a. Let locale be the element of requestedLocales at 0-origined list
		            //    position i.
		            locale = requestedLocales[i],
		
		            // b. Let noExtensionsLocale be the String value that is locale with all
		            //    Unicode locale extension sequences removed.
		            noExtensionsLocale = String(locale).replace(expUnicodeExSeq, ''),
		
		            // c. Let availableLocale be the result of calling the
		            //    BestAvailableLocale abstract operation (defined in 9.2.2) with
		            //    arguments availableLocales and noExtensionsLocale.
		            availableLocale = BestAvailableLocale(availableLocales, noExtensionsLocale);
		
		        // d. Increase i by 1.
		        i++;
		    }
		
		    var
		        // 5. Let result be a new Record.
		        result = new Record();
		
		    // 6. If availableLocale is not undefined, then
		    if (availableLocale !== undefined) {
		        // a. Set result.[[locale]] to availableLocale.
		        result['[[locale]]'] = availableLocale;
		
		        // b. If locale and noExtensionsLocale are not the same String value, then
		        if (String(locale) !== String(noExtensionsLocale)) {
		            var
		                // i. Let extension be the String value consisting of the first
		                //    substring of locale that is a Unicode locale extension sequence.
		                extension = locale.match(expUnicodeExSeq)[0],
		
		                // ii. Let extensionIndex be the character position of the initial
		                //     "-" of the first Unicode locale extension sequence within locale.
		                extensionIndex = locale.indexOf('-u-');
		
		            // iii. Set result.[[extension]] to extension.
		            result['[[extension]]'] = extension;
		
		            // iv. Set result.[[extensionIndex]] to extensionIndex.
		            result['[[extensionIndex]]'] = extensionIndex;
		        }
		    }
		    // 7. Else
		    else
		        // a. Set result.[[locale]] to the value returned by the DefaultLocale abstract
		        //    operation (defined in 6.2.4).
		        result['[[locale]]'] = DefaultLocale();
		
		    // 8. Return result
		    return result;
		}
		
		/**
		 * The BestFitMatcher abstract operation compares requestedLocales, which must be
		 * a List as returned by CanonicalizeLocaleList, against the locales in
		 * availableLocales and determines the best available language to meet the
		 * request. The algorithm is implementation dependent, but should produce results
		 * that a typical user of the requested locales would perceive as at least as
		 * good as those produced by the LookupMatcher abstract operation. Options
		 * specified through Unicode locale extension sequences must be ignored by the
		 * algorithm. Information about such subsequences is returned separately.
		 * The abstract operation returns a record with a [[locale]] field, whose value
		 * is the language tag of the selected locale, which must be an element of
		 * availableLocales. If the language tag of the request locale that led to the
		 * selected locale contained a Unicode locale extension sequence, then the
		 * returned record also contains an [[extension]] field whose value is the first
		 * Unicode locale extension sequence, and an [[extensionIndex]] field whose value
		 * is the index of the first Unicode locale extension sequence within the request
		 * locale language tag.
		 */
		function /* 9.2.4 */BestFitMatcher (availableLocales, requestedLocales) {
		    return LookupMatcher(availableLocales, requestedLocales);
		}
		
		/**
		 * The ResolveLocale abstract operation compares a BCP 47 language priority list
		 * requestedLocales against the locales in availableLocales and determines the
		 * best available language to meet the request. availableLocales and
		 * requestedLocales must be provided as List values, options as a Record.
		 */
		function /* 9.2.5 */ResolveLocale (availableLocales, requestedLocales, options, relevantExtensionKeys, localeData) {
		    if (availableLocales.length === 0) {
		        throw new ReferenceError('No locale data has been provided for this object yet.');
		    }
		
		    // The following steps are taken:
		    var
		        // 1. Let matcher be the value of options.[[localeMatcher]].
		        matcher = options['[[localeMatcher]]'];
		
		    // 2. If matcher is "lookup", then
		    if (matcher === 'lookup')
		        var
		            // a. Let r be the result of calling the LookupMatcher abstract operation
		            //    (defined in 9.2.3) with arguments availableLocales and
		            //    requestedLocales.
		            r = LookupMatcher(availableLocales, requestedLocales);
		
		    // 3. Else
		    else
		        var
		            // a. Let r be the result of calling the BestFitMatcher abstract
		            //    operation (defined in 9.2.4) with arguments availableLocales and
		            //    requestedLocales.
		            r = BestFitMatcher(availableLocales, requestedLocales);
		
		    var
		        // 4. Let foundLocale be the value of r.[[locale]].
		        foundLocale = r['[[locale]]'];
		
		    // 5. If r has an [[extension]] field, then
		    if (hop.call(r, '[[extension]]'))
		        var
		            // a. Let extension be the value of r.[[extension]].
		            extension = r['[[extension]]'],
		            // b. Let extensionIndex be the value of r.[[extensionIndex]].
		            extensionIndex = r['[[extensionIndex]]'],
		            // c. Let split be the standard built-in function object defined in ES5,
		            //    15.5.4.14.
		            split = String.prototype.split,
		            // d. Let extensionSubtags be the result of calling the [[Call]] internal
		            //    method of split with extension as the this value and an argument
		            //    list containing the single item "-".
		            extensionSubtags = split.call(extension, '-'),
		            // e. Let extensionSubtagsLength be the result of calling the [[Get]]
		            //    internal method of extensionSubtags with argument "length".
		            extensionSubtagsLength = extensionSubtags.length;
		
		    var
		        // 6. Let result be a new Record.
		        result = new Record();
		
		    // 7. Set result.[[dataLocale]] to foundLocale.
		    result['[[dataLocale]]'] = foundLocale;
		
		    var
		        // 8. Let supportedExtension be "-u".
		        supportedExtension = '-u',
		        // 9. Let i be 0.
		        i = 0,
		        // 10. Let len be the result of calling the [[Get]] internal method of
		        //     relevantExtensionKeys with argument "length".
		        len = relevantExtensionKeys.length;
		
		    // 11 Repeat while i < len:
		    while (i < len) {
		        var
		            // a. Let key be the result of calling the [[Get]] internal method of
		            //    relevantExtensionKeys with argument ToString(i).
		            key = relevantExtensionKeys[i],
		            // b. Let foundLocaleData be the result of calling the [[Get]] internal
		            //    method of localeData with the argument foundLocale.
		            foundLocaleData = localeData[foundLocale],
		            // c. Let keyLocaleData be the result of calling the [[Get]] internal
		            //    method of foundLocaleData with the argument key.
		            keyLocaleData = foundLocaleData[key],
		            // d. Let value be the result of calling the [[Get]] internal method of
		            //    keyLocaleData with argument "0".
		            value = keyLocaleData['0'],
		            // e. Let supportedExtensionAddition be "".
		            supportedExtensionAddition = '',
		            // f. Let indexOf be the standard built-in function object defined in
		            //    ES5, 15.4.4.14.
		            indexOf = arrIndexOf;
		
		        // g. If extensionSubtags is not undefined, then
		        if (extensionSubtags !== undefined) {
		            var
		                // i. Let keyPos be the result of calling the [[Call]] internal
		                //    method of indexOf with extensionSubtags as the this value and
		                // an argument list containing the single item key.
		                keyPos = indexOf.call(extensionSubtags, key);
		
		            // ii. If keyPos ≠ -1, then
		            if (keyPos !== -1) {
		                // 1. If keyPos + 1 < extensionSubtagsLength and the length of the
		                //    result of calling the [[Get]] internal method of
		                //    extensionSubtags with argument ToString(keyPos +1) is greater
		                //    than 2, then
		                if (keyPos + 1 < extensionSubtagsLength
		                        && extensionSubtags[keyPos + 1].length > 2) {
		                    var
		                        // a. Let requestedValue be the result of calling the [[Get]]
		                        //    internal method of extensionSubtags with argument
		                        //    ToString(keyPos + 1).
		                        requestedValue = extensionSubtags[keyPos + 1],
		                        // b. Let valuePos be the result of calling the [[Call]]
		                        //    internal method of indexOf with keyLocaleData as the
		                        //    this value and an argument list containing the single
		                        //    item requestedValue.
		                        valuePos = indexOf.call(keyLocaleData, requestedValue);
		
		                    // c. If valuePos ≠ -1, then
		                    if (valuePos !== -1)
		                        var
		                            // i. Let value be requestedValue.
		                            value = requestedValue,
		                            // ii. Let supportedExtensionAddition be the
		                            //     concatenation of "-", key, "-", and value.
		                            supportedExtensionAddition = '-' + key + '-' + value;
		                }
		                // 2. Else
		                else {
		                    var
		                        // a. Let valuePos be the result of calling the [[Call]]
		                        // internal method of indexOf with keyLocaleData as the this
		                        // value and an argument list containing the single item
		                        // "true".
		                        valuePos = indexOf(keyLocaleData, 'true');
		
		                    // b. If valuePos ≠ -1, then
		                    if (valuePos !== -1)
		                        var
		                            // i. Let value be "true".
		                            value = 'true';
		                }
		            }
		        }
		        // h. If options has a field [[<key>]], then
		        if (hop.call(options, '[[' + key + ']]')) {
		            var
		                // i. Let optionsValue be the value of options.[[<key>]].
		                optionsValue = options['[[' + key + ']]'];
		
		            // ii. If the result of calling the [[Call]] internal method of indexOf
		            //     with keyLocaleData as the this value and an argument list
		            //     containing the single item optionsValue is not -1, then
		            if (indexOf.call(keyLocaleData, optionsValue) !== -1) {
		                // 1. If optionsValue is not equal to value, then
		                if (optionsValue !== value) {
		                    // a. Let value be optionsValue.
		                    value = optionsValue;
		                    // b. Let supportedExtensionAddition be "".
		                    supportedExtensionAddition = '';
		                }
		            }
		        }
		        // i. Set result.[[<key>]] to value.
		        result['[[' + key + ']]'] = value;
		
		        // j. Append supportedExtensionAddition to supportedExtension.
		        supportedExtension += supportedExtensionAddition;
		
		        // k. Increase i by 1.
		        i++;
		    }
		    // 12. If the length of supportedExtension is greater than 2, then
		    if (supportedExtension.length > 2) {
		        var
		            // a. Let preExtension be the substring of foundLocale from position 0,
		            //    inclusive, to position extensionIndex, exclusive.
		            preExtension = foundLocale.substring(0, extensionIndex),
		            // b. Let postExtension be the substring of foundLocale from position
		            //    extensionIndex to the end of the string.
		            postExtension = foundLocale.substring(extensionIndex),
		            // c. Let foundLocale be the concatenation of preExtension,
		            //    supportedExtension, and postExtension.
		            foundLocale = preExtension + supportedExtension + postExtension;
		    }
		    // 13. Set result.[[locale]] to foundLocale.
		    result['[[locale]]'] = foundLocale;
		
		    // 14. Return result.
		    return result;
		}
		
		/**
		 * The LookupSupportedLocales abstract operation returns the subset of the
		 * provided BCP 47 language priority list requestedLocales for which
		 * availableLocales has a matching locale when using the BCP 47 Lookup algorithm.
		 * Locales appear in the same order in the returned list as in requestedLocales.
		 * The following steps are taken:
		 */
		function /* 9.2.6 */LookupSupportedLocales (availableLocales, requestedLocales) {
		    var
		        // 1. Let len be the number of elements in requestedLocales.
		        len = requestedLocales.length,
		        // 2. Let subset be a new empty List.
		        subset = new List(),
		        // 3. Let k be 0.
		        k = 0;
		
		    // 4. Repeat while k < len
		    while (k < len) {
		        var
		            // a. Let locale be the element of requestedLocales at 0-origined list
		            //    position k.
		            locale = requestedLocales[k],
		            // b. Let noExtensionsLocale be the String value that is locale with all
		            //    Unicode locale extension sequences removed.
		            noExtensionsLocale = String(locale).replace(expUnicodeExSeq, ''),
		            // c. Let availableLocale be the result of calling the
		            //    BestAvailableLocale abstract operation (defined in 9.2.2) with
		            //    arguments availableLocales and noExtensionsLocale.
		            availableLocale = BestAvailableLocale(availableLocales, noExtensionsLocale);
		
		        // d. If availableLocale is not undefined, then append locale to the end of
		        //    subset.
		        if (availableLocale !== undefined)
		            arrPush.call(subset, locale);
		
		        // e. Increment k by 1.
		        k++;
		    }
		
		    var
		        // 5. Let subsetArray be a new Array object whose elements are the same
		        //    values in the same order as the elements of subset.
		        subsetArray = arrSlice.call(subset);
		
		    // 6. Return subsetArray.
		    return subsetArray;
		}
		
		/**
		 * The BestFitSupportedLocales abstract operation returns the subset of the
		 * provided BCP 47 language priority list requestedLocales for which
		 * availableLocales has a matching locale when using the Best Fit Matcher
		 * algorithm. Locales appear in the same order in the returned list as in
		 * requestedLocales. The steps taken are implementation dependent.
		 */
		function /*9.2.7 */BestFitSupportedLocales (availableLocales, requestedLocales) {
		    // ###TODO: implement this function as described by the specification###
		    return LookupSupportedLocales(availableLocales, requestedLocales);
		}
		
		/**
		 * The SupportedLocales abstract operation returns the subset of the provided BCP
		 * 47 language priority list requestedLocales for which availableLocales has a
		 * matching locale. Two algorithms are available to match the locales: the Lookup
		 * algorithm described in RFC 4647 section 3.4, and an implementation dependent
		 * best-fit algorithm. Locales appear in the same order in the returned list as
		 * in requestedLocales. The following steps are taken:
		 */
		function /*9.2.8 */SupportedLocales (availableLocales, requestedLocales, options) {
		    // 1. If options is not undefined, then
		    if (options !== undefined) {
		        var
		            // a. Let options be ToObject(options).
		            options = new Record(toObject(options)),
		            // b. Let matcher be the result of calling the [[Get]] internal method of
		            //    options with argument "localeMatcher".
		            matcher = options.localeMatcher;
		
		        // c. If matcher is not undefined, then
		        if (matcher !== undefined) {
		            // i. Let matcher be ToString(matcher).
		            matcher = String(matcher);
		
		            // ii. If matcher is not "lookup" or "best fit", then throw a RangeError
		            //     exception.
		            if (matcher !== 'lookup' && matcher !== 'best fit')
		                throw new RangeError('matcher should be "lookup" or "best fit"');
		        }
		    }
		    // 2. If matcher is undefined or "best fit", then
		    if (matcher === undefined || matcher === 'best fit')
		        var
		            // a. Let subset be the result of calling the BestFitSupportedLocales
		            //    abstract operation (defined in 9.2.7) with arguments
		            //    availableLocales and requestedLocales.
		            subset = BestFitSupportedLocales(availableLocales, requestedLocales);
		    // 3. Else
		    else
		        var
		            // a. Let subset be the result of calling the LookupSupportedLocales
		            //    abstract operation (defined in 9.2.6) with arguments
		            //    availableLocales and requestedLocales.
		            subset = LookupSupportedLocales(availableLocales, requestedLocales);
		
		    // 4. For each named own property name P of subset,
		    for (var P in subset) {
		        if (!hop.call(subset, P))
		            continue;
		
		        // a. Let desc be the result of calling the [[GetOwnProperty]] internal
		        //    method of subset with P.
		        // b. Set desc.[[Writable]] to false.
		        // c. Set desc.[[Configurable]] to false.
		        // d. Call the [[DefineOwnProperty]] internal method of subset with P, desc,
		        //    and true as arguments.
		        defineProperty(subset, P, {
		            writable: false, configurable: false, value: subset[P]
		        });
		    }
		    // "Freeze" the array so no new elements can be added
		    defineProperty(subset, 'length', { writable: false });
		
		    // 5. Return subset
		    return subset;
		}
		
		/**
		 * The GetOption abstract operation extracts the value of the property named
		 * property from the provided options object, converts it to the required type,
		 * checks whether it is one of a List of allowed values, and fills in a fallback
		 * value if necessary.
		 */
		function /*9.2.9 */GetOption (options, property, type, values, fallback) {
		    var
		        // 1. Let value be the result of calling the [[Get]] internal method of
		        //    options with argument property.
		        value = options[property];
		
		    // 2. If value is not undefined, then
		    if (value !== undefined) {
		        // a. Assert: type is "boolean" or "string".
		        // b. If type is "boolean", then let value be ToBoolean(value).
		        // c. If type is "string", then let value be ToString(value).
		        value = type === 'boolean' ? Boolean(value)
		                  : (type === 'string' ? String(value) : value);
		
		        // d. If values is not undefined, then
		        if (values !== undefined) {
		            // i. If values does not contain an element equal to value, then throw a
		            //    RangeError exception.
		            if (arrIndexOf.call(values, value) === -1)
		                throw new RangeError("'" + value + "' is not an allowed value for `" + property +'`');
		        }
		
		        // e. Return value.
		        return value;
		    }
		    // Else return fallback.
		    return fallback;
		}
		
		/**
		 * The GetNumberOption abstract operation extracts a property value from the
		 * provided options object, converts it to a Number value, checks whether it is
		 * in the allowed range, and fills in a fallback value if necessary.
		 */
		function /* 9.2.10 */GetNumberOption (options, property, minimum, maximum, fallback) {
		    var
		        // 1. Let value be the result of calling the [[Get]] internal method of
		        //    options with argument property.
		        value = options[property];
		
		    // 2. If value is not undefined, then
		    if (value !== undefined) {
		        // a. Let value be ToNumber(value).
		        value = Number(value);
		
		        // b. If value is NaN or less than minimum or greater than maximum, throw a
		        //    RangeError exception.
		        if (isNaN(value) || value < minimum || value > maximum)
		            throw new RangeError('Value is not a number or outside accepted range');
		
		        // c. Return floor(value).
		        return Math.floor(value);
		    }
		    // 3. Else return fallback.
		    return fallback;
		}
		
		// 11.1 The Intl.NumberFormat constructor
		// ======================================
		
		// Define the NumberFormat constructor internally so it cannot be tainted
		function NumberFormatConstructor () {
		    var locales = arguments[0];
		    var options = arguments[1];
		
		    if (!this || this === Intl) {
		        return new Intl.NumberFormat(locales, options);
		    }
		
		    return InitializeNumberFormat(toObject(this), locales, options);
		}
		
		defineProperty(Intl, 'NumberFormat', {
		    configurable: true,
		    writable: true,
		    value: NumberFormatConstructor
		});
		
		// Must explicitly set prototypes as unwritable
		defineProperty(Intl.NumberFormat, 'prototype', {
		    writable: false
		});
		
		/**
		 * The abstract operation InitializeNumberFormat accepts the arguments
		 * numberFormat (which must be an object), locales, and options. It initializes
		 * numberFormat as a NumberFormat object.
		 */
		function /*11.1.1.1 */InitializeNumberFormat (numberFormat, locales, options) {
		    var
		    // This will be a internal properties object if we're not already initialized
		        internal = getInternalProperties(numberFormat),
		
		    // Create an object whose props can be used to restore the values of RegExp props
		        regexpState = createRegExpRestore();
		
		    // 1. If numberFormat has an [[initializedIntlObject]] internal property with
		    // value true, throw a TypeError exception.
		    if (internal['[[initializedIntlObject]]'] === true)
		        throw new TypeError('`this` object has already been initialized as an Intl object');
		
		    // Need this to access the `internal` object
		    defineProperty(numberFormat, '__getInternalProperties', {
		        value: function () {
		            // NOTE: Non-standard, for internal use only
		            if (arguments[0] === secret)
		                return internal;
		        }
		    });
		
		    // 2. Set the [[initializedIntlObject]] internal property of numberFormat to true.
		    internal['[[initializedIntlObject]]'] = true;
		
		    var
		    // 3. Let requestedLocales be the result of calling the CanonicalizeLocaleList
		    //    abstract operation (defined in 9.2.1) with argument locales.
		        requestedLocales = CanonicalizeLocaleList(locales);
		
		    // 4. If options is undefined, then
		    if (options === undefined)
		        // a. Let options be the result of creating a new object as if by the
		        // expression new Object() where Object is the standard built-in constructor
		        // with that name.
		        options = {};
		
		    // 5. Else
		    else
		        // a. Let options be ToObject(options).
		        options = toObject(options);
		
		    var
		    // 6. Let opt be a new Record.
		        opt = new Record(),
		
		    // 7. Let matcher be the result of calling the GetOption abstract operation
		    //    (defined in 9.2.9) with the arguments options, "localeMatcher", "string",
		    //    a List containing the two String values "lookup" and "best fit", and
		    //    "best fit".
		        matcher =  GetOption(options, 'localeMatcher', 'string', new List('lookup', 'best fit'), 'best fit');
		
		    // 8. Set opt.[[localeMatcher]] to matcher.
		    opt['[[localeMatcher]]'] = matcher;
		
		    var
		    // 9. Let NumberFormat be the standard built-in object that is the initial value
		    //    of Intl.NumberFormat.
		    // 10. Let localeData be the value of the [[localeData]] internal property of
		    //     NumberFormat.
		        localeData = internals.NumberFormat['[[localeData]]'],
		
		    // 11. Let r be the result of calling the ResolveLocale abstract operation
		    //     (defined in 9.2.5) with the [[availableLocales]] internal property of
		    //     NumberFormat, requestedLocales, opt, the [[relevantExtensionKeys]]
		    //     internal property of NumberFormat, and localeData.
		        r = ResolveLocale(
		                internals.NumberFormat['[[availableLocales]]'], requestedLocales,
		                opt, internals.NumberFormat['[[relevantExtensionKeys]]'], localeData
		            );
		
		    // 12. Set the [[locale]] internal property of numberFormat to the value of
		    //     r.[[locale]].
		    internal['[[locale]]'] = r['[[locale]]'];
		
		    // 13. Set the [[numberingSystem]] internal property of numberFormat to the value
		    //     of r.[[nu]].
		    internal['[[numberingSystem]]'] = r['[[nu]]'];
		
		    // The specification doesn't tell us to do this, but it's helpful later on
		    internal['[[dataLocale]]'] = r['[[dataLocale]]'];
		
		    var
		    // 14. Let dataLocale be the value of r.[[dataLocale]].
		        dataLocale = r['[[dataLocale]]'],
		
		    // 15. Let s be the result of calling the GetOption abstract operation with the
		    //     arguments options, "style", "string", a List containing the three String
		    //     values "decimal", "percent", and "currency", and "decimal".
		        s = GetOption(options, 'style', 'string', new List('decimal', 'percent', 'currency'), 'decimal');
		
		    // 16. Set the [[style]] internal property of numberFormat to s.
		    internal['[[style]]'] = s;
		
		    var
		    // 17. Let c be the result of calling the GetOption abstract operation with the
		    //     arguments options, "currency", "string", undefined, and undefined.
		        c = GetOption(options, 'currency', 'string');
		
		    // 18. If c is not undefined and the result of calling the
		    //     IsWellFormedCurrencyCode abstract operation (defined in 6.3.1) with
		    //     argument c is false, then throw a RangeError exception.
		    if (c !== undefined && !IsWellFormedCurrencyCode(c))
		        throw new RangeError("'" + c + "' is not a valid currency code");
		
		    // 19. If s is "currency" and c is undefined, throw a TypeError exception.
		    if (s === 'currency' && c === undefined)
		        throw new TypeError('Currency code is required when style is currency');
		
		    // 20. If s is "currency", then
		    if (s === 'currency') {
		        // a. Let c be the result of converting c to upper case as specified in 6.1.
		        c = c.toUpperCase();
		
		        // b. Set the [[currency]] internal property of numberFormat to c.
		        internal['[[currency]]'] = c;
		
		        var
		        // c. Let cDigits be the result of calling the CurrencyDigits abstract
		        //    operation (defined below) with argument c.
		            cDigits = CurrencyDigits(c);
		    }
		
		    var
		    // 21. Let cd be the result of calling the GetOption abstract operation with the
		    //     arguments options, "currencyDisplay", "string", a List containing the
		    //     three String values "code", "symbol", and "name", and "symbol".
		        cd = GetOption(options, 'currencyDisplay', 'string', new List('code', 'symbol', 'name'), 'symbol');
		
		    // 22. If s is "currency", then set the [[currencyDisplay]] internal property of
		    //     numberFormat to cd.
		    if (s === 'currency')
		        internal['[[currencyDisplay]]'] = cd;
		
		    var
		    // 23. Let mnid be the result of calling the GetNumberOption abstract operation
		    //     (defined in 9.2.10) with arguments options, "minimumIntegerDigits", 1, 21,
		    //     and 1.
		        mnid = GetNumberOption(options, 'minimumIntegerDigits', 1, 21, 1);
		
		    // 24. Set the [[minimumIntegerDigits]] internal property of numberFormat to mnid.
		    internal['[[minimumIntegerDigits]]'] = mnid;
		
		    var
		    // 25. If s is "currency", then let mnfdDefault be cDigits; else let mnfdDefault
		    //     be 0.
		        mnfdDefault = s === 'currency' ? cDigits : 0,
		
		    // 26. Let mnfd be the result of calling the GetNumberOption abstract operation
		    //     with arguments options, "minimumFractionDigits", 0, 20, and mnfdDefault.
		        mnfd = GetNumberOption(options, 'minimumFractionDigits', 0, 20, mnfdDefault);
		
		    // 27. Set the [[minimumFractionDigits]] internal property of numberFormat to mnfd.
		    internal['[[minimumFractionDigits]]'] = mnfd;
		
		    var
		    // 28. If s is "currency", then let mxfdDefault be max(mnfd, cDigits); else if s
		    //     is "percent", then let mxfdDefault be max(mnfd, 0); else let mxfdDefault
		    //     be max(mnfd, 3).
		        mxfdDefault = s === 'currency' ? Math.max(mnfd, cDigits)
		                    : (s === 'percent' ? Math.max(mnfd, 0) : Math.max(mnfd, 3)),
		
		    // 29. Let mxfd be the result of calling the GetNumberOption abstract operation
		    //     with arguments options, "maximumFractionDigits", mnfd, 20, and mxfdDefault.
		        mxfd = GetNumberOption(options, 'maximumFractionDigits', mnfd, 20, mxfdDefault);
		
		    // 30. Set the [[maximumFractionDigits]] internal property of numberFormat to mxfd.
		    internal['[[maximumFractionDigits]]'] = mxfd;
		
		    var
		    // 31. Let mnsd be the result of calling the [[Get]] internal method of options
		    //     with argument "minimumSignificantDigits".
		        mnsd = options.minimumSignificantDigits,
		
		    // 32. Let mxsd be the result of calling the [[Get]] internal method of options
		    //     with argument "maximumSignificantDigits".
		        mxsd = options.maximumSignificantDigits;
		
		    // 33. If mnsd is not undefined or mxsd is not undefined, then:
		    if (mnsd !== undefined || mxsd !== undefined) {
		        // a. Let mnsd be the result of calling the GetNumberOption abstract
		        //    operation with arguments options, "minimumSignificantDigits", 1, 21,
		        //    and 1.
		        mnsd = GetNumberOption(options, 'minimumSignificantDigits', 1, 21, 1);
		
		        // b. Let mxsd be the result of calling the GetNumberOption abstract
		        //     operation with arguments options, "maximumSignificantDigits", mnsd,
		        //     21, and 21.
		        mxsd = GetNumberOption(options, 'maximumSignificantDigits', mnsd, 21, 21);
		
		        // c. Set the [[minimumSignificantDigits]] internal property of numberFormat
		        //    to mnsd, and the [[maximumSignificantDigits]] internal property of
		        //    numberFormat to mxsd.
		        internal['[[minimumSignificantDigits]]'] = mnsd;
		        internal['[[maximumSignificantDigits]]'] = mxsd;
		    }
		    var
		    // 34. Let g be the result of calling the GetOption abstract operation with the
		    //     arguments options, "useGrouping", "boolean", undefined, and true.
		        g = GetOption(options, 'useGrouping', 'boolean', undefined, true);
		
		    // 35. Set the [[useGrouping]] internal property of numberFormat to g.
		    internal['[[useGrouping]]'] = g;
		
		    var
		    // 36. Let dataLocaleData be the result of calling the [[Get]] internal method of
		    //     localeData with argument dataLocale.
		        dataLocaleData = localeData[dataLocale],
		
		    // 37. Let patterns be the result of calling the [[Get]] internal method of
		    //     dataLocaleData with argument "patterns".
		        patterns = dataLocaleData.patterns;
		
		    // 38. Assert: patterns is an object (see 11.2.3)
		
		    var
		    // 39. Let stylePatterns be the result of calling the [[Get]] internal method of
		    //     patterns with argument s.
		        stylePatterns = patterns[s];
		
		    // 40. Set the [[positivePattern]] internal property of numberFormat to the
		    //     result of calling the [[Get]] internal method of stylePatterns with the
		    //     argument "positivePattern".
		    internal['[[positivePattern]]'] = stylePatterns.positivePattern;
		
		    // 41. Set the [[negativePattern]] internal property of numberFormat to the
		    //     result of calling the [[Get]] internal method of stylePatterns with the
		    //     argument "negativePattern".
		    internal['[[negativePattern]]'] = stylePatterns.negativePattern;
		
		    // 42. Set the [[boundFormat]] internal property of numberFormat to undefined.
		    internal['[[boundFormat]]'] = undefined;
		
		    // 43. Set the [[initializedNumberFormat]] internal property of numberFormat to
		    //     true.
		    internal['[[initializedNumberFormat]]'] = true;
		
		    // Restore the RegExp properties
		    regexpState.exp.test(regexpState.input);
		
		    // Return the newly initialised object
		    return numberFormat;
		}
		
		function CurrencyDigits(currency) {
		    // When the CurrencyDigits abstract operation is called with an argument currency
		    // (which must be an upper case String value), the following steps are taken:
		
		    // 1. If the ISO 4217 currency and funds code list contains currency as an
		    // alphabetic code, then return the minor unit value corresponding to the
		    // currency from the list; else return 2.
		    return currencyMinorUnits[currency] !== undefined
		                ? currencyMinorUnits[currency]
		                : 2;
		}
		
		/* 11.2.3 */internals.NumberFormat = {
		    '[[availableLocales]]': [],
		    '[[relevantExtensionKeys]]': ['nu'],
		    '[[localeData]]': {}
		};
		
		/**
		 * When the supportedLocalesOf method of Intl.NumberFormat is called, the
		 * following steps are taken:
		 */
		/* 11.2.2 */defineProperty(Intl.NumberFormat, 'supportedLocalesOf', {
		    configurable: true,
		    writable: true,
		    value: fnBind.call(supportedLocalesOf, internals.NumberFormat)
		});
		
		/**
		 * This named accessor property returns a function that formats a number
		 * according to the effective locale and the formatting options of this
		 * NumberFormat object.
		 */
		/* 11.3.2 */defineProperty(Intl.NumberFormat.prototype, 'format', {
		    configurable: true,
		    get: function () {
		        var internal = this != null && typeof this === 'object' && getInternalProperties(this);
		
		        // Satisfy test 11.3_b
		        if (!internal || !internal['[[initializedNumberFormat]]'])
		            throw new TypeError('`this` value for format() is not an initialized Intl.NumberFormat object.');
		
		        // The value of the [[Get]] attribute is a function that takes the following
		        // steps:
		
		        // 1. If the [[boundFormat]] internal property of this NumberFormat object
		        //    is undefined, then:
		        if (internal['[[boundFormat]]'] === undefined) {
		            var
		            // a. Let F be a Function object, with internal properties set as
		            //    specified for built-in functions in ES5, 15, or successor, and the
		            //    length property set to 1, that takes the argument value and
		            //    performs the following steps:
		                F = function (value) {
		                    // i. If value is not provided, then let value be undefined.
		                    // ii. Let x be ToNumber(value).
		                    // iii. Return the result of calling the FormatNumber abstract
		                    //      operation (defined below) with arguments this and x.
		                    return FormatNumber(this, /* x = */Number(value));
		                },
		
		            // b. Let bind be the standard built-in function object defined in ES5,
		            //    15.3.4.5.
		            // c. Let bf be the result of calling the [[Call]] internal method of
		            //    bind with F as the this value and an argument list containing
		            //    the single item this.
		                bf = fnBind.call(F, this);
		
		            // d. Set the [[boundFormat]] internal property of this NumberFormat
		            //    object to bf.
		            internal['[[boundFormat]]'] = bf;
		        }
		        // Return the value of the [[boundFormat]] internal property of this
		        // NumberFormat object.
		        return internal['[[boundFormat]]'];
		    }
		});
		
		/**
		 * When the FormatNumber abstract operation is called with arguments numberFormat
		 * (which must be an object initialized as a NumberFormat) and x (which must be a
		 * Number value), it returns a String value representing x according to the
		 * effective locale and the formatting options of numberFormat.
		 */
		function FormatNumber (numberFormat, x) {
		    var n,
		
		    // Create an object whose props can be used to restore the values of RegExp props
		        regexpState = createRegExpRestore(),
		
		        internal = getInternalProperties(numberFormat),
		        locale = internal['[[dataLocale]]'],
		        nums   = internal['[[numberingSystem]]'],
		        data   = internals.NumberFormat['[[localeData]]'][locale],
		        ild    = data.symbols[nums] || data.symbols.latn,
		
		    // 1. Let negative be false.
		        negative = false;
		
		    // 2. If the result of isFinite(x) is false, then
		    if (isFinite(x) === false) {
		        // a. If x is NaN, then let n be an ILD String value indicating the NaN value.
		        if (isNaN(x))
		            n = ild.nan;
		
		        // b. Else
		        else {
		            // a. Let n be an ILD String value indicating infinity.
		            n = ild.infinity;
		            // b. If x < 0, then let negative be true.
		            if (x < 0)
		                negative = true;
		        }
		    }
		    // 3. Else
		    else {
		        // a. If x < 0, then
		        if (x < 0) {
		            // i. Let negative be true.
		            negative = true;
		            // ii. Let x be -x.
		            x = -x;
		        }
		
		        // b. If the value of the [[style]] internal property of numberFormat is
		        //    "percent", let x be 100 × x.
		        if (internal['[[style]]'] === 'percent')
		            x *= 100;
		
		        // c. If the [[minimumSignificantDigits]] and [[maximumSignificantDigits]]
		        //    internal properties of numberFormat are present, then
		        if (hop.call(internal, '[[minimumSignificantDigits]]') &&
		                hop.call(internal, '[[maximumSignificantDigits]]'))
		            // i. Let n be the result of calling the ToRawPrecision abstract operation
		            //    (defined below), passing as arguments x and the values of the
		            //    [[minimumSignificantDigits]] and [[maximumSignificantDigits]]
		            //    internal properties of numberFormat.
		            n = ToRawPrecision(x,
		                  internal['[[minimumSignificantDigits]]'],
		                  internal['[[maximumSignificantDigits]]']);
		        // d. Else
		        else
		            // i. Let n be the result of calling the ToRawFixed abstract operation
		            //    (defined below), passing as arguments x and the values of the
		            //    [[minimumIntegerDigits]], [[minimumFractionDigits]], and
		            //    [[maximumFractionDigits]] internal properties of numberFormat.
		            n = ToRawFixed(x,
		                  internal['[[minimumIntegerDigits]]'],
		                  internal['[[minimumFractionDigits]]'],
		                  internal['[[maximumFractionDigits]]']);
		
		        // e. If the value of the [[numberingSystem]] internal property of
		        //    numberFormat matches one of the values in the “Numbering System” column
		        //    of Table 2 below, then
		        if (numSys[nums]) {
		            // i. Let digits be an array whose 10 String valued elements are the
		            //    UTF-16 string representations of the 10 digits specified in the
		            //    “Digits” column of Table 2 in the row containing the value of the
		            //    [[numberingSystem]] internal property.
		            var digits = numSys[internal['[[numberingSystem]]']];
		            // ii. Replace each digit in n with the value of digits[digit].
		            n = String(n).replace(/\d/g, function (digit) {
		                return digits[digit];
		            });
		        }
		        // f. Else use an implementation dependent algorithm to map n to the
		        //    appropriate representation of n in the given numbering system.
		        else
		            n = String(n); // ###TODO###
		
		        // g. If n contains the character ".", then replace it with an ILND String
		        //    representing the decimal separator.
		        n = n.replace(/\./g, ild.decimal);
		
		        // h. If the value of the [[useGrouping]] internal property of numberFormat
		        //    is true, then insert an ILND String representing a grouping separator
		        //    into an ILND set of locations within the integer part of n.
		        if (internal['[[useGrouping]]'] === true) {
		            var parts = n.split(ild.decimal);
		            parts[0] = parts[0].replace(expInsertGroups, ild.group);
		
		            n = arrJoin.call(parts, ild.decimal);
		        }
		    }
		
		    var
		    // 4. If negative is true, then let result be the value of the [[negativePattern]]
		    //    internal property of numberFormat; else let result be the value of the
		    //    [[positivePattern]] internal property of numberFormat.
		        result = internal[negative === true ? '[[negativePattern]]' : '[[positivePattern]]'];
		
		    // 5. Replace the substring "{number}" within result with n.
		    result = result.replace('{number}', n);
		
		    // 6. If the value of the [[style]] internal property of numberFormat is
		    //    "currency", then:
		    if (internal['[[style]]'] === 'currency') {
		        var cd,
		        // a. Let currency be the value of the [[currency]] internal property of
		        //    numberFormat.
		            currency = internal['[[currency]]'],
		
		        // Shorthand for the currency data
		            cData = data.currencies[currency];
		
		        // b. If the value of the [[currencyDisplay]] internal property of
		        //    numberFormat is "code", then let cd be currency.
		        if (internal['[[currencyDisplay]]'] === 'code')
		            cd = currency;
		
		        // c. Else if the value of the [[currencyDisplay]] internal property of
		        //    numberFormat is "symbol", then let cd be an ILD string representing
		        //    currency in short form. If the implementation does not have such a
		        //    representation of currency, then use currency itself.
		        else if (internal['[[currencyDisplay]]'] === 'symbol')
		            cd = cData || currency;
		
		        // d. Else if the value of the [[currencyDisplay]] internal property of
		        //    numberFormat is "name", then let cd be an ILD string representing
		        //    currency in long form. If the implementation does not have such a
		        //    representation of currency, then use currency itself.
		        else if (internal['[[currencyDisplay]]'] === 'name')
		            cd = cData ? cData['displayName-count-one'] : currency;
		
		        // e. Replace the substring "{currency}" within result with cd.
		        result = result.replace('{currency}', cd);
		    }
		
		    // Restore the RegExp properties
		    regexpState.exp.test(regexpState.input);
		
		    // 7. Return result.
		    return result;
		}
		
		/**
		 * When the ToRawPrecision abstract operation is called with arguments x (which
		 * must be a finite non-negative number), minPrecision, and maxPrecision (both
		 * must be integers between 1 and 21) the following steps are taken:
		 */
		function ToRawPrecision (x, minPrecision, maxPrecision) {
		    var
		    // 1. Let p be maxPrecision.
		        p = maxPrecision;
		
		    // 2. If x = 0, then
		    if (x === 0) {
		        var
		        // a. Let m be the String consisting of p occurrences of the character "0".
		            m = arrJoin.call(Array (p + 1), '0'),
		        // b. Let e be 0.
		            e = 0;
		    }
		    // 3. Else
		    else {
		        // a. Let e and n be integers such that 10ᵖ⁻¹ ≤ n < 10ᵖ and for which the
		        //    exact mathematical value of n × 10ᵉ⁻ᵖ⁺¹ – x is as close to zero as
		        //    possible. If there are two such sets of e and n, pick the e and n for
		        //    which n × 10ᵉ⁻ᵖ⁺¹ is larger.
		
		        var idx,
		
		            isInt = x % 1,
		
		            // Fix floating point precision issues in Chrome and Firefox
		            pre = isInt ? Math.pow(10, maxPrecision) : 1,
		
		            // toPrecision already does most of this for us
		            m = Number.prototype.toPrecision.call(x*pre, maxPrecision),
		
		            // Get the exponential value
		            e = (idx = m.indexOf('e')) > -1 ? Number(m.slice(idx + 1))
		                    : ((idx = m.indexOf('.')) > -1 ? idx - 1 : m.length - 1);
		
		        // Multiplying by 10^maxPrecision means we need to take that away from e
		        if (isInt)
		            e -= maxPrecision;
		
		        // Get the numbers without the decimal point
		        m = m.slice(0, m.indexOf('e') > -1 ? idx : m.length).replace('.', '');
		    }
		
		    // 4. If e ≥ p, then
		    if (e >= p)
		        // a. Return the concatenation of m and e-p+1 occurrences of the character "0".
		        return m + arrJoin.call(Array(e-p+1 + 1), '0');
		
		    // 5. If e = p-1, then
		    else if (e === p - 1)
		        // a. Return m.
		        return m;
		
		    // 6. If e ≥ 0, then
		    else if (e >= 0)
		        // a. Let m be the concatenation of the first e+1 characters of m, the character
		        //    ".", and the remaining p–(e+1) characters of m.
		        m = m.slice(0, e + 1) + '.' + m.slice(e + 1);
		
		    // 7. If e < 0, then
		    else if (e < 0)
		        // a. Let m be the concatenation of the String "0.", –(e+1) occurrences of the
		        //    character "0", and the string m.
		        m = '0.' + arrJoin.call(Array (-(e+1) + 1), '0') + m;
		
		    // 8. If m contains the character ".", and maxPrecision > minPrecision, then
		    if (m.indexOf(".") >= 0 && maxPrecision > minPrecision) {
		        var
		        // a. Let cut be maxPrecision – minPrecision.
		            cut = maxPrecision - minPrecision;
		
		        // b. Repeat while cut > 0 and the last character of m is "0":
		        while (cut > 0 && m.charAt(m.length-1) === '0') {
		            //  i. Remove the last character from m.
		            m = m.slice(0, -1);
		
		            //  ii. Decrease cut by 1.
		            cut--;
		        }
		
		        // c. If the last character of m is ".", then
		        if (m.charAt(m.length-1) === '.')
		            //    i. Remove the last character from m.
		            m = m.slice(0, -1);
		    }
		    // 9. Return m.
		    return m;
		}
		
		/**
		 * When the ToRawFixed abstract operation is called with arguments x (which must
		 * be a finite non-negative number), minInteger (which must be an integer between
		 * 1 and 21), minFraction, and maxFraction (which must be integers between 0 and
		 * 20) the following steps are taken:
		 */
		function ToRawFixed (x, minInteger, minFraction, maxFraction) {
		    // (or not because Number.toPrototype.toFixed does a lot of it for us)
		    var idx,
		
		        // We can pick up after the fixed formatted string (m) is created
		        m   = Number.prototype.toFixed.call(x, maxFraction),
		
		        // 4. If [maxFraction] ≠ 0, then
		        //    ...
		        //    e. Let int be the number of characters in a.
		        //
		        // 5. Else let int be the number of characters in m.
		        igr = m.split(".")[0].length,  // int is a reserved word
		
		        // 6. Let cut be maxFraction – minFraction.
		        cut = maxFraction - minFraction,
		
		        exp = (idx = m.indexOf('e')) > -1 ? m.slice(idx + 1) : 0;
		
		    if (exp) {
		        m = m.slice(0, idx).replace('.', '');
		        m += arrJoin.call(Array(exp - (m.length - 1) + 1), '0')
		          + '.' + arrJoin.call(Array(maxFraction + 1), '0');
		
		        igr = m.length;
		    }
		
		    // 7. Repeat while cut > 0 and the last character of m is "0":
		    while (cut > 0 && m.slice(-1) === "0") {
		        // a. Remove the last character from m.
		        m = m.slice(0, -1);
		
		        // b. Decrease cut by 1.
		        cut--;
		    }
		
		    // 8. If the last character of m is ".", then
		    if (m.slice(-1) === ".")
		        // a. Remove the last character from m.
		        m = m.slice(0, -1);
		
		    // 9. If int < minInteger, then
		    if (igr < minInteger)
		        // a. Let z be the String consisting of minInteger–int occurrences of the
		        //    character "0".
		        var z = arrJoin.call(Array(minInteger - igr + 1), '0');
		
		    // 10. Let m be the concatenation of Strings z and m.
		    // 11. Return m.
		    return (z ? z : '') + m;
		}
		
		// Sect 11.3.2 Table 2, Numbering systems
		// ======================================
		var numSys = {
		    arab:    [ '\u0660', '\u0661', '\u0662', '\u0663', '\u0664', '\u0665', '\u0666', '\u0667', '\u0668', '\u0669' ],
		    arabext: [ '\u06F0', '\u06F1', '\u06F2', '\u06F3', '\u06F4', '\u06F5', '\u06F6', '\u06F7', '\u06F8', '\u06F9' ],
		    bali:    [ '\u1B50', '\u1B51', '\u1B52', '\u1B53', '\u1B54', '\u1B55', '\u1B56', '\u1B57', '\u1B58', '\u1B59' ],
		    beng:    [ '\u09E6', '\u09E7', '\u09E8', '\u09E9', '\u09EA', '\u09EB', '\u09EC', '\u09ED', '\u09EE', '\u09EF' ],
		    deva:    [ '\u0966', '\u0967', '\u0968', '\u0969', '\u096A', '\u096B', '\u096C', '\u096D', '\u096E', '\u096F' ],
		    fullwide:[ '\uFF10', '\uFF11', '\uFF12', '\uFF13', '\uFF14', '\uFF15', '\uFF16', '\uFF17', '\uFF18', '\uFF19' ],
		    gujr:    [ '\u0AE6', '\u0AE7', '\u0AE8', '\u0AE9', '\u0AEA', '\u0AEB', '\u0AEC', '\u0AED', '\u0AEE', '\u0AEF' ],
		    guru:    [ '\u0A66', '\u0A67', '\u0A68', '\u0A69', '\u0A6A', '\u0A6B', '\u0A6C', '\u0A6D', '\u0A6E', '\u0A6F' ],
		    hanidec: [ '\u3007', '\u4E00', '\u4E8C', '\u4E09', '\u56DB', '\u4E94', '\u516D', '\u4E03', '\u516B', '\u4E5D' ],
		    khmr:    [ '\u17E0', '\u17E1', '\u17E2', '\u17E3', '\u17E4', '\u17E5', '\u17E6', '\u17E7', '\u17E8', '\u17E9' ],
		    knda:    [ '\u0CE6', '\u0CE7', '\u0CE8', '\u0CE9', '\u0CEA', '\u0CEB', '\u0CEC', '\u0CED', '\u0CEE', '\u0CEF' ],
		    laoo:    [ '\u0ED0', '\u0ED1', '\u0ED2', '\u0ED3', '\u0ED4', '\u0ED5', '\u0ED6', '\u0ED7', '\u0ED8', '\u0ED9' ],
		    latn:    [ '\u0030', '\u0031', '\u0032', '\u0033', '\u0034', '\u0035', '\u0036', '\u0037', '\u0038', '\u0039' ],
		    limb:    [ '\u1946', '\u1947', '\u1948', '\u1949', '\u194A', '\u194B', '\u194C', '\u194D', '\u194E', '\u194F' ],
		    mlym:    [ '\u0D66', '\u0D67', '\u0D68', '\u0D69', '\u0D6A', '\u0D6B', '\u0D6C', '\u0D6D', '\u0D6E', '\u0D6F' ],
		    mong:    [ '\u1810', '\u1811', '\u1812', '\u1813', '\u1814', '\u1815', '\u1816', '\u1817', '\u1818', '\u1819' ],
		    mymr:    [ '\u1040', '\u1041', '\u1042', '\u1043', '\u1044', '\u1045', '\u1046', '\u1047', '\u1048', '\u1049' ],
		    orya:    [ '\u0B66', '\u0B67', '\u0B68', '\u0B69', '\u0B6A', '\u0B6B', '\u0B6C', '\u0B6D', '\u0B6E', '\u0B6F' ],
		    tamldec: [ '\u0BE6', '\u0BE7', '\u0BE8', '\u0BE9', '\u0BEA', '\u0BEB', '\u0BEC', '\u0BED', '\u0BEE', '\u0BEF' ],
		    telu:    [ '\u0C66', '\u0C67', '\u0C68', '\u0C69', '\u0C6A', '\u0C6B', '\u0C6C', '\u0C6D', '\u0C6E', '\u0C6F' ],
		    thai:    [ '\u0E50', '\u0E51', '\u0E52', '\u0E53', '\u0E54', '\u0E55', '\u0E56', '\u0E57', '\u0E58', '\u0E59' ],
		    tibt:    [ '\u0F20', '\u0F21', '\u0F22', '\u0F23', '\u0F24', '\u0F25', '\u0F26', '\u0F27', '\u0F28', '\u0F29' ]
		};
		
		/**
		 * This function provides access to the locale and formatting options computed
		 * during initialization of the object.
		 *
		 * The function returns a new object whose properties and attributes are set as
		 * if constructed by an object literal assigning to each of the following
		 * properties the value of the corresponding internal property of this
		 * NumberFormat object (see 11.4): locale, numberingSystem, style, currency,
		 * currencyDisplay, minimumIntegerDigits, minimumFractionDigits,
		 * maximumFractionDigits, minimumSignificantDigits, maximumSignificantDigits, and
		 * useGrouping. Properties whose corresponding internal properties are not present
		 * are not assigned.
		 */
		/* 11.3.3 */defineProperty(Intl.NumberFormat.prototype, 'resolvedOptions', {
		    configurable: true,
		    writable: true,
		    value: function () {
		        var prop,
		            descs = new Record(),
		            props = [
		                'locale', 'numberingSystem', 'style', 'currency', 'currencyDisplay',
		                'minimumIntegerDigits', 'minimumFractionDigits', 'maximumFractionDigits',
		                'minimumSignificantDigits', 'maximumSignificantDigits', 'useGrouping'
		            ],
		            internal = this != null && typeof this === 'object' && getInternalProperties(this);
		
		        // Satisfy test 11.3_b
		        if (!internal || !internal['[[initializedNumberFormat]]'])
		            throw new TypeError('`this` value for resolvedOptions() is not an initialized Intl.NumberFormat object.');
		
		        for (var i = 0, max = props.length; i < max; i++) {
		            if (hop.call(internal, prop = '[['+ props[i] +']]'))
		                descs[props[i]] = { value: internal[prop], writable: true, configurable: true, enumerable: true };
		        }
		
		        return objCreate({}, descs);
		    }
		});
		
		// 12.1 The Intl.DateTimeFormat constructor
		// ==================================
		
		// Define the DateTimeFormat constructor internally so it cannot be tainted
		function DateTimeFormatConstructor () {
		    var locales = arguments[0];
		    var options = arguments[1];
		
		    if (!this || this === Intl) {
		        return new Intl.DateTimeFormat(locales, options);
		    }
		    return InitializeDateTimeFormat(toObject(this), locales, options);
		}
		
		defineProperty(Intl, 'DateTimeFormat', {
		    configurable: true,
		    writable: true,
		    value: DateTimeFormatConstructor
		});
		
		// Must explicitly set prototypes as unwritable
		defineProperty(DateTimeFormatConstructor, 'prototype', {
		    writable: false
		});
		
		/**
		 * The abstract operation InitializeDateTimeFormat accepts the arguments dateTimeFormat
		 * (which must be an object), locales, and options. It initializes dateTimeFormat as a
		 * DateTimeFormat object.
		 */
		function/* 12.1.1.1 */InitializeDateTimeFormat (dateTimeFormat, locales, options) {
		    var
		    // This will be a internal properties object if we're not already initialized
		        internal = getInternalProperties(dateTimeFormat),
		
		    // Create an object whose props can be used to restore the values of RegExp props
		        regexpState = createRegExpRestore();
		
		    // 1. If dateTimeFormat has an [[initializedIntlObject]] internal property with
		    //    value true, throw a TypeError exception.
		    if (internal['[[initializedIntlObject]]'] === true)
		        throw new TypeError('`this` object has already been initialized as an Intl object');
		
		    // Need this to access the `internal` object
		    defineProperty(dateTimeFormat, '__getInternalProperties', {
		        value: function () {
		            // NOTE: Non-standard, for internal use only
		            if (arguments[0] === secret)
		                return internal;
		        }
		    });
		
		    // 2. Set the [[initializedIntlObject]] internal property of numberFormat to true.
		    internal['[[initializedIntlObject]]'] = true;
		
		    var
		    // 3. Let requestedLocales be the result of calling the CanonicalizeLocaleList
		    //    abstract operation (defined in 9.2.1) with argument locales.
		        requestedLocales = CanonicalizeLocaleList(locales),
		
		    // 4. Let options be the result of calling the ToDateTimeOptions abstract
		    //    operation (defined below) with arguments options, "any", and "date".
		        options = ToDateTimeOptions(options, 'any', 'date'),
		
		    // 5. Let opt be a new Record.
		        opt = new Record(),
		
		    // 6. Let matcher be the result of calling the GetOption abstract operation
		    //    (defined in 9.2.9) with arguments options, "localeMatcher", "string", a List
		    //    containing the two String values "lookup" and "best fit", and "best fit".
		        matcher = GetOption(options, 'localeMatcher', 'string', new List('lookup', 'best fit'), 'best fit');
		
		    // 7. Set opt.[[localeMatcher]] to matcher.
		    opt['[[localeMatcher]]'] = matcher;
		
		    var
		    // 8. Let DateTimeFormat be the standard built-in object that is the initial
		    //    value of Intl.DateTimeFormat.
		        DateTimeFormat = internals.DateTimeFormat, // This is what we *really* need
		
		    // 9. Let localeData be the value of the [[localeData]] internal property of
		    //    DateTimeFormat.
		        localeData = DateTimeFormat['[[localeData]]'],
		
		    // 10. Let r be the result of calling the ResolveLocale abstract operation
		    //     (defined in 9.2.5) with the [[availableLocales]] internal property of
		    //      DateTimeFormat, requestedLocales, opt, the [[relevantExtensionKeys]]
		    //      internal property of DateTimeFormat, and localeData.
		        r = ResolveLocale(DateTimeFormat['[[availableLocales]]'], requestedLocales,
		                opt, DateTimeFormat['[[relevantExtensionKeys]]'], localeData);
		
		    // 11. Set the [[locale]] internal property of dateTimeFormat to the value of
		    //     r.[[locale]].
		    internal['[[locale]]'] = r['[[locale]]'];
		
		    // 12. Set the [[calendar]] internal property of dateTimeFormat to the value of
		    //     r.[[ca]].
		    internal['[[calendar]]'] = r['[[ca]]'];
		
		    // 13. Set the [[numberingSystem]] internal property of dateTimeFormat to the value of
		    //     r.[[nu]].
		    internal['[[numberingSystem]]'] = r['[[nu]]'];
		
		    // The specification doesn't tell us to do this, but it's helpful later on
		    internal['[[dataLocale]]'] = r['[[dataLocale]]'];
		
		    var
		    // 14. Let dataLocale be the value of r.[[dataLocale]].
		        dataLocale = r['[[dataLocale]]'],
		
		    // 15. Let tz be the result of calling the [[Get]] internal method of options with
		    //     argument "timeZone".
		        tz = options.timeZone;
		
		    // 16. If tz is not undefined, then
		    if (tz !== undefined) {
		        // a. Let tz be ToString(tz).
		        // b. Convert tz to upper case as described in 6.1.
		        //    NOTE: If an implementation accepts additional time zone values, as permitted
		        //          under certain conditions by the Conformance clause, different casing
		        //          rules apply.
		        tz = toLatinUpperCase(tz);
		
		        // c. If tz is not "UTC", then throw a RangeError exception.
		        // ###TODO: accept more time zones###
		        if (tz !== 'UTC')
		            throw new RangeError('timeZone is not supported.');
		    }
		
		    // 17. Set the [[timeZone]] internal property of dateTimeFormat to tz.
		    internal['[[timeZone]]'] = tz;
		
		    // 18. Let opt be a new Record.
		    opt = new Record();
		
		    // 19. For each row of Table 3, except the header row, do:
		    for (var prop in dateTimeComponents) {
		        if (!hop.call(dateTimeComponents, prop))
		            continue;
		
		        var
		        // 20. Let prop be the name given in the Property column of the row.
		        // 21. Let value be the result of calling the GetOption abstract operation,
		        //     passing as argument options, the name given in the Property column of the
		        //     row, "string", a List containing the strings given in the Values column of
		        //     the row, and undefined.
		            value = GetOption(options, prop, 'string', dateTimeComponents[prop]);
		
		        // 22. Set opt.[[<prop>]] to value.
		        opt['[['+prop+']]'] = value;
		    }
		
		    var
		        // Assigned a value below
		        bestFormat,
		
		        // 23. Let dataLocaleData be the result of calling the [[Get]] internal method of
		        //     localeData with argument dataLocale.
		        dataLocaleData = localeData[dataLocale],
		
		        // 24. Let formats be the result of calling the [[Get]] internal method of
		        //     dataLocaleData with argument "formats".
		        formats = dataLocaleData.formats,
		        // 25. Let matcher be the result of calling the GetOption abstract operation with
		        //     arguments options, "formatMatcher", "string", a List containing the two String
		        //     values "basic" and "best fit", and "best fit".
		        matcher = GetOption(options, 'formatMatcher', 'string', new List('basic', 'best fit'), 'best fit');
		
		    // 26. If matcher is "basic", then
		    if (matcher === 'basic')
		        // 27. Let bestFormat be the result of calling the BasicFormatMatcher abstract
		        //     operation (defined below) with opt and formats.
		        bestFormat = BasicFormatMatcher(opt, formats);
		
		    // 28. Else
		    else
		        // 29. Let bestFormat be the result of calling the BestFitFormatMatcher
		        //     abstract operation (defined below) with opt and formats.
		        bestFormat = BestFitFormatMatcher(opt, formats);
		
		    // 30. For each row in Table 3, except the header row, do
		    for (var prop in dateTimeComponents) {
		        if (!hop.call(dateTimeComponents, prop))
		            continue;
		
		        // a. Let prop be the name given in the Property column of the row.
		        // b. Let pDesc be the result of calling the [[GetOwnProperty]] internal method of
		        //    bestFormat with argument prop.
		        // c. If pDesc is not undefined, then
		        if (hop.call(bestFormat, prop)) {
		            var
		            // i. Let p be the result of calling the [[Get]] internal method of bestFormat
		            //    with argument prop.
		                p = bestFormat[prop];
		
		            // ii. Set the [[<prop>]] internal property of dateTimeFormat to p.
		            internal['[['+prop+']]'] = p;
		        }
		    }
		
		    var
		        // Assigned a value below
		        pattern,
		
		    // 31. Let hr12 be the result of calling the GetOption abstract operation with
		    //     arguments options, "hour12", "boolean", undefined, and undefined.
		        hr12 = GetOption(options, 'hour12', 'boolean'/*, undefined, undefined*/);
		
		    // 32. If dateTimeFormat has an internal property [[hour]], then
		    if (internal['[[hour]]']) {
		        // a. If hr12 is undefined, then let hr12 be the result of calling the [[Get]]
		        //    internal method of dataLocaleData with argument "hour12".
		        hr12 = hr12 === undefined ? dataLocaleData.hour12 : hr12;
		
		        // b. Set the [[hour12]] internal property of dateTimeFormat to hr12.
		        internal['[[hour12]]'] = hr12;
		
		        // c. If hr12 is true, then
		        if (hr12 === true) {
		            var
		            // i. Let hourNo0 be the result of calling the [[Get]] internal method of
		            //    dataLocaleData with argument "hourNo0".
		                hourNo0 = dataLocaleData.hourNo0;
		
		            // ii. Set the [[hourNo0]] internal property of dateTimeFormat to hourNo0.
		            internal['[[hourNo0]]'] = hourNo0;
		
		            // iii. Let pattern be the result of calling the [[Get]] internal method of
		            //      bestFormat with argument "pattern12".
		            pattern = bestFormat.pattern12;
		        }
		
		        // d. Else
		        else
		            // i. Let pattern be the result of calling the [[Get]] internal method of
		            //    bestFormat with argument "pattern".
		            pattern = bestFormat.pattern;
		    }
		
		    // 33. Else
		    else
		        // a. Let pattern be the result of calling the [[Get]] internal method of
		        //    bestFormat with argument "pattern".
		        pattern = bestFormat.pattern;
		
		    // 34. Set the [[pattern]] internal property of dateTimeFormat to pattern.
		    internal['[[pattern]]'] = pattern;
		
		    // 35. Set the [[boundFormat]] internal property of dateTimeFormat to undefined.
		    internal['[[boundFormat]]'] = undefined;
		
		    // 36. Set the [[initializedDateTimeFormat]] internal property of dateTimeFormat to
		    //     true.
		    internal['[[initializedDateTimeFormat]]'] = true;
		
		    // Restore the RegExp properties
		    regexpState.exp.test(regexpState.input);
		
		    // Return the newly initialised object
		    return dateTimeFormat;
		}
		
		/**
		 * Several DateTimeFormat algorithms use values from the following table, which provides
		 * property names and allowable values for the components of date and time formats:
		 */
		var dateTimeComponents = {
		         weekday: [ "narrow", "short", "long" ],
		             era: [ "narrow", "short", "long" ],
		            year: [ "2-digit", "numeric" ],
		           month: [ "2-digit", "numeric", "narrow", "short", "long" ],
		             day: [ "2-digit", "numeric" ],
		            hour: [ "2-digit", "numeric" ],
		          minute: [ "2-digit", "numeric" ],
		          second: [ "2-digit", "numeric" ],
		    timeZoneName: [ "short", "long" ]
		};
		
		/**
		 * When the ToDateTimeOptions abstract operation is called with arguments options,
		 * required, and defaults, the following steps are taken:
		 */
		function ToDateTimeOptions (options, required, defaults) {
		    // 1. If options is undefined, then let options be null, else let options be
		    //    ToObject(options).
		    options = options === undefined ? null : new Record(toObject(options));
		
		    var
		    // 2. Let create be the standard built-in function object defined in ES5, 15.2.3.5.
		        create = objCreate,
		
		    // 3. Let options be the result of calling the [[Call]] internal method of create with
		    //    undefined as the this value and an argument list containing the single item
		    //    options.
		        options = create(options),
		
		    // 4. Let needDefaults be true.
		        needDefaults = true;
		
		    // 5. If required is "date" or "any", then
		    if (required === 'date' || required === 'any') {
		        // a. For each of the property names "weekday", "year", "month", "day":
		            // i. If the result of calling the [[Get]] internal method of options with the
		            //    property name is not undefined, then let needDefaults be false.
		        if (options.weekday !== undefined || options.year !== undefined
		                || options.month !== undefined || options.day !== undefined)
		            needDefaults = false;
		    }
		
		    // 6. If required is "time" or "any", then
		    if (required === 'time' || required === 'any') {
		        // a. For each of the property names "hour", "minute", "second":
		            // i. If the result of calling the [[Get]] internal method of options with the
		            //    property name is not undefined, then let needDefaults be false.
		        if (options.hour !== undefined || options.minute !== undefined || options.second !== undefined)
		                needDefaults = false;
		    }
		
		    // 7. If needDefaults is true and defaults is either "date" or "all", then
		    if (needDefaults && (defaults === 'date' || defaults === 'all'))
		        // a. For each of the property names "year", "month", "day":
		            // i. Call the [[DefineOwnProperty]] internal method of options with the
		            //    property name, Property Descriptor {[[Value]]: "numeric", [[Writable]]:
		            //    true, [[Enumerable]]: true, [[Configurable]]: true}, and false.
		        options.year = options.month = options.day = 'numeric';
		
		    // 8. If needDefaults is true and defaults is either "time" or "all", then
		    if (needDefaults && (defaults === 'time' || defaults === 'all'))
		        // a. For each of the property names "hour", "minute", "second":
		            // i. Call the [[DefineOwnProperty]] internal method of options with the
		            //    property name, Property Descriptor {[[Value]]: "numeric", [[Writable]]:
		            //    true, [[Enumerable]]: true, [[Configurable]]: true}, and false.
		        options.hour = options.minute = options.second = 'numeric';
		
		    // 9. Return options.
		    return options;
		}
		
		/**
		 * When the BasicFormatMatcher abstract operation is called with two arguments options and
		 * formats, the following steps are taken:
		 */
		function BasicFormatMatcher (options, formats) {
		    var
		    // 1. Let removalPenalty be 120.
		        removalPenalty = 120,
		
		    // 2. Let additionPenalty be 20.
		        additionPenalty = 20,
		
		    // 3. Let longLessPenalty be 8.
		        longLessPenalty = 8,
		
		    // 4. Let longMorePenalty be 6.
		        longMorePenalty = 6,
		
		    // 5. Let shortLessPenalty be 6.
		        shortLessPenalty = 6,
		
		    // 6. Let shortMorePenalty be 3.
		        shortMorePenalty = 3,
		
		    // 7. Let bestScore be -Infinity.
		        bestScore = -Infinity,
		
		    // 8. Let bestFormat be undefined.
		        bestFormat,
		
		    // 9. Let i be 0.
		        i = 0,
		
		    // 10. Let len be the result of calling the [[Get]] internal method of formats with argument "length".
		        len = formats.length;
		
		    // 11. Repeat while i < len:
		    while (i < len) {
		        var
		        // a. Let format be the result of calling the [[Get]] internal method of formats with argument ToString(i).
		            format = formats[i],
		
		        // b. Let score be 0.
		            score = 0;
		
		        // c. For each property shown in Table 3:
		        for (var property in dateTimeComponents) {
		            if (!hop.call(dateTimeComponents, property))
		                continue;
		
		            var
		            // i. Let optionsProp be options.[[<property>]].
		                optionsProp = options['[['+ property +']]'],
		
		            // ii. Let formatPropDesc be the result of calling the [[GetOwnProperty]] internal method of format
		            //     with argument property.
		            // iii. If formatPropDesc is not undefined, then
		                // 1. Let formatProp be the result of calling the [[Get]] internal method of format with argument property.
		                formatProp = hop.call(format, property) ? format[property] : undefined;
		
		            // iv. If optionsProp is undefined and formatProp is not undefined, then decrease score by
		            //     additionPenalty.
		            if (optionsProp === undefined && formatProp !== undefined)
		                score -= additionPenalty;
		
		            // v. Else if optionsProp is not undefined and formatProp is undefined, then decrease score by
		            //    removalPenalty.
		            else if (optionsProp !== undefined && formatProp === undefined)
		                score -= removalPenalty;
		
		            // vi. Else
		            else {
		                var
		                // 1. Let values be the array ["2-digit", "numeric", "narrow", "short",
		                //    "long"].
		                    values = [ '2-digit', 'numeric', 'narrow', 'short', 'long' ],
		
		                // 2. Let optionsPropIndex be the index of optionsProp within values.
		                    optionsPropIndex = arrIndexOf.call(values, optionsProp),
		
		                // 3. Let formatPropIndex be the index of formatProp within values.
		                    formatPropIndex = arrIndexOf.call(values, formatProp),
		
		                // 4. Let delta be max(min(formatPropIndex - optionsPropIndex, 2), -2).
		                    delta = Math.max(Math.min(formatPropIndex - optionsPropIndex, 2), -2);
		
		                // 5. If delta = 2, decrease score by longMorePenalty.
		                if (delta === 2)
		                    score -= longMorePenalty;
		
		                // 6. Else if delta = 1, decrease score by shortMorePenalty.
		                else if (delta === 1)
		                    score -= shortMorePenalty;
		
		                // 7. Else if delta = -1, decrease score by shortLessPenalty.
		                else if (delta === -1)
		                    score -= shortLessPenalty;
		
		                // 8. Else if delta = -2, decrease score by longLessPenalty.
		                else if (delta === -2)
		                    score -= longLessPenalty;
		            }
		        }
		
		        // d. If score > bestScore, then
		        if (score > bestScore) {
		            // i. Let bestScore be score.
		            bestScore = score;
		
		            // ii. Let bestFormat be format.
		            bestFormat = format;
		        }
		
		        // e. Increase i by 1.
		        i++;
		    }
		
		    // 12. Return bestFormat.
		    return bestFormat;
		}
		
		/**
		 * When the BestFitFormatMatcher abstract operation is called with two arguments options
		 * and formats, it performs implementation dependent steps, which should return a set of
		 * component representations that a typical user of the selected locale would perceive as
		 * at least as good as the one returned by BasicFormatMatcher.
		 */
		function BestFitFormatMatcher (options, formats) {
		    // This is good enough for now
		    return BasicFormatMatcher(options, formats);
		}
		
		/* 12.2.3 */internals.DateTimeFormat = {
		    '[[availableLocales]]': [],
		    '[[relevantExtensionKeys]]': ['ca', 'nu'],
		    '[[localeData]]': {}
		};
		
		/**
		 * When the supportedLocalesOf method of Intl.DateTimeFormat is called, the
		 * following steps are taken:
		 */
		/* 12.2.2 */defineProperty(Intl.DateTimeFormat, 'supportedLocalesOf', {
		    configurable: true,
		    writable: true,
		    value: fnBind.call(supportedLocalesOf, internals.DateTimeFormat)
		});
		
		/**
		 * This named accessor property returns a function that formats a number
		 * according to the effective locale and the formatting options of this
		 * DateTimeFormat object.
		 */
		/* 12.3.2 */defineProperty(Intl.DateTimeFormat.prototype, 'format', {
		    configurable: true,
		    get: function () {
		        var internal = this != null && typeof this === 'object' && getInternalProperties(this);
		
		        // Satisfy test 12.3_b
		        if (!internal || !internal['[[initializedDateTimeFormat]]'])
		            throw new TypeError('`this` value for format() is not an initialized Intl.DateTimeFormat object.');
		
		        // The value of the [[Get]] attribute is a function that takes the following
		        // steps:
		
		        // 1. If the [[boundFormat]] internal property of this DateTimeFormat object
		        //    is undefined, then:
		        if (internal['[[boundFormat]]'] === undefined) {
		            var
		            // a. Let F be a Function object, with internal properties set as
		            //    specified for built-in functions in ES5, 15, or successor, and the
		            //    length property set to 0, that takes the argument date and
		            //    performs the following steps:
		                F = function () {
		                    //   i. If date is not provided or is undefined, then let x be the
		                    //      result as if by the expression Date.now() where Date.now is
		                    //      the standard built-in function defined in ES5, 15.9.4.4.
		                    //  ii. Else let x be ToNumber(date).
		                    // iii. Return the result of calling the FormatDateTime abstract
		                    //      operation (defined below) with arguments this and x.
		                    var x = Number(arguments.length === 0 ? Date.now() : arguments[0]);
		                    return FormatDateTime(this, x);
		                },
		            // b. Let bind be the standard built-in function object defined in ES5,
		            //    15.3.4.5.
		            // c. Let bf be the result of calling the [[Call]] internal method of
		            //    bind with F as the this value and an argument list containing
		            //    the single item this.
		                bf = fnBind.call(F, this);
		            // d. Set the [[boundFormat]] internal property of this NumberFormat
		            //    object to bf.
		            internal['[[boundFormat]]'] = bf;
		        }
		        // Return the value of the [[boundFormat]] internal property of this
		        // NumberFormat object.
		        return internal['[[boundFormat]]'];
		    }
		});
		
		/**
		 * When the FormatDateTime abstract operation is called with arguments dateTimeFormat
		 * (which must be an object initialized as a DateTimeFormat) and x (which must be a Number
		 * value), it returns a String value representing x (interpreted as a time value as
		 * specified in ES5, 15.9.1.1) according to the effective locale and the formatting
		 * options of dateTimeFormat.
		 */
		function FormatDateTime(dateTimeFormat, x) {
		    // 1. If x is not a finite Number, then throw a RangeError exception.
		    if (!isFinite(x))
		        throw new RangeError('Invalid valid date passed to format');
		
		    var
		        internal = dateTimeFormat.__getInternalProperties(secret),
		
		    // Creating restore point for properties on the RegExp object... please wait
		        regexpState = createRegExpRestore(),
		
		    // 2. Let locale be the value of the [[locale]] internal property of dateTimeFormat.
		        locale = internal['[[locale]]'],
		
		    // 3. Let nf be the result of creating a new NumberFormat object as if by the
		    // expression new Intl.NumberFormat([locale], {useGrouping: false}) where
		    // Intl.NumberFormat is the standard built-in constructor defined in 11.1.3.
		        nf = new Intl.NumberFormat([locale], {useGrouping: false}),
		
		    // 4. Let nf2 be the result of creating a new NumberFormat object as if by the
		    // expression new Intl.NumberFormat([locale], {minimumIntegerDigits: 2, useGrouping:
		    // false}) where Intl.NumberFormat is the standard built-in constructor defined in
		    // 11.1.3.
		        nf2 = new Intl.NumberFormat([locale], {minimumIntegerDigits: 2, useGrouping: false}),
		
		    // 5. Let tm be the result of calling the ToLocalTime abstract operation (defined
		    // below) with x, the value of the [[calendar]] internal property of dateTimeFormat,
		    // and the value of the [[timeZone]] internal property of dateTimeFormat.
		        tm = ToLocalTime(x, internal['[[calendar]]'], internal['[[timeZone]]']),
		
		    // 6. Let result be the value of the [[pattern]] internal property of dateTimeFormat.
		        result = internal['[[pattern]]'],
		
		    // Need the locale minus any extensions
		        dataLocale = internal['[[dataLocale]]'],
		
		    // Need the calendar data from CLDR
		        localeData = internals.DateTimeFormat['[[localeData]]'][dataLocale].calendars,
		        ca = internal['[[calendar]]'];
		
		    // 7. For each row of Table 3, except the header row, do:
		    for (var p in dateTimeComponents) {
		        // a. If dateTimeFormat has an internal property with the name given in the
		        //    Property column of the row, then:
		        if (hop.call(internal, '[['+ p +']]')) {
		            var
		            // Assigned values below
		                pm, fv,
		
		            //   i. Let p be the name given in the Property column of the row.
		            //  ii. Let f be the value of the [[<p>]] internal property of dateTimeFormat.
		                f = internal['[['+ p +']]'],
		
		            // iii. Let v be the value of tm.[[<p>]].
		                v = tm['[['+ p +']]'];
		
		            //  iv. If p is "year" and v ≤ 0, then let v be 1 - v.
		            if (p === 'year' && v <= 0)
		                v = 1 - v;
		
		            //   v. If p is "month", then increase v by 1.
		            else if (p === 'month')
		                v++;
		
		            //  vi. If p is "hour" and the value of the [[hour12]] internal property of
		            //      dateTimeFormat is true, then
		            else if (p === 'hour' && internal['[[hour12]]'] === true) {
		                // 1. Let v be v modulo 12.
		                v = v % 12;
		
		                // 2. If v is equal to the value of tm.[[<p>]], then let pm be false; else
		                //    let pm be true.
		                pm = v !== tm['[['+ p +']]'];
		
		                // 3. If v is 0 and the value of the [[hourNo0]] internal property of
		                //    dateTimeFormat is true, then let v be 12.
		                if (v === 0 && internal['[[hourNo0]]'] === true)
		                    v = 12;
		            }
		
		            // vii. If f is "numeric", then
		            if (f === 'numeric')
		                // 1. Let fv be the result of calling the FormatNumber abstract operation
		                //    (defined in 11.3.2) with arguments nf and v.
		                fv = FormatNumber(nf, v);
		
		            // viii. Else if f is "2-digit", then
		            else if (f === '2-digit') {
		                // 1. Let fv be the result of calling the FormatNumber abstract operation
		                //    with arguments nf2 and v.
		                fv = FormatNumber(nf2, v);
		
		                // 2. If the length of fv is greater than 2, let fv be the substring of fv
		                //    containing the last two characters.
		                if (fv.length > 2)
		                    fv = fv.slice(-2);
		            }
		
		            // ix. Else if f is "narrow", "short", or "long", then let fv be a String
		            //     value representing f in the desired form; the String value depends upon
		            //     the implementation and the effective locale and calendar of
		            //     dateTimeFormat. If p is "month", then the String value may also depend
		            //     on whether dateTimeFormat has a [[day]] internal property. If p is
		            //     "timeZoneName", then the String value may also depend on the value of
		            //     the [[inDST]] field of tm.
		            else if (f in dateWidths) {
		                switch (p) {
		                    case 'month':
		                        fv = resolveDateString(localeData, ca, 'months', f, tm['[['+ p +']]']);
		                        break;
		
		                    case 'weekday':
		                        try {
		                            fv = resolveDateString(localeData, ca, 'days', f, tm['[['+ p +']]']);
		                            // fv = resolveDateString(ca.days, f)[tm['[['+ p +']]']];
		                        } catch (e) {
		                            throw new Error('Could not find weekday data for locale '+locale);
		                        }
		                        break;
		
		                    case 'timeZoneName':
		                        fv = ''; // TODO
		                        break;
		
		                    // TODO: Era
		                    default:
		                        fv = tm['[['+ p +']]'];
		                }
		            }
		
		            // x. Replace the substring of result that consists of "{", p, and "}", with
		            //    fv.
		            result = result.replace('{'+ p +'}', fv);
		        }
		    }
		    // 8. If dateTimeFormat has an internal property [[hour12]] whose value is true, then
		    if (internal['[[hour12]]'] === true) {
		        // a. If pm is true, then let fv be an implementation and locale dependent String
		        //    value representing “post meridiem”; else let fv be an implementation and
		        //    locale dependent String value representing “ante meridiem”.
		        fv = resolveDateString(localeData, ca, 'dayPeriods', pm ? 'pm' : 'am');
		
		        // b. Replace the substring of result that consists of "{ampm}", with fv.
		        result = result.replace('{ampm}', fv);
		    }
		
		    // Restore properties of the RegExp object
		    regexpState.exp.test(regexpState.input);
		
		    // 9. Return result.
		    return result;
		}
		
		/**
		 * When the ToLocalTime abstract operation is called with arguments date, calendar, and
		 * timeZone, the following steps are taken:
		 */
		function ToLocalTime(date, calendar, timeZone) {
		    // 1. Apply calendrical calculations on date for the given calendar and time zone to
		    //    produce weekday, era, year, month, day, hour, minute, second, and inDST values.
		    //    The calculations should use best available information about the specified
		    //    calendar and time zone. If the calendar is "gregory", then the calculations must
		    //    match the algorithms specified in ES5, 15.9.1, except that calculations are not
		    //    bound by the restrictions on the use of best available information on time zones
		    //    for local time zone adjustment and daylight saving time adjustment imposed by
		    //    ES5, 15.9.1.7 and 15.9.1.8.
		    // ###TODO###
		    var d = new Date(date);
		
		    // 2. Return a Record with fields [[weekday]], [[era]], [[year]], [[month]], [[day]],
		    //    [[hour]], [[minute]], [[second]], and [[inDST]], each with the corresponding
		    //    calculated value.
		    return new Record({
		        '[[weekday]]': d.getDay(),
		        '[[era]]'    : +(d.getFullYear >= 0),
		        '[[year]]'   : d.getFullYear(),
		        '[[month]]'  : d.getMonth(),
		        '[[day]]'    : d.getDate(),
		        '[[hour]]'   : d.getHours(),
		        '[[minute]]' : d.getMinutes(),
		        '[[second]]' : d.getSeconds(),
		        '[[inDST]]'  : false // ###TODO###
		    });
		}
		
		/**
		 * The function returns a new object whose properties and attributes are set as if
		 * constructed by an object literal assigning to each of the following properties the
		 * value of the corresponding internal property of this DateTimeFormat object (see 12.4):
		 * locale, calendar, numberingSystem, timeZone, hour12, weekday, era, year, month, day,
		 * hour, minute, second, and timeZoneName. Properties whose corresponding internal
		 * properties are not present are not assigned.
		 */
		/* 12.3.3 */defineProperty(Intl.DateTimeFormat.prototype, 'resolvedOptions', {
		    writable: true,
		    configurable: true,
		    value: function () {
		        var prop,
		            descs = new Record(),
		            props = [
		                'locale', 'calendar', 'numberingSystem', 'timeZone', 'hour12', 'weekday',
		                'era', 'year', 'month', 'day', 'hour', 'minute', 'second', 'timeZoneName',
		
		                // Not part of the spec, but in here for debugging purposes
		                'pattern'
		            ],
		            internal = this != null && typeof this === 'object' && getInternalProperties(this);
		
		        // Satisfy test 12.3_b
		        if (!internal || !internal['[[initializedDateTimeFormat]]'])
		            throw new TypeError('`this` value for resolvedOptions() is not an initialized Intl.DateTimeFormat object.');
		
		        for (var i = 0, max = props.length; i < max; i++) {
		            if (hop.call(internal, prop = '[[' + props[i] + ']]'))
		                descs[props[i]] = { value: internal[prop], writable: true, configurable: true, enumerable: true };
		        }
		
		        return objCreate({}, descs);
		    }
		});
		
		// Sect 13 Locale Sensitive Functions of the ECMAScript Language Specification
		// ===========================================================================
		
		/**
		 * When the toLocaleString method is called with optional arguments locales and options,
		 * the following steps are taken:
		 */
		/* 13.2.1 */defineProperty(Number.prototype, 'toLocaleString', {
		    writable: true,
		    configurable: true,
		    value: function () {
		        // Satisfy test 13.2.1_1
		        if (Object.prototype.toString.call(this) !== '[object Number]')
		            throw new TypeError('`this` value must be a number for Number.prototype.toLocaleString()');
		
		        // 1. Let x be this Number value (as defined in ES5, 15.7.4).
		        // 2. If locales is not provided, then let locales be undefined.
		        // 3. If options is not provided, then let options be undefined.
		        // 4. Let numberFormat be the result of creating a new object as if by the
		        //    expression new Intl.NumberFormat(locales, options) where
		        //    Intl.NumberFormat is the standard built-in constructor defined in 11.1.3.
		        // 5. Return the result of calling the FormatNumber abstract operation
		        //    (defined in 11.3.2) with arguments numberFormat and x.
		        return FormatNumber(new NumberFormatConstructor(arguments[0], arguments[1]), this);
		    }
		});
		
		/**
		 * When the toLocaleString method is called with optional arguments locales and options,
		 * the following steps are taken:
		 */
		/* 13.3.1 */defineProperty(Date.prototype, 'toLocaleString', {
		    writable: true,
		    configurable: true,
		    value: function () {
		        // Satisfy test 13.3.0_1
		        if (Object.prototype.toString.call(this) !== '[object Date]')
		            throw new TypeError('`this` value must be a Date instance for Date.prototype.toLocaleString()');
		
		        var
		        // 1. Let x be this time value (as defined in ES5, 15.9.5).
		            x = +this;
		
		        // 2. If x is NaN, then return "Invalid Date".
		        if (isNaN(x))
		            return 'Invalid Date';
		
		        var
		        // 3. If locales is not provided, then let locales be undefined.
		            locales = arguments[0],
		
		        // 4. If options is not provided, then let options be undefined.
		            options = arguments[1],
		
		        // 5. Let options be the result of calling the ToDateTimeOptions abstract
		        //    operation (defined in 12.1.1) with arguments options, "any", and "all".
		            options = ToDateTimeOptions(options, 'any', 'all'),
		
		        // 6. Let dateTimeFormat be the result of creating a new object as if by the
		        //    expression new Intl.DateTimeFormat(locales, options) where
		        //    Intl.DateTimeFormat is the standard built-in constructor defined in 12.1.3.
		            dateTimeFormat = new DateTimeFormatConstructor(locales, options);
		
		        // 7. Return the result of calling the FormatDateTime abstract operation (defined
		        //    in 12.3.2) with arguments dateTimeFormat and x.
		        return FormatDateTime(dateTimeFormat, x);
		    }
		});
		
		/**
		 * When the toLocaleDateString method is called with optional arguments locales and
		 * options, the following steps are taken:
		 */
		/* 13.3.2 */defineProperty(Date.prototype, 'toLocaleDateString', {
		    writable: true,
		    configurable: true,
		    value: function () {
		        // Satisfy test 13.3.0_1
		        if (Object.prototype.toString.call(this) !== '[object Date]')
		            throw new TypeError('`this` value must be a Date instance for Date.prototype.toLocaleDateString()');
		
		        var
		        // 1. Let x be this time value (as defined in ES5, 15.9.5).
		            x = +this;
		
		        // 2. If x is NaN, then return "Invalid Date".
		        if (isNaN(x))
		            return 'Invalid Date';
		
		        var
		        // 3. If locales is not provided, then let locales be undefined.
		            locales = arguments[0],
		
		        // 4. If options is not provided, then let options be undefined.
		            options = arguments[1],
		
		        // 5. Let options be the result of calling the ToDateTimeOptions abstract
		        //    operation (defined in 12.1.1) with arguments options, "date", and "date".
		            options = ToDateTimeOptions(options, 'date', 'date'),
		
		        // 6. Let dateTimeFormat be the result of creating a new object as if by the
		        //    expression new Intl.DateTimeFormat(locales, options) where
		        //    Intl.DateTimeFormat is the standard built-in constructor defined in 12.1.3.
		            dateTimeFormat = new DateTimeFormatConstructor(locales, options);
		
		        // 7. Return the result of calling the FormatDateTime abstract operation (defined
		        //    in 12.3.2) with arguments dateTimeFormat and x.
		        return FormatDateTime(dateTimeFormat, x);
		    }
		});
		
		/**
		 * When the toLocaleTimeString method is called with optional arguments locales and
		 * options, the following steps are taken:
		 */
		/* 13.3.3 */defineProperty(Date.prototype, 'toLocaleTimeString', {
		    writable: true,
		    configurable: true,
		    value: function () {
		        // Satisfy test 13.3.0_1
		        if (Object.prototype.toString.call(this) !== '[object Date]')
		            throw new TypeError('`this` value must be a Date instance for Date.prototype.toLocaleTimeString()');
		
		        var
		        // 1. Let x be this time value (as defined in ES5, 15.9.5).
		            x = +this;
		
		        // 2. If x is NaN, then return "Invalid Date".
		        if (isNaN(x))
		            return 'Invalid Date';
		
		        var
		        // 3. If locales is not provided, then let locales be undefined.
		            locales = arguments[0],
		
		        // 4. If options is not provided, then let options be undefined.
		            options = arguments[1],
		
		        // 5. Let options be the result of calling the ToDateTimeOptions abstract
		        //    operation (defined in 12.1.1) with arguments options, "time", and "time".
		            options = ToDateTimeOptions(options, 'time', 'time'),
		
		        // 6. Let dateTimeFormat be the result of creating a new object as if by the
		        //    expression new Intl.DateTimeFormat(locales, options) where
		        //    Intl.DateTimeFormat is the standard built-in constructor defined in 12.1.3.
		            dateTimeFormat = new DateTimeFormatConstructor(locales, options);
		
		        // 7. Return the result of calling the FormatDateTime abstract operation (defined
		        //    in 12.3.2) with arguments dateTimeFormat and x.
		        return FormatDateTime(dateTimeFormat, x);
		    }
		});
		
		/**
		 * Can't really ship a single script with data for hundreds of locales, so we provide
		 * this __addLocaleData method as a means for the developer to add the data on an
		 * as-needed basis
		 */
		defineProperty(Intl, '__addLocaleData', {
		    value: addLocaleData
		});
		function addLocaleData (data) {
		    if (!IsStructurallyValidLanguageTag(data.locale))
		        throw new Error("Object passed doesn't identify itself with a valid language tag");
		
		    // Both NumberFormat and DateTimeFormat require number data, so throw if it isn't present
		    if (!data.number)
		        throw new Error("Object passed doesn't contain locale data for Intl.NumberFormat");
		
		    var locale,
		        locales = [ data.locale ],
		        parts   = data.locale.split('-');
		
		    // Create fallbacks for locale data with scripts, e.g. Latn, Hans, Vaii, etc
		    if (parts.length > 2 && parts[1].length == 4)
		        arrPush.call(locales, parts[0] + '-' + parts[2]);
		
		    while (locale = arrShift.call(locales)) {
		        // Add to NumberFormat internal properties as per 11.2.3
		        arrPush.call(internals.NumberFormat['[[availableLocales]]'], locale);
		        internals.NumberFormat['[[localeData]]'][locale] = data.number;
		
		        // ...and DateTimeFormat internal properties as per 12.2.3
		        if (data.date) {
		            data.date.nu = data.number.nu;
		            arrPush.call(internals.DateTimeFormat['[[availableLocales]]'], locale);
		            internals.DateTimeFormat['[[localeData]]'][locale] = data.date;
		        }
		    }
		
		    // If this is the first set of locale data added, make it the default
		    if (defaultLocale === undefined)
		        defaultLocale = data.locale;
		
		    // 11.3 (the NumberFormat prototype object is an Intl.NumberFormat instance)
		    if (!numberFormatProtoInitialised) {
		        InitializeNumberFormat(Intl.NumberFormat.prototype);
		        numberFormatProtoInitialised = true;
		    }
		
		    // 11.3 (the NumberFormat prototype object is an Intl.NumberFormat instance)
		    if (data.date && !dateTimeFormatProtoInitialised) {
		        InitializeDateTimeFormat(Intl.DateTimeFormat.prototype);
		        dateTimeFormatProtoInitialised = true;
		    }
		}
		
		// Exposed for debugging
		if (typeof window !== 'undefined')
		    window.IntlLocaleData = internals;
		
		// Helper functions
		// ================
		
		/**
		 * A merge of the Intl.{Constructor}.supportedLocalesOf functions
		 * To make life easier, the function should be bound to the constructor's internal
		 * properties object.
		 */
		function supportedLocalesOf(locales) {
		    /*jshint validthis:true */
		
		    // Bound functions only have the `this` value altered if being used as a constructor,
		    // this lets us imitate a native function that has no constructor
		    if (!hop.call(this, '[[availableLocales]]'))
		        throw new TypeError('supportedLocalesOf() is not a constructor');
		
		    var
		    // Create an object whose props can be used to restore the values of RegExp props
		        regexpState = createRegExpRestore(),
		
		    // 1. If options is not provided, then let options be undefined.
		        options = arguments[1],
		
		    // 2. Let availableLocales be the value of the [[availableLocales]] internal
		    //    property of the standard built-in object that is the initial value of
		    //    Intl.NumberFormat.
		
		        availableLocales = this['[[availableLocales]]'],
		
		    // 3. Let requestedLocales be the result of calling the CanonicalizeLocaleList
		    //    abstract operation (defined in 9.2.1) with argument locales.
		        requestedLocales = CanonicalizeLocaleList(locales);
		
		    // Restore the RegExp properties
		    regexpState.exp.test(regexpState.input);
		
		    // 4. Return the result of calling the SupportedLocales abstract operation
		    //    (defined in 9.2.8) with arguments availableLocales, requestedLocales,
		    //    and options.
		    return SupportedLocales(availableLocales, requestedLocales, options);
		}
		
		/**
		 * Returns a string for a date component, resolved using multiple inheritance as specified
		 * as specified in the Unicode Technical Standard 35.
		 */
		function resolveDateString(data, ca, component, width, key) {
		    // From http://www.unicode.org/reports/tr35/tr35.html#Multiple_Inheritance:
		    // 'In clearly specified instances, resources may inherit from within the same locale.
		    //  For example, ... the Buddhist calendar inherits from the Gregorian calendar.'
		    var obj = data[ca] && data[ca][component]
		                ? data[ca][component]
		                : data.gregory[component],
		
		        // "sideways" inheritance resolves strings when a key doesn't exist
		        alts = {
		            narrow: ['short', 'long'],
		            short:  ['long', 'narrow'],
		            long:   ['short', 'narrow']
		        },
		
		        //
		        resolved = hop.call(obj, width)
		                  ? obj[width]
		                  : hop.call(obj, alts[width][0])
		                      ? obj[alts[width][0]]
		                      : obj[alts[width][1]];
		
		    // `key` wouldn't be specified for components 'dayPeriods'
		    return key != null ? resolved[key] : resolved;
		}
		
		/**
		 * A map that doesn't contain Object in its prototype chain
		 */
		Record.prototype = objCreate(null);
		function Record (obj) {
		    // Copy only own properties over unless this object is already a Record instance
		    for (var k in obj) {
		        if (obj instanceof Record || hop.call(obj, k))
		            defineProperty(this, k, { value: obj[k], enumerable: true, writable: true, configurable: true });
		    }
		}
		
		/**
		 * An ordered list
		 */
		List.prototype = objCreate(null);
		function List() {
		    defineProperty(this, 'length', { writable:true, value: 0 });
		
		    if (arguments.length)
		        arrPush.apply(this, arrSlice.call(arguments));
		}
		
		/**
		 * Constructs a regular expression to restore tainted RegExp properties
		 */
		function createRegExpRestore () {
		    var lm  = RegExp.lastMatch,
		        ret = {
		           input: RegExp.input
		        },
		        esc = /[.?*+^$[\]\\(){}|-]/g,
		        reg = new List(),
		        cap = {};
		
		    if(lm==')') lm="\\)";
		    // Create a snapshot of all the 'captured' properties
		    for (var i = 1; i <= 9; i++)
		        cap['$'+i] = RegExp['$'+i];
		    
		
		    // Now, iterate over them
		    for (var i = 1; i <= 9; i++) {
		        var m = cap['$'+i];
		
		        // If it's empty, add an empty capturing group
		        if (!m)
		            lm = '()' + lm;
		
		        // Else find the string in lm and escape & wrap it to capture it
		        else
		            lm = lm.replace(m, '(' + m.replace(esc, '\\$0') + ')');
		
		        // Push it to the reg and chop lm to make sure further groups come after
		        arrPush.call(reg, lm.slice(0, lm.indexOf('(') + 1));
		        lm = lm.slice(lm.indexOf('(') + 1);
		    }
		
		    // Create the regular expression that will reconstruct the RegExp properties
		    ret.exp = new RegExp(arrJoin.call(reg, '') + lm, RegExp.multiline ? 'm' : '');
		
		    return ret;
		}
		
		/**
		 * Convert only a-z to uppercase as per section 6.1 of the spec
		 */
		function toLatinUpperCase (str) {
		    var i = str.length;
		
		    while (i--) {
		        var ch = str.charAt(i);
		
		        if (ch >= "a" && ch <= "z")
		            str = str.slice(0, i) + ch.toUpperCase() + str.slice(i+1);
		    }
		
		    return str;
		}
		
		/**
		 * Mimics ES5's abstract ToObject() function
		 */
		function toObject (arg) {
		    if (arg == null)
		        throw new TypeError('Cannot convert null or undefined to object');
		
		    return Object(arg);
		}
		
		/**
		 * Returns "internal" properties for an object
		 */
		function getInternalProperties (obj) {
		    if (hop.call(obj, '__getInternalProperties'))
		        return obj.__getInternalProperties(secret);
		    else
		        return objCreate(null);
		}
		
		return Intl;
		})({});
		
		
		//-----
		//The `timezoneJS.Date` object gives you full-blown timezone support, independent from the timezone set on the end-user's machine running the browser. It uses the Olson zoneinfo files for its timezone data.
		//
		//The constructor function and setter methods use proxy JavaScript Date objects behind the scenes, so you can use strings like '10/22/2006' with the constructor. You also get the same sensible wraparound behavior with numeric parameters (like setting a value of 14 for the month wraps around to the next March).
		//
		//The other significant difference from the built-in JavaScript Date is that `timezoneJS.Date` also has named properties that store the values of year, month, date, etc., so it can be directly serialized to JSON and used for data transfer.
		
		/*
		* Copyright 2010 Matthew Eernisse (mde@fleegix.org)
		* and Open Source Applications Foundation
		*
		* Licensed under the Apache License, Version 2.0 (the "License");
		* you may not use this file except in compliance with the License.
		* You may obtain a copy of the License at
		*
		*   http://www.apache.org/licenses/LICENSE-2.0
		*
		* Unless required by applicable law or agreed to in writing, software
		* distributed under the License is distributed on an "AS IS" BASIS,
		* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
		* See the License for the specific language governing permissions and
		* limitations under the License.
		*
		* Credits: Ideas included from incomplete JS implementation of Olson
		* parser, "XMLDAte" by Philippe Goetz (philippe.goetz@wanadoo.fr)
		*
		* Contributions:
		* Jan Niehusmann
		* Ricky Romero
		* Preston Hunt (prestonhunt@gmail.com)
		* Dov. B Katz (dov.katz@morganstanley.com)
		* Peter Bergström (pbergstr@mac.com)
		* Long Ho
		*/
		
		/*jslint laxcomma:true, laxbreak:true, expr:true*/
		(function () {
		// Standard initialization stuff to make sure the library is
		// usable on both client and server (node) side.
		"use strict";
		var root = this;
		
		var timezoneJS;
		if (typeof exports !== 'undefined') {
		 timezoneJS = exports;
		} else {
		 timezoneJS = /*root.timezoneJS =*/ {};
		}
		_exports.timezoneJS=timezoneJS;
		
		timezoneJS.VERSION = '0.4.4';
		
		// Grab the ajax library from global context.
		// This can be jQuery, Zepto or fleegix.
		// You can also specify your own transport mechanism by declaring
		// `timezoneJS.timezone.transport` to a `function`. More details will follow
		var $ = root.$ || root.jQuery || root.Zepto
		 , fleegix = root.fleegix
		 // Declare constant list of days and months. Unfortunately this doesn't leave room for i18n due to the Olson data being in English itself
		 , DAYS = timezoneJS.Days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
		 , MONTHS = timezoneJS.Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
		 , SHORT_MONTHS = {}
		 , SHORT_DAYS = {}
		 , EXACT_DATE_TIME = {};
		
		//`{ "Jan": 0, "Feb": 1, "Mar": 2, "Apr": 3, "May": 4, "Jun": 5, "Jul": 6, "Aug": 7, "Sep": 8, "Oct": 9, "Nov": 10, "Dec": 11 }`
		for (var i = 0; i < MONTHS.length; i++) {
		 SHORT_MONTHS[MONTHS[i].substr(0, 3)] = i;
		}
		
		//`{ "Sun": 0, "Mon": 1, "Tue": 2, "Wed": 3, "Thu": 4, "Fri": 5, "Sat": 6 }`
		for (i = 0; i < DAYS.length; i++) {
		 SHORT_DAYS[DAYS[i].substr(0, 3)] = i;
		}
		
		
		//Handle array indexOf in IE
		//From https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/indexOf
		//Extending Array prototype causes IE to iterate thru extra element
		var _arrIndexOf = Array.prototype.indexOf || function (el) {
		 if (this === null) {
		   throw new TypeError();
		 }
		 var t = Object(this);
		 var len = t.length >>> 0;
		 if (len === 0) {
		   return -1;
		 }
		 var n = 0;
		 if (arguments.length > 1) {
		   n = Number(arguments[1]);
		   if (n != n) { // shortcut for verifying if it's NaN
		     n = 0;
		   } else if (n !== 0 && n !== Infinity && n !== -Infinity) {
		     n = (n > 0 || -1) * Math.floor(Math.abs(n));
		   }
		 }
		 if (n >= len) {
		   return -1;
		 }
		 var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
		 for (; k < len; k++) {
		   if (k in t && t[k] === el) {
		     return k;
		   }
		 }
		 return -1;
		};
		
		// Format a number to the length = digits. For ex:
		//
		// `_fixWidth(2, 2) = '02'`
		//
		// `_fixWidth(1998, 2) = '98'`
		//
		// This is used to pad numbers in converting date to string in ISO standard.
		var _fixWidth = function (number, digits) {
		 if (typeof number !== "number") { throw "not a number: " + number; }
		 var s = number.toString();
		 if (number.length > digits) {
		   return number.substr(number.length - digits, number.length);
		 }
		 while (s.length < digits) {
		   s = '0' + s;
		 }
		 return s;
		};
		
		// Abstraction layer for different transport layers, including fleegix/jQuery/Zepto
		//
		// Object `opts` include
		//
		// - `url`: url to ajax query
		//
		// - `async`: true for asynchronous, false otherwise. If false, return value will be response from URL. This is true by default
		//
		// - `success`: success callback function
		//
		// - `error`: error callback function
		// Returns response from URL if async is false, otherwise the AJAX request object itself
		var _transport = function (opts) {
		 if ((!fleegix || typeof fleegix.xhr === 'undefined') && (!jQuery || typeof jQuery.ajax === 'undefined')) {
		   throw new Error('Please use the Fleegix.js XHR module, jQuery ajax, Zepto ajax, or define your own transport mechanism for downloading zone files.');
		 }
		 if (!opts) return;
		 if (!opts.url) throw new Error ('URL must be specified');
		 if (!('async' in opts)) opts.async = true;
		 if (!opts.async) {
		   return fleegix && fleegix.xhr
		   ? fleegix.xhr.doReq({ url: opts.url, async: false })
		   : jQuery.ajax({ url : opts.url, async : false, dataType: 'text' }).responseText;
		 }
		 return fleegix && fleegix.xhr
		 ? fleegix.xhr.send({
		   url : opts.url,
		   method : 'get',
		   handleSuccess : opts.success,
		   handleErr : opts.error
		 })
		 : jQuery.ajax({
		   url : opts.url,
		   dataType: 'text',
		   method : 'GET',
		   error : opts.error,
		   success : opts.success
		 });
		};
		
		timezoneJS.ruleCache={};
		
		// Constructor, which is similar to that of the native Date object itself
		timezoneJS.Date = function () {
		 var args = Array.prototype.slice.apply(arguments)
		 , dt = null
		 , tz = null
		 , arr = [];
		
		
		 //We support several different constructors, including all the ones from `Date` object
		 // with a timezone string at the end.
		 //
		 //- `[tz]`: Returns object with time in `tz` specified.
		 //
		 // - `utcMillis`, `[tz]`: Return object with UTC time = `utcMillis`, in `tz`.
		 //
		 // - `Date`, `[tz]`: Returns object with UTC time = `Date.getTime()`, in `tz`.
		 //
		 // - `year, month, [date,] [hours,] [minutes,] [seconds,] [millis,] [tz]: Same as `Date` object
		 // with tz.
		 //
		 // - `Array`: Can be any combo of the above.
		 //
		 //If 1st argument is an array, we can use it as a list of arguments itself
		 if (Object.prototype.toString.call(args[0]) === '[object Array]') {
		   args = args[0];
		 }
		 if (typeof args[args.length - 1] === 'string' /*&& isNaN(Date.parse(args[args.length - 1].replace(/GMT\+\d+/, '')))*/) { // This was causing any timezone with GMT to stop working as in "Etc/GMT-7"
		   tz = args.pop();
		 }
		 var is_dt_local = false;
		 switch (args.length) {
		   case 0:
		     dt = new Date();
		     break;
		   case 1:
		     dt = new Date(args[0]);
		     // Date strings are local if they do not contain 'Z', 'T' or timezone offsets like '+0200'
		     //  - more info below
		     if (typeof args[0] == 'string' && args[0].search(/[+-][0-9]{4}/) == -1
		             && args[0].search(/Z/) == -1 && args[0].search(/T/) == -1) {
		         is_dt_local = true;
		     }
		     break;
		   default:
		     for (var i = 0; i < 7; i++) {
		       arr[i] = args[i] || 0;
		     }
		     dt = new Date(arr[0], arr[1], arr[2], arr[3], arr[4], arr[5], arr[6]);
		     is_dt_local = true;
		     break;
		 }
		
		 this._useCache = false;
		 this._tzInfo = {};
		 this._day = 0;
		 this.year = 0;
		 this.month = 0;
		 this.date = 0;
		 this.hours = 0;
		 this.minutes = 0;
		 this.seconds = 0;
		 this.milliseconds = 0;
		 this.timezone = tz || null;
		 // Tricky part:
		 // The date is either given as unambiguous UTC date or otherwise the date is assumed
		 // to be a date in timezone `tz` or a locale date if `tz` is not provided. Thus, to
		 // determine how to use `dt` we distinguish between the following cases:
		 //  - UTC   (is_dt_local = false)
		 //    `timezoneJS.Date(millis, [tz])`
		 //    `timezoneJS.Date(Date, [tz])`
		 //    `timezoneJS.Date(dt_str_tz, [tz])`
		 //  - local/timezone `tz`   (is_dt_local = true)
		 //    `timezoneJS.Date(year, mon, day, [hour], [min], [second], [tz])`
		 //    `timezoneJS.Date(dt_str, [tz])`
		 //
		 // `dt_str_tz` is a date string containing timezone information, i.e. containing 'Z', 'T' or
		 // /[+-][0-9]{4}/ (e.g. '+0200'), while `dt_str` is a string which does not contain
		 // timezone information. See: http://dygraphs.com/date-formats.html
		 if (is_dt_local) {
		    this.setFromDateObjProxy(dt);
		 } else {
		    this.setFromTimeProxy(dt.getTime(), tz);
		 }
		};
		
		// Implements most of the native Date object
		timezoneJS.Date.prototype = {
		 getDate: function () { return this.date; },
		 getDay: function () { return this._day; },
		 getFullYear: function () { return this.year; },
		 getMonth: function () { return this.month; },
		 getYear: function () { return this.year - 1900; },
		 getHours: function () { return this.hours; },
		 getMilliseconds: function () { return this.milliseconds; },
		 getMinutes: function () { return this.minutes; },
		 getSeconds: function () { return this.seconds; },
		 getUTCDate: function () { return this.getUTCDateProxy().getUTCDate(); },
		 getUTCDay: function () { return this.getUTCDateProxy().getUTCDay(); },
		 getUTCFullYear: function () { return this.getUTCDateProxy().getUTCFullYear(); },
		 getUTCHours: function () { return this.getUTCDateProxy().getUTCHours(); },
		 getUTCMilliseconds: function () { return this.getUTCDateProxy().getUTCMilliseconds(); },
		 getUTCMinutes: function () { return this.getUTCDateProxy().getUTCMinutes(); },
		 getUTCMonth: function () { return this.getUTCDateProxy().getUTCMonth(); },
		 getUTCSeconds: function () { return this.getUTCDateProxy().getUTCSeconds(); },
		 // Time adjusted to user-specified timezone
		 getTime: function () {
		   return this._timeProxy + (this.getTimezoneOffset() * 60 * 1000);
		 },
		 getTimezone: function () { return this.timezone; },
		 getTimezoneOffset: function () { return this.getTimezoneInfo().tzOffset; },
		 getTimezoneAbbreviation: function () { return this.getTimezoneInfo().tzAbbr; },
		 getTimezoneInfo: function () {
		   if (this._useCache) return this._tzInfo;
		   var res;
		   // If timezone is specified, get the correct timezone info based on the Date given
		   if (this.timezone) {
		     res = this.timezone === 'Etc/UTC' || this.timezone === 'Etc/GMT'
		       ? { tzOffset: 0, tzAbbr: 'UTC' }
		       : timezoneJS.timezone.getTzInfo(this._timeProxy, this.timezone);
		   }
		   // If no timezone was specified, use the local browser offset
		   else {
		     res = { tzOffset: this.getLocalOffset(), tzAbbr: null };
		   }
		   this._tzInfo = res;
		   this._useCache = true;
		   return res;
		 },
		 getUTCDateProxy: function () {
		   var dt = new Date(this._timeProxy);
		   dt.setUTCMinutes(dt.getUTCMinutes() + this.getTimezoneOffset());
		   return dt;
		 },
		 setDate: function (date) {
		   this.setAttribute('date', date);
		   return this.getTime();
		 },
		 setFullYear: function (year, month, date) {
		   if (date !== undefined) { this.setAttribute('date', 1); }
		   this.setAttribute('year', year);
		   if (month !== undefined) { this.setAttribute('month', month); }
		   if (date !== undefined) { this.setAttribute('date', date); }
		   return this.getTime();
		 },
		 setMonth: function (month, date) {
		   this.setAttribute('month', month);
		   if (date !== undefined) { this.setAttribute('date', date); }
		   return this.getTime();
		 },
		 setYear: function (year) {
		   year = Number(year);
		   if (0 <= year && year <= 99) { year += 1900; }
		   this.setUTCAttribute('year', year);
		   return this.getTime();
		 },
		 setHours: function (hours, minutes, seconds, milliseconds) {
		   this.setAttribute('hours', hours);
		   if (minutes !== undefined) { this.setAttribute('minutes', minutes); }
		   if (seconds !== undefined) { this.setAttribute('seconds', seconds); }
		   if (milliseconds !== undefined) { this.setAttribute('milliseconds', milliseconds); }
		   return this.getTime();
		 },
		 setMinutes: function (minutes, seconds, milliseconds) {
		   this.setAttribute('minutes', minutes);
		   if (seconds !== undefined) { this.setAttribute('seconds', seconds); }
		   if (milliseconds !== undefined) { this.setAttribute('milliseconds', milliseconds); }
		   return this.getTime();
		 },
		 setSeconds: function (seconds, milliseconds) {
		   this.setAttribute('seconds', seconds);
		   if (milliseconds !== undefined) { this.setAttribute('milliseconds', milliseconds); }
		   return this.getTime();
		 },
		 setMilliseconds: function (milliseconds) {
		   this.setAttribute('milliseconds', milliseconds);
		   return this.getTime();
		 },
		 setTime: function (n) {
		   if (isNaN(n)) { throw new Error('Units must be a number.'); }
		   this.setFromTimeProxy(n, this.timezone);
		   return this.getTime();
		 },
		 setUTCFullYear: function (year, month, date) {
		   if (date !== undefined) { this.setUTCAttribute('date', 1); }
		   this.setUTCAttribute('year', year);
		   if (month !== undefined) { this.setUTCAttribute('month', month); }
		   if (date !== undefined) { this.setUTCAttribute('date', date); }
		   return this.getTime();
		 },
		 setUTCMonth: function (month, date) {
		   this.setUTCAttribute('month', month);
		   if (date !== undefined) { this.setUTCAttribute('date', date); }
		   return this.getTime();
		 },
		 setUTCDate: function (date) {
		   this.setUTCAttribute('date', date);
		   return this.getTime();
		 },
		 setUTCHours: function (hours, minutes, seconds, milliseconds) {
		   this.setUTCAttribute('hours', hours);
		   if (minutes !== undefined) { this.setUTCAttribute('minutes', minutes); }
		   if (seconds !== undefined) { this.setUTCAttribute('seconds', seconds); }
		   if (milliseconds !== undefined) { this.setUTCAttribute('milliseconds', milliseconds); }
		   return this.getTime();
		 },
		 setUTCMinutes: function (minutes, seconds, milliseconds) {
		   this.setUTCAttribute('minutes', minutes);
		   if (seconds !== undefined) { this.setUTCAttribute('seconds', seconds); }
		   if (milliseconds !== undefined) { this.setUTCAttribute('milliseconds', milliseconds); }
		   return this.getTime();
		 },
		 setUTCSeconds: function (seconds, milliseconds) {
		   this.setUTCAttribute('seconds', seconds);
		   if (milliseconds !== undefined) { this.setUTCAttribute('milliseconds', milliseconds); }
		   return this.getTime();
		 },
		 setUTCMilliseconds: function (milliseconds) {
		   this.setUTCAttribute('milliseconds', milliseconds);
		   return this.getTime();
		 },
		 setFromDateObjProxy: function (dt) {
		   this.year = dt.getFullYear();
		   this.month = dt.getMonth();
		   this.date = dt.getDate();
		   this.hours = dt.getHours();
		   this.minutes = dt.getMinutes();
		   this.seconds = dt.getSeconds();
		   this.milliseconds = dt.getMilliseconds();
		   this._day = dt.getDay();
		   this._dateProxy = dt;
		   this._timeProxy = Date.UTC(this.year, this.month, this.date, this.hours, this.minutes, this.seconds, this.milliseconds);
		   this._useCache = false;
		 },
		 setFromTimeProxy: function (utcMillis, tz) {
		   var dt = new Date(utcMillis);
		   var tzOffset = tz ? timezoneJS.timezone.getTzInfo(utcMillis, tz, true).tzOffset : dt.getTimezoneOffset();
		   dt.setTime(utcMillis + (dt.getTimezoneOffset() - tzOffset) * 60000);
		   this.setFromDateObjProxy(dt);
		 },
		 setAttribute: function (unit, n) {
		   if (isNaN(n)) { throw new Error('Units must be a number.'); }
		   var dt = this._dateProxy;
		   var meth = unit === 'year' ? 'FullYear' : unit.substr(0, 1).toUpperCase() + unit.substr(1);
		   dt['set' + meth](n);
		   this.setFromDateObjProxy(dt);
		 },
		 setUTCAttribute: function (unit, n) {
		   if (isNaN(n)) { throw new Error('Units must be a number.'); }
		   var meth = unit === 'year' ? 'FullYear' : unit.substr(0, 1).toUpperCase() + unit.substr(1);
		   var dt = this.getUTCDateProxy();
		   dt['setUTC' + meth](n);
		   dt.setUTCMinutes(dt.getUTCMinutes() - this.getTimezoneOffset());
		   this.setFromTimeProxy(dt.getTime() + this.getTimezoneOffset() * 60000, this.timezone);
		 },
		 setTimezone: function (tz) {
		   var previousOffset = this.getTimezoneInfo().tzOffset;
		   this.timezone = tz;
		   this._useCache = false;
		   // Set UTC minutes offsets by the delta of the two timezones
		   this.setUTCMinutes(this.getUTCMinutes() - this.getTimezoneInfo().tzOffset + previousOffset);
		 },
		 removeTimezone: function () {
		   this.timezone = null;
		   this._useCache = false;
		 },
		 valueOf: function () { return this.getTime(); },
		 clone: function () {
		   return this.timezone ? new timezoneJS.Date(this.getTime(), this.timezone) : new timezoneJS.Date(this.getTime());
		 },
		 toGMTString: function () { return this.toString('EEE, dd MMM yyyy HH:mm:ss Z', 'Etc/GMT'); },
		 toLocaleString: function () {},
		 toLocaleDateString: function () {},
		 toLocaleTimeString: function () {},
		 toSource: function () {},
		 toISOString: function () { return this.toString('yyyy-MM-ddTHH:mm:ss.SSS', 'Etc/UTC') + 'Z'; },
		 toJSON: function () { return this.toISOString(); },
		 // Allows different format following ISO8601 format:
		 toString: function (format, tz) {
		   // Default format is the same as toISOString
		   if (!format) format = 'yyyy-MM-dd HH:mm:ss';
		   var result = format;
		   var tzInfo = tz ? timezoneJS.timezone.getTzInfo(this.getTime(), tz) : this.getTimezoneInfo();
		   var _this = this;
		   // If timezone is specified, get a clone of the current Date object and modify it
		   if (tz) {
		     _this = this.clone();
		     _this.setTimezone(tz);
		   }
		   var hours = _this.getHours();
		   return result
		   // fix the same characters in Month names
		   .replace(/a+/g, function () { return 'k'; })
		   // `y`: year
		   .replace(/y+/g, function (token) { return _fixWidth(_this.getFullYear(), token.length); })
		   // `d`: date
		   .replace(/d+/g, function (token) { return _fixWidth(_this.getDate(), token.length); })
		   // `m`: minute
		   .replace(/m+/g, function (token) { return _fixWidth(_this.getMinutes(), token.length); })
		   // `s`: second
		   .replace(/s+/g, function (token) { return _fixWidth(_this.getSeconds(), token.length); })
		   // `S`: millisecond
		   .replace(/S+/g, function (token) { return _fixWidth(_this.getMilliseconds(), token.length); })
		   // 'h': 12 hour format
		   .replace(/h+/g, function (token) { return _fixWidth( ((hours%12) === 0) ? 12 : (hours % 12), token.length); })
		   // `M`: month. Note: `MM` will be the numeric representation (e.g February is 02) but `MMM` will be text representation (e.g February is Feb)
		   .replace(/M+/g, function (token) {
		     var _month = _this.getMonth(),
		     _len = token.length;
		     if (_len > 3) {
		       return timezoneJS.Months[_month];
		     } else if (_len > 2) {
		       return timezoneJS.Months[_month].substring(0, _len);
		     }
		     return _fixWidth(_month + 1, _len);
		   })
		   // `k`: AM/PM
		   .replace(/k+/g, function () {
		     if (hours >= 12) {
		       if (hours > 12) {
		         hours -= 12;
		       }
		       return 'PM';
		     }
		     return 'AM';
		   })
		   // `H`: hour
		   .replace(/H+/g, function (token) { return _fixWidth(hours, token.length); })
		   // `E`: day
		   .replace(/E+/g, function (token) { return DAYS[_this.getDay()].substring(0, token.length); })
		   // `Z`: timezone abbreviation
		   .replace(/Z+/gi, function () { return tzInfo.tzAbbr; });
		 },
		 toUTCString: function () { return this.toGMTString(); },
		 civilToJulianDayNumber: function (y, m, d) {
		   var a;
		   // Adjust for zero-based JS-style array
		   m++;
		   if (m > 12) {
		     a = parseInt(m/12, 10);
		     m = m % 12;
		     y += a;
		   }
		   if (m <= 2) {
		     y -= 1;
		     m += 12;
		   }
		   a = Math.floor(y / 100);
		   var b = 2 - a + Math.floor(a / 4)
		     , jDt = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d + b - 1524;
		   return jDt;
		 },
		 getLocalOffset: function () {
		   return this._dateProxy.getTimezoneOffset();
		 }
		};
		
		
		timezoneJS.timezone = new function () {
		 var _this = this
		   , regionMap = {'Etc':'etcetera','EST':'northamerica','MST':'northamerica','HST':'northamerica','EST5EDT':'northamerica','CST6CDT':'northamerica','MST7MDT':'northamerica','PST8PDT':'northamerica','America':'northamerica','Pacific':'australasia','Atlantic':'europe','Africa':'africa','Indian':'africa','Antarctica':'antarctica','Asia':'asia','Australia':'australasia','Europe':'europe','WET':'europe','CET':'europe','MET':'europe','EET':'europe'}
		   , regionExceptions = {'Pacific/Honolulu':'northamerica','Atlantic/Bermuda':'northamerica','Atlantic/Cape_Verde':'africa','Atlantic/St_Helena':'africa','Indian/Kerguelen':'antarctica','Indian/Chagos':'asia','Indian/Maldives':'asia','Indian/Christmas':'australasia','Indian/Cocos':'australasia','America/Danmarkshavn':'europe','America/Scoresbysund':'europe','America/Godthab':'europe','America/Thule':'europe','Asia/Istanbul':'europe','Asia/Yekaterinburg':'europe','Asia/Omsk':'europe','Asia/Novosibirsk':'europe','Asia/Krasnoyarsk':'europe','Asia/Irkutsk':'europe','Asia/Yakutsk':'europe','Asia/Vladivostok':'europe','Asia/Sakhalin':'europe','Asia/Magadan':'europe','Asia/Kamchatka':'europe','Asia/Anadyr':'europe','Africa/Ceuta':'europe','America/Argentina/Buenos_Aires':'southamerica','America/Argentina/San_Luis':'southamerica','America/Argentina/Cordoba':'southamerica','America/Argentina/Tucuman':'southamerica','America/Argentina/La_Rioja':'southamerica','America/Argentina/San_Juan':'southamerica','America/Argentina/Jujuy':'southamerica','America/Argentina/Catamarca':'southamerica','America/Argentina/Mendoza':'southamerica','America/Argentina/Rio_Gallegos':'southamerica','America/Argentina/Ushuaia':'southamerica','America/Aruba':'southamerica','America/La_Paz':'southamerica','America/Noronha':'southamerica','America/Belem':'southamerica','America/Fortaleza':'southamerica','America/Recife':'southamerica','America/Araguaina':'southamerica','America/Maceio':'southamerica','America/Bahia':'southamerica','America/Sao_Paulo':'southamerica','America/Campo_Grande':'southamerica','America/Cuiaba':'southamerica','America/Porto_Velho':'southamerica','America/Boa_Vista':'southamerica','America/Manaus':'southamerica','America/Eirunepe':'southamerica','America/Rio_Branco':'southamerica','America/Santiago':'southamerica','Pacific/Easter':'southamerica','America/Bogota':'southamerica','America/Curacao':'southamerica','America/Guayaquil':'southamerica','Pacific/Galapagos':'southamerica','Atlantic/Stanley':'southamerica','America/Cayenne':'southamerica','America/Guyana':'southamerica','America/Asuncion':'southamerica','America/Lima':'southamerica','Atlantic/South_Georgia':'southamerica','America/Paramaribo':'southamerica','America/Port_of_Spain':'southamerica','America/Montevideo':'southamerica','America/Caracas':'southamerica','GMT':'etcetera','Europe/Nicosia':'asia'};
		 function invalidTZError(t) { throw new Error('Timezone "' + t + '" is either incorrect, or not loaded in the timezone registry.'); }
		 function builtInLoadZoneFile(fileName, opts) {
		   var url = _this.zoneFileBasePath + '/' + fileName;
		   return !opts || !opts.async
		   ? _this.parseZones(_this.transport({ url : url, async : false }))
		   : _this.transport({
		     async: true,
		     url : url,
		     success : function (str) {
		       return _this.parseZones(str) && typeof opts.callback === 'function' && opts.callback();
		     },
		     error : function () {
		       throw new Error('Error retrieving "' + url + '" zoneinfo files');
		     }
		   });
		 }
		 function getRegionForTimezone(tz) {
		   var exc = regionExceptions[tz]
		     , reg
		     , ret;
		   if (exc) return exc;
		   reg = tz.split('/')[0];
		   ret = regionMap[reg];
		   // If there's nothing listed in the main regions for this TZ, check the 'backward' links
		   if (ret) return ret;
		   var link = _this.zones[tz];
		   if (typeof link === 'string') {
		     return getRegionForTimezone(link);
		   }
		   // Backward-compat file hasn't loaded yet, try looking in there
		   if (!_this.loadedZones.backward) {
		     // This is for obvious legacy zones (e.g., Iceland) that don't even have a prefix like "America/" that look like normal zones
		     _this.loadZoneFile('backward');
		     return getRegionForTimezone(tz);
		   }
		   invalidTZError(tz);
		 }
		 //str has format hh:mm, can be negative
		 function parseTimeString(str) {
		   var pat = /(\d+)(?::0*(\d*))?(?::0*(\d*))?([wsugz])?$/;
		   var hms = str.match(pat);
		   hms[1] = parseInt(hms[1], 10);
		   hms[2] = hms[2] ? parseInt(hms[2], 10) : 0;
		   hms[3] = hms[3] ? parseInt(hms[3], 10) : 0;
		   return hms.slice(1, 5);
		 }
		 //z is something like `[ '-3:44:40', '-', 'LMT', '1911', 'May', '15', '' ]` or `[ '-5:00', '-', 'EST', '1974', 'Apr', '28', '2:00' ]`
		 function processZone(z) {
		   if (!z[3]) { return; }
		   var yea = parseInt(z[3], 10)
		     , mon = 11
		     , dat = 31;
		   //If month is there
		   if (z[4]) {
		     mon = SHORT_MONTHS[z[4].substr(0, 3)];
		     dat = parseInt(z[5], 10) || 1;
		   }
		   var t = z[6] ? parseTimeString(z[6]) : [0, 0, 0];
		   return [yea, mon, dat, t[0], t[1], t[2]];
		 }
		 function getZone(dt, tz) {
		   var utcMillis = typeof dt === 'number' ? dt : new Date(dt).getTime();
		   var t = tz;
		   var zoneList = _this.zones[t];
		   // Follow links to get to an actual zone
		   while (typeof zoneList === "string") {
		     t = zoneList;
		     zoneList = _this.zones[t];
		   }
		   if (!zoneList) {
		     // Backward-compat file hasn't loaded yet, try looking in there
		     if (!_this.loadedZones.backward) {
		       //This is for backward entries like "America/Fort_Wayne" that
		       // getRegionForTimezone *thinks* it has a region file and zone
		       // for (e.g., America => 'northamerica'), but in reality it's a
		       // legacy zone we need the backward file for.
		       _this.loadZoneFile('backward');
		       return getZone(dt, tz);
		     }
		     invalidTZError(t);
		   }
		   if (zoneList.length === 0) {
		     throw new Error('No Zone found for "' + tz + '" on ' + dt);
		   }
		   //Do backwards lookup since most use cases deal with newer dates.
		   for (var i = zoneList.length - 1; i >= 0; i--) {
		     var z = zoneList[i];
		     if (z[3] && utcMillis > z[3]) break;
		   }
		   return zoneList[i+1];
		 }
		 function getBasicOffset(time) {
		   var off = parseTimeString(time)
		     , adj = time.charAt(0) === '-' ? -1 : 1;
		   off = adj * (((off[0] * 60 + off[1]) * 60 + off[2]) * 1000);
		   return off/60/1000;
		 }
		 function getAdjustedOffset(off, min) {
		   return -Math.ceil(min - off);
		 }
		
		 //if isUTC is true, date is given in UTC, otherwise it's given
		 // in local time (ie. date.getUTC*() returns local time components)
		 function getRule(dt, zone, isUTC, cacheKey) {
		   var date = typeof dt === 'number' ? new Date(dt) : dt;
		   var ruleset = zone[1];
		   var basicOffset = zone[0];
		
		   // If the zone has a DST rule like '1:00', create a rule and return it
		   // instead of looking it up in the parsed rules
		   var staticDstMatch = ruleset.match(/^([0-9]):([0-9][0-9])$/);
		   if (staticDstMatch) {
		     return [-1000000, 'max', '-', 'Jan', 1, [0, 0, 0], parseInt(staticDstMatch[1],10) * 60 + parseInt(staticDstMatch[2], 10), '-'];
		   }
		
		   //Convert a date to UTC. Depending on the 'type' parameter, the date
		   // parameter may be:
		   //
		   // - `u`, `g`, `z`: already UTC (no adjustment).
		   //
		   // - `s`: standard time (adjust for time zone offset but not for DST)
		   //
		   // - `w`: wall clock time (adjust for both time zone and DST offset).
		   //
		   // DST adjustment is done using the rule given as third argument.
		   var convertDateToUTC = function (date, type, rule) {
		     var offset = 0;
		
		     if (type === 'u' || type === 'g' || type === 'z') { // UTC
		       offset = 0;
		     } else if (type === 's') { // Standard Time
		       offset = basicOffset;
		     } else if (type === 'w' || !type) { // Wall Clock Time
		       offset = getAdjustedOffset(basicOffset, rule[6]);
		     } else {
		       throw new Error("unknown type " + type);
		     }
		     offset *= 60 * 1000; // to millis
		
		     return new Date(date.getTime() + offset);
		   };
		
		   //Step 1:  Find applicable rules for this year.
		   //
		   //Step 2:  Sort the rules by effective date.
		   //
		   //Step 3:  Check requested date to see if a rule has yet taken effect this year.  If not,
		   //
		   //Step 4:  Get the rules for the previous year.  If there isn't an applicable rule for last year, then
		   // there probably is no current time offset since they seem to explicitly turn off the offset
		   // when someone stops observing DST.
		   //
		   // FIXME if this is not the case and we'll walk all the way back (ugh).
		   //
		   //Step 5:  Sort the rules by effective date.
		   //Step 6:  Apply the most recent rule before the current time.
		   var convertRuleToExactDateAndTime = function (yearAndRule, prevRule) {
		     var year = yearAndRule[0]
		       , rule = yearAndRule[1];
		       // Assume that the rule applies to the year of the given date.
		       //if(rule[8]) return rule[8]; // We've already computed the exact date and time for this rule
		
		     var hms = rule[5];
		     var effectiveDate;
		
		     if (!EXACT_DATE_TIME[year])
		       EXACT_DATE_TIME[year] = {};
		
		     // Result for given parameters is already stored
		     if (EXACT_DATE_TIME[year][rule])
		       effectiveDate = EXACT_DATE_TIME[year][rule];
		     else {
		       //If we have a specific date, use that!
		       if (!isNaN(rule[4])) {
		         effectiveDate = new Date(Date.UTC(year, SHORT_MONTHS[rule[3]], rule[4], hms[0], hms[1], hms[2], 0));
		       }
		       //Let's hunt for the date.
		       else {
		         var targetDay
		           , operator;
		         //Example: `lastThu`
		         if (rule[4].substr(0, 4) === "last") {
		           // Start at the last day of the month and work backward.
		           effectiveDate = new Date(Date.UTC(year, SHORT_MONTHS[rule[3]] + 1, 1, hms[0] - 24, hms[1], hms[2], 0));
		           targetDay = SHORT_DAYS[rule[4].substr(4, 3)];
		           operator = "<=";
		         }
		         //Example: `Sun>=15`
		         else {
		           //Start at the specified date.
		           effectiveDate = new Date(Date.UTC(year, SHORT_MONTHS[rule[3]], rule[4].substr(5), hms[0], hms[1], hms[2], 0));
		           targetDay = SHORT_DAYS[rule[4].substr(0, 3)];
		           operator = rule[4].substr(3, 2);
		         }
		         var ourDay = effectiveDate.getUTCDay();
		         //Go forwards.
		         if (operator === ">=") {
		           effectiveDate.setUTCDate(effectiveDate.getUTCDate() + (targetDay - ourDay + ((targetDay < ourDay) ? 7 : 0)));
		         }
		         //Go backwards.  Looking for the last of a certain day, or operator is "<=" (less likely).
		         else {
		           effectiveDate.setUTCDate(effectiveDate.getUTCDate() + (targetDay - ourDay - ((targetDay > ourDay) ? 7 : 0)));
		         }
		       }
		       EXACT_DATE_TIME[year][rule] = effectiveDate;
		     }
		
		
		     //If previous rule is given, correct for the fact that the starting time of the current
		     // rule may be specified in local time.
		     if (prevRule) {
		       effectiveDate = convertDateToUTC(effectiveDate, hms[3], prevRule);
		     }
		     return effectiveDate;
		   };
		
		   var findApplicableRules = function (year, ruleset) {
		     var applicableRules = [];
		     for (var i = 0; ruleset && i < ruleset.length; i++) {
		       //Exclude future rules.
		       if (ruleset[i][0] <= year &&
		           (
		             // Date is in a set range.
		             ruleset[i][1] >= year ||
		             // Date is in an "only" year.
		               (ruleset[i][0] === year && ruleset[i][1] === "only") ||
		             //We're in a range from the start year to infinity.
		                 ruleset[i][1] === "max"
		            )
		          ) {
		            //It's completely okay to have any number of matches here.
		            // Normally we should only see two, but that doesn't preclude other numbers of matches.
		            // These matches are applicable to this year.
		            applicableRules.push([year, ruleset[i]]);
		          }
		     }
		     return applicableRules;
		   };
		
		   var compareDates = function (a, b, prev) {
		     var year, rule, exactYearAndDate;
		     if (!(a instanceof Date)) {
		       year = a[0];
		       rule = a[1];
		       exactYearAndDate = a[2];
		       a = (!prev && EXACT_DATE_TIME[year] && EXACT_DATE_TIME[year][rule])
		         ? EXACT_DATE_TIME[year][rule]
		         : (exactYearAndDate?exactYearAndDate:convertRuleToExactDateAndTime(a, prev));
		     } else if (prev && !isUTC) {
		       a = convertDateToUTC(a, isUTC ? 'u' : 'w', prev);
		     }
		     if (!(b instanceof Date)) {
		       year = b[0];
		       rule = b[1];
		       exactYearAndDate = b[2];
		       b = (!prev && EXACT_DATE_TIME[year] && EXACT_DATE_TIME[year][rule]) ? EXACT_DATE_TIME[year][rule]
		         : (exactYearAndDate?exactYearAndDate:convertRuleToExactDateAndTime(b, prev));
		     } else if (prev && !isUTC) {
		       b = convertDateToUTC(b, isUTC ? 'u' : 'w', prev);
		     }
		     a = Number(a);
		     b = Number(b);
		     return a - b;
		   };
		
		   var year = date.getUTCFullYear();
		
		
		   var cache=timezoneJS.ruleCache[cacheKey];
		   if(!cache) cache=timezoneJS.ruleCache[cacheKey]={};
		   var applicableRules=cache[year];
		   if(!applicableRules){
		      applicableRules = findApplicableRules(year-1, _this.rules[ruleset]);
		      applicableRules = applicableRules.concat(findApplicableRules(year, _this.rules[ruleset]));
		      applicableRules.sort(compareDates);  // Probably already sorted?
		      cache[year]=applicableRules;
		    }
		
		   if(!applicableRules || applicableRules.length==0) return null;  // No applicable rules
		
		   var prev;
		   for(var i=applicableRules.length-1;i>=0;i--){
		        if(i>0) prev=applicableRules[i-1][1];
		        else prev=null;
		        var rule=applicableRules[i];
		        if(!rule[2]){
		            rule[2]=convertRuleToExactDateAndTime(rule, prev);   // cache the exactDateAndTime, this saves a lot of cycles!
		        }
		        if(compareDates(date, rule, prev)>=0) return rule[1];
		   }
		   return null;
		
		
		  /* var applicableRules = findApplicableRules(year, _this.rules[ruleset]);
		   applicableRules.push(date);
		   //While sorting, the time zone in which the rule starting time is specified
		   // is ignored. This is ok as long as the timespan between two DST changes is
		   // larger than the DST offset, which is probably always true.
		   // As the given date may indeed be close to a DST change, it may get sorted
		   // to a wrong position (off by one), which is corrected below.
		   applicableRules.sort(compareDates);
		
		   //If there are not enough past DST rules...
		   if (_arrIndexOf.call(applicableRules, date) < 2) {
		     applicableRules = applicableRules.concat(findApplicableRules(year-1, _this.rules[ruleset]));
		     applicableRules.sort(compareDates);
		   }
		   var pinpoint = _arrIndexOf.call(applicableRules, date);
		   if (pinpoint > 1 && compareDates(date, applicableRules[pinpoint-1], applicableRules[pinpoint-2][1]) < 0) {
		     //The previous rule does not really apply, take the one before that.
		     return applicableRules[pinpoint - 2][1];
		   } else if (pinpoint > 0 && pinpoint < applicableRules.length - 1 && compareDates(date, applicableRules[pinpoint+1], applicableRules[pinpoint-1][1]) > 0) {
		
		     //The next rule does already apply, take that one.
		     return applicableRules[pinpoint + 1][1];
		   } else if (pinpoint === 0) {
		     //No applicable rule found in this and in previous year.
		     return null;
		   }
		   return applicableRules[pinpoint - 1][1];*/
		 }
		 function getAbbreviation(zone, rule) {
		   var base = zone[2];
		   if (base.indexOf('%s') > -1) {
		     var repl;
		     if (rule) {
		       repl = rule[7] === '-' ? '' : rule[7];
		     }
		     //FIXME: Right now just falling back to Standard --
		     // apparently ought to use the last valid rule,
		     // although in practice that always ought to be Standard
		     else {
		       repl = 'S';
		     }
		     return base.replace('%s', repl);
		   } else if (base.indexOf('/') > -1) {
		     //Chose one of two alternative strings.
		     return base.split("/", 2)[rule[6] ? 1 : 0];
		   }
		   return base;
		 }
		
		 this.zoneFileBasePath = null;
		 this.zoneFiles = ['africa', 'antarctica', 'asia', 'australasia', 'backward', 'etcetera', 'europe', 'northamerica', 'pacificnew', 'southamerica'];
		 this.loadingSchemes = {
		   PRELOAD_ALL: 'preloadAll',
		   LAZY_LOAD: 'lazyLoad',
		   MANUAL_LOAD: 'manualLoad'
		 };
		 this.getRegionForTimezone = getRegionForTimezone;
		 this.loadingScheme = this.loadingSchemes.LAZY_LOAD;
		 this.loadedZones = {};
		 this.zones = {};
		 this.rules = {};
		
		 this.init = function (o) {
		   var opts = { async: true }
		     , def = this.loadingScheme === this.loadingSchemes.PRELOAD_ALL
		       ? this.zoneFiles
		       : (this.defaultZoneFile || 'northamerica')
		     , done = 0
		     , callbackFn;
		   //Override default with any passed-in opts
		   for (var p in o) {
		     opts[p] = o[p];
		   }
		   if (typeof def === 'string') {
		     return this.loadZoneFile(def, opts);
		   }
		   //Wraps callback function in another one that makes
		   // sure all files have been loaded.
		   callbackFn = opts.callback;
		   opts.callback = function () {
		     done++;
		     (done === def.length) && typeof callbackFn === 'function' && callbackFn();
		   };
		   for (var i = 0; i < def.length; i++) {
		     this.loadZoneFile(def[i], opts);
		   }
		 };
		
		 //Get the zone files via XHR -- if the sync flag
		 // is set to true, it's being called by the lazy-loading
		 // mechanism, so the result needs to be returned inline.
		 this.loadZoneFile = function (fileName, opts) {
		   if (typeof this.zoneFileBasePath === 'undefined') {
		     throw new Error('Please define a base path to your zone file directory -- timezoneJS.timezone.zoneFileBasePath.');
		   }
		   //Ignore already loaded zones.
		   if (this.loadedZones[fileName]) {
		     return;
		   }
		   this.loadedZones[fileName] = true;
		   return builtInLoadZoneFile(fileName, opts);
		 };
		 this.loadZoneJSONData = function (url, sync) {
		   var processData = function (data) {
		     data = JSON.parse(data);
		     for (var z in data.zones) {
		       _this.zones[z] = data.zones[z];
		     }
		     for (var r in data.rules) {
		       _this.rules[r] = data.rules[r];
		     }
		   };
		   return sync
		   ? processData(_this.transport({ url : url, async : false }))
		   : _this.transport({ url : url, success : processData });
		 };
		 this.loadZoneDataFromObject = function (data) {
		   if (!data) { return; }
		   for (var z in data.zones) {
		     _this.zones[z] = data.zones[z];
		   }
		   for (var r in data.rules) {
		     _this.rules[r] = data.rules[r];
		   }
		 };
		 this.getAllZones = function () {
		   var arr = [];
		   for (var z in this.zones) { arr.push(z); }
		   return arr.sort();
		 };
		 this.parseZones = function (str) {
		   var lines = str.split('\n')
		     , arr = []
		     , chunk = ''
		     , l
		     , zone = null
		     , rule = null;
		   for (var i = 0; i < lines.length; i++) {
		     l = lines[i];
		     if (l.match(/^\s/)) {
		       l = "Zone " + zone + l;
		     }
		     l = l.split("#")[0];
		     if (l.length > 3) {
		       arr = l.split(/\s+/);
		       chunk = arr.shift();
		       //Ignore Leap.
		       switch (chunk) {
		         case 'Zone':
		           zone = arr.shift();
		           if (!_this.zones[zone]) {
		             _this.zones[zone] = [];
		           }
		           if (arr.length < 3) break;
		           //Process zone right here and replace 3rd element with the processed array.
		           arr.splice(3, arr.length, processZone(arr));
		           if (arr[3]) arr[3] = Date.UTC.apply(null, arr[3]);
		           arr[0] = -getBasicOffset(arr[0]);
		           _this.zones[zone].push(arr);
		           break;
		         case 'Rule':
		           rule = arr.shift();
		           if (!_this.rules[rule]) {
		             _this.rules[rule] = [];
		           }
		           //Parse int FROM year and TO year
		           arr[0] = parseInt(arr[0], 10);
		           arr[1] = parseInt(arr[1], 10) || arr[1];
		           //Parse time string AT
		           arr[5] = parseTimeString(arr[5]);
		           //Parse offset SAVE
		           arr[6] = getBasicOffset(arr[6]);
		           _this.rules[rule].push(arr);
		           break;
		         case 'Link':
		           //No zones for these should already exist.
		           if (_this.zones[arr[1]]) {
		             throw new Error('Error with Link ' + arr[1] + '. Cannot create link of a preexisted zone.');
		           }
		           //Create the link.
		           _this.zones[arr[1]] = arr[0];
		           break;
		       }
		     }
		   }
		   return true;
		 };
		 //Expose transport mechanism and allow overwrite.
		 this.transport = _transport;
		 this.getTzInfo = function (dt, tz, isUTC) {
		   //Lazy-load any zones not yet loaded.
		   if (this.loadingScheme === this.loadingSchemes.LAZY_LOAD) {
		     //Get the correct region for the zone.
		     var zoneFile = getRegionForTimezone(tz);
		     if (!zoneFile) {
		       throw new Error('Not a valid timezone ID.');
		     }
		     if (!this.loadedZones[zoneFile]) {
		       //Get the file and parse it -- use synchronous XHR.
		       this.loadZoneFile(zoneFile);
		     }
		   }
		   var z = getZone(dt, tz);
		   var off = z[0];
		   //See if the offset needs adjustment.
		   var rule = getRule(dt, z, isUTC, tz);
		   if (rule) {
		     off = getAdjustedOffset(off, rule[6]);
		   }
		   var abbr = getAbbreviation(z, rule);
		   return { tzOffset: off, tzAbbr: abbr };
		 };
		};
		}).call(this);
		
		/*!
		 * iScroll v4.2.5 ~ Copyright (c) 2012 Matteo Spinelli, http://cubiq.org
		 * Released under MIT license, http://cubiq.org/license
		 */
		(function(window, doc){
		var m = Math,
			dummyStyle = doc.createElement('div').style,
			vendor = (function () {
				var vendors = 't,webkitT,MozT,msT,OT'.split(','),
					t,
					i = 0,
					l = vendors.length;
		
				for ( ; i < l; i++ ) {
					t = vendors[i] + 'ransform';
					if ( t in dummyStyle ) {
						return vendors[i].substr(0, vendors[i].length - 1);
					}
				}
		
				return false;
			})(),
			cssVendor = vendor ? '-' + vendor.toLowerCase() + '-' : '',
		
			// Style properties
			transform = prefixStyle('transform'),
			transitionProperty = prefixStyle('transitionProperty'),
			transitionDuration = prefixStyle('transitionDuration'),
			transformOrigin = prefixStyle('transformOrigin'),
			transitionTimingFunction = prefixStyle('transitionTimingFunction'),
			transitionDelay = prefixStyle('transitionDelay'),
		
		    // Browser capabilities
			isAndroid = (/android/gi).test(navigator.appVersion),
			isIDevice = (/iphone|ipad/gi).test(navigator.appVersion),
			isTouchPad = (/hp-tablet/gi).test(navigator.appVersion),
		
			hasPointerTouch = navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 1, // Microsoft surface for instance
			hasPointerDown = navigator.pointerEnabled,
			hasPointers = hasPointerTouch || hasPointerDown,
		    has3d = prefixStyle('perspective') in dummyStyle,
		    //hasTouch = isIDevice || isAndroid || hasPointerTouch,
		    //hasTouch = ('ontouchstart' in window && !isTouchPad) || hasPointerTouch,
		    hasTransform = vendor !== false,
		    hasTransitionEnd = prefixStyle('transition') in dummyStyle,
		    grabCutoffMS = hasPointers ? 400 : 300,	// Microsoft Surface is a bit less responsive than other devices
		
			RESIZE_EV = 'onorientationchange' in window ? 'orientationchange' : 'resize',
			//START_EV = hasPointerTouch ? 'MSPointerDown' : hasTouch ? 'touchstart' : 'mousedown',
			//MOVE_EV = hasPointerTouch ? 'MSPointerMove' : hasTouch ? 'touchmove' : 'mousemove',
			//END_EV = hasPointerTouch ? 'MSPointerUp' : hasTouch ? 'touchend' : 'mouseup',
			//CANCEL_EV = hasPointerTouch ? 'MSPointerCancel' : hasTouch ? 'touchcancel' : 'mouseup',
			TRNEND_EV = (function () {
				if ( vendor === false ) return false;
		
				var transitionEnd = {
						''			: 'transitionend',
						'webkit'	: 'webkitTransitionEnd',
						'Moz'		: 'transitionend',
						'O'			: 'otransitionend',
						'ms'		: 'MSTransitionEnd'
					};
		
				return transitionEnd[vendor];
			})(),
		
			nextFrame = (function() {
				return window.requestAnimationFrame ||
					window.webkitRequestAnimationFrame ||
					window.mozRequestAnimationFrame ||
					window.oRequestAnimationFrame ||
					window.msRequestAnimationFrame ||
					function(callback) { return setTimeout(callback, 1); };
			})(),
			cancelFrame = (function () {
				return window.cancelRequestAnimationFrame ||
					window.webkitCancelAnimationFrame ||
					window.webkitCancelRequestAnimationFrame ||
					window.mozCancelRequestAnimationFrame ||
					window.oCancelRequestAnimationFrame ||
					window.msCancelRequestAnimationFrame ||
					clearTimeout;
			})(),
		
			// Helpers
			translateZ = has3d ? ' translateZ(0)' : '',
		
			// Constructor
			iScroll = function (el, options) {
				var that = this,
					i;
				
				that.wrapper = typeof el == 'object' ? el : doc.getElementById(el);
				if(that.wrapper==null) return;
		
				that.wrapper.style.overflow = 'hidden';
				that.scroller = options.scroller?options.scroller:that.wrapper.children[0];
				that.touches = [];
		
				// Default options
				that.options = {
					hScroll: true,
					vScroll: true,
					x: 0,
					y: 0,
					bounce: true,
					bounceBottom: true,	// Set to false to prevent bounce at bottom, such as when dynamically creating "load more" element
					bounceTop: true,
					bounceLock: false,
					momentum: true,
					lockDirection: true,
					useTransform: true,
					useTransition: false,
					topOffset: 0,
					checkDOMChanges: false,		// Experimental
					handleClick: true,
		
					// Scrollbar
					hScrollbar: true,
					vScrollbar: true,
					fixedScrollbar: isAndroid,
					hideScrollbar: isIDevice,
					fadeScrollbar: isIDevice && has3d,
					scrollbarClass: '',
		
					// Zoom
					zoom: false,
					zoomMin: 1,
					zoomMax: 4,
					doubleTapZoom: 2,
					wheelAction: 'scroll',
					wheelMultiplier: 6,	// Controls how wheel action manages scroll. Increase as your contained elements get taller.
		
					// Snap
					snap: false,
					snapThreshold: 1,
		
					// Events
					onRefresh: null,
					onBeforeScrollStart: function (e) {
						if(e.target.tagName=="SELECT" || e.target.tagName=="INPUT" || e.tagName=="TEXTAREA" || e.tagName=="BUTTON")
							return;
						if(e.target.getAttribute("noiscroll")) return;
						e.preventDefault();
					},
					onScrollStart: null,
					onBeforeScrollMove: null,
					onScrollMove: null,
					onBeforeScrollEnd: null,
					onScrollEnd: null,
					onTouchEnd: null,
					onDestroy: null,
					onZoomStart: null,
					onZoom: null,
					onZoomEnd: null
				};
		
				// User defined options
				for (i in options) that.options[i] = options[i];
				
				// Set starting position
				that.x = that.options.x;
				that.y = that.options.y;
		
				// Normalize options
				that.options.useTransform = hasTransform && that.options.useTransform;
				that.options.hScrollbar = that.options.hScroll && that.options.hScrollbar;
				that.options.vScrollbar = that.options.vScroll && that.options.vScrollbar;
				that.options.zoom = that.options.useTransform && that.options.zoom;
				that.options.useTransition = hasTransitionEnd && that.options.useTransition;
		
				// Helpers FIX ANDROID BUG!
				// translate3d and scale doesn't work together!
				// Ignoring 3d ONLY WHEN YOU SET that.options.zoom
				if ( that.options.zoom && isAndroid ){
					translateZ = '';
				}
				
				// Set some default styles
				that.scroller.style[transitionProperty] = that.options.useTransform ? cssVendor + 'transform' : 'top left';
				that.scroller.style[transitionDuration] = '0';
				that.scroller.style[transformOrigin] = '0 0';
				if (that.options.useTransition) that.scroller.style[transitionTimingFunction] = 'cubic-bezier(0.33,0.66,0.66,1)';
				
				if (that.options.useTransform) that.scroller.style[transform] = 'translate(' + that.x + 'px,' + that.y + 'px)' + translateZ;
				else that.scroller.style.cssText += ';position:absolute;top:' + that.y + 'px;left:' + that.x + 'px';
		
				if (that.options.useTransition) that.options.fixedScrollbar = true;
		
				that.refresh();
		
				that._bind(RESIZE_EV, window);
				if(hasPointerDown) that._bind("pointerdown");
				if(hasPointerTouch && !hasPointerDown) that._bind("MSPointerDown");
				that._bind("touchstart");
				if(!hasPointers && !isIDevice) that._bind("mousedown");
				//if (!hasTouch) {
					if (that.options.wheelAction != 'none') {
						that._bind('DOMMouseScroll');
						that._bind('mousewheel');
					}
				//}
		
				if (that.options.checkDOMChanges) that.checkDOMTime = setInterval(function () {
					that._checkDOMChanges();
				}, 500);
			};
		
		// Prototype
		iScroll.prototype = {
			enabled: true,
			x: 0,
			y: 0,
			steps: [],
			scale: 1,
			currPageX: 0, currPageY: 0,
			pagesX: [], pagesY: [],
			aniTime: null,
			wheelZoomCount: 0,
			
			handleEvent: function (e) {
				var that = this;
				switch(e.type) {
				case "pointerdown":
				case "MSPointerDown":
				case "touchstart":
						that.hasTouch=true;
						that._start(e);
						break;
					case "mousedown":
						that.hasTouch=false;
						that._start(e);
						break;
					/*case START_EV:
						if (!hasTouch && e.button !== 0) return;
						that._start(e);
						break;*/
					case "pointermove":
					case "MSPointerMove":
					case "touchmove":
					case "mousemove":
						that._move(e); break;
					case "pointercancel":
					case "touchcancel":
					case "MSPointerCancel":
					case "MSPointerUp":
					case "pointerup":
					case "touchend":
					case "mouseup":
						that._end(e); break;
					case RESIZE_EV: that._resize(); break;
					case 'DOMMouseScroll': case 'mousewheel': that._wheel(e); break;
					case TRNEND_EV: that._transitionEnd(e); break;
				}
			},
			
			_checkDOMChanges: function () {
				if (this.moved || this.zoomed || this.animating ||
					(this.scrollerW == this.scroller.offsetWidth * this.scale && this.scrollerH == this.scroller.offsetHeight * this.scale)) return;
		
				this.refresh();
			},
			
			_scrollbar: function (dir) {
				var that = this,
					bar;
		
				if (!that[dir + 'Scrollbar']) {
					if (that[dir + 'ScrollbarWrapper']) {
						if (hasTransform) that[dir + 'ScrollbarIndicator'].style[transform] = '';
						that[dir + 'ScrollbarWrapper'].parentNode.removeChild(that[dir + 'ScrollbarWrapper']);
						that[dir + 'ScrollbarWrapper'] = null;
						that[dir + 'ScrollbarIndicator'] = null;
					}
		
					return;
				}
		
				if (!that[dir + 'ScrollbarWrapper']) {
					// Create the scrollbar wrapper
					bar = doc.createElement('div');
		
					if (that.options.scrollbarClass) bar.className = that.options.scrollbarClass + dir.toUpperCase();
					else bar.style.cssText = 'position:absolute;z-index:100;' + (dir == 'h' ? 'height:7px;bottom:1px;left:2px;right:' + (that.vScrollbar ? '7' : '2') + 'px' : 'width:7px;bottom:' + (that.hScrollbar ? '7' : '2') + 'px;top:2px;right:1px');
		
					bar.style.cssText += ';pointer-events:none;' + cssVendor + 'transition-property:opacity;' + cssVendor + 'transition-duration:' + (that.options.fadeScrollbar ? '350ms' : '0') + ';overflow:hidden;opacity:' + (that.options.hideScrollbar ? '0' : '1');
		
					that.wrapper.appendChild(bar);
					that[dir + 'ScrollbarWrapper'] = bar;
		
					// Create the scrollbar indicator
					bar = doc.createElement('div');
					if (!that.options.scrollbarClass) {
						bar.style.cssText = 'position:absolute;z-index:100;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);' + cssVendor + 'background-clip:padding-box;' + cssVendor + 'box-sizing:border-box;' + (dir == 'h' ? 'height:100%' : 'width:100%') + ';' + cssVendor + 'border-radius:3px;border-radius:3px';
					}
					bar.style.cssText += ';pointer-events:none;' + cssVendor + 'transition-property:' + cssVendor + 'transform;' + cssVendor + 'transition-timing-function:cubic-bezier(0.33,0.66,0.66,1);' + cssVendor + 'transition-duration:0;' + cssVendor + 'transform: translate(0,0)' + translateZ;
					if (that.options.useTransition) bar.style.cssText += ';' + cssVendor + 'transition-timing-function:cubic-bezier(0.33,0.66,0.66,1)';
		
					that[dir + 'ScrollbarWrapper'].appendChild(bar);
					that[dir + 'ScrollbarIndicator'] = bar;
				}
		
				if (dir == 'h') {
					that.hScrollbarSize = that.hScrollbarWrapper.clientWidth;
					that.hScrollbarIndicatorSize = m.max(m.round(that.hScrollbarSize * that.hScrollbarSize / that.scrollerW), 8);
					that.hScrollbarIndicator.style.width = that.hScrollbarIndicatorSize + 'px';
					that.hScrollbarMaxScroll = that.hScrollbarSize - that.hScrollbarIndicatorSize;
					that.hScrollbarProp = that.hScrollbarMaxScroll / that.maxScrollX;
				} else {
					that.vScrollbarSize = that.vScrollbarWrapper.clientHeight;
					that.vScrollbarIndicatorSize = m.max(m.round(that.vScrollbarSize * that.vScrollbarSize / that.scrollerH), 8);
					that.vScrollbarIndicator.style.height = that.vScrollbarIndicatorSize + 'px';
					that.vScrollbarMaxScroll = that.vScrollbarSize - that.vScrollbarIndicatorSize;
					that.vScrollbarProp = that.vScrollbarMaxScroll / that.maxScrollY;
				}
		
				// Reset position
				that._scrollbarPos(dir, true);
			},
			
			_resize: function () {
				var that = this;
				setTimeout(function () { that.refresh(); }, isAndroid ? 200 : 0);
			},
			
			_pos: function (x, y) {
				if (this.zoomed) return;
		
				x = this.hScroll ? x : 0;
				y = this.vScroll ? y : 0;
		
				if (this.options.useTransform) {
					this.scroller.style[transform] = 'translate(' + x + 'px,' + y + 'px) scale(' + this.scale + ')' + translateZ;
				} else {
					x = m.round(x);
					y = m.round(y);
					this.scroller.style.left = x + 'px';
					this.scroller.style.top = y + 'px';
				}
		
				this.x = x;
				this.y = y;
		
				this._scrollbarPos('h');
				this._scrollbarPos('v');
			},
		
			_scrollbarPos: function (dir, hidden) {
				var that = this,
					pos = dir == 'h' ? that.x : that.y,
					size;
		
				if (!that[dir + 'Scrollbar']) return;
		
				pos = that[dir + 'ScrollbarProp'] * pos;
		
				if (pos < 0) {
					if (!that.options.fixedScrollbar) {
						size = that[dir + 'ScrollbarIndicatorSize'] + m.round(pos * 3);
						if (size < 8) size = 8;
						that[dir + 'ScrollbarIndicator'].style[dir == 'h' ? 'width' : 'height'] = size + 'px';
					}
					pos = 0;
				} else if (pos > that[dir + 'ScrollbarMaxScroll']) {
					if (!that.options.fixedScrollbar) {
						size = that[dir + 'ScrollbarIndicatorSize'] - m.round((pos - that[dir + 'ScrollbarMaxScroll']) * 3);
						if (size < 8) size = 8;
						that[dir + 'ScrollbarIndicator'].style[dir == 'h' ? 'width' : 'height'] = size + 'px';
						pos = that[dir + 'ScrollbarMaxScroll'] + (that[dir + 'ScrollbarIndicatorSize'] - size);
					} else {
						pos = that[dir + 'ScrollbarMaxScroll'];
					}
				}
		
				that[dir + 'ScrollbarWrapper'].style[transitionDelay] = '0';
				that[dir + 'ScrollbarWrapper'].style.opacity = hidden && that.options.hideScrollbar ? '0' : '1';
				that[dir + 'ScrollbarIndicator'].style[transform] = 'translate(' + (dir == 'h' ? pos + 'px,0)' : '0,' + pos + 'px)') + translateZ;
			},
			
			_start: function (e) {
				if(hasPointers){
					this.touches[this.touches.length]={
							pointerId:e.pointerId,
							pageX:e.screenX,
							pageY:e.screenY				
					};
					e.touches=this.touches;
				}
				var that = this,
					point = this.hasTouch ? (e.touches && e.touches[0]) : e,
					matrix, x, y,
					c1, c2;
		
				if (!that.enabled) return;
		
				if (that.options.onBeforeScrollStart) that.options.onBeforeScrollStart.call(that, e);
		
				if (that.options.useTransition || that.options.zoom) that._transitionTime(0);
		
				that.moved = false;
				that.animating = false;
				that.zoomed = false;
				that.distX = 0;
				that.distY = 0;
				that.absDistX = 0;
				that.absDistY = 0;
				that.dirX = 0;
				that.dirY = 0;
		
				// Gesture start
				if (that.options.zoom && this.hasTouch && e.touches.length > 1) {
					c1 = m.abs(e.touches[0].pageX-e.touches[1].pageX);
					c2 = m.abs(e.touches[0].pageY-e.touches[1].pageY);
					that.touchesDistStart = m.sqrt(c1 * c1 + c2 * c2);
		
					that.originX = m.abs(e.touches[0].pageX + e.touches[1].pageX - that.wrapperOffsetLeft * 2) / 2 - that.x;
					that.originY = m.abs(e.touches[0].pageY + e.touches[1].pageY - that.wrapperOffsetTop * 2) / 2 - that.y;
		
					if (that.options.onZoomStart) that.options.onZoomStart.call(that, e);
				}
		
				if (that.options.momentum) {
					if (that.options.useTransform) {
						// Very lame general purpose alternative to CSSMatrix
						matrix = getComputedStyle(that.scroller, null)[transform].replace(/[^0-9\-.,]/g, '').split(',');
						x = +(matrix[12] || matrix[4]);
						y = +(matrix[13] || matrix[5]);
					} else {
						x = +getComputedStyle(that.scroller, null).left.replace(/[^0-9-]/g, '');
						y = +getComputedStyle(that.scroller, null).top.replace(/[^0-9-]/g, '');
					}
					
					if (x != that.x || y != that.y) {
						if (that.options.useTransition) that._unbind(TRNEND_EV);
						else cancelFrame(that.aniTime);
						that.steps = [];
						that._pos(x, y);
						if (that.options.onScrollEnd) that.options.onScrollEnd.call(that);
					}
				}
		
				that.absStartX = that.x;	// Needed by snap threshold
				that.absStartY = that.y;
		
				that.startX = that.x;
				that.startY = that.y;
				that.pointX = point.pageX;
				that.pointY = point.pageY;
		
				that.startTime = e.timeStamp || Date.now();
		
				if (that.options.onScrollStart) that.options.onScrollStart.call(that, e);
		
				if(hasPointerDown) that._bind("pointermove", window);
				if(hasPointerTouch && !hasPointerDown) that._bind("MSPointerMove", window);
				that._bind("touchmove", window);
				if(!hasPointers && !isIDevice) that._bind("mousemove", window);
				if(hasPointerDown) that._bind("pointerup", window);
				if(hasPointerTouch && !hasPointerDown) that._bind("MSPointerUp", window);
				that._bind("touchend", window);
				if(!hasPointers && !isIDevice) that._bind("mouseup", window);
				if(hasPointerDown) that._bind("pointercancel", window);
				if(hasPointerTouch && !hasPointerDown) that._bind("MSPointerCancel", window);
				that._bind("touchcancel", window);
				//that._bind(MOVE_EV, window);
				//that._bind(END_EV, window);
				//that._bind(CANCEL_EV, window);
			},
			
			_move: function (e) {
				if(hasPointers){
					for(var i=0;i<this.touches.length;i++){
						if(this.touches[i].pageX==e.screenX && this.touches[i].pageY==e.screenY) return; // pointers fire continuous start events
						this.touches[i].pageX=e.screenX;
						this.touches[i].pageY=e.screenY;
						break;
					}
					e.touches=this.touches;
				}
				var that = this,
					point = this.hasTouch ? e.touches[0] : e,
					deltaX = point.pageX - that.pointX,
					deltaY = point.pageY - that.pointY,
					newX = that.x + deltaX,
					newY = that.y + deltaY,
					c1, c2, scale,
					timestamp = e.timeStamp || Date.now();
		
				if (that.options.onBeforeScrollMove) that.options.onBeforeScrollMove.call(that, e);
		
				// Zoom
				if (that.options.zoom && this.hasTouch && e.touches.length > 1) {
					c1 = m.abs(e.touches[0].pageX - e.touches[1].pageX);
					c2 = m.abs(e.touches[0].pageY - e.touches[1].pageY);
					that.touchesDist = m.sqrt(c1*c1+c2*c2);
		
					that.zoomed = true;
		
					scale = 1 / that.touchesDistStart * that.touchesDist * this.scale;
		
					if (scale < that.options.zoomMin) scale = 0.5 * that.options.zoomMin * Math.pow(2.0, scale / that.options.zoomMin);
					else if (scale > that.options.zoomMax) scale = 2.0 * that.options.zoomMax * Math.pow(0.5, that.options.zoomMax / scale);
		
					that.lastScale = scale / this.scale;
		
					newX = this.originX - this.originX * that.lastScale + this.x,
					newY = this.originY - this.originY * that.lastScale + this.y;
		
					this.scroller.style[transform] = 'translate(' + newX + 'px,' + newY + 'px) scale(' + scale + ')' + translateZ;
		
					if (that.options.onZoom) that.options.onZoom.call(that, e);
					return;
				}
		
				that.pointX = point.pageX;
				that.pointY = point.pageY;
		
				// Slow down if outside of the boundaries
				if (newX > 0 || newX < that.maxScrollX) {
					newX = that.options.bounce ? that.x + (deltaX / 2) : newX >= 0 || that.maxScrollX >= 0 ? 0 : that.maxScrollX;
				}
				if (newY < that.maxScrollY) {
					newY = (that.options.bounce || that.options.bounceBottom) ? that.y + (deltaY / 2) : newY >= that.minScrollY || that.maxScrollY >= 0 ? that.minScrollY : that.maxScrollY;
				}else if (newY > that.minScrollY) { 
					newY = (that.options.bounce || that.options.bounceTop) ? that.y + (deltaY / 2) : newY >= that.minScrollY || that.maxScrollY >= 0 ? that.minScrollY : that.maxScrollY;
				}
		
				that.distX += deltaX;
				that.distY += deltaY;
				that.absDistX = m.abs(that.distX);
				that.absDistY = m.abs(that.distY);
		
				if (that.absDistX < 6 && that.absDistY < 6) {
					return;
				}
		
				// Lock direction
				if (that.options.lockDirection) {
					if (that.absDistX > that.absDistY + 5) {
						newY = that.y;
						deltaY = 0;
					} else if (that.absDistY > that.absDistX + 5) {
						newX = that.x;
						deltaX = 0;
					}
				}
				that.moved = true;
				that._pos(newX, newY);
				that.dirX = deltaX > 0 ? -1 : deltaX < 0 ? 1 : 0;
				that.dirY = deltaY > 0 ? -1 : deltaY < 0 ? 1 : 0;
		
				if (timestamp - that.startTime > grabCutoffMS) {
					that.startTime = timestamp;
					that.startX = that.x;
					that.startY = that.y;
				}
				
				if (that.options.onScrollMove) that.options.onScrollMove.call(that, e);
			},
			
			_end: function (e) {
				if(hasPointers){
					for(var i=0;i<this.touches.length;i++){
						if(this.touches[i].pointerId==e.pointerId){
							this.touches.splice(i,1);
							break;
						}
					}
					e.touches=this.touches;
				}
				if (this.hasTouch && e.touches.length !== 0) return;
		
				var that = this,
					point = (hasPointers) ? e : this.hasTouch ? e.changedTouches[0] : e,
					target, ev,
					momentumX = { dist:0, time:0 },
					momentumY = { dist:0, time:0 },
					duration = (e.timeStamp || Date.now()) - that.startTime,
					newPosX = that.x,
					newPosY = that.y,
					distX, distY,
					newDuration,
					snap,
					scale;
		
					that._unbind("pointermove", window);
					that._unbind("MSPointerMove", window);
					that._unbind("touchmove", window);
					that._unbind("mousemove", window);
					that._unbind("pointerup", window);
					that._unbind("MSPointerUp", window);
					that._unbind("touchend", window);
					that._unbind("mouseup", window);
					that._unbind("pointercancel", window);
					that._unbind("MSPointerCancel", window);
					that._unbind("touchcancel", window);
				//that._unbind(MOVE_EV, window);
				//that._unbind(END_EV, window);
				//that._unbind(CANCEL_EV, window);
		
				if (that.options.onBeforeScrollEnd) that.options.onBeforeScrollEnd.call(that, e);
		
				if (that.zoomed) {
					scale = that.scale * that.lastScale;
					scale = Math.max(that.options.zoomMin, scale);
					scale = Math.min(that.options.zoomMax, scale);
					that.lastScale = scale / that.scale;
					that.scale = scale;
		
					that.x = that.originX - that.originX * that.lastScale + that.x;
					that.y = that.originY - that.originY * that.lastScale + that.y;
					
					that.scroller.style[transitionDuration] = '200ms';
					that.scroller.style[transform] = 'translate(' + that.x + 'px,' + that.y + 'px) scale(' + that.scale + ')' + translateZ;
					
					that.zoomed = false;
					that.refresh();
		
					if (that.options.onZoomEnd) that.options.onZoomEnd.call(that, e);
					return;
				}
		
				if (!that.moved) {
					if (this.hasTouch) {
						if (that.doubleTapTimer && that.options.zoom) {
							// Double tapped
							clearTimeout(that.doubleTapTimer);
							that.doubleTapTimer = null;
							if (that.options.onZoomStart) that.options.onZoomStart.call(that, e);
							that.zoom(that.pointX, that.pointY, that.scale == 1 ? that.options.doubleTapZoom : 1);
							if (that.options.onZoomEnd) {
								setTimeout(function() {
									that.options.onZoomEnd.call(that, e);
								}, 200); // 200 is default zoom duration
							}
						} else if (this.options.handleClick && !(hasPointers)) {	// Microsoft surface has more aggressive onclick events, they'll fire even if iscroll is in effect
							that.doubleTapTimer = setTimeout(function () {
								that.doubleTapTimer = null;
		
								// Find the last touched element
								target = point.target;
								while (target.nodeType != 1) target = target.parentNode;
		
								if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA') {
									ev = doc.createEvent('MouseEvents');
									ev.initMouseEvent('click', true, true, e.view, 1,
										point.screenX, point.screenY, point.clientX, point.clientY,
										e.ctrlKey, e.altKey, e.shiftKey, e.metaKey,
										0, null);
									ev._fake = true;
									target.dispatchEvent(ev);
								}
							}, that.options.zoom ? 250 : 0);
						}
					}
		
					that._resetPos(400);
		
					if (that.options.onTouchEnd) that.options.onTouchEnd.call(that, e);
					return;
				}
				if (duration < grabCutoffMS && that.options.momentum) {
					momentumX = newPosX ? that._momentum(newPosX - that.startX, duration, -that.x, that.scrollerW - that.wrapperW + that.x, that.options.bounce ? that.wrapperW : 0) : momentumX;
					var bounceIt=that.options.bounce;
					if(that.options.bounceBottom && (newPosY - that.startY)<0) bounceIt=true;
					if(that.options.bounceTop && (newPosY - that.startY)>0) bounceIt=true;
					momentumY = newPosY ? that._momentum(newPosY - that.startY, duration, -that.y, (that.maxScrollY < 0 ? that.scrollerH - that.wrapperH + that.y - that.minScrollY : 0), bounceIt ? that.wrapperH : 0) : momentumY;
		
					newPosX = that.x + momentumX.dist;
					newPosY = that.y + momentumY.dist;
		
		 			if ((that.x > 0 && newPosX > 0) || (that.x < that.maxScrollX && newPosX < that.maxScrollX)) momentumX = { dist:0, time:0 };
		 			if ((that.y > that.minScrollY && newPosY > that.minScrollY) || (that.y < that.maxScrollY && newPosY < that.maxScrollY)) momentumY = { dist:0, time:0 };
				}
		
				if (momentumX.dist || momentumY.dist) {
					newDuration = m.max(m.max(momentumX.time, momentumY.time), 10);
		
					// Do we need to snap?
					if (that.options.snap) {
						distX = newPosX - that.absStartX;
						distY = newPosY - that.absStartY;
						if (m.abs(distX) < that.options.snapThreshold && m.abs(distY) < that.options.snapThreshold) { that.scrollTo(that.absStartX, that.absStartY, 200); }
						else {
							snap = that._snap(newPosX, newPosY);
							newPosX = snap.x;
							newPosY = snap.y;
							newDuration = m.max(snap.time, newDuration);
						}
					}
		
					that.scrollTo(m.round(newPosX), m.round(newPosY), newDuration);
		
					if (that.options.onTouchEnd) that.options.onTouchEnd.call(that, e);
					return;
				}
		
				// Do we need to snap?
				if (that.options.snap) {
					distX = newPosX - that.absStartX;
					distY = newPosY - that.absStartY;
					if (m.abs(distX) < that.options.snapThreshold && m.abs(distY) < that.options.snapThreshold) that.scrollTo(that.absStartX, that.absStartY, 200);
					else {
						snap = that._snap(that.x, that.y);
						if (snap.x != that.x || snap.y != that.y) that.scrollTo(snap.x, snap.y, snap.time);
					}
		
					if (that.options.onTouchEnd) that.options.onTouchEnd.call(that, e);
					return;
				}
		
				that._resetPos(200);
				if (that.options.onTouchEnd) that.options.onTouchEnd.call(that, e);
			},
			
			_resetPos: function (time) {
				var that = this,
					resetX = that.x >= 0 ? 0 : that.x < that.maxScrollX ? that.maxScrollX : that.x,
					resetY = that.y >= that.minScrollY || that.maxScrollY > 0 ? that.minScrollY : that.y < that.maxScrollY ? that.maxScrollY : that.y;
		
				if (resetX == that.x && resetY == that.y) {
					if (that.moved) {
						that.moved = false;
						if (that.options.onScrollEnd) that.options.onScrollEnd.call(that);		// Execute custom code on scroll end
					}
		
					if (that.hScrollbar && that.options.hideScrollbar) {
						if (vendor == 'webkit') that.hScrollbarWrapper.style[transitionDelay] = '300ms';
						that.hScrollbarWrapper.style.opacity = '0';
					}
					if (that.vScrollbar && that.options.hideScrollbar) {
						if (vendor == 'webkit') that.vScrollbarWrapper.style[transitionDelay] = '300ms';
						that.vScrollbarWrapper.style.opacity = '0';
					}
		
					return;
				}
		
				that.scrollTo(resetX, resetY, time || 0);
			},
		
			//RB.ChartIQ added fix for FireFox scrolling and decoupled x from y scrolling  
			_wheel: function (e) {
				var that = this,
					wheelDeltaX, wheelDeltaY,
					deltaX, deltaY,
					deltaScale;
		
				if ('wheelDeltaX' in e) {
					wheelDeltaX = e.wheelDeltaX / 12;
					wheelDeltaY = e.wheelDeltaY / 12;
				} else if('wheelDelta' in e) {
					wheelDeltaX = 0;
					wheelDeltaY = e.wheelDelta / 12;
				} else if ('detail' in e) {
					wheelDeltaX = wheelDeltaY = 0;
					if(e.axis){
						if(e.axis==1) wheelDeltaX = -e.detail * that.options.wheelMultiplier;
						else if(e.axis==2) wheelDeltaY = -e.detail * that.options.wheelMultiplier;
					}else{
						wheelDeltaX = wheelDeltaY = -e.detail * that.options.wheelMultiplier;
					}
				} else {
					return;
				}
				
				if (that.options.onBeforeScrollMove) that.options.onBeforeScrollMove.call(that, e);	// Wheel movement should behave like pan
		
				if (that.options.wheelAction == 'zoom') {
					deltaScale = that.scale * Math.pow(2, 1/3 * (wheelDeltaY ? wheelDeltaY / Math.abs(wheelDeltaY) : 0));
					if (deltaScale < that.options.zoomMin) deltaScale = that.options.zoomMin;
					if (deltaScale > that.options.zoomMax) deltaScale = that.options.zoomMax;
					
					if (deltaScale != that.scale) {
						if (!that.wheelZoomCount && that.options.onZoomStart) that.options.onZoomStart.call(that, e);
						that.wheelZoomCount++;
						
						that.zoom(e.pageX, e.pageY, deltaScale, 400);
						
						setTimeout(function() {
							that.wheelZoomCount--;
							if (!that.wheelZoomCount && that.options.onZoomEnd) that.options.onZoomEnd.call(that, e);
						}, 400);
					}
					
					return;
				}
				
				deltaX = that.x + wheelDeltaX;
				deltaY = that.y + wheelDeltaY;
		
				if (deltaX > 0) deltaX = 0;
				else if (deltaX < that.maxScrollX) deltaX = that.maxScrollX;
		
				if (deltaY > that.minScrollY) deltaY = that.minScrollY;
				else if (deltaY < that.maxScrollY) deltaY = that.maxScrollY;
		    
				if (that.maxScrollY < 0) {
					that.scrollTo(deltaX, deltaY, 0);
				}
				if (that.options.onScrollMove) that.options.onScrollMove.call(that, e);	// Wheel movement should replicate pan
			},
			
			_transitionEnd: function (e) {
				var that = this;
		
				if (e.target != that.scroller) return;
		
				that._unbind(TRNEND_EV);
				
				that._startAni();
			},
		
		
			/**
			*
			* Utilities
			*
			*/
			_startAni: function () {
				var that = this,
					startX = that.x, startY = that.y,
					startTime = Date.now(),
					step, easeOut,
					animate;
		
				if (that.animating) return;
				
				if (!that.steps.length) {
					that._resetPos(400);
					return;
				}
				
				step = that.steps.shift();
				
				if (step.x == startX && step.y == startY) step.time = 0;
		
				that.animating = true;
				that.moved = true;
				
				if (that.options.useTransition) {
					that._transitionTime(step.time);
					that._pos(step.x, step.y);
					that.animating = false;
					if (step.time) that._bind(TRNEND_EV);
					else that._resetPos(0);
					return;
				}
		
				animate = function () {
					var now = Date.now(),
						newX, newY;
		
					if (now >= startTime + step.time) {
						that._pos(step.x, step.y);
						that.animating = false;
						if (that.options.onAnimationEnd) that.options.onAnimationEnd.call(that);			// Execute custom code on animation end
						that._startAni();
						return;
					}
		
					now = (now - startTime) / step.time - 1;
					easeOut = m.sqrt(1 - now * now);
					newX = (step.x - startX) * easeOut + startX;
					newY = (step.y - startY) * easeOut + startY;
					that._pos(newX, newY);
					if (that.animating) that.aniTime = nextFrame(animate);
				};
		
				animate();
			},
		
			_transitionTime: function (time) {
				time += 'ms';
				this.scroller.style[transitionDuration] = time;
				if (this.hScrollbar) this.hScrollbarIndicator.style[transitionDuration] = time;
				if (this.vScrollbar) this.vScrollbarIndicator.style[transitionDuration] = time;
			},
		
			_momentum: function (dist, time, maxDistUpper, maxDistLower, size) {
				var deceleration = 0.0006,
					speed = m.abs(dist) / time,
					newDist = (speed * speed) / (2 * deceleration),
					newTime = 0, outsideDist = 0;
		
				// Proportinally reduce speed if we are outside of the boundaries
				if (dist > 0 && newDist > maxDistUpper) {
					outsideDist = size / (6 / (newDist / speed * deceleration));
					maxDistUpper = maxDistUpper + outsideDist;
					speed = speed * maxDistUpper / newDist;
					newDist = maxDistUpper;
				} else if (dist < 0 && newDist > maxDistLower) {
					outsideDist = size / (6 / (newDist / speed * deceleration));
					maxDistLower = maxDistLower + outsideDist;
					speed = speed * maxDistLower / newDist;
					newDist = maxDistLower;
				}
		
				newDist = newDist * (dist < 0 ? -1 : 1);
				newTime = speed / deceleration;
		
				return { dist: newDist, time: m.round(newTime) };
			},
		
			_offset: function (el) {
				var left = -el.offsetLeft,
					top = -el.offsetTop;
					
				while (el = el.offsetParent) {
					left -= el.offsetLeft;
					top -= el.offsetTop;
				}
				
				if (el != this.wrapper) {
					left *= this.scale;
					top *= this.scale;
				}
		
				return { left: left, top: top };
			},
		
			_snap: function (x, y) {
				var that = this,
					i, l,
					page, time,
					sizeX, sizeY;
		
				// Check page X
				page = that.pagesX.length - 1;
				for (i=0, l=that.pagesX.length; i<l; i++) {
					if (x >= that.pagesX[i]) {
						page = i;
						break;
					}
				}
				if (page == that.currPageX && page > 0 && that.dirX < 0) page--;
				x = that.pagesX[page];
				sizeX = m.abs(x - that.pagesX[that.currPageX]);
				sizeX = sizeX ? m.abs(that.x - x) / sizeX * 500 : 0;
				that.currPageX = page;
		
				// Check page Y
				page = that.pagesY.length-1;
				for (i=0; i<page; i++) {
					if (y >= that.pagesY[i]) {
						page = i;
						break;
					}
				}
				if (page == that.currPageY && page > 0 && that.dirY < 0) page--;
				y = that.pagesY[page];
				sizeY = m.abs(y - that.pagesY[that.currPageY]);
				sizeY = sizeY ? m.abs(that.y - y) / sizeY * 500 : 0;
				that.currPageY = page;
		
				// Snap with constant speed (proportional duration)
				time = m.round(m.max(sizeX, sizeY)) || 200;
		
				return { x: x, y: y, time: time };
			},
		
			_bind: function (type, el, bubble) {
				(el || this.scroller).addEventListener(type, this, !!bubble);
			},
		
			_unbind: function (type, el, bubble) {
				(el || this.scroller).removeEventListener(type, this, !!bubble);
			},
		
		
			/**
			*
			* Public methods
			*
			*/
			destroy: function () {
				var that = this;
		
				that.scroller.style[transform] = '';
		
				// Remove the scrollbars
				that.hScrollbar = false;
				that.vScrollbar = false;
				that._scrollbar('h');
				that._scrollbar('v');
		
				// Remove the event listeners
				that._unbind("pointerdown");
				that._unbind("MSPointerDown");
				that._unbind("touchstart");
				that._unbind("mousedown");
				that._unbind("pointermove", window);
				that._unbind("MSPointerMove", window);
				that._unbind("touchmove", window);
				that._unbind("mousemove", window);
				that._unbind("pointerup", window);
				that._unbind("MSPointerUp", window);
				that._unbind("touchend", window);
				that._unbind("mouseup", window);
				that._unbind("pointercancel", window);
				that._unbind("MSPointerCancel", window);
				that._unbind("touchcancel", window);
				that._unbind(RESIZE_EV, window);
				//that._unbind(START_EV);
				//that._unbind(MOVE_EV, window);
				//that._unbind(END_EV, window);
				//that._unbind(CANCEL_EV, window);
				
				//if (!that.options.hasTouch) {
					that._unbind('DOMMouseScroll');
					that._unbind('mousewheel');
				//}
				
				if (that.options.useTransition) that._unbind(TRNEND_EV);
				
				if (that.options.checkDOMChanges) clearInterval(that.checkDOMTime);
				
				if (that.options.onDestroy) that.options.onDestroy.call(that);
			},
		
			fixScrollElementWidth: function() {
				// Added by Terry to make horizontal scrolling work
				// https://github.com/cubiq/iscroll/issues/573
				var scrollElement=this.scroller;
				scrollElement.style.width="4000px";	// Temporarily make it huge so that the full offsetWidth's are available for each child
				var scrollWrapper=this.wrapper;
				  // (border-box) width of all children
				  if(!window.isIE8){
				  var width = [].reduce.call(scrollElement.children[0].children, function(sum, element) {
				    return sum + element.offsetWidth; 
				  }, 0);
				  // add some space so last element appears centered
				  // (also fixes last-page identification problem within iScroll)
				  //width += (scrollWrapper.clientWidth - scrollElement.lastElementChild.offsetWidth) / 2;
				  width+=1; // IE 11 cuts off otherwise
				  scrollElement.style.width = width + 'px';
				}
				},
		
			refresh: function () {
				var that = this,
					offset,
					i, l,
					els,
					pos = 0,
					page = 0;
		
				if (that.scale < that.options.zoomMin) that.scale = that.options.zoomMin;
				that.wrapperW = that.wrapper.clientWidth || 1;
				that.wrapperH = that.wrapper.clientHeight || 1;
				if(that.options.hScroll){
					that.fixScrollElementWidth();
				}
		
				that.minScrollY = -that.options.topOffset || 0;
				that.scrollerW = m.round(that.scroller.offsetWidth * that.scale);
				that.scrollerH = m.round((that.scroller.offsetHeight + that.minScrollY) * that.scale);
				that.maxScrollX = that.wrapperW - that.scrollerW;
				that.maxScrollY = that.wrapperH - that.scrollerH + that.minScrollY;
				that.dirX = 0;
				that.dirY = 0;
		
				if (that.options.onRefresh) that.options.onRefresh.call(that);
		
				that.hScroll = that.options.hScroll && that.maxScrollX < 0;
				that.vScroll = that.options.vScroll && (!that.options.bounceLock && !that.hScroll || that.scrollerH > that.wrapperH);
		
				that.hScrollbar = that.hScroll && that.options.hScrollbar;
				that.vScrollbar = that.vScroll && that.options.vScrollbar && that.scrollerH > that.wrapperH;
		
				offset = that._offset(that.wrapper);
				that.wrapperOffsetLeft = -offset.left;
				that.wrapperOffsetTop = -offset.top;
		
				// Prepare snap
				if (typeof that.options.snap == 'string') {
					that.pagesX = [];
					that.pagesY = [];
					els = that.scroller.querySelectorAll(that.options.snap);
					for (i=0, l=els.length; i<l; i++) {
						pos = that._offset(els[i]);
						pos.left += that.wrapperOffsetLeft;
						pos.top += that.wrapperOffsetTop;
						that.pagesX[i] = pos.left < that.maxScrollX ? that.maxScrollX : pos.left * that.scale;
						that.pagesY[i] = pos.top < that.maxScrollY ? that.maxScrollY : pos.top * that.scale;
					}
				} else if (that.options.snap) {
					that.pagesX = [];
					while (pos >= that.maxScrollX) {
						that.pagesX[page] = pos;
						pos = pos - that.wrapperW;
						page++;
					}
					if (that.maxScrollX%that.wrapperW) that.pagesX[that.pagesX.length] = that.maxScrollX - that.pagesX[that.pagesX.length-1] + that.pagesX[that.pagesX.length-1];
		
					pos = 0;
					page = 0;
					that.pagesY = [];
					while (pos >= that.maxScrollY) {
						that.pagesY[page] = pos;
						pos = pos - that.wrapperH;
						page++;
					}
					if (that.maxScrollY%that.wrapperH) that.pagesY[that.pagesY.length] = that.maxScrollY - that.pagesY[that.pagesY.length-1] + that.pagesY[that.pagesY.length-1];
				}
		
				// Prepare the scrollbars
				that._scrollbar('h');
				that._scrollbar('v');
		
				if (!that.zoomed) {
					that.scroller.style[transitionDuration] = '0';
					that._resetPos(400);
				}
			},
		
			scrollTo: function (x, y, time, relative) {
				var that = this,
					step = x,
					i, l;
		
				that.stop();
		
				if (!step.length) step = [{ x: x, y: y, time: time, relative: relative }];
				
				for (i=0, l=step.length; i<l; i++) {
					if (step[i].relative) { step[i].x = that.x - step[i].x; step[i].y = that.y - step[i].y; }
					that.steps.push({ x: step[i].x, y: step[i].y, time: step[i].time || 0 });
				}
		
				that._startAni();
			},
		
			scrollToElement: function (el, time) {
				var that = this, pos;
				el = el.nodeType ? el : that.scroller.querySelector(el);
				if (!el) return;
		
				pos = that._offset(el);
				pos.left += that.wrapperOffsetLeft;
				pos.top += that.wrapperOffsetTop;
		
				pos.left = pos.left > 0 ? 0 : pos.left < that.maxScrollX ? that.maxScrollX : pos.left;
				// This line was causing unwanted bouncing when scrolling to an element in a list that did not fill up the entire containing div
				//pos.top = pos.top > that.minScrollY ? that.minScrollY : pos.top < that.maxScrollY ? that.maxScrollY : pos.top;
				time = time === undefined ? m.max(m.abs(pos.left)*2, m.abs(pos.top)*2) : time;
				if(pos.top!=0 && pos.top<that.maxScrollY) pos.top=that.maxScrollY;
				if(pos.top>0) return;
				that.scrollTo(pos.left, pos.top, time);
			},
		
			scrollToPage: function (pageX, pageY, time) {
				var that = this, x, y;
				
				time = time === undefined ? 400 : time;
		
				if (that.options.onScrollStart) that.options.onScrollStart.call(that);
		
				if (that.options.snap) {
					pageX = pageX == 'next' ? that.currPageX+1 : pageX == 'prev' ? that.currPageX-1 : pageX;
					pageY = pageY == 'next' ? that.currPageY+1 : pageY == 'prev' ? that.currPageY-1 : pageY;
		
					pageX = pageX < 0 ? 0 : pageX > that.pagesX.length-1 ? that.pagesX.length-1 : pageX;
					pageY = pageY < 0 ? 0 : pageY > that.pagesY.length-1 ? that.pagesY.length-1 : pageY;
		
					that.currPageX = pageX;
					that.currPageY = pageY;
					x = that.pagesX[pageX];
					y = that.pagesY[pageY];
				} else {
					x = -that.wrapperW * pageX;
					y = -that.wrapperH * pageY;
					if (x < that.maxScrollX) x = that.maxScrollX;
					if (y < that.maxScrollY) y = that.maxScrollY;
				}
		
				that.scrollTo(x, y, time);
			},
		
			disable: function () {
				this.stop();
				this._resetPos(0);
				this.enabled = false;
		
				// If disabled after touchstart we make sure that there are no left over events
				this._unbind("pointermove", window);
				this._unbind("MSPointerMove", window);
				this._unbind("touchmove", window);
				this._unbind("mousemove", window);
				this._unbind("pointerup", window);
				this._unbind("MSPointerUp", window);
				this._unbind("touchend", window);
				this._unbind("mouseup", window);
				this._unbind("pointercancel", window);
				this._unbind("MSPointerCancel", window);
				this._unbind("touchcancel", window);
				//this._unbind(MOVE_EV, window);
				//this._unbind(END_EV, window);
				//this._unbind(CANCEL_EV, window);
			},
			
			enable: function () {
				this.enabled = true;
			},
			
			stop: function () {
				if (this.options.useTransition) this._unbind(TRNEND_EV);
				else cancelFrame(this.aniTime);
				this.steps = [];
				this.moved = false;
				this.animating = false;
			},
			
			zoom: function (x, y, scale, time) {
				var that = this,
					relScale = scale / that.scale;
		
				if (!that.options.useTransform) return;
		
				that.zoomed = true;
				time = time === undefined ? 200 : time;
				x = x - that.wrapperOffsetLeft - that.x;
				y = y - that.wrapperOffsetTop - that.y;
				that.x = x - x * relScale + that.x;
				that.y = y - y * relScale + that.y;
		
				that.scale = scale;
				that.refresh();
		
				that.x = that.x > 0 ? 0 : that.x < that.maxScrollX ? that.maxScrollX : that.x;
				that.y = that.y > that.minScrollY ? that.minScrollY : that.y < that.maxScrollY ? that.maxScrollY : that.y;
		
				that.scroller.style[transitionDuration] = time + 'ms';
				that.scroller.style[transform] = 'translate(' + that.x + 'px,' + that.y + 'px) scale(' + scale + ')' + translateZ;
				that.zoomed = false;
			},
			
			isReady: function () {
				return !this.moved && !this.zoomed && !this.animating;
			}
		};
		
		function prefixStyle (style) {
			if ( vendor === '' ) return style;
		
			style = style.charAt(0).toUpperCase() + style.substr(1);
			return vendor + style;
		}
		
		dummyStyle = null;	// for the sake of it
		
		_exports.iScroll = iScroll;
		
		})(window, document);
		
		/*! iScroll v5.1.3 ~ (c) 2008-2014 Matteo Spinelli ~ http://cubiq.org/license */
		(function (window, document, Math) {
		var rAF = window.requestAnimationFrame	||
			window.webkitRequestAnimationFrame	||
			window.mozRequestAnimationFrame		||
			window.oRequestAnimationFrame		||
			window.msRequestAnimationFrame		||
			function (callback) { window.setTimeout(callback, 1000 / 60); };

		var utils = (function () {
			var me = {};

			var _elementStyle = document.createElement('div').style;
			var _vendor = (function () {
				var vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'],
					transform,
					i = 0,
					l = vendors.length;

				for ( ; i < l; i++ ) {
					transform = vendors[i] + 'ransform';
					if ( transform in _elementStyle ) return vendors[i].substr(0, vendors[i].length-1);
				}

				return false;
			})();

			function _prefixStyle (style) {
				if ( _vendor === false ) return false;
				if ( _vendor === '' ) return style;
				return _vendor + style.charAt(0).toUpperCase() + style.substr(1);
			}

			me.getTime = Date.now || function getTime () { return new Date().getTime(); };

			me.extend = function (target, obj) {
				for ( var i in obj ) {
					target[i] = obj[i];
				}
			};

			me.addEvent = function (el, type, fn, capture) {
				el.addEventListener(type, fn, !!capture);
			};

			me.removeEvent = function (el, type, fn, capture) {
				el.removeEventListener(type, fn, !!capture);
			};

			me.prefixPointerEvent = function (pointerEvent) {
				return window.MSPointerEvent ? 
					'MSPointer' + pointerEvent.charAt(9).toUpperCase() + pointerEvent.substr(10):
					pointerEvent;
			};

			me.momentum = function (current, start, time, lowerMargin, wrapperSize, deceleration) {
				var distance = current - start,
					speed = Math.abs(distance) / time,
					destination,
					duration;

				deceleration = deceleration === undefined ? 0.0006 : deceleration;

				destination = current + ( speed * speed ) / ( 2 * deceleration ) * ( distance < 0 ? -1 : 1 );
				duration = speed / deceleration;

				if ( destination < lowerMargin ) {
					destination = wrapperSize ? lowerMargin - ( wrapperSize / 2.5 * ( speed / 8 ) ) : lowerMargin;
					distance = Math.abs(destination - current);
					duration = distance / speed;
				} else if ( destination > 0 ) {
					destination = wrapperSize ? wrapperSize / 2.5 * ( speed / 8 ) : 0;
					distance = Math.abs(current) + destination;
					duration = distance / speed;
				}

				return {
					destination: Math.round(destination),
					duration: duration
				};
			};

			var _transform = _prefixStyle('transform');

			me.extend(me, {
				hasTransform: _transform !== false,
				hasPerspective: _prefixStyle('perspective') in _elementStyle,
				hasTouch: 'ontouchstart' in window,
				hasPointer: window.PointerEvent || window.MSPointerEvent, // IE10 is prefixed
				hasTransition: _prefixStyle('transition') in _elementStyle
			});

			// This should find all Android browsers lower than build 535.19 (both stock browser and webview)
			me.isBadAndroid = /Android /.test(window.navigator.appVersion) && !(/Chrome\/\d/.test(window.navigator.appVersion));

			me.extend(me.style = {}, {
				transform: _transform,
				transitionTimingFunction: _prefixStyle('transitionTimingFunction'),
				transitionDuration: _prefixStyle('transitionDuration'),
				transitionDelay: _prefixStyle('transitionDelay'),
				transformOrigin: _prefixStyle('transformOrigin')
			});

			me.hasClass = function (e, c) {
				var re = new RegExp("(^|\\s)" + c + "(\\s|$)");
				return re.test(e.className);
			};

			me.addClass = function (e, c) {
				if ( me.hasClass(e, c) ) {
					return;
				}

				var newclass = e.className.split(' ');
				newclass.push(c);
				e.className = newclass.join(' ');
			};

			me.removeClass = function (e, c) {
				if ( !me.hasClass(e, c) ) {
					return;
				}

				var re = new RegExp("(^|\\s)" + c + "(\\s|$)", 'g');
				e.className = e.className.replace(re, ' ');
			};

			me.offset = function (el) {
				var left = -el.offsetLeft,
					top = -el.offsetTop;

				// jshint -W084
				while (el = el.offsetParent) {
					left -= el.offsetLeft;
					top -= el.offsetTop;
				}
				// jshint +W084

				return {
					left: left,
					top: top
				};
			};

			me.preventDefaultException = function (el, exceptions) {
				for ( var i in exceptions ) {
					if ( exceptions[i].test(el[i]) ) {
						return true;
					}
				}

				return false;
			};

			me.extend(me.eventType = {}, {
				touchstart: 1,
				touchmove: 1,
				touchend: 1,

				mousedown: 2,
				mousemove: 2,
				mouseup: 2,

				pointerdown: 3,
				pointermove: 3,
				pointerup: 3,

				MSPointerDown: 3,
				MSPointerMove: 3,
				MSPointerUp: 3
			});

			me.extend(me.ease = {}, {
				quadratic: {
					style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
					fn: function (k) {
						return k * ( 2 - k );
					}
				},
				circular: {
					style: 'cubic-bezier(0.1, 0.57, 0.1, 1)',	// Not properly "circular" but this looks better, it should be (0.075, 0.82, 0.165, 1)
					fn: function (k) {
						return Math.sqrt( 1 - ( --k * k ) );
					}
				},
				back: {
					style: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
					fn: function (k) {
						var b = 4;
						return ( k = k - 1 ) * k * ( ( b + 1 ) * k + b ) + 1;
					}
				},
				bounce: {
					style: '',
					fn: function (k) {
						if ( ( k /= 1 ) < ( 1 / 2.75 ) ) {
							return 7.5625 * k * k;
						} else if ( k < ( 2 / 2.75 ) ) {
							return 7.5625 * ( k -= ( 1.5 / 2.75 ) ) * k + 0.75;
						} else if ( k < ( 2.5 / 2.75 ) ) {
							return 7.5625 * ( k -= ( 2.25 / 2.75 ) ) * k + 0.9375;
						} else {
							return 7.5625 * ( k -= ( 2.625 / 2.75 ) ) * k + 0.984375;
						}
					}
				},
				elastic: {
					style: '',
					fn: function (k) {
						var f = 0.22,
							e = 0.4;

						if ( k === 0 ) { return 0; }
						if ( k == 1 ) { return 1; }

						return ( e * Math.pow( 2, - 10 * k ) * Math.sin( ( k - f / 4 ) * ( 2 * Math.PI ) / f ) + 1 );
					}
				}
			});

			me.tap = function (e, eventName) {
				var ev = document.createEvent('Event');
				ev.initEvent(eventName, true, true);
				ev.pageX = e.pageX;
				ev.pageY = e.pageY;
				e.target.dispatchEvent(ev);
			};

			me.click = function (e) {
				var target = e.target,
					ev;

				if ( !(/(SELECT|INPUT|TEXTAREA)/i).test(target.tagName) ) {
					ev = document.createEvent('MouseEvents');
					ev.initMouseEvent('click', true, true, e.view, 1,
						target.screenX, target.screenY, target.clientX, target.clientY,
						e.ctrlKey, e.altKey, e.shiftKey, e.metaKey,
						0, null);

					ev._constructed = true;
					target.dispatchEvent(ev);
				}
			};

			return me;
		})();

		function IScroll (el, options) {
			this.wrapper = typeof el == 'string' ? document.querySelector(el) : el;
			this.scroller = this.wrapper.children[0];
			this.scrollerStyle = this.scroller.style;		// cache style for better performance

			this.options = {

				resizeScrollbars: true,

				mouseWheelSpeed: 20,

				snapThreshold: 0.334,

		// INSERT POINT: OPTIONS 

				startX: 0,
				startY: 0,
				scrollY: true,
				directionLockThreshold: 5,
				momentum: true,

				bounce: true,
				bounceTime: 600,
				bounceEasing: '',

				preventDefault: true,
				preventDefaultException: { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/ },

				HWCompositing: true,
				useTransition: true,
				useTransform: true
			};

			for ( var i in options ) {
				this.options[i] = options[i];
			}

			// Normalize options
			this.translateZ = this.options.HWCompositing && utils.hasPerspective ? ' translateZ(0)' : '';

			this.options.useTransition = utils.hasTransition && this.options.useTransition;
			this.options.useTransform = utils.hasTransform && this.options.useTransform;

			this.options.eventPassthrough = this.options.eventPassthrough === true ? 'vertical' : this.options.eventPassthrough;
			this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault;

			// If you want eventPassthrough I have to lock one of the axes
			this.options.scrollY = this.options.eventPassthrough == 'vertical' ? false : this.options.scrollY;
			this.options.scrollX = this.options.eventPassthrough == 'horizontal' ? false : this.options.scrollX;

			// With eventPassthrough we also need lockDirection mechanism
			this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough;
			this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold;

			this.options.bounceEasing = typeof this.options.bounceEasing == 'string' ? utils.ease[this.options.bounceEasing] || utils.ease.circular : this.options.bounceEasing;

			this.options.resizePolling = this.options.resizePolling === undefined ? 60 : this.options.resizePolling;

			if ( this.options.tap === true ) {
				this.options.tap = 'tap';
			}

			if ( this.options.shrinkScrollbars == 'scale' ) {
				this.options.useTransition = false;
			}

			this.options.invertWheelDirection = this.options.invertWheelDirection ? -1 : 1;

			if ( this.options.probeType == 3 ) {
				this.options.useTransition = false;	}

		// INSERT POINT: NORMALIZATION

			// Some defaults	
			this.x = 0;
			this.y = 0;
			this.directionX = 0;
			this.directionY = 0;
			this._events = {};

		// INSERT POINT: DEFAULTS

			this._init();
			this.refresh();

			this.scrollTo(this.options.startX, this.options.startY);
			this.enable();
		}

		IScroll.prototype = {
			version: '5.1.3',

			_init: function () {
				this._initEvents();

				if ( this.options.scrollbars || this.options.indicators ) {
					this._initIndicators();
				}

				this.options.mouseWheel=true; // Terry, turn on mouse wheel by default in iScroll5

				if ( this.options.mouseWheel ) {
					this._initWheel();
				}

				if ( this.options.snap ) {
					this._initSnap();
				}

				if ( this.options.keyBindings ) {
					this._initKeys();
				}

		// INSERT POINT: _init

			},

			destroy: function () {
				this._initEvents(true);

				this._execEvent('destroy');
			},

			_transitionEnd: function (e) {
				if ( e.target != this.scroller || !this.isInTransition ) {
					return;
				}

				this._transitionTime();
				if ( !this.resetPosition(this.options.bounceTime) ) {
					this.isInTransition = false;
					this._execEvent('scrollEnd');
				}
			},

			_start: function (e) {
				// React to left mouse button only
				if ( utils.eventType[e.type] != 1 ) {
					if ( e.button !== 0 ) {
						return;
					}
				}

				if ( !this.enabled || (this.initiated && utils.eventType[e.type] !== this.initiated) ) {
					return;
				}

				if ( this.options.preventDefault && !utils.isBadAndroid && !utils.preventDefaultException(e.target, this.options.preventDefaultException) ) {
					e.preventDefault();
				}

				var point = e.touches ? e.touches[0] : e,
					pos;

				this.initiated	= utils.eventType[e.type];
				this.moved		= false;
				this.distX		= 0;
				this.distY		= 0;
				this.directionX = 0;
				this.directionY = 0;
				this.directionLocked = 0;

				this._transitionTime();

				this.startTime = utils.getTime();

				if ( this.options.useTransition && this.isInTransition ) {
					this.isInTransition = false;
					pos = this.getComputedPosition();
					this._translate(Math.round(pos.x), Math.round(pos.y));
					this._execEvent('scrollEnd');
				} else if ( !this.options.useTransition && this.isAnimating ) {
					this.isAnimating = false;
					this._execEvent('scrollEnd');
				}

				this.startX    = this.x;
				this.startY    = this.y;
				this.absStartX = this.x;
				this.absStartY = this.y;
				this.pointX    = point.pageX;
				this.pointY    = point.pageY;

				this._execEvent('beforeScrollStart');
			},

			_move: function (e) {
				if ( !this.enabled || utils.eventType[e.type] !== this.initiated ) {
					return;
				}

				if ( this.options.preventDefault ) {	// increases performance on Android? TODO: check!
					e.preventDefault();
				}

				var point		= e.touches ? e.touches[0] : e,
					deltaX		= point.pageX - this.pointX,
					deltaY		= point.pageY - this.pointY,
					timestamp	= utils.getTime(),
					newX, newY,
					absDistX, absDistY;

				this.pointX		= point.pageX;
				this.pointY		= point.pageY;

				this.distX		+= deltaX;
				this.distY		+= deltaY;
				absDistX		= Math.abs(this.distX);
				absDistY		= Math.abs(this.distY);

				// We need to move at least 10 pixels for the scrolling to initiate
				if ( timestamp - this.endTime > 300 && (absDistX < 10 && absDistY < 10) ) {
					return;
				}

				// If you are scrolling in one direction lock the other
				if ( !this.directionLocked && !this.options.freeScroll ) {
					if ( absDistX > absDistY + this.options.directionLockThreshold ) {
						this.directionLocked = 'h';		// lock horizontally
					} else if ( absDistY >= absDistX + this.options.directionLockThreshold ) {
						this.directionLocked = 'v';		// lock vertically
					} else {
						this.directionLocked = 'n';		// no lock
					}
				}

				if ( this.directionLocked == 'h' ) {
					if ( this.options.eventPassthrough == 'vertical' ) {
						e.preventDefault();
					} else if ( this.options.eventPassthrough == 'horizontal' ) {
						this.initiated = false;
						return;
					}

					deltaY = 0;
				} else if ( this.directionLocked == 'v' ) {
					if ( this.options.eventPassthrough == 'horizontal' ) {
						e.preventDefault();
					} else if ( this.options.eventPassthrough == 'vertical' ) {
						this.initiated = false;
						return;
					}

					deltaX = 0;
				}

				deltaX = this.hasHorizontalScroll ? deltaX : 0;
				deltaY = this.hasVerticalScroll ? deltaY : 0;

				newX = this.x + deltaX;
				newY = this.y + deltaY;

				// Slow down if outside of the boundaries
				if ( newX > 0 || newX < this.maxScrollX ) {
					newX = this.options.bounce ? this.x + deltaX / 3 : newX > 0 ? 0 : this.maxScrollX;
				}
				if ( newY > 0 || newY < this.maxScrollY ) {
					newY = this.options.bounce ? this.y + deltaY / 3 : newY > 0 ? 0 : this.maxScrollY;
				}

				this.directionX = deltaX > 0 ? -1 : deltaX < 0 ? 1 : 0;
				this.directionY = deltaY > 0 ? -1 : deltaY < 0 ? 1 : 0;

				if ( !this.moved ) {
					this._execEvent('scrollStart');
				}

				this.moved = true;

				this._translate(newX, newY);

		/* REPLACE START: _move */

				if ( timestamp - this.startTime > 300 ) {
					this.startTime = timestamp;
					this.startX = this.x;
					this.startY = this.y;

					if ( this.options.probeType == 1 ) {
						this._execEvent('scroll');
					}
				}

				if ( this.options.probeType > 1 ) {
					this._execEvent('scroll');
				}
		/* REPLACE END: _move */

			},

			_end: function (e) {
				if ( !this.enabled || utils.eventType[e.type] !== this.initiated ) {
					return;
				}

				if ( this.options.preventDefault && !utils.preventDefaultException(e.target, this.options.preventDefaultException) ) {
					e.preventDefault();
				}

				var point = e.changedTouches ? e.changedTouches[0] : e,
					momentumX,
					momentumY,
					duration = utils.getTime() - this.startTime,
					newX = Math.round(this.x),
					newY = Math.round(this.y),
					distanceX = Math.abs(newX - this.startX),
					distanceY = Math.abs(newY - this.startY),
					time = 0,
					easing = '';

				this.isInTransition = 0;
				this.initiated = 0;
				this.endTime = utils.getTime();

				// reset if we are outside of the boundaries
				if ( this.resetPosition(this.options.bounceTime) ) {
					return;
				}

				this.scrollTo(newX, newY);	// ensures that the last position is rounded

				// we scrolled less than 10 pixels
				if ( !this.moved ) {
					if ( this.options.tap ) {
						utils.tap(e, this.options.tap);
					}

					if ( this.options.click ) {
						utils.click(e);
					}

					this._execEvent('scrollCancel');
					return;
				}

				if ( this._events.flick && duration < 200 && distanceX < 100 && distanceY < 100 ) {
					this._execEvent('flick');
					return;
				}

				// start momentum animation if needed
				if ( this.options.momentum && duration < 300 ) {
					momentumX = this.hasHorizontalScroll ? utils.momentum(this.x, this.startX, duration, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0, this.options.deceleration) : { destination: newX, duration: 0 };
					momentumY = this.hasVerticalScroll ? utils.momentum(this.y, this.startY, duration, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0, this.options.deceleration) : { destination: newY, duration: 0 };
					newX = momentumX.destination;
					newY = momentumY.destination;
					time = Math.max(momentumX.duration, momentumY.duration);
					this.isInTransition = 1;
				}


				if ( this.options.snap ) {
					var snap = this._nearestSnap(newX, newY);
					this.currentPage = snap;
					time = this.options.snapSpeed || Math.max(
							Math.max(
								Math.min(Math.abs(newX - snap.x), 1000),
								Math.min(Math.abs(newY - snap.y), 1000)
							), 300);
					newX = snap.x;
					newY = snap.y;

					this.directionX = 0;
					this.directionY = 0;
					easing = this.options.bounceEasing;
				}

		// INSERT POINT: _end

				if ( newX != this.x || newY != this.y ) {
					// change easing function when scroller goes out of the boundaries
					if ( newX > 0 || newX < this.maxScrollX || newY > 0 || newY < this.maxScrollY ) {
						easing = utils.ease.quadratic;
					}

					this.scrollTo(newX, newY, time, easing);
					return;
				}

				this._execEvent('scrollEnd');
			},

			_resize: function () {
				var that = this;

				clearTimeout(this.resizeTimeout);

				this.resizeTimeout = setTimeout(function () {
					that.refresh();
				}, this.options.resizePolling);
			},

			resetPosition: function (time) {
				var x = this.x,
					y = this.y;

				time = time || 0;

				if ( !this.hasHorizontalScroll || this.x > 0 ) {
					x = 0;
				} else if ( this.x < this.maxScrollX ) {
					x = this.maxScrollX;
				}

				if ( !this.hasVerticalScroll || this.y > 0 ) {
					y = 0;
				} else if ( this.y < this.maxScrollY ) {
					y = this.maxScrollY;
				}

				if ( x == this.x && y == this.y ) {
					return false;
				}

				this.scrollTo(x, y, time, this.options.bounceEasing);

				return true;
			},

			disable: function () {
				this.enabled = false;
			},

			enable: function () {
				this.enabled = true;
			},

			refresh: function () {
				var rf = this.wrapper.offsetHeight;		// Force reflow

				this.wrapperWidth	= this.wrapper.clientWidth;
				this.wrapperHeight	= this.wrapper.clientHeight;

		/* REPLACE START: refresh */

				this.scrollerWidth	= this.scroller.offsetWidth;
				this.scrollerHeight	= this.scroller.offsetHeight;

				this.maxScrollX		= this.wrapperWidth - this.scrollerWidth;
				this.maxScrollY		= this.wrapperHeight - this.scrollerHeight;

		/* REPLACE END: refresh */

				this.hasHorizontalScroll	= this.options.scrollX && this.maxScrollX < 0;
				this.hasVerticalScroll		= this.options.scrollY && this.maxScrollY < 0;

				if ( !this.hasHorizontalScroll ) {
					this.maxScrollX = 0;
					this.scrollerWidth = this.wrapperWidth;
				}

				if ( !this.hasVerticalScroll ) {
					this.maxScrollY = 0;
					this.scrollerHeight = this.wrapperHeight;
				}

				this.endTime = 0;
				this.directionX = 0;
				this.directionY = 0;

				this.wrapperOffset = utils.offset(this.wrapper);

				this._execEvent('refresh');

				this.resetPosition();

		// INSERT POINT: _refresh

			},

			on: function (type, fn) {
				if ( !this._events[type] ) {
					this._events[type] = [];
				}

				this._events[type].push(fn);
			},

			off: function (type, fn) {
				if ( !this._events[type] ) {
					return;
				}

				var index = this._events[type].indexOf(fn);

				if ( index > -1 ) {
					this._events[type].splice(index, 1);
				}
			},

			_execEvent: function (type) {
				if ( !this._events[type] ) {
					return;
				}

				var i = 0,
					l = this._events[type].length;

				if ( !l ) {
					return;
				}

				for ( ; i < l; i++ ) {
					this._events[type][i].apply(this, [].slice.call(arguments, 1));
				}
			},

			scrollBy: function (x, y, time, easing) {
				x = this.x + x;
				y = this.y + y;
				time = time || 0;

				this.scrollTo(x, y, time, easing);
			},

			scrollTo: function (x, y, time, easing) {
				easing = easing || utils.ease.circular;

				this.isInTransition = this.options.useTransition && time > 0;

				if ( !time || (this.options.useTransition && easing.style) ) {
					this._transitionTimingFunction(easing.style);
					this._transitionTime(time);
					this._translate(x, y);
				} else {
					this._animate(x, y, time, easing.fn);
				}
			},

			scrollToElement: function (el, time, offsetX, offsetY, easing) {
				el = el.nodeType ? el : this.scroller.querySelector(el);

				if ( !el ) {
					return;
				}

				var pos = utils.offset(el);

				pos.left -= this.wrapperOffset.left;
				pos.top  -= this.wrapperOffset.top;

				// if offsetX/Y are true we center the element to the screen
				if ( offsetX === true ) {
					offsetX = Math.round(el.offsetWidth / 2 - this.wrapper.offsetWidth / 2);
				}
				if ( offsetY === true ) {
					offsetY = Math.round(el.offsetHeight / 2 - this.wrapper.offsetHeight / 2);
				}

				pos.left -= offsetX || 0;
				pos.top  -= offsetY || 0;

				pos.left = pos.left > 0 ? 0 : pos.left < this.maxScrollX ? this.maxScrollX : pos.left;
				pos.top  = pos.top  > 0 ? 0 : pos.top  < this.maxScrollY ? this.maxScrollY : pos.top;

				time = time === undefined || time === null || time === 'auto' ? Math.max(Math.abs(this.x-pos.left), Math.abs(this.y-pos.top)) : time;

				this.scrollTo(pos.left, pos.top, time, easing);
			},

			_transitionTime: function (time) {
				time = time || 0;

				this.scrollerStyle[utils.style.transitionDuration] = time + 'ms';

				if ( !time && utils.isBadAndroid ) {
					this.scrollerStyle[utils.style.transitionDuration] = '0.001s';
				}


				if ( this.indicators ) {
					for ( var i = this.indicators.length; i--; ) {
						this.indicators[i].transitionTime(time);
					}
				}


		// INSERT POINT: _transitionTime

			},

			_transitionTimingFunction: function (easing) {
				this.scrollerStyle[utils.style.transitionTimingFunction] = easing;


				if ( this.indicators ) {
					for ( var i = this.indicators.length; i--; ) {
						this.indicators[i].transitionTimingFunction(easing);
					}
				}


		// INSERT POINT: _transitionTimingFunction

			},

			_translate: function (x, y) {
				if ( this.options.useTransform ) {

		/* REPLACE START: _translate */

					this.scrollerStyle[utils.style.transform] = 'translate(' + x + 'px,' + y + 'px)' + this.translateZ;

		/* REPLACE END: _translate */

				} else {
					x = Math.round(x);
					y = Math.round(y);
					this.scrollerStyle.left = x + 'px';
					this.scrollerStyle.top = y + 'px';
				}

				this.x = x;
				this.y = y;


			if ( this.indicators ) {
				for ( var i = this.indicators.length; i--; ) {
					this.indicators[i].updatePosition();
				}
			}


		// INSERT POINT: _translate

			},

			_initEvents: function (remove) {
				var eventType = remove ? utils.removeEvent : utils.addEvent,
					target = this.options.bindToWrapper ? this.wrapper : window;

				eventType(window, 'orientationchange', this);
				eventType(window, 'resize', this);

				if ( this.options.click ) {
					eventType(this.wrapper, 'click', this, true);
				}

				if ( !this.options.disableMouse ) {
					eventType(this.wrapper, 'mousedown', this);
					eventType(target, 'mousemove', this);
					eventType(target, 'mousecancel', this);
					eventType(target, 'mouseup', this);
				}

				if ( utils.hasPointer && !this.options.disablePointer ) {
					eventType(this.wrapper, utils.prefixPointerEvent('pointerdown'), this);
					eventType(target, utils.prefixPointerEvent('pointermove'), this);
					eventType(target, utils.prefixPointerEvent('pointercancel'), this);
					eventType(target, utils.prefixPointerEvent('pointerup'), this);
				}

				if ( utils.hasTouch && !this.options.disableTouch ) {
					eventType(this.wrapper, 'touchstart', this);
					eventType(target, 'touchmove', this);
					eventType(target, 'touchcancel', this);
					eventType(target, 'touchend', this);
				}

				eventType(this.scroller, 'transitionend', this);
				eventType(this.scroller, 'webkitTransitionEnd', this);
				eventType(this.scroller, 'oTransitionEnd', this);
				eventType(this.scroller, 'MSTransitionEnd', this);
			},

			getComputedPosition: function () {
				var matrix = window.getComputedStyle(this.scroller, null),
					x, y;

				if ( this.options.useTransform ) {
					matrix = matrix[utils.style.transform].split(')')[0].split(', ');
					x = +(matrix[12] || matrix[4]);
					y = +(matrix[13] || matrix[5]);
				} else {
					x = +matrix.left.replace(/[^-\d.]/g, '');
					y = +matrix.top.replace(/[^-\d.]/g, '');
				}

				return { x: x, y: y };
			},

			_initIndicators: function () {
				var interactive = this.options.interactiveScrollbars,
					customStyle = typeof this.options.scrollbars != 'string',
					indicators = [],
					indicator;

				var that = this;

				this.indicators = [];

				if ( this.options.scrollbars ) {
					// Vertical scrollbar
					if ( this.options.scrollY ) {
						indicator = {
							el: createDefaultScrollbar('v', interactive, this.options.scrollbars),
							interactive: interactive,
							defaultScrollbars: true,
							customStyle: customStyle,
							resize: this.options.resizeScrollbars,
							shrink: this.options.shrinkScrollbars,
							fade: this.options.fadeScrollbars,
							listenX: false
						};

						this.wrapper.appendChild(indicator.el);
						indicators.push(indicator);
					}

					// Horizontal scrollbar
					if ( this.options.scrollX ) {
						indicator = {
							el: createDefaultScrollbar('h', interactive, this.options.scrollbars),
							interactive: interactive,
							defaultScrollbars: true,
							customStyle: customStyle,
							resize: this.options.resizeScrollbars,
							shrink: this.options.shrinkScrollbars,
							fade: this.options.fadeScrollbars,
							listenY: false
						};

						this.wrapper.appendChild(indicator.el);
						indicators.push(indicator);
					}
				}

				if ( this.options.indicators ) {
					// TODO: check concat compatibility
					indicators = indicators.concat(this.options.indicators);
				}

				for ( var i = indicators.length; i--; ) {
					this.indicators.push( new Indicator(this, indicators[i]) );
				}

				// TODO: check if we can use array.map (wide compatibility and performance issues)
				function _indicatorsMap (fn) {
					for ( var i = that.indicators.length; i--; ) {
						fn.call(that.indicators[i]);
					}
				}

				if ( this.options.fadeScrollbars ) {
					this.on('scrollEnd', function () {
						_indicatorsMap(function () {
							this.fade();
						});
					});

					this.on('scrollCancel', function () {
						_indicatorsMap(function () {
							this.fade();
						});
					});

					this.on('scrollStart', function () {
						_indicatorsMap(function () {
							this.fade(1);
						});
					});

					this.on('beforeScrollStart', function () {
						_indicatorsMap(function () {
							this.fade(1, true);
						});
					});
				}


				this.on('refresh', function () {
					_indicatorsMap(function () {
						this.refresh();
					});
				});

				this.on('destroy', function () {
					_indicatorsMap(function () {
						this.destroy();
					});

					delete this.indicators;
				});
			},

			_initWheel: function () {
				utils.addEvent(this.wrapper, 'wheel', this);
				utils.addEvent(this.wrapper, 'mousewheel', this);
				utils.addEvent(this.wrapper, 'DOMMouseScroll', this);

				this.on('destroy', function () {
					utils.removeEvent(this.wrapper, 'wheel', this);
					utils.removeEvent(this.wrapper, 'mousewheel', this);
					utils.removeEvent(this.wrapper, 'DOMMouseScroll', this);
				});
			},

			_wheel: function (e) {
				if ( !this.enabled ) {
					return;
				}

				e.preventDefault();
				e.stopPropagation();

				var wheelDeltaX, wheelDeltaY,
					newX, newY,
					that = this;

				if ( this.wheelTimeout === undefined ) {
					that._execEvent('scrollStart');
				}

				// Execute the scrollEnd event after 400ms the wheel stopped scrolling
				clearTimeout(this.wheelTimeout);
				this.wheelTimeout = setTimeout(function () {
					that._execEvent('scrollEnd');
					that.wheelTimeout = undefined;
				}, 400);

				if ( 'deltaX' in e ) {
					if (e.deltaMode === 1) {
						wheelDeltaX = -e.deltaX * this.options.mouseWheelSpeed;
						wheelDeltaY = -e.deltaY * this.options.mouseWheelSpeed;
					} else {
						wheelDeltaX = -e.deltaX;
						wheelDeltaY = -e.deltaY;
					}
				} else if ( 'wheelDeltaX' in e ) {
					wheelDeltaX = e.wheelDeltaX / 120 * this.options.mouseWheelSpeed;
					wheelDeltaY = e.wheelDeltaY / 120 * this.options.mouseWheelSpeed;
				} else if ( 'wheelDelta' in e ) {
					wheelDeltaX = wheelDeltaY = e.wheelDelta / 120 * this.options.mouseWheelSpeed;
				} else if ( 'detail' in e ) {
					wheelDeltaX = wheelDeltaY = -e.detail / 3 * this.options.mouseWheelSpeed;
				} else {
					return;
				}

				wheelDeltaX *= this.options.invertWheelDirection;
				wheelDeltaY *= this.options.invertWheelDirection;

				if ( !this.hasVerticalScroll ) {
					wheelDeltaX = wheelDeltaY;
					wheelDeltaY = 0;
				}

				if ( this.options.snap ) {
					newX = this.currentPage.pageX;
					newY = this.currentPage.pageY;

					if ( wheelDeltaX > 0 ) {
						newX--;
					} else if ( wheelDeltaX < 0 ) {
						newX++;
					}

					if ( wheelDeltaY > 0 ) {
						newY--;
					} else if ( wheelDeltaY < 0 ) {
						newY++;
					}

					this.goToPage(newX, newY);

					return;
				}

				newX = this.x + Math.round(this.hasHorizontalScroll ? wheelDeltaX : 0);
				newY = this.y + Math.round(this.hasVerticalScroll ? wheelDeltaY : 0);

				if ( newX > 0 ) {
					newX = 0;
				} else if ( newX < this.maxScrollX ) {
					newX = this.maxScrollX;
				}

				if ( newY > 0 ) {
					newY = 0;
				} else if ( newY < this.maxScrollY ) {
					newY = this.maxScrollY;
				}

				this.scrollTo(newX, newY, 0);

				if ( this.options.probeType > 1 ) {
					this._execEvent('scroll');
				}

		// INSERT POINT: _wheel
			},

			_initSnap: function () {
				this.currentPage = {};

				if ( typeof this.options.snap == 'string' ) {
					this.options.snap = this.scroller.querySelectorAll(this.options.snap);
				}

				this.on('refresh', function () {
					var i = 0, l,
						m = 0, n,
						cx, cy,
						x = 0, y,
						stepX = this.options.snapStepX || this.wrapperWidth,
						stepY = this.options.snapStepY || this.wrapperHeight,
						el;

					this.pages = [];

					if ( !this.wrapperWidth || !this.wrapperHeight || !this.scrollerWidth || !this.scrollerHeight ) {
						return;
					}

					if ( this.options.snap === true ) {
						cx = Math.round( stepX / 2 );
						cy = Math.round( stepY / 2 );

						while ( x > -this.scrollerWidth ) {
							this.pages[i] = [];
							l = 0;
							y = 0;

							while ( y > -this.scrollerHeight ) {
								this.pages[i][l] = {
									x: Math.max(x, this.maxScrollX),
									y: Math.max(y, this.maxScrollY),
									width: stepX,
									height: stepY,
									cx: x - cx,
									cy: y - cy
								};

								y -= stepY;
								l++;
							}

							x -= stepX;
							i++;
						}
					} else {
						el = this.options.snap;
						l = el.length;
						n = -1;

						for ( ; i < l; i++ ) {
							if ( i === 0 || el[i].offsetLeft <= el[i-1].offsetLeft ) {
								m = 0;
								n++;
							}

							if ( !this.pages[m] ) {
								this.pages[m] = [];
							}

							x = Math.max(-el[i].offsetLeft, this.maxScrollX);
							y = Math.max(-el[i].offsetTop, this.maxScrollY);
							cx = x - Math.round(el[i].offsetWidth / 2);
							cy = y - Math.round(el[i].offsetHeight / 2);

							this.pages[m][n] = {
								x: x,
								y: y,
								width: el[i].offsetWidth,
								height: el[i].offsetHeight,
								cx: cx,
								cy: cy
							};

							if ( x > this.maxScrollX ) {
								m++;
							}
						}
					}

					this.goToPage(this.currentPage.pageX || 0, this.currentPage.pageY || 0, 0);

					// Update snap threshold if needed
					if ( this.options.snapThreshold % 1 === 0 ) {
						this.snapThresholdX = this.options.snapThreshold;
						this.snapThresholdY = this.options.snapThreshold;
					} else {
						this.snapThresholdX = Math.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].width * this.options.snapThreshold);
						this.snapThresholdY = Math.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].height * this.options.snapThreshold);
					}
				});

				this.on('flick', function () {
					var time = this.options.snapSpeed || Math.max(
							Math.max(
								Math.min(Math.abs(this.x - this.startX), 1000),
								Math.min(Math.abs(this.y - this.startY), 1000)
							), 300);

					this.goToPage(
						this.currentPage.pageX + this.directionX,
						this.currentPage.pageY + this.directionY,
						time
					);
				});
			},

			_nearestSnap: function (x, y) {
				if ( !this.pages.length ) {
					return { x: 0, y: 0, pageX: 0, pageY: 0 };
				}

				var i = 0,
					l = this.pages.length,
					m = 0;

				// Check if we exceeded the snap threshold
				if ( Math.abs(x - this.absStartX) < this.snapThresholdX &&
					Math.abs(y - this.absStartY) < this.snapThresholdY ) {
					return this.currentPage;
				}

				if ( x > 0 ) {
					x = 0;
				} else if ( x < this.maxScrollX ) {
					x = this.maxScrollX;
				}

				if ( y > 0 ) {
					y = 0;
				} else if ( y < this.maxScrollY ) {
					y = this.maxScrollY;
				}

				for ( ; i < l; i++ ) {
					if ( x >= this.pages[i][0].cx ) {
						x = this.pages[i][0].x;
						break;
					}
				}

				l = this.pages[i].length;

				for ( ; m < l; m++ ) {
					if ( y >= this.pages[0][m].cy ) {
						y = this.pages[0][m].y;
						break;
					}
				}

				if ( i == this.currentPage.pageX ) {
					i += this.directionX;

					if ( i < 0 ) {
						i = 0;
					} else if ( i >= this.pages.length ) {
						i = this.pages.length - 1;
					}

					x = this.pages[i][0].x;
				}

				if ( m == this.currentPage.pageY ) {
					m += this.directionY;

					if ( m < 0 ) {
						m = 0;
					} else if ( m >= this.pages[0].length ) {
						m = this.pages[0].length - 1;
					}

					y = this.pages[0][m].y;
				}

				return {
					x: x,
					y: y,
					pageX: i,
					pageY: m
				};
			},

			goToPage: function (x, y, time, easing) {
				easing = easing || this.options.bounceEasing;

				if ( x >= this.pages.length ) {
					x = this.pages.length - 1;
				} else if ( x < 0 ) {
					x = 0;
				}

				if ( y >= this.pages[x].length ) {
					y = this.pages[x].length - 1;
				} else if ( y < 0 ) {
					y = 0;
				}

				var posX = this.pages[x][y].x,
					posY = this.pages[x][y].y;

				time = time === undefined ? this.options.snapSpeed || Math.max(
					Math.max(
						Math.min(Math.abs(posX - this.x), 1000),
						Math.min(Math.abs(posY - this.y), 1000)
					), 300) : time;

				this.currentPage = {
					x: posX,
					y: posY,
					pageX: x,
					pageY: y
				};

				this.scrollTo(posX, posY, time, easing);
			},

			next: function (time, easing) {
				var x = this.currentPage.pageX,
					y = this.currentPage.pageY;

				x++;

				if ( x >= this.pages.length && this.hasVerticalScroll ) {
					x = 0;
					y++;
				}

				this.goToPage(x, y, time, easing);
			},

			prev: function (time, easing) {
				var x = this.currentPage.pageX,
					y = this.currentPage.pageY;

				x--;

				if ( x < 0 && this.hasVerticalScroll ) {
					x = 0;
					y--;
				}

				this.goToPage(x, y, time, easing);
			},

			_initKeys: function (e) {
				// default key bindings
				var keys = {
					pageUp: 33,
					pageDown: 34,
					end: 35,
					home: 36,
					left: 37,
					up: 38,
					right: 39,
					down: 40
				};
				var i;

				// if you give me characters I give you keycode
				if ( typeof this.options.keyBindings == 'object' ) {
					for ( i in this.options.keyBindings ) {
						if ( typeof this.options.keyBindings[i] == 'string' ) {
							this.options.keyBindings[i] = this.options.keyBindings[i].toUpperCase().charCodeAt(0);
						}
					}
				} else {
					this.options.keyBindings = {};
				}

				for ( i in keys ) {
					this.options.keyBindings[i] = this.options.keyBindings[i] || keys[i];
				}

				utils.addEvent(window, 'keydown', this);

				this.on('destroy', function () {
					utils.removeEvent(window, 'keydown', this);
				});
			},

			_key: function (e) {
				if ( !this.enabled ) {
					return;
				}

				var snap = this.options.snap,	// we are using this alot, better to cache it
					newX = snap ? this.currentPage.pageX : this.x,
					newY = snap ? this.currentPage.pageY : this.y,
					now = utils.getTime(),
					prevTime = this.keyTime || 0,
					acceleration = 0.250,
					pos;

				if ( this.options.useTransition && this.isInTransition ) {
					pos = this.getComputedPosition();

					this._translate(Math.round(pos.x), Math.round(pos.y));
					this.isInTransition = false;
				}

				this.keyAcceleration = now - prevTime < 200 ? Math.min(this.keyAcceleration + acceleration, 50) : 0;

				switch ( e.keyCode ) {
					case this.options.keyBindings.pageUp:
						if ( this.hasHorizontalScroll && !this.hasVerticalScroll ) {
							newX += snap ? 1 : this.wrapperWidth;
						} else {
							newY += snap ? 1 : this.wrapperHeight;
						}
						break;
					case this.options.keyBindings.pageDown:
						if ( this.hasHorizontalScroll && !this.hasVerticalScroll ) {
							newX -= snap ? 1 : this.wrapperWidth;
						} else {
							newY -= snap ? 1 : this.wrapperHeight;
						}
						break;
					case this.options.keyBindings.end:
						newX = snap ? this.pages.length-1 : this.maxScrollX;
						newY = snap ? this.pages[0].length-1 : this.maxScrollY;
						break;
					case this.options.keyBindings.home:
						newX = 0;
						newY = 0;
						break;
					case this.options.keyBindings.left:
						newX += snap ? -1 : 5 + this.keyAcceleration>>0;
						break;
					case this.options.keyBindings.up:
						newY += snap ? 1 : 5 + this.keyAcceleration>>0;
						break;
					case this.options.keyBindings.right:
						newX -= snap ? -1 : 5 + this.keyAcceleration>>0;
						break;
					case this.options.keyBindings.down:
						newY -= snap ? 1 : 5 + this.keyAcceleration>>0;
						break;
					default:
						return;
				}

				if ( snap ) {
					this.goToPage(newX, newY);
					return;
				}

				if ( newX > 0 ) {
					newX = 0;
					this.keyAcceleration = 0;
				} else if ( newX < this.maxScrollX ) {
					newX = this.maxScrollX;
					this.keyAcceleration = 0;
				}

				if ( newY > 0 ) {
					newY = 0;
					this.keyAcceleration = 0;
				} else if ( newY < this.maxScrollY ) {
					newY = this.maxScrollY;
					this.keyAcceleration = 0;
				}

				this.scrollTo(newX, newY, 0);

				this.keyTime = now;
			},

			_animate: function (destX, destY, duration, easingFn) {
				var that = this,
					startX = this.x,
					startY = this.y,
					startTime = utils.getTime(),
					destTime = startTime + duration;

				function step () {
					var now = utils.getTime(),
						newX, newY,
						easing;

					if ( now >= destTime ) {
						that.isAnimating = false;
						that._translate(destX, destY);
						
						if ( !that.resetPosition(that.options.bounceTime) ) {
							that._execEvent('scrollEnd');
						}

						return;
					}

					now = ( now - startTime ) / duration;
					easing = easingFn(now);
					newX = ( destX - startX ) * easing + startX;
					newY = ( destY - startY ) * easing + startY;
					that._translate(newX, newY);

					if ( that.isAnimating ) {
						rAF(step);
					}

					if ( that.options.probeType == 3 ) {
						that._execEvent('scroll');
					}
				}

				this.isAnimating = true;
				step();
			},

			handleEvent: function (e) {
				switch ( e.type ) {
					case 'touchstart':
					case 'pointerdown':
					case 'MSPointerDown':
					case 'mousedown':
						this._start(e);
						break;
					case 'touchmove':
					case 'pointermove':
					case 'MSPointerMove':
					case 'mousemove':
						this._move(e);
						break;
					case 'touchend':
					case 'pointerup':
					case 'MSPointerUp':
					case 'mouseup':
					case 'touchcancel':
					case 'pointercancel':
					case 'MSPointerCancel':
					case 'mousecancel':
						this._end(e);
						break;
					case 'orientationchange':
					case 'resize':
						this._resize();
						break;
					case 'transitionend':
					case 'webkitTransitionEnd':
					case 'oTransitionEnd':
					case 'MSTransitionEnd':
						this._transitionEnd(e);
						break;
					case 'wheel':
					case 'DOMMouseScroll':
					case 'mousewheel':
						this._wheel(e);
						break;
					case 'keydown':
						this._key(e);
						break;
					case 'click':
						if ( !e._constructed ) {
							e.preventDefault();
							e.stopPropagation();
						}
						break;
				}
			}
		};
		function createDefaultScrollbar (direction, interactive, type) {
			var scrollbar = document.createElement('div'),
				indicator = document.createElement('div');

			if ( type === true ) {
				scrollbar.style.cssText = 'position:absolute;z-index:9999';
				//indicator.style.cssText = '-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px';
			}

			indicator.className = 'iScrollIndicator';

			if ( direction == 'h' ) {
				if ( type === true ) {
					scrollbar.style.cssText += ';height:7px;left:2px;right:2px;bottom:0';
					indicator.style.height = '100%';
				}
				scrollbar.className = 'iScrollHorizontalScrollbar';
			} else {
				if ( type === true ) {
					scrollbar.style.cssText += ';width:7px;bottom:2px;top:2px;right:1px';
					indicator.style.width = '100%';
				}
				scrollbar.className = 'iScrollVerticalScrollbar';
			}

			scrollbar.style.cssText += ';overflow:hidden';

			if ( !interactive ) {
				scrollbar.style.pointerEvents = 'none';
			}

			scrollbar.appendChild(indicator);

			return scrollbar;
		}

		function Indicator (scroller, options) {
			this.wrapper = typeof options.el == 'string' ? document.querySelector(options.el) : options.el;
			this.wrapperStyle = this.wrapper.style;
			this.indicator = this.wrapper.children[0];
			this.indicatorStyle = this.indicator.style;
			this.scroller = scroller;

			this.options = {
				listenX: true,
				listenY: true,
				interactive: false,
				resize: true,
				defaultScrollbars: false,
				shrink: false,
				fade: false,
				speedRatioX: 0,
				speedRatioY: 0
			};

			for ( var i in options ) {
				this.options[i] = options[i];
			}

			this.sizeRatioX = 1;
			this.sizeRatioY = 1;
			this.maxPosX = 0;
			this.maxPosY = 0;

			if ( this.options.interactive ) {
				if ( !this.options.disableTouch ) {
					utils.addEvent(this.indicator, 'touchstart', this);
					utils.addEvent(window, 'touchend', this);
				}
				if ( !this.options.disablePointer ) {
					utils.addEvent(this.indicator, utils.prefixPointerEvent('pointerdown'), this);
					utils.addEvent(window, utils.prefixPointerEvent('pointerup'), this);
				}
				if ( !this.options.disableMouse ) {
					utils.addEvent(this.indicator, 'mousedown', this);
					utils.addEvent(window, 'mouseup', this);
				}
			}

			if ( this.options.fade ) {
				this.wrapperStyle[utils.style.transform] = this.scroller.translateZ;
				this.wrapperStyle[utils.style.transitionDuration] = utils.isBadAndroid ? '0.001s' : '0ms';
				this.wrapperStyle.opacity = '0';
			}
		}

		Indicator.prototype = {
			handleEvent: function (e) {
				switch ( e.type ) {
					case 'touchstart':
					case 'pointerdown':
					case 'MSPointerDown':
					case 'mousedown':
						this._start(e);
						break;
					case 'touchmove':
					case 'pointermove':
					case 'MSPointerMove':
					case 'mousemove':
						this._move(e);
						break;
					case 'touchend':
					case 'pointerup':
					case 'MSPointerUp':
					case 'mouseup':
					case 'touchcancel':
					case 'pointercancel':
					case 'MSPointerCancel':
					case 'mousecancel':
						this._end(e);
						break;
				}
			},

			destroy: function () {
				if ( this.options.interactive ) {
					utils.removeEvent(this.indicator, 'touchstart', this);
					utils.removeEvent(this.indicator, utils.prefixPointerEvent('pointerdown'), this);
					utils.removeEvent(this.indicator, 'mousedown', this);

					utils.removeEvent(window, 'touchmove', this);
					utils.removeEvent(window, utils.prefixPointerEvent('pointermove'), this);
					utils.removeEvent(window, 'mousemove', this);

					utils.removeEvent(window, 'touchend', this);
					utils.removeEvent(window, utils.prefixPointerEvent('pointerup'), this);
					utils.removeEvent(window, 'mouseup', this);
				}

				if ( this.options.defaultScrollbars ) {
					this.wrapper.parentNode.removeChild(this.wrapper);
				}
			},

			_start: function (e) {
				var point = e.touches ? e.touches[0] : e;

				e.preventDefault();
				e.stopPropagation();

				this.transitionTime();

				this.initiated = true;
				this.moved = false;
				this.lastPointX	= point.pageX;
				this.lastPointY	= point.pageY;

				this.startTime	= utils.getTime();

				if ( !this.options.disableTouch ) {
					utils.addEvent(window, 'touchmove', this);
				}
				if ( !this.options.disablePointer ) {
					utils.addEvent(window, utils.prefixPointerEvent('pointermove'), this);
				}
				if ( !this.options.disableMouse ) {
					utils.addEvent(window, 'mousemove', this);
				}

				this.scroller._execEvent('beforeScrollStart');
			},

			_move: function (e) {
				var point = e.touches ? e.touches[0] : e,
					deltaX, deltaY,
					newX, newY,
					timestamp = utils.getTime();

				if ( !this.moved ) {
					this.scroller._execEvent('scrollStart');
				}

				this.moved = true;

				deltaX = point.pageX - this.lastPointX;
				this.lastPointX = point.pageX;

				deltaY = point.pageY - this.lastPointY;
				this.lastPointY = point.pageY;

				newX = this.x + deltaX;
				newY = this.y + deltaY;

				this._pos(newX, newY);


				if ( this.scroller.options.probeType == 1 && timestamp - this.startTime > 300 ) {
					this.startTime = timestamp;
					this.scroller._execEvent('scroll');
				} else if ( this.scroller.options.probeType > 1 ) {
					this.scroller._execEvent('scroll');
				}


		// INSERT POINT: indicator._move

				e.preventDefault();
				e.stopPropagation();
			},

			_end: function (e) {
				if ( !this.initiated ) {
					return;
				}

				this.initiated = false;

				e.preventDefault();
				e.stopPropagation();

				utils.removeEvent(window, 'touchmove', this);
				utils.removeEvent(window, utils.prefixPointerEvent('pointermove'), this);
				utils.removeEvent(window, 'mousemove', this);

				if ( this.scroller.options.snap ) {
					var snap = this.scroller._nearestSnap(this.scroller.x, this.scroller.y);

					var time = this.options.snapSpeed || Math.max(
							Math.max(
								Math.min(Math.abs(this.scroller.x - snap.x), 1000),
								Math.min(Math.abs(this.scroller.y - snap.y), 1000)
							), 300);

					if ( this.scroller.x != snap.x || this.scroller.y != snap.y ) {
						this.scroller.directionX = 0;
						this.scroller.directionY = 0;
						this.scroller.currentPage = snap;
						this.scroller.scrollTo(snap.x, snap.y, time, this.scroller.options.bounceEasing);
					}
				}

				if ( this.moved ) {
					this.scroller._execEvent('scrollEnd');
				}
			},

			transitionTime: function (time) {
				time = time || 0;
				this.indicatorStyle[utils.style.transitionDuration] = time + 'ms';

				if ( !time && utils.isBadAndroid ) {
					this.indicatorStyle[utils.style.transitionDuration] = '0.001s';
				}
			},

			transitionTimingFunction: function (easing) {
				this.indicatorStyle[utils.style.transitionTimingFunction] = easing;
			},

			refresh: function () {
				this.transitionTime();

				if ( this.options.listenX && !this.options.listenY ) {
					this.indicatorStyle.display = this.scroller.hasHorizontalScroll ? 'block' : 'none';
				} else if ( this.options.listenY && !this.options.listenX ) {
					this.indicatorStyle.display = this.scroller.hasVerticalScroll ? 'block' : 'none';
				} else {
					this.indicatorStyle.display = this.scroller.hasHorizontalScroll || this.scroller.hasVerticalScroll ? 'block' : 'none';
				}

				if ( this.scroller.hasHorizontalScroll && this.scroller.hasVerticalScroll ) {
					utils.addClass(this.wrapper, 'iScrollBothScrollbars');
					utils.removeClass(this.wrapper, 'iScrollLoneScrollbar');

					if ( this.options.defaultScrollbars && this.options.customStyle ) {
						if ( this.options.listenX ) {
							this.wrapper.style.right = '8px';
						} else {
							this.wrapper.style.bottom = '8px';
						}
					}
				} else {
					utils.removeClass(this.wrapper, 'iScrollBothScrollbars');
					utils.addClass(this.wrapper, 'iScrollLoneScrollbar');

					if ( this.options.defaultScrollbars && this.options.customStyle ) {
						if ( this.options.listenX ) {
							this.wrapper.style.right = '2px';
						} else {
							this.wrapper.style.bottom = '2px';
						}
					}
				}

				var r = this.wrapper.offsetHeight;	// force refresh

				if ( this.options.listenX ) {
					this.wrapperWidth = this.wrapper.clientWidth;
					if ( this.options.resize ) {
						this.indicatorWidth = Math.max(Math.round(this.wrapperWidth * this.wrapperWidth / (this.scroller.scrollerWidth || this.wrapperWidth || 1)), 8);
						this.indicatorStyle.width = this.indicatorWidth + 'px';
					} else {
						this.indicatorWidth = this.indicator.clientWidth;
					}

					this.maxPosX = this.wrapperWidth - this.indicatorWidth;

					if ( this.options.shrink == 'clip' ) {
						this.minBoundaryX = -this.indicatorWidth + 8;
						this.maxBoundaryX = this.wrapperWidth - 8;
					} else {
						this.minBoundaryX = 0;
						this.maxBoundaryX = this.maxPosX;
					}

					this.sizeRatioX = this.options.speedRatioX || (this.scroller.maxScrollX && (this.maxPosX / this.scroller.maxScrollX));	
				}

				if ( this.options.listenY ) {
					this.wrapperHeight = this.wrapper.clientHeight;
					if ( this.options.resize ) {
						this.indicatorHeight = Math.max(Math.round(this.wrapperHeight * this.wrapperHeight / (this.scroller.scrollerHeight || this.wrapperHeight || 1)), 8);
						this.indicatorStyle.height = this.indicatorHeight + 'px';
					} else {
						this.indicatorHeight = this.indicator.clientHeight;
					}

					this.maxPosY = this.wrapperHeight - this.indicatorHeight;

					if ( this.options.shrink == 'clip' ) {
						this.minBoundaryY = -this.indicatorHeight + 8;
						this.maxBoundaryY = this.wrapperHeight - 8;
					} else {
						this.minBoundaryY = 0;
						this.maxBoundaryY = this.maxPosY;
					}

					this.maxPosY = this.wrapperHeight - this.indicatorHeight;
					this.sizeRatioY = this.options.speedRatioY || (this.scroller.maxScrollY && (this.maxPosY / this.scroller.maxScrollY));
				}

				this.updatePosition();
			},

			updatePosition: function () {
				var x = this.options.listenX && Math.round(this.sizeRatioX * this.scroller.x) || 0,
					y = this.options.listenY && Math.round(this.sizeRatioY * this.scroller.y) || 0;

				if ( !this.options.ignoreBoundaries ) {
					if ( x < this.minBoundaryX ) {
						if ( this.options.shrink == 'scale' ) {
							this.width = Math.max(this.indicatorWidth + x, 8);
							this.indicatorStyle.width = this.width + 'px';
						}
						x = this.minBoundaryX;
					} else if ( x > this.maxBoundaryX ) {
						if ( this.options.shrink == 'scale' ) {
							this.width = Math.max(this.indicatorWidth - (x - this.maxPosX), 8);
							this.indicatorStyle.width = this.width + 'px';
							x = this.maxPosX + this.indicatorWidth - this.width;
						} else {
							x = this.maxBoundaryX;
						}
					} else if ( this.options.shrink == 'scale' && this.width != this.indicatorWidth ) {
						this.width = this.indicatorWidth;
						this.indicatorStyle.width = this.width + 'px';
					}

					if ( y < this.minBoundaryY ) {
						if ( this.options.shrink == 'scale' ) {
							this.height = Math.max(this.indicatorHeight + y * 3, 8);
							this.indicatorStyle.height = this.height + 'px';
						}
						y = this.minBoundaryY;
					} else if ( y > this.maxBoundaryY ) {
						if ( this.options.shrink == 'scale' ) {
							this.height = Math.max(this.indicatorHeight - (y - this.maxPosY) * 3, 8);
							this.indicatorStyle.height = this.height + 'px';
							y = this.maxPosY + this.indicatorHeight - this.height;
						} else {
							y = this.maxBoundaryY;
						}
					} else if ( this.options.shrink == 'scale' && this.height != this.indicatorHeight ) {
						this.height = this.indicatorHeight;
						this.indicatorStyle.height = this.height + 'px';
					}
				}

				this.x = x;
				this.y = y;

				if ( this.scroller.options.useTransform ) {
					this.indicatorStyle[utils.style.transform] = 'translate(' + x + 'px,' + y + 'px)' + this.scroller.translateZ;
				} else {
					this.indicatorStyle.left = x + 'px';
					this.indicatorStyle.top = y + 'px';
				}
			},

			_pos: function (x, y) {
				if ( x < 0 ) {
					x = 0;
				} else if ( x > this.maxPosX ) {
					x = this.maxPosX;
				}

				if ( y < 0 ) {
					y = 0;
				} else if ( y > this.maxPosY ) {
					y = this.maxPosY;
				}

				x = this.options.listenX ? Math.round(x / this.sizeRatioX) : this.scroller.x;
				y = this.options.listenY ? Math.round(y / this.sizeRatioY) : this.scroller.y;

				this.scroller.scrollTo(x, y);
			},

			fade: function (val, hold) {
				if ( hold && !this.visible ) {
					return;
				}

				clearTimeout(this.fadeTimeout);
				this.fadeTimeout = null;

				var time = val ? 250 : 500,
					delay = val ? 0 : 300;

				val = val ? '1' : '0';

				this.wrapperStyle[utils.style.transitionDuration] = time + 'ms';

				this.fadeTimeout = setTimeout((function (val) {
					this.wrapperStyle.opacity = val;
					this.visible = +val;
				}).bind(this, val), delay);
			}
		};

		IScroll.utils = utils;

		if ( typeof module != 'undefined' && module.exports ) {
			module.exports = IScroll;
		} else {
			_exports.IScroll5 = IScroll;
		}

		})(window, document, Math);		
		/*
		plotSpline function adapted from http://scaledinnovation.com/analytics/splines/spline.html
		Copyright 2010 by Robin W. Spencer
		Please refer to above URL for licensing information and unmodified source code.
		*/
		function plotSpline(points,tension,context){
			function getControlPoints(i){
				var x0=points[i];
				var y0=points[i+1];
				var x1=points[i+2];
				var y1=points[i+3];
				var x2=points[i+4];
				var y2=points[i+5];
		
				if(isNaN(x0) || isNaN(x1) || isNaN(x2) || isNaN(y0) || isNaN(y1) || isNaN(y2)){
					return null;
				}
				//  x0,y0,x1,y1 are the coordinates of the end (knot) points of this segment
			    //  x2,y2 is the next knot -- not connected here but needed to calculate p2
			    //  p1 is the control point calculated here, from x1 back toward x0.
			    //  p2 is the next control point, calculated here and returned to become the 
			    //  next segment's p1.
			    //  tension controls how far the control points spread.
			    
			    //  Scaling factors: distances from this knot to the previous and following knots.
			    var d01=Math.sqrt(Math.pow(x1-x0,2)+Math.pow(y1-y0,2));
			    var d12=Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2));
			   
			    var fa=tension*d01/(d01+d12);
			    var fb=tension-fa;
			  
			    var p1x=x1+fa*(x0-x2);
			    var p1y=y1+fa*(y0-y2);
		
			    var p2x=x1-fb*(x0-x2);
			    var p2y=y1-fb*(y0-y2);  
			    
			    return [p1x,p1y,p2x,p2y];
			}
		
		    var cp=[];   // array of control points, as x0,y0,x1,y1,...
		    var n=points.length;
			// Draw an open curve, not connected at the ends
		    for(var i=0;i<n-4;i+=2){
		        cp=cp.concat(getControlPoints(i));
		    }
		    if(cp==null) return;
		
			context.save();
		
		    for(var i=2;i<points.length-5;i+=2){
		        context.beginPath();
		        context.moveTo(points[i],points[i+1]);
		        context.bezierCurveTo(cp[2*i-2],cp[2*i-1],cp[2*i],cp[2*i+1],points[i+2],points[i+3]);
		        context.stroke();
		        context.closePath();
		    }
		    //  For open curves the first and last arcs are simple quadratics.
		    context.beginPath();
		    context.moveTo(points[0],points[1]);
		    context.quadraticCurveTo(cp[0],cp[1],points[2],points[3]);
		    context.stroke();
		    context.closePath();
		    
		    context.beginPath();
		    context.moveTo(points[n-2],points[n-1]);
		    context.quadraticCurveTo(cp[2*n-10],cp[2*n-9],points[n-4],points[n-3]);
		    context.stroke();
		    context.closePath();
		
		    context.restore();
		};
		_exports.plotSpline=plotSpline;
		
		//http://jsfiddle.net/JRKwH/1/
		function saveSelection() {
		  if (window.getSelection) {
		      var sel = window.getSelection();
		      if (sel.getRangeAt && sel.rangeCount) {
		          var ranges = [];
		          for (var i = 0, len = sel.rangeCount; i < len; ++i) {
		              ranges.push(sel.getRangeAt(i));
		          }
		          return ranges;
		      }
		  } else if (document.selection && document.selection.createRange) {
		      return document.selection.createRange();
		  }
		  return null;
		}
		function restoreSelection(savedSel) {
		  if (savedSel) {
		      if (window.getSelection) {
		          var sel = window.getSelection();
		          sel.removeAllRanges();
		          for (var i = 0, len = savedSel.length; i < len; ++i) {
		        	  sel.addRange(savedSel[i]);
		          }
		      } else if (document.selection && savedSel.select) {
		          savedSel.select();
		      }
		  }
		}
		_exports.saveSelection=saveSelection;
		_exports.restoreSelection=restoreSelection;
		
		// Console-polyfill. MIT license.
		// https://github.com/paulmillr/console-polyfill
		// Make it safe to do console.log() always.
		(function(con) {
		  'use strict';
		  var prop, method;
		  var empty = {};
		  var dummy = function() {};
		  var properties = 'memory'.split(',');
		  var methods = ('assert,clear,count,debug,dir,dirxml,error,exception,group,' +
		     'groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,' +
		     'table,time,timeEnd,timeStamp,trace,warn').split(',');
		  while (prop = properties.pop()) con[prop] = con[prop] || empty;
		  while (method = methods.pop()) con[method] = con[method] || dummy;
		})(this.console = this.console || {}); // Using `this` for web workers.
		
		
		return _exports;
	
	}
	
	{
		var _stx3rdParty_js_exports={};
		if(typeof exports!=="undefined") _stx3rdParty_js_exports=exports;
		
		if ( typeof define === "function" && define.amd ) {
			define( function() { return _stxThirdParty_js(_stx3rdParty_js_exports); } );
		}else{
			window.STXThirdParty=_stxThirdParty_js(_stx3rdParty_js_exports);
		}
	}
	
})();