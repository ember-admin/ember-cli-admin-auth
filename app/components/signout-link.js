import Ember from 'ember';

export default Ember.Component.extend({
  isAvatarEmpty: Ember.computed.empty('currentUser.avatarAttribute'),
  actions:{
    signout: function(){
      this.sendAction('signoutAction');
    }
  }