/*global Promise*/
const fin = require('../vendor/openfin.js');

const childWindow = {
	createChildWindow: (config) => {
		return new Promise( (resolve,reject) => {
			if (!fin.desktop.mock){
				fin.desktop.main(() => {
					let win = new fin.desktop.Window(config,
					() => {
						resolve(win);
					},
					(reason) => {
						reject(reason)
					});
				});
			}
			else {
				const options = `
					width=400,
          height=400
          menubar=no,
          location=no,
          resizable=no,
          scrollbars=no,
          status=no`;
				resolve(window.open(config.url, config.name,options));
			}
		});
	}
};

export default childWindow;
