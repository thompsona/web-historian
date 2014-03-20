var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var httpHelpers = require('./http-helpers.js');
archive.readListOfUrls();

exports.handleRequest = function (req, res) {
  if (req.method === 'POST') {
    // console.log("YEAAAAAA");
    var url;
    req.on('data', function(chunk) {
      url = chunk.toString().slice(4);
    });
    req.on('end', function() {
      if(!archive.isUrlInList(url)) {
        archive.addUrlToList(url);
        archive.readListOfUrls();
        httpHelpers.listHandler(res, '/' + url);
      }else {
        //send back scraped url
        res.end("YOU TYPED GOOGLE.COM");
      }
    });
    
    res.end();
  }
  else if (req.method === 'GET') {
    if(req.url.indexOf('www.') !== -1) {
      httpHelpers.listHandler(res, req.url);
    }  
    else {
      httpHelpers.serveAssets(res, '/index.html');
    }
  }
};
