var AppconfigModel = require('../models/Appconfig');
var mongoose = require('mongoose');
var Appconfig = mongoose.model('Appconfig');
var Utils = require('../services/utils');

var appConfig = {
    getAppconfig: function(req, res) {
        Appconfig.findOne({id: req.params.id}, function(err, appconfig) {
            if (err)
                return res.status(500).jsonp(err);
            if (appconfig) {
                return res.status(200).send({
                    type: "OK",
                    reason: "Appconfig Search Success!",
                    data: {appconfig: appconfig}
                });
            }
            else {
                return res.status(404).send({
                    type: "ERROR",
                    reason: "Appconfig Search Failed! (Appconfig Not Found)"
                });
            }

        });
    },
    createAppconfig: function(req, res) {
        var AppconfigData = new Object(req.body);
        AppconfigData.id = config.APPCONFIG_ID;
        AppconfigData.owner = config.ROLES.ADMIN;
        AppconfigData.status = config.STATUSES.ACTIVE;

        var validate = Utils.validateFields(AppconfigData, ['levels', 'levelPoints'], 'Create Appconfig');
        if (validate) {
            return res.status(400).send({
                type: "ERROR",
                reason: validate
            });
        }

        if (AppconfigData.levels !== AppconfigData.levelPoints.length) {
            return res.status(400).send({
                type: "ERROR",
                reason: 'Create Appconfig Failed! (Incorrect Level Points)'
            });
        }
        AppconfigData.referredList = Utils.createLevelNames(AppconfigData.levelPoints);
        var newAppconfig = new Appconfig(AppconfigData);
        newAppconfig.save(function(err, appconfig) {
            if (err)
                return res.status(500).jsonp(err);
            return res.status(200).send({
                type: "OK",
                reason: "Appconfig create Success!",
                data: {appconfig: appconfig}
            });
        });
    }
}

module.exports = appConfig;
