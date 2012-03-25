module.exports = function(app, client) {
  /**
   * Login page - Only guests will see this page
   */
  app.get('/guest', [app.requireGuest], function (req, res, next) {
    // Render form
    res.render('guest', {
      page_language: 'fr',
      page_title: "Formulaire d'identification",
      meta_description: "Page de login de ce site de test.",
      error: null,
      message: null
    });
  });

  /**
   * Handles login post
   */
  app.post('/guest', [app.requireGuest], function (req, res, next) {
    var username = new Buffer(req.body.username);
    var password = new Buffer(req.body.password);
    // Preparing options to render if it fails
    var options = {
      page_language: 'fr',
      page_title: "Formulaire d'identification",
      meta_description: "Page de login de ce site de test.",
      error: null,
      message: null
    };
    // If a field is missing, render the login form
    if (!username || !password) {
      options.error = "All fields are required.";
      res.render('guest', options);
    }
    // Now, check if the user he entered exists
    client.sismember(['users', Buffer.concat(new Buffer('user:'), username)], function(err, reply) {
      if (err) {
        options.error = err;
        res.render('guest', options);
      }
      if (reply) {
        // If he does, check if the password matches
        client.hget([Buffer.concat(new Buffer('user:'), username), 'password'], function(err, reply) {
          if (err) {
            options.error = err;
            res.render('guest', options);
          }
          if (reply === password.toString()) {
            // If the password matches, add the session and redirects to home
            req.session.username = username.toString();
            res.redirect('/home');
          }
          else {
            options.error = "Password do not match.";
            res.render('guest', options);
          }
        });
      }
      else {
        options.error = "Username does not exist.";
        res.render('guest', options);
      }
    });
  });
}