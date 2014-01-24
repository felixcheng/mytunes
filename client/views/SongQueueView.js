// SongQueueView.js - Defines a backbone view class for the song queue.
var SongQueueView = Backbone.View.extend({
  initialize: function(attrs) {
    this.listenTo(this.collection, "add", this.render, this);
    this.listenTo(this.collection, "remove", this.render, this);
    this.listenTo(this.collection, "change:playCount", this.render, this);
    this.options = attrs;
  },
  events: {
    'click .active': 'makeActive'
  },
  tagName: 'table',
  className: 'songQueue',
  render: function() {
    this.collection.playlistNo = this.options.playlistNo;
    this.$el.html("<th>Playlist " + this.collection.playlistNo + "</th><th><a href='#'class='active'>Play</a></th>");
    this.collection.forEach(this.addEntry, this);
    return this.$el;
  },
  addEntry: function(model) {
    var entryView = new SongQueueEntryView({model: model});
    this.$el.append(entryView.render());
  },
  makeActive: function() {
    $('.selected').css({"background-color": "white"});
    this.collection.makeActive();
    this.$el.css({"background-color": "#F99FDE"});
    this.$el.addClass('selected');
  }
});
