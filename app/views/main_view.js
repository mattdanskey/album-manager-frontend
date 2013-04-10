var View     = require('./view')
  , template = require('./templates/main')
  , AlbumsCollectionView = require('./albums')
  , AlbumsCollection = require('../models/albums')

module.exports = View.extend({
    el: $('body'),
    template: template,
    
    events: {
        "click #album-header": "reSort('title')",
        "click #artist-header": "reSort('artist')",
        "click #genre-header": "reSort('genre')"
    },
    
    initialize: function(){
        this.albumsCollection = new AlbumsCollection();
        this.constructor.__super__.initialize.apply(this);
        // The above line in coffeescript? simply:
        // super
        console.log('?');

    },
    
    render: function(){
        this.$el.html(this.template(this.getRenderData()));
        this.delegateEvents();
        this.afterRender();

    },
    
    afterRender: function(){
        var that = this;
        this.albumsCollection.fetch({success: function() {
            that.albumsCollectionView = new AlbumsCollectionView({collection: that.albumsCollection});
            that.albumsCollectionView.render();
        }});
        $('#album-header').on('click', function(event){
            console.log('hi');
        });
    },
    
    reSort: function(column){
        console.log('doing something?');
        this.albumsCollection.sortBy(function(album){
            return album.get(column);
        });
        this.albumsCollectionView.render();
    }
    
});
