// AppView.js - Defines a backbone view class for the whole music app.
var AppView = Backbone.View.extend({
  events: {
    "click .playlistLink": "addPlaylist"
  },
  initialize: function(params){
    this.playerView = new PlayerView({model: this.model.get('currentSong')});
    this.libraryView = new LibraryView({collection: this.model.get('library')});
    $('.container').append(this.render());

    //fetches from local storage
    var results = {};
    var lib = this.model.get('library');

    //builds an array of models from local storage
    this.model.get('storageQueue').forEach(function(model) {
      var thisMod;
      //matching target title with existing songs (not to pass the whole model, just a song)
      lib.forEach(function(mod) {
        if (mod.get('title') === model.get('title')) {
          thisMod = mod;
        }
      });
      var currPlaylist = model.get('playlist');
      results[currPlaylist] = results[currPlaylist] || [];
      results[currPlaylist].push(thisMod);
    });

    for (var key in results){
      var newPlaylist = new SongQueue();
      _.each(results[key], function(mod) {
        mod.set('playlist', key);
        newPlaylist.add(mod);
      });

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
    $('.container').append($("<br />"), songQueueView.render());
  }
});
