import TableViewController from 'ember-cli-admin/mixins/controllers/table-view';
import Ember from 'ember';
import SearchLogic from 'ember-cli-admin/dsl/search';
import ENV from '../config/environment';

export default Ember.ObjectController.extend(TableViewController, {
  sortFields: ['id', 'email'],

  searchForm: (function() {
    return new SearchLogic().form(this.get('q'), function() {
      this.input('email', {type: 'autocomplete', url: '%@/api/admin/v1/users/autocomplete'.fmt(ENV.adapterUrl)});
    });
  }).property('q'),

  itemActions: [
    {
      title: "Show",
      "class": "btn btn-small btn-success",
      action: "show",
      iconClass: "glyphicon glyphicon-info-sign"
    }, {
      title: "Delete",
      confirm: "Are you sure you want to delete this?",
      "class": "btn btn-small btn-danger",
      action: "destroy",
      iconClass: "glyphicon glyphicon-trash"
    }
  ]
});