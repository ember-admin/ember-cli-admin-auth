var processTextContent = require('ember-cli-admin-auth/lib/proccess-text-content').processTextContent;

module.exports = {
  description: 'Generates ember-simple-auth components and settings',
  normalizeEntityName: function() {},
  afterInstall: function() {

    return this.addPackagesToProject([
      {name: "ember-simple-auth", target: "^1.0.1"},
    ]);
  },
  beforeInstall: function(options) {
    var process = processTextContent.bind(this);
    process('app/templates/application.hbs',
      {
        replace: {
          "{{partial 'admin/index'}}": "{{#if session.isAuthenticated}}\n\t{{signout-link}}\n\t{{partial 'admin/index'}}\n{{else}}\n\t{{partial 'login'}}\n{{/if}}"
        }
      });
    process('app/router.js',
      {
        replace: {
          "Router.map(function() {": "Router.map(function() {\n\tthis.route(\"login\");\n"
        }
      });
    process('app/styles/app.scss',
      {
        insert: {
          "@import 'ember-cli-admin';": {content: "\n@import 'components/signout';", after: true}
        }
      });
    process('app/routes/main.js',
      {
        insert: {
          "import BaseAdminRouteMixin from 'ember-cli-admin/mixins/routes/base';": {content: "\nimport ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';\n", after: true},
          "export default Ember.Route.extend(BaseAdminRouteMixin": {content: ", ApplicationRouteMixin, {\n\tbeforeModel: function(transition){\n\t\tthis._super(transition);\n\t\tif(!this.get('session.isAuthenticated')){\n\t\t\tthis.transitionTo('login');\n\t\t}\n\t}\n}" , after: true}
        }
      });
  }
};
