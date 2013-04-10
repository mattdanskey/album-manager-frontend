var application = require('application')

module.exports = Backbone.Router.extend({
    routes: {
        '': 'albums',
        'home': 'home'
    },
    
    home: function() {
        $('body').html(application.homeView.render().el);
        console.log('eh?');
    },
    
    albums: function() {
        application.mainView.render();
    }
});
