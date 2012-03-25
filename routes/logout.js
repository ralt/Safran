module.exports = function(app) {
  /**
   * Handles logout
   */
  app.get('/logout', [app.requireLogin], function(req, res, next) {
    req.session.destroy(function() {});
    res.redirect('/guest');
  });
}