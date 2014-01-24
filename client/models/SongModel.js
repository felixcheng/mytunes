// SongModel.js - Defines a backbone model class for songs.
var SongModel = Backbone.Model.extend({
  initialize: function() {
  },
  play: function(){
    // Triggering an event here will also trigger the event on the collection
    this.trigger('play', this);
    if (this.get('playCount')) {
      this.set('playCount', this.get('playCount') + 1);
    } else {
      this.set('playCount', 1);
    }
  },
  enqueue: function() {
    var userPlaylist = prompt("To which playlist would yopu like to add the song?");
    this.set('playlist', userPlaylist);
    this.trigger('enqueue', this, this.get('playlist'));
    this.save();
  },
  dequeue: function(){
    this.trigger('dequeue', this, this.get('playlist'));
  },
  ended: function(){
    this.trigger('ended', this, this.get('playlist'));
  }
});
