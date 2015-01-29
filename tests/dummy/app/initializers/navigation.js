import Navigation from 'ember-cli-admin/dsl/navigation';
var initializer;

initializer = {
  name: 'navigation',
  initialize: function() {
    return Navigation.map(function() {

      this.navigate("Dashboard", {
        route: "dashboard"
      });
      this.navigate("Users");
    });
  }
};

export default initializer;
