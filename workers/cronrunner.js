console.log("starting cronrunner.js");
var http = require('http');
var archive = require('/Users/hackreactor/warren/2014-02-web-historian/helpers/archive-helpers');

var CronJob = require('cron').CronJob;
new CronJob('*/5 * * * * *', function(){
    console.log('You will see this message every second');
}, null, true, "America/Los_Angeles");

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
