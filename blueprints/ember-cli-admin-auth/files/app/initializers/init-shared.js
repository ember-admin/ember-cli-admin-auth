import Ember from 'ember';

export default {
  name: 'init-shared',
  after: 'simple-auth',
  initialize: function(container) {
    var sharedStore = Ember.Object.create({});
    container.optionsForType('globals', {instantiate: false, singleton: true});
    container.register('globals:shared', sharedStore);
    container.typeInjection('controller', 'shared', 'globals:shared');
    container.typeInjection('route', 'shared', 'globals:shared');
  }
};