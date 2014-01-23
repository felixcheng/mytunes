// SongModel.js - Defines a backbone model class for songs.
var SongModel = Backbone.Model.extend({
  initialize: function() {
    this.playCount = 0;
    this.playlist = 0;
  },
  play: function(){
    // Triggering an event here will also trigger the event on the collection
    this.trigger('play', this);
    this.playCount++;
  },
  enqueue: function() {
    this.playlist = prompt("which?");
    this.trigger('enqueue', this, this.playlist);
  },
  dequeue: function(){
    this.trigger('dequeue', this, this.playlist);
  },
  ended: function(){
    this.trigger('ended', this);
  }

});
