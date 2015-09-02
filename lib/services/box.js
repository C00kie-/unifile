var box_sdk = require('box-sdk')
var logLevel = 'debug';
var fs = require('fs')
var connectionArray = [];


exports.init = function (app, express, options) {
/*configs*/
exports.config = options.box;

/*initialisation du SDK*/
exports.box = box_sdk.Box(options.box, logLevel);

/*initialisation du SDK avec l'autre api
module.exports = function() {
  return function nodeBoxSDK(req, res, next) {
    box.configure(options.box);
    req.app.box = box;
    next();*/
};



exports.connect = function (request, response, next, cbk){

  var sdkconnection = exports.box.getConnection()

  console.log('ok sdkconnection\n')

  request.session.userIndex = connectionArray.push(sdkconnection) - 1;
  // retour du push ?

  console.log(request.session.userIndex)

  console.log('getting to authorize url\n')

  cbk({success:true, authorize_url: connectionArray[request.session.userIndex].getAuthURL()});

  console.log('authorize_url send\n')
  /*
  sdkconnection.ready(function(){
    console.log('onReady\n')
     ckb({success:true, authorize_url: connectionArray[request.session.userIndex].getAuthURL()});
   });*/
};

exports.login = function (request, response, next, cbk){

  console.log('is user auth ?')
  console.log(connectionArray[request.session.userIndex].isAuthenticated());

  if (connectionArray[request.session.userIndex].isAuthenticated() === true){
    cbk({sucess : true});
  }
  else {
    cbk({sucess : false, text :'connect first'});
  }
};
