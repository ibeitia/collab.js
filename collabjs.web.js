module.exports = function (context) {
  'use strict';

  context.once('app.init.routes', function (app) {

    app.get('/', function (req, res) {
      res.render('index', {
        title: 'collab.js',
        user: req.user
      });
    });
  });
};