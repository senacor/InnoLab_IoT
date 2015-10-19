/* imports */
var audio = require('../audio/audio.js');
var module = require('../module.js');

/* variables */
var addr = 0x04;
var auth_key = [0xff,0xff,0xff,0xff,0xff,0xff]; // Authentication key for data block
var new_data = [0x48,0x65,0x6c,0x6c,0x6f,0x20,0x57,0x6f,0x72,0x6c,0x64,0x21,0x0d,0x0a,0x00,0x00]; // New data to write to block
var authType = 0; // Authorization type - 0 for A, 1 for B - A is the most common
var cardUid;

module.rfid.setPollPeriod(2000,function(err){
	if (err) {
        console.log("Set poll error", err);
        module.rfid.startListening();
      }
});

function authenticate(card, afterAuth){
	module.rfid.mifareClassicAuthenticateBlock(card,addr,authType,auth_key,afterAuth);
}

/* functions */
var afterAuthRead = function(err){
	if (err) {
	    console.log("Auth error", err);
	    module.rfid.startListening();
	}else{
		console.log("Successfully authenticated. Key: " + auth_key + " Type: " + authType);
		module.rfid.mifareClassicReadBlock(addr, afterRead);
	}
};

var afterAuthWrite = function(err, data){
    if (err) {
	    console.log("Read error", err);
	    module.rfid.startListening();
    } else {
    	console.log("Writing data to rfid...");
        module.rfid.mifareClassicWriteBlock(addr, new_data, afterWrite);
    }
};

var afterWrite = function(err) {
    if (err){
        console.log("Write error", err);
        module.rfid.startListening();
    } else {
		authenticate(cardUid, afterAuthRead);      
    }
};

var afterRead = function(err, data){
	if (err) {
		console.log("Read error", err);
		module.rfid.startListening();
	} else {
		var text = "";
		for (var i=0; i<data.length; i++) {
	    	text+=String.fromCharCode(data[i]);
		}

		console.log("Data read: ",text);
	}
};

/* exports */
exports.readUid = function(){
	module.rfid.on('data', function(card) {
		console.log('UID:', card.uid.toString('hex'));
		audio.playPew();
	});	
}

exports.readData = function(){
	module.rfid.on('data', function(card) {
		authenticate(card.uid, afterAuthRead);
    });
}

exports.writeData = function(){
	module.rfid.on('data', function(card) {
		cardUid = card.uid;
		authenticate(card.uid, afterAuthWrite);
	});
};
