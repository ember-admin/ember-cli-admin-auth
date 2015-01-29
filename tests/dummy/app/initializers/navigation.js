import Navigation from 'ember-cli-admin/dsl/navigation';

export default {
  name: 'navigation',
  initialize: function() {
    return Navigation.map(function() {
      //Dashboard page
      //You can override this if you don't use dashboard
      this.navigate("Dashboard", { route: "dashboard" });
      this.navigate("users");
      this.navigate("companies");
      this.navigate("company-plans");
      this.navigate("payments");
      this.navigate("app-docs");
      this.navigate("locales");
    });
  }
};