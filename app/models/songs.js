var Song = require('./song')
var BaseCollection = require('./collection')

module.exports = BaseCollection.extend({

    initialize: function(props) { 
        this.albumId = props.albumId;
    },

    model: Song,
    url: function(){
        return 'http://localhost:3000/albums/' + this.albumId + "/songs";
    }

})
