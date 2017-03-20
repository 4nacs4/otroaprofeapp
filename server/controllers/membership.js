var UserModel = require('../models/User');
var config = require('../config');
var AppconfigModel = require('../models/Appconfig');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Appconfig = mongoose.model('Appconfig');
var Utils = require('../services/utils');

var membership = {
    createMembership: function(req, res) {
        var userData = req.body;
        var messageProcess = "Create Membership";
        var levels = 0;

        var validate = Utils.validateFields(userData, ['userId', 'membership'], messageProcess);
        if (validate) {
            return res.status(400).send({
                type: "ERROR",
                reason: validate
            });
        }
        validate = Utils.validateFields(userData.membership, ['referredId', 'pay'], messageProcess);
        if (validate) {
            return res.status(400).send({
                type: "ERROR",
                reason: validate
            });
        }

        var userId = userData.userId;
        User.findOne({_id: userId}).exec().then(function(user) {
            if (user)
                if (!user.membership)
                    return Appconfig.findOne({id: config.APPCONFIG_ID}).exec();
                else
                    res.status(400).send({
                        type: "ERROR",
                        reason: messageProcess + " Failed! (Membership has been already created)"
                    });
            else
                res.status(400).send({
                    type: "ERROR",
                    reason: messageProcess + " Failed! (User profile Not Found)"
                });
        }, function(err) {
            return res.status(500).jsonp(err);
        }).then(function(appconfig) {
            if (appconfig) {
                userData.membership.referredList = appconfig.referredList;
                userData.levels = appconfig.levels;
                return User.findOne({id: userData.membership.referredId}).exec();
            }
            else {
                res.status(400).send({
                    type: "ERROR",
                    reason: messageProcess + " Failed! (Appconfig Not Found)"
                });
            }
        }, function(err) {
            return res.status(500).jsonp(err);
        }).then(function(referredUser) {
            if (referredUser) {
                return Utils.createReferredList(userData.membership.referredList, referredUser, userData.levels);
            }
            else {
                res.status(404).send({
                    type: "ERROR",
                    reason: messageProcess + " Failed! (User profile referred Not Found)"
                });
            }
        }, function(err) {
            return res.status(500).jsonp(err);
        }).then(function(referredList) {
            console.log(referredList)
            if (referredList){
                userData.membership.referredList = referredList
                userData = Utils.dataCleanUp(userData, ['_id', 'id', 'personType', 'status', 'password', 'userId', '__v', 'role', 'levels', 'earnedPoints', 'spentPoints', 'availablePoints']);
                console.log(userData.membership)
                return Utils.saveUserData(userId, userData, 'Create Membership', res);
            }
        }, function(err) {
            return res.status(500).jsonp(messageProcess + err);
        })
    },
    getUsersReferredLevel: function(req, res) {
        var query = {};
        query["membership.referredList.referredLevels.referredLevel_" + req.params.level] = req.params._id
        User.find(query, function(err, users) {
            if (err)
                res.status(500).jsonp(err);
            if (users) {
                return res.status(200).send({
                    type: "OK",
                    reason: "Referred List Search Success!",
                    data: {
                        count: users.length,
                        users: users
                    }
                });
            }
            else {
                return res.status(404).send({
                    type: "ERROR",
                    reason: "Referred List Search Failed! (Users profile Not Found)"
                });
            }
        });
    }
}

module.exports = membership;