var View     = require('./view')
  , albumTemplate = require('./templates/album')
  , SongsView = require('./songs')
  , SongsCollection = require('../models/songs')


module.exports = View.extend({
    
    initialize: function(){
        this.constructor.__super__.initialize.apply(this);
    },
    
    events: {
        //TODO: Investigate the issue with the events hash
        //"click #title-header": "reSort('title')",
        //"click #artist-header": "reSort('artist')",
        //"click #genre-header": "reSort('genre')"
    },
    render: function(){
        $('#album-list').empty();
        this.collection.each(function(album){
            //$('#album-list').append(album.get('title'));
            $('#album-list').append(albumTemplate({
                //TODO: Look into passing in the model instead
                title: album.get('title'),
                artist: album.get('artist'),
                genre: album.get('genre'),
                id: album.get('id')
            }));
        });
        this.myEvents();

    },    
    
    myEvents: function(){
        var that = this;
        //sorting
        $('#title-header').off().on('click', function(){
            that.reSort('title');
        });
        $('#artist-header').off().on('click', function(){
            that.reSort('artist');
        });
        $('#genre-header').off().on('click', function(){
            that.reSort('genre');
        });
        
        //album removal
        $('.delete-album').off().on('click', function(event){
            that.removeAlbum(event);
        });
        
        //song list population
        $('.album-title').off().on('click', function(event){
            that.populateSongs(event);
        });
    },
    
    reSort: function(column){
        this.collection.comparator = function(model){
            return model.get(column).toLowerCase();
        }
        this.collection.sort();
        this.render();
    },
    
    removeAlbum: function(event){
        delAlbum = this.collection.where({id: $(event.target).data('album-id')})[0];
        delAlbum.destroy();
        this.render();
    },
    
    populateSongs: function(event){
        songsAlbumId =  $(event.target).data('album-id');
        songsCollection = new SongsCollection({albumId: songsAlbumId});
        songsCollection.fetch({success: function(){
            songsView = new SongsView({collection: songsCollection, albumId: songsAlbumId})
            songsView.render();
        }});
    }
});
