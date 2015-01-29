import DS from 'ember-data';
import LocalesLogic from '../logics/locale';

export default DS.Model.extend({
  translations: DS.attr('string'),
  title: DS.attr('string'),

  logic: function(){
    return LocalesLogic.create({
      localeName: this.id,
      translations: this.get('translations')
    });
  }.property('translations'),
  properties: function(){
    return this.get('logic.properties');
  }.property('translations'),
  _save: function(){
    var translations =  this.get('logic')._stringify(this.get('properties'));
    this.set('translations', JSON.stringify(translations));
    return this.save();
  }
});