var View     = require('./view')
  , template = require('./templates/album')

module.exports = View.extend({

    initialize: function(props){
        this.model = props.model;
        this.constructor.__super__.initialize.apply(this);
    },
    
    render: function(){
        var that = this;
        $('#album-list').append(template({
            //TODO: Look into passing in the model instead.. or a getTemplateData function
            title: that.model.get('title'),
            artist: that.model.get('artist'),
            genre: that.model.get('genre'),
            id: that.model.get('id')
        }));

    }

});
