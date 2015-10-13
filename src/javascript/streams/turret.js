//var nerfTurret = require('nerf-turret'),
//	turret = new nerfTurret.Turret({
//		socketServer:'http://nerfapi-openfin.rhcloud.com:8000'
//	}),
//	turretControl = {},
//	active = false;
//
//function subscribe () {
//	var keycodes = {};
//		keycodes['38'] = 'up';
//		keycodes['40'] = 'down';
//		keycodes['37'] = 'left';
//		keycodes['39'] = 'right';
//		keycodes['13'] = 'fire';
//
//    function sendCommand(command) {
//    	if(active) {
//			turret[command]();
//    	}
//    };
//    document.addEventListener('keyup', function(key) {
//        sendCommand('stop');
//    });
//
//    document.addEventListener('keydown', function(key) {
//        var keyVal = keycodes[key.keyCode];
//        if(keyVal) {
//            sendCommand(keyVal);
//        }
//    });
//}
//
//subscribe();
//
//function toggleState() {
//	active = !active;toggleState
//}
//
//turretControl.toggleState = toggleState;
//module.exports = turretControl;