
module.exports = window.fin || {
	desktop: {
		main: (cb)=>{
			if (typeof cb === 'function'){
				cb();
			}
		},
		Window: {
			getCurrent: ()=>{
				return window;
			}
		},
		mock: true
	}
};