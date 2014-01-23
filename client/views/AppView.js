// AppView.js - Defines a backbone view class for the whole music app.
var AppView = Backbone.View.extend({
  events: {
    "click .playlistLink": "addPlaylist"
  },
  initialize: function(params){
    this.playerView = new PlayerView({model: this.model.get('currentSong')});
    this.libraryView = new LibraryView({collection: this.model.get('library')});

    this.model.on('change:currentSong', function(model){
      this.playerView.setSong(model.get('currentSong'));
    }, this);
  },

  render: function(){
    return this.$el.html([
      this.playerView.$el,
      this.libraryView.$el,
      $("<a href='#' class='playlistLink'>Add playlist</a>")
    ]);
  },
  addPlaylist: function() {
    var songQueue = new SongQueue();
    var temp = this.model.get('songQueue');
    temp.push(songQueue);
    this.model.set('songQueue', temp);
    var playlistNo = this.model.get('songQueue').length-1;
    var songQueueView = new SongQueueView({collection: songQueue, playlistNo: playlistNo});
    this.$el.append($("<br />"), songQueueView.render());
  }

});
