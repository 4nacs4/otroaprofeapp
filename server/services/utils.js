var _ = require('underscore');
var UserModel = require('../models/User');
var Promise = require('es6-promise').Promise;
var mongoose = require('mongoose');
var User = mongoose.model('User');
var config = require('../config');

var utils = {
    validateFields: function(data, fields, responseText) {
        var response = false;
        var missingFields = []
        _.each(fields, function(field) {
            if (!(_.has(data, field)))
                missingFields.push(field);
        });
        if (missingFields.length > 0)
            response = responseText + " Failed! (" + missingFields.join() + " Field(s) are required)"
        return response;
    },
    validateUser: function(userId) {
        return new Promise(
                function(resolve, reject) {
                    User.findOne({_id: userId}, function(err, user) {
                        if (err)
                            reject();
                        if (user) 
                            resolve(user);
                        else
                            reject();
                    });
                }
        )
    },
    dataCleanUp: function(data, fields) {
        return _.omit(data, fields);
    },
    mergeData: function(arr1, arr2) {
        return _.extend(arr1, arr2);
    },
    saveUserData: function(userId, userData, responseText, res) {
        console.log(userId)
        User.update({_id: userId}, userData, function(err, status) {
            if (err)
                return res.status(200).jsonp(err);
            console.log(status)
            if (status.n == 1) {
                console.log(status)
                User.findOne({_id: userId}, function(err, user) {
                    if (err)
                        return res.status(500).jsonp(err);
                    return res.status(200).send({
                        type: "OK",
                        reason: responseText + " Success!",
                        data: {user: user}
                    });
                });
            }
            else {
                return res.status(400).send({
                    type: "ERROR",
                    reason: responseText + " Failed! (Not Found)",
                    data: {user: user}
                });
            }
        })
    },
    createLevelNames: function(levelPoints) {
        var referredList = {};
        referredList.referredLevels = {};
        referredList.pointLevels = {};
        _.each(levelPoints, function(points, index) {
            referredList.referredLevels[config.REFERRED_NAME_PREFIX + (index + 1)] = "";
            referredList.pointLevels[config.POINT_NAME_PREFIX + (index + 1)] = points;
        });
        return referredList;
    },
    updateReferredPoints: function(referredId, points) {
        return new Promise(
                function(resolve, reject) {
                    User.findOne({_id: referredId}).exec().then(function(user) {
                        if (user) {
                            var earnedPoints = user.earnedPoints;
                            var availablePoints = user.availablePoints;
                            earnedPoints = earnedPoints + points;
                            availablePoints = availablePoints + points;
                            return User.update({_id: referredId}, {earnedPoints: earnedPoints, availablePoints: availablePoints}).exec();
                        }
                        else
                            reject();
                    }, function(err) {
                        console.log(err)
                        reject();
                    }).then(function(res) {
                        if (res.n == 1)
                            resolve(1);
                        else
                            reject();
                    }, function(err) {
                        reject();
                    });
                }
        )
    },
    createReferredList: function(referredList, referredUser, maxLevel) {
        return new Promise(
                function(resolve, reject) {
                    var updateReferredReady = 0;
                    for (var i = 1; i <= maxLevel; i++) {
                        var currentReferred = '';
                        if (i == 1)
                            var currentReferred = referredUser._id;
                        else
                            if (referredUser.membership)
                                var currentReferred = referredUser.membership.referredList.referredLevels[config.REFERRED_NAME_PREFIX + (i - 1).toString()];
                        if (currentReferred !== '') {
                            referredList.referredLevels[config.REFERRED_NAME_PREFIX + i.toString()] = currentReferred;
                            utils.updateReferredPoints(currentReferred, referredList.pointLevels[config.POINT_NAME_PREFIX + i.toString()]).then(function(ready) {
                                updateReferredReady = updateReferredReady + ready;
                                if (updateReferredReady == maxLevel)
                                    resolve(referredList);
                            }, function(err) {
                                reject(" Failed! (Update referred data error)");
                            });
                        }
                        else{
                            resolve(referredList);
                        }

                    }
                }
        )
    }
}

module.exports = utils;