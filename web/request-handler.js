var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var httpHelpers = require('./http-helpers.js');
var http = require('http');
var htmlFetcher = require('../workers/htmlfetcher.js');
archive.readListOfUrls();

exports.handleRequest = function (req, res) {
  if (req.method === 'POST') {
    htmlFetcher.poster(req, res);
  }
  else if (req.method === 'GET') {
    htmlFetcher.getter(req, res);
  }
};
