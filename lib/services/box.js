
var https = require(https)
var connectionArray = [];

connectionArray.push({key: '0'})

exports.init = function (app, express, options) {
exports.config = options.box; // le token qui authorise unifile à utiliser box est dans la config, après
//ça passe dans le header?
};


exports.connect = function (request, response, next, cbk){
 https.get('https://app.box.com/api/oauth2/authorize',function(res)
    {
        console.log("statusCode: ", res.statusCode);
        console.log("headers: ", res.headers);
    }
    
    /*
    connectionArray.push(1); // je veux incrémenter ++
    request.session.userIndex = connectionArray.key;
    cbk({sucess:true, authorize_url: request.session.getAuthURL()});
});

*/

exports.login = function (request, response, next, cbk){

  if (request.session.userIndex > 0 && /*sur cookie*/.isAuthenticated() === true){
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
