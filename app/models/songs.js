var Song = require('./song')
var BaseCollection = require('./collection')

module.exports = BaseCollection.extend({

    model: Song,
    url: '/albums'

})
