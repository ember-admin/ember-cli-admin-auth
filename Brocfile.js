/* global require, module */

var EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

var app = new EmberAddon();

var pickFiles = require('broccoli-static-compiler');
var bootstrapFonts = pickFiles('bower_components/bootstrap-sass-official/assets/fonts/bootstrap', {
    srcDir: '/',
    destDir: '/assets/bootstrap'
});

var compileSass = require('broccoli-sass');
var mainCss = compileSass(['app/styles'], 'app.scss', 'assets/dummy.css');

var mergeTrees = require('broccoli-merge-trees');

module.exports = mergeTrees([app.toTree(), bootstrapFonts, mainCss], {
	overwrite: true
});
