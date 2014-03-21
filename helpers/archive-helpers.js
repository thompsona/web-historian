var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');
var urlArray;
var request = require("request");

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback){
  fs.readFile(this.paths['list'], function (err, data) {
    if (err) throw err;
    urlArray = data.toString().split('\n');
    console.log('urlArray is now: ', urlArray);
    if(callback !== undefined) {
      callback(urlArray);
    }
  });
};

exports.isUrlInList = function(url){
  return urlArray.indexOf(url) !== -1;
};

exports.addUrlToList = function(url, callback){
  fs.appendFile(this.paths['list'], '\n' + url, function (err) {
    if (err) throw err;
    console.log('The url: ' + url + ' was appended to file!');
  });
};

exports.isURLArchived = function(url, cb){
  //if url file exists, return true else false
  fs.readdir(this.paths['archivedSites'], function(error, files) {
    console.log("FILES in isURLArchived: ", files);
    if (error) throw error;
    cb(files, url);
  });
};

exports.downloadUrls = function(url){
  //scrape website somehow and create a new file (fs.open), add it to archives/sites
  request("http://" + url, function(error, response, body) {
    if(!error) {
      console.log("URL: ", url, "BODY of URL:", body);
      fs.appendFile("../archives/sites/" + url, body );
    }
    else {
      console.log(error);
    }
  });
};

// exports.getURLArray = function() {
//   this.readListOfUrls();
//   return urlArray;
// }
