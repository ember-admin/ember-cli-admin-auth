/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'ember-cli-admin-auth',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      appName: 'ember-cli-admin-auth',
      titleLinksTo: 'http://ember-admin.com',
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    contentSecurityPolicy: {
      'script-src': "'self' 'unsafe-inline' 'unsafe-eval' use.typekit.net connect.facebook.net *.googleapis.com " +
        "*.gstatic.com *.yandex.ru",
      'style-src': "'self' 'unsafe-inline' use.typekit.net *.googleapis.com",
      'img-src': "*",
      'font-src': '*',
      'connect-src': '*'
    }
  };
  ENV['ember-simple-auth'] = {
    store: 'session-store:local-storage'
  };
  ENV['ember-simple-auth'].crossOriginWhitelist = ['*'];

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
  }

  return ENV;
};
