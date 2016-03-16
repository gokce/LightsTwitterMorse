// Fiber
// this is a Synchronous library. Lets me write little blocks of synchronous code (probably causing me grief somewhere)
var Fiber = require('fibers');
var Queue = require('./queue');

// RaspberryPi GPIO
// The raspberry GPIO library
// var gpio = require('onoff').Gpio;
var led;

// My initial constructor variables. Still not getting when to use this.function or variable..
function Decoder(ledNum) {
  // led = new gpio(ledNum, 'out');
  led = ledNum;
}

Decoder.prototype.show = function() {
  this.process(Queue.getNextItem());
}

// Process function
// this is what is called in the blink file.
Decoder.prototype.process = function(message) {
  if (message == null) {
    console.log('No tweets in queue');
    var self = this;
    setTimeout(function() {
      self.show();
    }, 1000);
  } else {
    console.log(Queue.length + " tweets in queue");
    console.log(led + " " + message);
    message = String(message); // for some reason I had to force it into a string otherwise it was throwing "cannot use .length on this object"
    Fiber(function () { // this is the synchronous code library kicking in (I had trouble understanding how this works so I'm sure its going to cause headaches for me)
      console.log("Tweet received.");
      console.log("Decoding \"" + message + "\" into Morse \n")
      for (var i = 0; i < message.length; i++) {
        this.morse(message[i]); // iterates through each letter into the morse translator
      }
      this.show(); // This lines is causing error. It has something to do with Fiber and how 'this' is scoped within fiber

    }).run();
  }

}

// code for the dots in the morse
// also using the Fiber system in the sleep command
dot = function(times) {
  for (var i = 0; i < times; i++) {
    // led.write(1);
    // console.log(led + " write 1");
    this.sleep(1);
    // led.write(0);
    // console.log(led + " write 0");
    this.sleep(1);
  }
}

// code for the dashes in the morse
// also using Fiber
dash = function(times) {
  for (var i = 0; i < times; i++) {
    // led.write(1);
    // console.log(led + " write 1");
    this.sleep(3);
    // led.write(0);
    // console.log(led + " write 0");
    this.sleep(1);
  }
}

// spaces between letters acording to morse rules
newLet = function() {
  this.sleep(3);
}

// spaces acording to morse rules
space = function() {
  this.sleep(7);
}

// each letter and symbol
morse = function(letter) {
  switch(letter) {
    case "a":
      this.dot(1);
      this.dash(1);
      this.newLet();
      break;
    case "b":
      this.dash(1);
      this.dot(3);
      this.newLet();
      break;
    case "c":
      this.dash(1);
      this.dot(1);
      this.dash(1);
      this.dot(1);
      this.newLet();
      break;
    case "d":
      this.dash(1);
      this.dot(2);
      this.newLet();
      break;
    case "e":
      this.dot(1);
      this.newLet();
      break;
    case "f":
      this.dot(2);
      this.dash(1);
      this.dot(1);
      this.newLet();
      break;
    case "g":
      this.dash(2);
      this.dot(1);
      this.newLet();
      break;
    case "h":
      this.dot(4);
      this.newLet();
      break;
    case "i":
      this.dot(2);
      this.newLet();
      break;
    case "j":
      this.dot(1);
      this.dash(3);
      this.newLet();
      break;
    case "k":
      this.dash(1);
      this.dot(1);
      this.dash(1);
      this.newLet();
      break;
    case "l":
      this.dot(1);
      this.dash(1);
      this.dot(2);
      this.newLet();
      break;
    case "m":
      this.dash(2);
      this.newLet();
      break;
    case "n":
      this.dash(1);
      this.dot(1);
      this.newLet();
      break;
    case "o":
      this.dash(3);
      this.newLet();
      break;
    case "p":
      this.dot(1);
      this.dash(2);
      this.dot(1);
      this.newLet();
      break;
    case "q":
      this.dash(2);
      this.dot(1);
      this.dash(1);
      this.newLet();
      break;
    case "r":
      this.dot(1);
      this.dash(1);
      this.dot(1);
      this.newLet();
      break;
    case "s":
      this.dot(3);
      this.newLet();
      break;
    case "t":
      this.dash(1);
      this.newLet();
      break;
    case "u":
      this.dot(2);
      this.dash(1);
      this.newLet();
      break;
    case "v":
      this.dot(3);
      this.dash(1);
      this.newLet();
      break;
    case "w":
      this.dot(1);
      this.dash(2);
      this.newLet();
      break;
    case "x":
      this.dash(1);
      this.dot(2);
      this.dash(1);
      this.newLet();
      break;
    case "y":
      this.dash(1);
      this.dot(1);
      this.dash(2);
      this.newLet();
      break;
    case "z":
      this.dash(2);
      this.dot(2);
      this.newLet();
      break;
    case "0":
      this.dash(5);
      this.newLet();
      break;
    case "1":
      this.dot(1);
      this.dash(4);
      this.newLet();
      break;
    case "2":
      this.dot(2);
      this.dash(3);
      this.newLet();
      break;
    case "3":
      this.dot(3);
      this.dash(2);
      this.newLet();
      break;
    case "4":
      this.dot(4);
      this.dash(1);
      this.newLet();
      break;
    case "5":
      this.dot(5);
      this.newLet();
      break;
    case "6":
      this.dash(1);
      this.dot(4);
      this.newLet();
      break;
    case "7":
      this.dash(2);
      this.dot(3);
      this.newLet();
      break;
    case "8":
      this.dash(3);
      this.dot(2);
      this.newLet();
      break;
    case "9":
      this.dash(4);
      this.dot(1);
      this.newLet();
      break;
    case ".":
      this.dot(1);
      this.dash(1);
      this.dot(1);
      this.dash(1);
      this.dot(1);
      this.dash(1);
      this.newLet();
      break;
    case "?":
      this.dot(2);
      this.dash(2);
      this.dot(2);
      this.newLet();
      break;
    case ",":
      this.dash(2);
      this.dot(2);
      this.dash(2);
      this.newLet();
      break;
    case "@":
      this.dot(1);
      this.dash(2);
      this.dot(1);
      this.dash(1);
      this.dot(1);
      this.newLet();
      break;
    default:
      this.space();
      break;
  }
}

// the sleep function to write the various symbols
sleep = function(secs) {
  secs *= 30;
  var fiber = Fiber.current;
  setTimeout(function() {
    fiber.run();
  }, secs);
  Fiber.yield();
}

// exporting the class (because tutorials said so)
module.exports = Decoder;
