import DS from 'ember-data';

export default DS.Model.extend({
  price: DS.attr('number'),
  users_from: DS.attr('number'),
  users_to: DS.attr('number'),
  companies:  DS.hasMany('company')
});