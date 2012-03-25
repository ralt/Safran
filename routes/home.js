module.exports = function(app, client) {
  /*
   * Home page for non-guests
   */
  app.get('/', [app.requireLogin], function (req, res, next) {
    res.redirect('/home', 301);
  });
  
  /**
   * Home page for non-guests
   */
  app.get('/home', [app.requireLogin], function(req, res, next) {
    // Get the last messages - for SEO matters
    // Number of messages to get
    var nbMsg = 10;
    client.sort(['messages', 'desc', 'limit', '0', nbMsg, 'get', 'message:*->message'], function(err, replies) {
      res.render('home', {
        page_language: 'fr',
        page_title: "Page d'accueil",
        meta_description: "Page d'accueil de ce site de test.",
        messages: replies,
        error: null,
        message: null
      });
    });
  });
}