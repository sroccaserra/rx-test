var staticCompiler = require('broccoli-static-compiler');
var babelTranspiler = require('broccoli-babel-transpiler');
var browserify = require('broccoli-browserify');
var mergeTrees = require('broccoli-merge-trees');

var es6Tree = staticCompiler('app', {
    srcDir: '/javascript',
    files: ['**/*.js'],
    destDir: '/javascript'
});

var htmlTree = staticCompiler('app', {
    srcDir: '/',
    files: ['**/*.html'],
    destDir: '/'
});

var bowerTree = staticCompiler('bower_components', {
    srcDir: '/',
    destDir: '/bower_components'
});

var es5Tree = babelTranspiler(es6Tree);
var browserifiedTree = browserify(es5Tree, {entries: ['./javascript/index.js']});

module.exports = mergeTrees([browserifiedTree, htmlTree, bowerTree]);
