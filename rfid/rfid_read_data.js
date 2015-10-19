/*
	This module reads the data from the rfid and prints it out to the console. 
	The authentication key is the default mifare auth key.
	The port used for the RFID reader is defined in "../module.js".
*/
var rfid_commons = require('./rfid_commons.js');
var module = require('../module.js');

module.rfid.on("ready",function(version){
	console.log("RFID reader connected");
	rfid_commons.readData();
});

module.rfid.on('error', function(err) {
  console.log(err);
});