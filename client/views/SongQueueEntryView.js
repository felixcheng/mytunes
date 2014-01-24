// SongQueueEntryView.js - Defines a backbone view class for the song queue entries.
var SongQueueEntryView = Backbone.View.extend({
  // your code here!
  tagName: 'tr',
  template: _.template("<td><%= title %></td>  <td><%= this.model.get('playCount') %></td>"),
  events: {
    'click': 'dequeue',
  },
  render: function(){
    this.$el.append(this.template(this.model.attributes));
    return this.$el;
  },
  dequeue: function(event){
    this.model.dequeue();
    this.remove();
  }
});
