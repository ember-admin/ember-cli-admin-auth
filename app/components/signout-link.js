import Ember from 'ember';

export default Ember.Component.extend({
  currentUserObserver: function() {
    if(this.get('currentUser')){
      var currentUser = this.get('currentUser');
      if(this.get('avatarAttribute')){
        this.setProperties({
          isAvatarPresent: !Ember.isEmpty(currentUser.get(this.get('avatarAttribute'))),
          avatarUrl: currentUser.get(this.get('avatarAttribute.thumb_url'))
        });
      }
      this.set('username', currentUser.get(this.get('nameAttribute')));
    }
  }.observes('currentUser'),
  actions:{
    signout: function(){
      this.sendAction('signoutAction');
    }
  }
});
