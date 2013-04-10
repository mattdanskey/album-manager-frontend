var View     = require('./view')
  , SongTemplate = require('./templates/song')

module.exports = View.extend({

    initialize: function(){
        this.constructor.__super__.initialize.apply(this);
    },
    
    render: function(){
        $('#song-list').empty();
        this.collection.each(function(song){
            console.log(song);
            $('#song-list').append(SongTemplate({
                track: song.get('track'),
                title: song.get('title')
            }));
        });
    }

});
