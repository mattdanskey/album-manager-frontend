var View     = require('./view')
  , albumTemplate = require('./templates/album')


module.exports = View.extend({
    
    initialize: function(){
        this.constructor.__super__.initialize.apply(this);
    },
    
    events: {
        //TODO: Investigate what causes these events to not bind
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
        this.afterRender();

    },    
    
    afterRender: function(){
        var that = this;
        $('#title-header').off().on('click', function(){
            that.reSort('title');
        });
        $('#artist-header').off().on('click', function(){
            that.reSort('artist');
        });
        $('#genre-header').off().on('click', function(){
            that.reSort('genre');
        });
    },
    
    reSort: function(column){
        this.collection.comparator = function(model){
            return model.get(column).toLowerCase();
        }
        this.collection.sort();
        this.render();
    },
    
});
