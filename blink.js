/*

Morse test

Class creation for multiple lights

*/

console.log("Twitter Morse bot has been started... \n")

// Library Requires
var twit = require('twit');
var config = require('./config');
var Decoder = require('./decoder');

// Tweet Variables
var T = new twit(config);
var tweets = [];

// Decoder
var led = [17, 27];
// var decode = [new Decoder(led[0]), new Decoder(led[1])];

for (var i = 0; i < led.length; i++) {
  decode[i] = new Decoder(led[i]);
}

streamIt();

// TWEET FUNCTION
function streamIt() {
  // Tweet Cleaner
  var myRegex = new RegExp(/(RT\s)|(http+\S*)|(#)|(@\S*\s)+(?=\s|[\s\S]|\n)/g);

  // Stream
  var stream = T.stream('statuses/sample', { lang: ['en','fr'] } );

  stream.on('tweet', function (tweet) {
    var clnTweet = tweet.text.replace(myRegex, "").toLowerCase();
    for (var i = decode.length - 1; i >= 0; i--) {
      if (decode[i].ready) {
        decode[i].process(clnTweet, function() {});
        decode[i].ready = false;
      }
    }
  });
}