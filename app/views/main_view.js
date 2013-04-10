var View     = require('./view')
  , template = require('./templates/main')
  , AlbumsCollectionView = require('./albums')
  , AlbumsCollection = require('../models/albums')
  , AlbumModel = require('../models/album')

module.exports = View.extend({
    el: 'body',
    template: template,
    
    initialize: function(){
        this.albumsCollection = new AlbumsCollection();
        this.constructor.__super__.initialize.apply(this);
        // The above line in coffeescript? simply:
        // super

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
        
        this.myEvents();

    },
    
    myEvents: function() {
        //These belong in the events hash, but I haven't gotten them firing there yet.
        var that = this;
        $('.add-album').off().on('click', function(){
            that.addAlbum();
        });    
    },
    
    
    addAlbum: function(){
        this.albumsCollection.create({
            title: $('.input-title').val(),
            artist: $('.input-artist').val(),
            genre: $('.input-genre').val()
        });
        this.albumsCollectionView.render();        
    }
    
});
