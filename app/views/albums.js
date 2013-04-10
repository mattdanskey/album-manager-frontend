var View     = require('./view')
  , albumTemplate = require('./templates/album')


module.exports = View.extend({
    
    initialize: function(){
        this.constructor.__super__.initialize.apply(this);
    },
    
    render: function(){
        $('#album-list').empty();
        this.collection.each(function(album){
            $('#album-list').append(album.get('title'));
        });

    },    
    
    afterRender: function(){
    }
    
});
