var processTextContent = require('ember-cli-admin-auth/lib/proccess-text-content').processTextContent;

module.exports = {
  description: 'Generates ember-simple-auth components and settings',
  normalizeEntityName: function() {},
  afterInstall: function() {
    this.addBowerPackagesToProject([
      {name: "ember-simple-auth", target: "0.7.2"}
    ]);

    return this.addPackagesToProject([
      {name: "ember-cli-simple-auth", target: "^0.7.2"},
      {name: "ember-cli-simple-auth-devise", target: "^0.7.2"}
    ]);
  },
  beforeInstall: function(options) {
    var process = processTextContent.bind(this);
    process('app/templates/application.hbs',
      {
        replace: {
          "{{partial 'admin/index'}}": "{{#if session.isAuthenticated}}\n\t{{partial 'admin/index'}}\n{{else}}\n\t{{outlet 'login'}}\n{{/if}}"
        }
      });
    process('app/router.js',
      {
        replace: {
          "Router.map(function() {": "Router.map(function() {\n\tthis.route(\"login\");\n"
        }
      });
    process('config/environment.js',
      {
        insert: {
          "if (environment === 'development') {": {content: "ENV['simple-auth'] = {\n\t\tauthorizer: 'simple-auth-authorizer:devise',\n\t\trouteAfterAuthentication: '/'\n\t};\n\n\t", before: true},
          "if (environment === 'development') {": {content: "\n\t\tENV['simple-auth-devise'] = {\n\t\t\tresourceName: 'user',\n\t\t\tserverTokenEndpoint: '/api/v1/users/sign_in'\n\t\t};\n\t\tENV['simple-auth'].crossOriginWhitelist = ['*'];\n", after: true}
        }
      });
    process('app/routes/main.js',
      {
        insert: {
          "'ember-cli-admin/mixins/routes/base';": {content: "\nimport ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';\n\nBaseAdminRouteMixin.reopen(ApplicationRouteMixin);\n", after: true},
          "extend(BaseAdminRouteMixin": {content: ", {\n\tredirect: function(){\n\t\tif(!this.get('session.isAuthenticated')){\n\t\t\tthis.transitionTo('login');\n\t\t}\n\t}\n}" , after: true}
        }
      });
  }
};
