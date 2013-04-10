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
                title: song.get('title')
            }));
        });
        this.myEvents();
    },
    
    myEvents: function(){
        var that = this;
        $('.add-song').off().on('click', function(){
            that.addSong();
        });
    },
    
    addSong: function(){
        var that = this;
        console.log('albumid');
        console.log(this.albumId);
        this.collection.create({
            track: $('.input-song-track').val(),
            title: $('.input-song-title').val(),
            album_id: that.albumId
        });
        console.log('hm');
        this.render();
    }

});
