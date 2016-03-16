/*

Morse test

Class creation for multiple lights

*/

console.log("Twitter Morse bot has been started... \n")

// Library Requires
var twit = require('twit'); // twitter library
var config = require('./config'); // twitter API data in a config file that is not on Git
var Decoder = require('./decoder'); // my Decoder constructor

// Tweet Variables
var T = new twit(config); // twitter config pulling from file for the library
var tweets = []; // an array to hold tweets.. this is an attempt at a solution (not currently working)

// Decoder
var led = [17, 27]; // my led pins on my raspberry

// my decoder constructor being created depending on the LED quantity that I have
for (var i = 0; i < led.length; i++) {
  decode[i] = new Decoder(led[i]);
}

// My stream it function...
streamIt();

// TWEET FUNCTION : the beginning of the mess...
function streamIt() {
  // Tweet Cleaner
  var myRegex = new RegExp(/(RT\s)|(http+\S*)|(#)|(@\S*\s)+(?=\s|[\s\S]|\n)/g);

  // Stream
  var stream = T.stream('statuses/sample', { lang: ['en','fr'] } ); // this pulls a sample of tweets from twitter (apparently in english or french but this doesnt actually work)

  // This is the built in function for the twit library from npm that pulls the tweets. The call back runs as soon as it has a tweet
  stream.on('tweet', function (tweet) {
    var clnTweet = tweet.text.replace(myRegex, "").toLowerCase(); // I clean up the tweet here with my regex (thankyou)
    for (var i = decode.length - 1; i >= 0; i--) {
      if (decode[i].ready) { // so then, this checks the ready variable in my Decoder constructor if it is true then it sends it a tweet
        decode[i].process(clnTweet); // it sends that tweet to the process function
        decode[i].ready = false; // then for now it changes the variable in the Decoder to false (I tried doing it in the constructor itself but it didnt work)
      }
    }
  });
}