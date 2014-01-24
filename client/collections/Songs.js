// Songs.js - Defines a backbone collection class for songs.
var Songs = Backbone.Collection.extend({

  model: SongModel,
  localStorage: new Backbone.LocalStorage("song-queue")

});