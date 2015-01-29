import Asset from 'ember-cli-admin/logics/asset';
import DS from 'ember-data';

export default Asset.extend({
  type: DS.attr('string', {defaultValue: 'DocumentAttachment'})
});