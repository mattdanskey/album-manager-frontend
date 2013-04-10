var View     = require('./view')
  , AlbumView = require('./album')
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
            alView = new AlbumView({model: album});
            alView.render();
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
        
        //album events
        $('.delete-album').off().on('click', function(event){
            that.removeAlbum(event);
        });
        $('.add-album').off().on('click', function(){
            that.addAlbum();
        });
        $('.edit-album').off().on('click', function(event){
            that.editAlbum(event);
        });
        $('.save-edit').off().on('click', function(event){
            that.saveEdit(event);
        });
        
        //song list population
        $('.album-title').off().on('click', function(event){
            that.populateSongs(event);
            that.populateAlbumInfo(event);
        });
    },
    
    reSort: function(column){
        this.collection.comparator = function(model){
            return model.get(column).toLowerCase();
        }
        this.collection.sort();
        this.render();
    },
    
    
    addAlbum: function(){
        var that = this;
        this.collection.create({
            title: $('.input-title').val(),
            artist: $('.input-artist').val(),
            genre: $('.input-genre').val()
        },
        {success: function(){
            that.render();
        }});
    },
    
    removeAlbum: function(event){
        var delAlbum = this.collection.where({id: $(event.target).data('album-id')})[0];
        delAlbum.destroy();
        this.render();
    },
    
    editAlbum: function(event){
        var editedAlbum = this.collection.where({id: $(event.target).data('album-id')})[0];
        $('.edit-title').val(editedAlbum.get('title'));
        $('.edit-artist').val(editedAlbum.get('artist'));
        $('.edit-genre').val(editedAlbum.get('genre'));
        $('.save-edit').data('album-id', editedAlbum.get('id'));
        $('.update-album').modal('show');
        //this.render();
    },
    
    saveEdit: function(){
        var that = this;
        var editedAlbum = this.collection.where({id: $(event.target).data('album-id')})[0];
        editedAlbum.save({
            title: $('.edit-title').val(),
            artist: $('.edit-artist').val(),
            genre: $('.edit-genre').val()
        },
        {success: function(){
            that.render();
        }});
        $('.update-album').modal('hide');
    },
    
    populateSongs: function(event){
        var songsAlbumId =  $(event.target).data('album-id');
        var songsCollection = new SongsCollection({albumId: songsAlbumId});
        songsCollection.fetch({success: function(){
            songsView = new SongsView({collection: songsCollection, albumId: songsAlbumId})
            songsView.render();
        }});
    },
    
    populateAlbumInfo: function(event){
        var activeAlbum = this.collection.where({id: $(event.target).data('album-id')})[0];
        $('#display-album').html(activeAlbum.get('title'));
        $('#display-artist').html(activeAlbum.get('artist'));
        $('#display-genre').html(activeAlbum.get('genre'));
    }
});
