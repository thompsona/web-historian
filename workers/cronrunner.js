var http = require('http');
var archive = require('../helpers/archive-helpers');
var path = require('path');
var fs = require('fs');
var httpHelpers = require('../web/http-helpers');


//loop through sites in sites.txt, check against archived sites

archive.readListOfUrls(function(urlList) {
  console.log("CRONRUNNING LIST: ", urlList);
  for(var i = 0; i < urlList.length; ++i) {
      console.log("IN CRON, isURLArchived callback: " + urlList[i]);
    archive.isURLArchived(urlList[i], function(archSites, urlToCheck) {
      console.log("CROOOON archSites array: " + archSites + " BUT URL LIST SHOULD NOT BE UNDEFINED: " + urlToCheck);
      if (archSites.indexOf(urlToCheck) === -1) {
        archive.downloadUrls(urlToCheck); 
      }
    });
  }
})
