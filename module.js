var tessel = require('tessel');
var rfidlib = require('rfid-pn532');
var audiolib = require('audio-vs1053b');

var rfid = rfidlib.use(tessel.port['A']);
var audio = audiolib.use(tessel.port['D']);

module.exports = {
  rfid: rfid,
  audio: audio
};