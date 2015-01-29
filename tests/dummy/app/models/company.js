import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  users: DS.hasMany('user'),
  company_plan: DS.belongsTo('company-plan'),
  days_to_confirm: DS.attr('number'),
  send_notification_after: DS.attr('number')
});
