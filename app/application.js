// Application bootstrapper.
Application = {
    initialize: function() {
        
        var MainView = require('views/main_view')
          , Router   = require('lib/router')
        
        this.mainView = new MainView()
        this.router   = new Router()
        
        if (typeof Object.freeze === 'function') Object.freeze(this)
        
    }
}

module.exports = Application
