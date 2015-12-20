import Ember from 'ember';
import {module, test} from 'qunit';
import startApp from '../helpers/start-app';
import { invalidateSession, authenticateSession } from '../helpers/ember-simple-auth';

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

  invalidateSession(application);
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
  server.createList('user', 1);
  server.createList('avatar', 1);

  authenticateSession(application, {token: 'token123456', email: 'test@example.com', id: "1"});
  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');
  });
});
