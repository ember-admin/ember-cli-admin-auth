import Ember from 'ember';
import startApp from '../helpers/start-app';

var application;

module('Acceptance: Auth', {
  setup: function() {
    application = startApp();
  },
  teardown: function() {
    Ember.run(application, 'destroy');
  }
});

test('redirects to /login when I try to see content as not authenticated user', function() {
  expect(2);

  invalidateSession();
  visit('/');

  andThen(function() {
    equal(currentPath(), 'login');

    visit('/users');

    andThen(()=>{
      equal(currentPath(), 'login');
    });
  });
});
