// SongQueueView.js - Defines a backbone view class for the song queue.
var SongQueueView = Backbone.View.extend({
  initialize: function() {
  },
  tagName: 'ol',
  className: 'songQueue',
  render: function() {
    this.collection.forEach(this.addEntry, this);
    return this.$el;
  },
  addEntry: function(model) {
    var entryView = new SongQueueEntryView({model: model});
    this.$el.append(entryView.render());
  }

});
