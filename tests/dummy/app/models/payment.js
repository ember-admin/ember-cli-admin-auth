import DS from 'ember-data';

export default DS.Model.extend({
  user_id: DS.attr('number'),
  company_id: DS.attr('number'),
  paykey: DS.attr('string'),
  created_at: DS.attr('date')
});