import Ember from 'ember';
import {module, test} from 'qunit';
import startApp from '../helpers/start-app';

var application;

module('Acceptance: Auth', {
  beforeEach: function() {
    application = startApp();
  },
  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('redirects to /login when I try to see content as not authenticated user', function(assert) {
  assert.expect(2);

  invalidateSession();
  visit('/');

  andThen(function() {
    assert.equal(currentPath(), 'login');

    visit('/users');

    andThen(()=>{
      assert.equal(currentPath(), 'login');
    });
  });
});

test('shows content when I`m authenticated', function(assert) {
  assert.expect(1);

  authenticateSession();
  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');
  });
});