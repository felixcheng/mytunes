// AppView.js - Defines a backbone view class for the whole music app.
var AppView = Backbone.View.extend({
  events: {
    "click .playlistLink": "addPlaylist"
  },
  initialize: function(params){
    this.playerView = new PlayerView({model: this.model.get('currentSong')});
    this.libraryView = new LibraryView({collection: this.model.get('library')});
    this.songQueueView = new SongQueueView({collection: this.model.get('songQueue')});

    this.model.on('change:currentSong', function(model){
      this.playerView.setSong(model.get('currentSong'));
    }, this);
  },

  render: function(){
    return this.$el.html([
      this.playerView.$el,
      this.libraryView.$el,
      this.songQueueView.render(),
      $("<br />"),
      $("<a href='#' class='playlistLink'>Add playlist</a>")
    ]);
  },
  addPlaylist: function() {
    var songQueueView = new SongQueueView({collection: new SongQueue()});
    this.$el.append(songQueueView.render());
  }

});
