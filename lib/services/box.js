var box_sdk = require('box-sdk')
var logLevel = 'debug';
var fs = require('fs')
var connectionArray = [];

connectionArray.push({key: '0'})

exports.init = function (app, express, options) {

exports.config = options.box;
exports.box = box_sdk.Box(options.box, logLevel);
};



exports.connect = function (request, response, next, cbk){

  var sdkconnection = exports.box.getConnection()
  request.session.userIndex = connectionArray.push(sdkconnection) - 1;
  cbk({success:true, authorize_url: connectionArray[request.session.userIndex].getAuthURL()});
};

exports.login = function (request, response, next, cbk){

  if (request.session.userIndex > 0 && connectionArray[request.session.userIndex].isAuthenticated() === true){
    cbk({sucess : true});
  }
  else {
    cbk({sucess : false, text :'connect first'});
  }
};

exports.logout = function (request, response, next, cbk) {

  delete connectionArray[request.session.userIndex];
  delete request.session.userIndex;
  if (connectionArray[request.session.userIndex]){
    cbk ({sucess : false, text :'still logged in'});
  }
  else {
    cbk({sucess : true, text :'now you\'r logged out'});
  }
};
