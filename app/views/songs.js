var View     = require('./view')
  , SongTemplate = require('./templates/song')

module.exports = View.extend({

    initialize: function(props){
        this.albumId = props.albumId;
        this.constructor.__super__.initialize.apply(this);
    },
    
    render: function(){
        $('#song-list').empty();
        this.collection.each(function(song){
            $('#song-list').append(SongTemplate({
                track: song.get('track'),
                title: song.get('title'),
                id: song.get('id')
            }));
        });
        this.myEvents();
    },
    
    myEvents: function(){
        var that = this;
        $('.add-song').off().on('click', function(){
            that.addSong();
        });
        $('.delete-song').off().on('click', function(event){
            that.removeSong(event);
        });
    },
    
    removeSong: function(event){
        delSong = this.collection.where({id: $(event.target).data('song-id')})[0];
        delSong.destroy();
        this.render();
    },
    
    addSong: function(){
        var that = this;
        console.log('albumid');
        console.log(this.albumId);
        this.collection.create({
            track: $('.input-song-track').val(),
            title: $('.input-song-title').val(),
            album_id: that.albumId
        },
        {success: function(){
            that.render();
        }});

    }

});
