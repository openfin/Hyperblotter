
module.exports = {
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
		}
	}
};