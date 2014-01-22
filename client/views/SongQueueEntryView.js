// SongQueueEntryView.js - Defines a backbone view class for the song queue entries.
var SongQueueEntryView = Backbone.View.extend({
  // your code here!
  tagName: 'li',
  template: _.template("<%= title %>"),
  events: {
    // "enqueue": 
  },
  render: function(){
    this.$el.append(this.template(this.model.attributes));
    return this.$el;
  }

});
