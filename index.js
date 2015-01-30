module.exports = {
  name: 'ember-cli-admin-auth',

  included: function(app) {
    this.app = app;
    app.import('vendor/signout-link.css');
  }
};