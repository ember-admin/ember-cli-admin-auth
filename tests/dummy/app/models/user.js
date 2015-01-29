import DS from 'ember-data';

export default DS.Model.extend({
  email: DS.attr('string'),
  name: DS.attr('string'),
  company_id: DS.attr('number'),
  role: DS.attr('string'),
  percent_of_completion: DS.attr('number'),

  company: function(){
    return this.store.find('company', this.get('company_id'));
  }.property('company_id'),

  isSuperAdmin: function(){
    return this.get('role') === 'superadmin';
  }.property()
});