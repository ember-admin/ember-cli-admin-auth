import Ember from 'ember';
import BaseAdminRouteMixin from 'ember-cli-admin/mixins/routes/base';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(BaseAdminRouteMixin, ApplicationRouteMixin, {
  beforeModel: function(transition){
    this._super(transition);
    if(!this.get('session.isAuthenticated')){
      this.transitionTo('login');
    }
  }
});