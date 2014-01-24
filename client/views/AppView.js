// AppView.js - Defines a backbone view class for the whole music app.
var AppView = Backbone.View.extend({
  events: {
    "click .playlistLink": "addPlaylist"
  },
  initialize: function(params){
    this.playerView = new PlayerView({model: this.model.get('currentSong')});
    this.libraryView = new LibraryView({collection: this.model.get('library')});
    $('.container').append(this.render());
    var songQueue = new SongQueue();
    songQueue.fetch();
    var results = {};
    songQueue.forEach(function(model) {
      var currPlaylist = model.get('playlist');
      if (results[currPlaylist]) {
        results[currPlaylist].push(model);
      } else {
        results[currPlaylist] = [];
        results[currPlaylist].push(model);
      }
    });
    // debugger;
    for (var key in results){
      var newPlaylist = new SongQueue();
      for (var i = 0; i < results[key].length; i++) {
        newPlaylist.add(results[key][i]);
      };
      var temp = this.model.get('songQueue');
      temp.push(newPlaylist);
      this.model.set('songQueue', temp);
      var playlistNo = this.model.get('songQueue').length-1;
      var songQueueView = new SongQueueView({collection: newPlaylist, playlistNo: playlistNo});
      $('.container').append($("<br />"), songQueueView.render());

    }

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
