import Ember from 'ember';
import authMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(authMixin, {
  redirect: function(){
    if(this.get('session.isAuthenticated')){
      this.transitionTo('/');
    }
  },

  renderTemplate: function(){
    this.render('login', {outlet: 'login'});
  }
});