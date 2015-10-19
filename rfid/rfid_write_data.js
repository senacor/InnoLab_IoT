/*
	This module writes "Hello World!" to a RFID tag, then reads the data that was written to it. 
	The authentication key is the default mifare auth key.
	The port used for the RFID reader is defined in "../module.js".
	In case of an authentication error you might have the wrong auth_key or auth_type or you did not
	hold the tag long enough over the reader.
*/
var rfid_commons = require('./rfid_commons.js');
var module = require('../module.js');

module.rfid.on("ready",function(version){
	console.log("RFID reader connected");
	rfid_commons.writeData();
});

module.rfid.on('error', function(err) {
  console.log(err);
});