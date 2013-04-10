var Album = require('./album')
var BaseCollection = require('./collection')

module.exports = BaseCollection.extend({

    model: Album,
    url: 'http://localhost:3000/albums'

})
