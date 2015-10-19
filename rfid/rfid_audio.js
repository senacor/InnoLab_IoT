/*
	This module reads the UID of a RFID tag. When reading the tag the audio module plays a sound.
	The port used for the RFID reader is defined in "../module.js".
*/
var rfid_commons = require('./rfid_commons.js');
var module = require('../module.js');

module.rfid.on("ready",function(version){
	console.log("RFID reader connected");
	module.audio.on("ready",function(version){
		console.log("Audio module connected! Setting volume...");
	  	module.audio.setVolume(100, function(err) {
	      	if(err) {
	        	return console.log(err);
	      	}
	  	});	
		rfid_commons.readUid();
	});
});

module.rfid.on('error', function(err) {
  console.log(err);
});

module.audio.on('error', function(err) {
  console.log(err);
});