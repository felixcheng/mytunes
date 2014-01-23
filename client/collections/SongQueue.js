// SongQueue.js - Defines a backbone model class for the song queue.
var SongQueue = Songs.extend({

  initialize: function(){
    this.listenTo(this, "add", this.analyze, this);
    // this.listenTo(this, "ended", this.ended, this);
    this.active = false;
  },
  analyze: function(model) {
    if (this.length === 1 && this.active) {
      this.playFirst();
    }
  },
  playFirst: function(){
    this.at(0).play();
  },
  // ended: function() {
  //   if (this.active) {
  //     this.dequeue(this.at(0));
  //     if (this.length ) {
  //         this.playFirst();
  //     }
  //   }
  // }

});