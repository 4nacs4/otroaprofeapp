var UserModel = require('../models/User');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Utils = require('../services/utils');

var userProfile = {
    getUserProfile: function(req, res) {
        User.findOne({_id: req.params._id}, function(err, user) {
            if (err)
                res.status(500).jsonp(err);
            if (user) {
                setTimeout(function() {
                    console.log('llamada')
                    return res.status(200).send({
                        type: "OK",
                        reason: "Profile Search Success!",
                        data: {user: user}
                    });
                }
                , 1000);

            }
            else {
                return res.status(404).send({
                    type: "ERROR",
                    reason: "Profile Search Failed! (User profile Not Found)"
                });
            }

        });
    },
    updateUserProfile: function(req, res) {
        var userData = req.body;
        var userId = userData.userId
        var validate = Utils.validateFields(userData, ['userId'], 'Profile Update');

        if (validate) {
            return res.status(400).send({
                type: "ERROR",
                reason: validate
            });
        }
        userData.updated = Date.now();
        userData = Utils.dataCleanUp(userData, ['_id', 'id', 'personType', 'status', 'password', 'membership', 'userId', '__v', 'role', 'earnedPoints', 'spentPoints', 'availablePoints']);
        return Utils.saveUserData(userId, userData, 'Profile Update', res);
    }
};
module.exports = userProfile;
