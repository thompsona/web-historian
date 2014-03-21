// eventually, you'll have some code here that uses the code in `archive-helpers.js`
// to actually download the urls you want to download.
var http = require('http');
var archive = require('../helpers/archive-helpers');
var path = require('path');
var fs = require('fs');
var httpHelpers = require('../web/http-helpers');

var redirect = function(req, res) {
  res.writeHeader(302, {'Location': '/loading.html'});  
}
exports.poster = function(req, res) {
  var url;
  req.on('data', function(chunk) {
    url = chunk.toString().slice(4);
  });
  req.on('end', function() {
    //if is in sites.txt list
    if(!archive.isUrlInList(url)) {
      archive.addUrlToList(url);
      archive.readListOfUrls();
      redirect(req, res);
      res.end();
      // console.log("URL to download: ", url);
      // archive.readListOfUrls(function(urlList){
      //   console.log("IGOTURLS: ", urlList);
      // });
       // archive.downloadUrls(url);
    }else { //if not in sites.txt list
      //send back scraped url
      archive.isURLArchived(url, function(filesArray) {
        //if url file is archived
        if(filesArray.indexOf(url) !== -1) {
          httpHelpers.serveScrapedSites(res, '/' + url);          
        }
        //if url file is not archived
        else {
          redirect(req, res);
          res.end();
        }
      })
    }
  });
};

exports.getter = function(req, res) {
  var url = req.url.slice(1);
  if(req.url.indexOf('www.') !== -1) {
      if(archive.isUrlInList(url)) {
        httpHelpers.serveScrapedSites(res, req.url);
      }
      else {
        archive.addUrlToList(url);
        //scrape site
        archive.downloadUrls(url);
        //serve site
      }
    }  
    else if (req.url === '/loading.html') {
      httpHelpers.serveAssets(res, req.url, 'html');
    }
    else if (req.url === '/styles.css') {
      httpHelpers.serveAssets(res, req.url, 'css');
    }
    else {
      httpHelpers.serveAssets(res, '/index.html', 'html');
      //try to stream css, can attemp to use .pipe
    }
  };