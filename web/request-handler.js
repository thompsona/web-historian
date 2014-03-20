var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var httpHelpers = require('./http-helpers.js');

exports.handleRequest = function (req, res) {
  if (req.method === 'POST') {
    console.log("YEAAAAAA");
  }
  if (req.method === 'GET') {
    // if(req.url === '/') {
      httpHelpers.serveAssets(res, '/index.html');
    // }
    // else {
    //   httpHelpers.serveAssets(res, '/../archives/sites' + req.url);
    // }
  }
};
