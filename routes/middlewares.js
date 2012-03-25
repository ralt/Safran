module.exports = function(app) {
  /**
   * Middleware for limited access
   */
  app.requireLogin = function(req, res, next) {
    if (req.session.username) {
      // User is authenticated, let him in
      next();
    }
    else {
      // Otherwise, we redirect him to login form
      res.redirect('/guest');
    }
  };

  /**
   * Middleware for limited access
   */
  app.requireGuest = function(req, res, next) {
    if (req.session.username) {
      // If the user is authenticated, redirect him to the home page
      res.redirect('/home');
    }
    else {
      // Otherwise, let him in
      next();
    }
  };
  
  /**
   * Helper to render script/link tags
   */
  app.helpers({
    renderScriptsTags: function (all) {
      if (all != undefined) {
        return all.map(function(script) {
          return '<script src="' + script + '"></script>';
        }).join('\n ');
      }
      else {
        return '';
      }
    }
  });
  
  /**
   * Helper to render script/link tags available in all views
   */
  app.dynamicHelpers({
    scripts: function(req, res) {
      return [
        '//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js'
      ];
    }
  });
}