var application = require('application')

module.exports = Backbone.Router.extend({
    routes: {
        '': 'albums',
    },
    
    albums: function() {
        application.mainView.render();
    }
});
