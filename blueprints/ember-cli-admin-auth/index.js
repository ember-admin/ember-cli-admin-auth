module.exports = {
  normalizeEntityName: function() {},
  afterInstall: function() {
    this.addBowerPackagesToProject([
      {name: "ember-simple-auth", target: "0.7.2"}
    ]);

    return this.addPackagesToProject([
      {name: "ember-cli-simple-auth", target: "^0.7.2"},
      {name: "ember-cli-simple-auth-devise", target: "^0.7.2"}
    ]);
  }
};
