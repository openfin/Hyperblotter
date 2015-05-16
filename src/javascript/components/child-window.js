/*global Promise*/

var fin = require('../vendor/openfin.js');

module.exports = {
	createChildWindow: function(config){
		return new Promise( (resolve,reject)=>{

			if (!fin.desktop.mock){
				fin.desktop.main(()=>{
					var win =  new fin.desktop.Window(config, ()=>{
						resolve(win);
					},
					(reason)=>{
						reject(reason)
					});	
				});
			}
			else {
				resolve(window.open(config.url, config.name, 
					`width=400,
					 height=400
					 menubar=no,
					 location=no,
					 resizable=no,
					 scrollbars=no,
					 status=no`));
			}
		});
	}
};

