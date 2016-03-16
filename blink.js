/*

Morse test

Class creation for multiple lights

*/

console.log("Twitter Morse bot has been started... \n")

// Library Requires
var twit = require('twit'); // twitter library
var config = require('./config'); // twitter API data in a config file that is not on Git
var Decoder = require('./decoder_new'); // my Decoder constructor
var Queue = require('./queue');

// Tweet Variables
var T = new twit(config); // twitter config pulling from file for the library
var tweets = []; // an array to hold tweets.. this is an attempt at a solution (not currently working)

// Queue
// var queue = new Queue();

// My stream it function...
streamIt();
startLeds();

// TWEET FUNCTION : the beginning of the mess...
function streamIt() {
  // Tweet Cleaner
  var myRegex = new RegExp(/(RT\s)|(http+\S*)|(#)|(@\S*\s)+(?=\s|[\s\S]|\n)/g);

  // Stream
  var stream = T.stream('statuses/sample', { lang: ['en','fr'] } ); // this pulls a sample of tweets from twitter (apparently in english or french but this doesnt actually work)

  // This is the built in function for the twit library from npm that pulls the tweets. The call back runs as soon as it has a tweet
  stream.on('tweet', function (tweet) {
    var clnTweet = tweet.text.replace(myRegex, "").toLowerCase(); // I clean up the tweet here with my regex (thankyou)
    Queue.addItem(clnTweet);
  });
}

function startLeds() {
  var leds = [17, 27]; // my led pins on my raspberry
  for (var i = 0; i < leds.length; i++) {
    var decode = new Decoder(leds[i]); // we don't have to keep global reference to this.
    decode.show();
  }
}
