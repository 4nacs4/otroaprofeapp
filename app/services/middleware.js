var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('../config');
var Utils = require('../services/utils');

exports.ensureAuthenticated = function(req, res, next) {
    try {

        var token = req.headers.authorization.split(" ")[1];
        var payload = jwt.decode(token, config.TOKEN_SECRET);

        if (payload.exp <= moment().unix()) {
            return res.status(401).send({message: "El token ha expirado"});
        }
        req.user = payload.sub;
        // Authorize the user to see if s/he can access our resources
       
        var dbUser = Utils.validateUser(req.user);
        dbUser.then(function(user) {
           if ((req.url.indexOf('config') >= 0 && user.role == 'admin') || (req.url.indexOf('config') < 0 && req.url.indexOf('/api/') >= 0)) {
                next(); // To move to next middleware
            } else {
                return res.status(401).send({message: "Not authorized"});
            } 
        }, function(err) {
           return res.status(401).send({message: "Invalid User"});
        });
    } catch (err) {
        return res.status(403).send({message: "Access Denied"});
    }
}