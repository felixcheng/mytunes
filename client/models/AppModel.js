// App.js - Defines a backbone model class for the whole app.
var AppModel = Backbone.Model.extend({

  initialize: function(params){
    this.set('currentSong', new SongModel());
    this.set('songQueue', []);
    this.set('storageQueue', new SongQueue());
    this.get('storageQueue').fetch();

    /* Note that 'this' is passed as the third argument. That third argument is
    the context. The 'play' handler will always be bound to that context we pass in.
    In this example, we're binding it to the App. This is helpful because otherwise
    the 'this' we use that's actually in the funciton (this.set('currentSong', song)) would
    end up refering to the window. That's just what happens with all JS events. The handlers end up
    getting called from the window (unless we override it, as we do here). */
    params.library.on('play', function(song){
      this.set('currentSong', song);
    }, this);

    params.library.on('enqueue', function(song, playlist) {
      if (playlist > this.get('songQueue').length) {
        alert("That number doesn't match a playlist! Please enter a valid number.");
      } else {
        this.get('songQueue')[playlist].add(song);
        this.get('songQueue')[playlist].playlistNo = playlist;
      }
    }, this);

    params.library.on('dequeue', function(song, playlist) {
      this.get('songQueue')[playlist].dequeue(song);
      this.get('storageQueue').forEach(function(model) {
        if (model.get('title') === song.get('title')) {
          model.destroy();
          return;
        }
      });
    }, this);

    params.library.on('ended', function(song, playlist) {
      var context = this.get('songQueue')[playlist];
      var endedSong= context.ended.bind(context, song);
      endedSong(song);
    }, this);

  }

});
