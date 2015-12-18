import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service('session'),
  store: Ember.inject.service(),
  currentUser: Ember.computed(function() {
    let id = this.get('session.data.authenticated.id');
    return this.get('store').find('user', id)
  }),
  isAvatarEmpty: Ember.computed.empty('currentUser.avatar'),
  actions:{
    signout: function(){
      this.get('session').invalidate();
    }
  }
});