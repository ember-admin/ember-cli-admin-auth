import Ember from 'ember';

export default {
  name: 'user-in-route',
  after: 'store',
  initialize: function(container) {
    var session = container.lookup('simple-auth-session:main');

    var observer = Ember.Object.extend({
      observerForSession: function(){
        var self = this;
        if(this.get('session.user_email')){
          container.lookup('store:main').find('user', 'admin').then(function(user){
            container.lookup('globals:shared').set('currentUser', user);
          }, function(){
            self.get('session').invalidate().then(function(){
              localStorage.removeItem('ember_simple_auth:session');
            });
          });
        }
      }.observes('session.user_email').on('init')
    });
    observer.create({session: session});
  }
};