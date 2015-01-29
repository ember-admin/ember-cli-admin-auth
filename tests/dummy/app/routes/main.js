import Ember from 'ember';
import BaseAdminRouteMixin from 'ember-cli-admin/mixins/routes/base';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

BaseAdminRouteMixin.reopen(ApplicationRouteMixin);

var mainRoute = Ember.Route.extend(BaseAdminRouteMixin, {
  redirect: function(){
    if(!this.get('session.isAuthenticated')){
      this.transitionTo('login');
    }
  }
});
export default mainRoute;