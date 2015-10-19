/* imports */
var module = require('../module.js');
var fs = require('fs');

/* local variables */
var isSong1=1;
var song1 = fs.readFileSync('pew.mp3');;
var song2 = fs.readFileSync('scary.mp3');;

function playSong(song){
    module.audio.play(song, function(err) {
      if (err) {
        console.log(err);
      }
    });
}

exports.playPew = function(){    
  if( isSong1 == 1) {
    playSong(song1);
    isSong1 = 0;
  }else{
    playSong(song2);
    isSong1 = 1;
  }    
};






