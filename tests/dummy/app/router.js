import Ember from 'ember';
import MetaRoute from 'ember-cli-admin/dsl/meta-route';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login');
});

MetaRoute.map(Router, function() {
  this.route("dashboard", {path: "/"});
  this.resources("users");
});

export default Router;
