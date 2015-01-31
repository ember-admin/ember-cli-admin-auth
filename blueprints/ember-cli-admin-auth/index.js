var processTextContent = require('node_modules/ember-cli-admin/lib/proccess-text-content').processTextContent;

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
          "Router.map(function() {": "Router.map(function() {\n\treturn this.route(\"login\"});\n"
        }
      });
    process('config/environment.js',
      {
        insert: {
          "\t};": "\n\tENV['simple-auth'] = {\n\t\tauthorizer: 'simple-auth-authorizer:devise',\n\t\trouteAfterAuthentication: '/'\n\t};\n"
        }
      });
  }
};
