/* 

Silent Statement :: StreamBot v 1.0

Twitter bot for Saatchi project as part of Paris College of Art Master's program.
By Sanet Stegmann & Max Franklin

Streamer reads live tweets with hashtags #parisattacks, #bataclan, #prayerforparis and via
serial connection pushes it to a connected arduino board. This in turn converts the string
into a morse message and flashes a connected light. 

2016

*/


console.log("Twitter Morse bot has been started... \n")

// Library Requires
var twit = require('twit');
var config = require('./config');

// Tweet Variables
var T = new twit(config);
var tweets = [];
var decodingTweet = null;

// RaspberryPi GPIO
var gpio = require('onoff').Gpio;
var led = new gpio(17, 'out');

// Fiber
var Fiber = require('fibers');


streamIt();

// TWEET FUNCTION
function streamIt() {
  // Tweet Cleaner
  var myRegex = new RegExp(/(RT\s)|(http+\S*)|(#)|(@\S*\s)+(?=\s|[\s\S]|\n)/g);

	// Stream 
  var stream = T.stream('statuses/sample', { lang: ['en','fr'] } );
  
  stream.on('tweet', function (tweet) {
    var clnTweet = tweet.text.replace(myRegex, "").toLowerCase();
    if (decodingTweet == null) {
      decode(clnTweet);
    }
  });
}


function decode(message) {
  Fiber(function () {
    decodingTweet = message;
    console.log("Tweet received.");
    console.log("Decoding " + decodingTweet + " into Morse... \n")
    for (var i = 0; i < decodingTweet.length; i++) {
      morse(decodingTweet[i]);
    }
    decodingTweet = null;
  }).run();
}

function dot(times) {
  for (var i = 0; i < times; i++) {
    led.write(1);
    sleep(1);
    led.write(0);
    sleep(1); 
  }
}

function dash(times) {
  for (var i = 0; i < times; i++) {
    led.write(1);
    sleep(3);
    led.write(0);
    sleep(1);
  }
}

function newLet() {
  sleep(3);
}

function space() {
  sleep(7);
}

function morse(letter) {
  switch(letter) {
    case "a":
      dot(1);
      dash(1);
      newLet();
      break;
    case "b":
      dash(1);
      dot(3);
      newLet();
      break;
    case "c":
      dash(1);
      dot(1);
      dash(1);
      dot(1);
      newLet();
      break;
    case "d":
      dash(1);
      dot(2);
      newLet();
      break;
    case "e":
      dot(1);
      newLet();
      break;
    case "f":
      dot(2);
      dash(1);
      dot(1);
      newLet();
      break;
    case "g":
      dash(2);
      dot(1);
      newLet();
      break;
    case "h":
      dot(4);
      newLet();
      break;
    case "i":
      dot(2);
      newLet();
      break;
    case "j":
      dot(1);
      dash(3);
      newLet();
      break;
    case "k":
      dash(1);
      dot(1);
      dash(1);
      newLet();
      break;
    case "l":
      dot(1);
      dash(1);
      dot(2);
      newLet();
      break;
    case "m":
      dash(2);
      newLet();
      break;
    case "n":
      dash(1);
      dot(1);
      newLet();
      break;
    case "o":
      dash(3);
      newLet();
      break;
    case "p":
      dot(1);
      dash(2);
      dot(1);
      newLet();
      break;
    case "q":
      dash(2);
      dot(1);
      dash(1);
      newLet();
      break;
    case "r":
      dot(1);
      dash(1);
      dot(1);
      newLet();
      break;
    case "s":
      dot(3);
      newLet();
      break;
    case "t":
      dash(1);
      newLet();
      break;
    case "u":
      dot(2);
      dash(1);
      newLet();
      break;
    case "v":
      dot(3);
      dash(1);
      newLet();
      break;
    case "w":
      dot(1);
      dash(2);
      newLet();
      break;
    case "x":
      dash(1);
      dot(2);
      dash(1);
      newLet();
      break;
    case "y":
      dash(1);
      dot(1);
      dash(2);
      newLet();
      break;
    case "z":
      dash(2);
      dot(2);
      newLet();
      break;
    case "0":
      dash(5);
      newLet();
      break;
    case "1":
      dot(1);
      dash(4);
      newLet();
      break;
    case "2":
      dot(2);
      dash(3);
      newLet();
      break;
    case "3":
      dot(3);
      dash(2);
      newLet();
      break;
    case "4":
      dot(4);
      dash(1);
      newLet();
      break;
    case "5":
      dot(5);
      newLet();
      break;
    case "6":
      dash(1);
      dot(4);
      newLet();
      break;
    case "7":
      dash(2);
      dot(3);
      newLet();
      break;
    case "8":
      dash(3);
      dot(2);
      newLet();
      break;
    case "9":
      dash(4);
      dot(1);
      newLet();
      break;
    case ".":
      dot(1);
      dash(1);
      dot(1);
      dash(1);
      dot(1);
      dash(1);
      newLet();
      break;
    case "?":
      dot(2);
      dash(2);
      dot(2);
      newLet();
      break;
    case ",":
      dash(2);
      dot(2);
      dash(2);
      newLet();
      break;
    case "@":
      dot(1);
      dash(2);
      dot(1);
      dash(1);
      dot(1);
      newLet();
      break;
    default:
      space();
      break;
  }
}

function sleep(secs) {
  secs *= 300;
  var fiber = Fiber.current;
  setTimeout(function() {
    fiber.run();
  }, secs);
  Fiber.yield();
}