// SongQueueView.js - Defines a backbone view class for the song queue.
var SongQueueView = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.collection, "add", this.render, this);
    this.listenTo(this.collection, "remove", this.render, this);
  },
  events: {
    'click .active': 'makeActive'
  },
  tagName: 'table',
  className: 'songQueue',
  render: function() {
    this.$el.html("<th>Song Queue</th><th><a href='#'class='active'>Active</a></th>");
    this.collection.forEach(this.addEntry, this);
    return this.$el;
  },
  addEntry: function(model) {
    var entryView = new SongQueueEntryView({model: model});
    this.$el.append(entryView.render());
  },
  makeActive: function() {
    
  }

});
