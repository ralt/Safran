module.exports = function(app) {
  /**
   * Handles about page
   */
  app.get('/about', function(req, res, next) {
    res.render('about', {
      page_language: 'fr',
      page_title: 'about us page',
      meta_description: "Page à propos de ce site de test.",
      styles: null,
      scripts: null,
      error: null,
      message: null
    });
  });
}