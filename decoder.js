// Fiber
var Fiber = require('fibers');

// RaspberryPi GPIO
var gpio = require('onoff').Gpio;
var led;


function Decoder(ledNum) {
  led = new gpio(ledNum, 'out');
  this.ready = true;
}

Decoder.prototype.process = function(message, callback) {
  message = String(message);
  Fiber(function () {
    console.log("Tweet received.");
    console.log("Decoding \"" + message + "\" into Morse \n")
    for (var i = 0; i < message.length; i++) {
      this.morse(message[i]);
    }
    this.ready = true;
  }).run();

}

dot = function(times) {
  for (var i = 0; i < times; i++) {
    led.write(1);
    this.sleep(1);
    led.write(0);
    this.sleep(1);
  }
}

dash = function(times) {
  for (var i = 0; i < times; i++) {
    led.write(1);
    this.sleep(3);
    led.write(0);
    this.sleep(1);
  }
}

newLet = function() {
  this.sleep(3);
}

space = function() {
  this.sleep(7);
}

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

sleep = function(secs) {
  secs *= 300;
  var fiber = Fiber.current;
  setTimeout(function() {
    fiber.run();
  }, secs);
  Fiber.yield();
}

// export the class
module.exports = Decoder;