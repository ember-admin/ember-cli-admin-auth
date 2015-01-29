import Ember from 'ember';
import authMixin from 'simple-auth/mixins/application-route-mixin';
var loginRoute = Ember.Route.extend(authMixin, {
  redirect: function(){
    if(this.get('session.isAuthenticated')){
      this.transitionTo('/');
    }
  },

  renderTemplate: function(){
    this.render('login', {outlet: 'login'});
  }
});
export default loginRoute;