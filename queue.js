function Queue() {
}

Queue.tweets = [];

Queue.addItem = function(item) {
  Queue.tweets.push(item);
  // console.log("Queue " + this.tweets);
}

Queue.getNextItem = function() {
  return Queue.tweets.pop();
}


module.exports = Queue;
