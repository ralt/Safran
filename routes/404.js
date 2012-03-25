module.exports = function(app) {
  /**
   * Handles 404
   */
  app.get('/*', function(req, res, next) {
    res.render('404', {
      page_language: 'fr',
      page_title: 'Erreur 404',
      meta_description: "Page d'erreur 404.",
      error: "Erreur 404 : Please don't bother coming back here.",
      message: null
    });
  });
}