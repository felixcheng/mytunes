// SongQueue.js - Defines a backbone model class for the song queue.
var SongQueue = Songs.extend({

  initialize: function(){
    this.listenTo(this, "add", this.analyze, this);
    this.listenTo(this, "ended", this.dequeue, this);
  },
  analyze: function(model) {
    if (this.length === 1) {
      this.playFirst();
    }
  },
  playFirst: function(){
    this.at(0).play();
  },
  dequeue: function() {
    this.remove(this.at(0));
  }

});