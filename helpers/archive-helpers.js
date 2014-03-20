var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var urlArray;

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

exports.readListOfUrls = function(){
  fs.readFile(this.paths['list'], function (err, data) {
    if (err) throw err;
    urlArray = data.toString().split('\n');
    console.log('urlArray is now: ', urlArray);
  });
};

exports.isUrlInList = function(url){
  return urlArray.indexOf(url) !== -1;
};

exports.addUrlToList = function(url){
  fs.appendFile(this.paths['list'], '\n' + url, function (err) {
    if (err) throw err;
    console.log('The "data to append" was appended to file!');
  });
};

exports.isURLArchived = function(){
  //if url file exists, return true else false
};

exports.downloadUrls = function(){
  //scrape website somehow and create a new file (fs.open), add it to archives/sites
};
