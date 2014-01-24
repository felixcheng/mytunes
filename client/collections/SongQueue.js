// SongQueue.js - Defines a backbone model class for the song queue.
var SongQueue = Songs.extend({

  initialize: function(){
    this.listenTo(this, "add", this.analyze, this);
    this.active = false;
    this.playlistNo = 0;
  },
  analyze: function(model) {
    if (this.length === 1 && this.active) {
      this.playFirst();
    }
  },
  playFirst: function(){
    this.at(0).play();
  },
  dequeue: function(song) {
    this.remove(song);
  },
  ended: function(song) {
    song.trigger('dequeue', song, song.get('playlist'));
    if (this.length ) {
      this.playFirst();
    }
  },
  makeActive: function() {
    this.active = true;
    if (this.length) {
      this.playFirst();
    }
  }
});