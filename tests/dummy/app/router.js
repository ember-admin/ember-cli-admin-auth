import Ember from 'ember';
import config from './config/environment';
import MetaRoute from 'ember-cli-admin/dsl/meta-route';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login');
  this.route("dashboard", {path: "/"});
});

MetaRoute.map(Router, function() {
  this.resources("users");
});

export default Router;
