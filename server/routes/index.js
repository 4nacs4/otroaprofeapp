var express = require("express");
var router = express.Router();
var middleware = require('../services/middleware');
var auth = require('../controllers/auth');
var profile = require('../controllers/userProfile');
var membership = require('../controllers/membership');
var appconfig = require('../controllers/appconfig');


//authentication routes
router.post('/auth/signin', auth.signIn);
router.post('/auth/signup', auth.signUp);

//configs routes
router.get('/config/:id',middleware.ensureAuthenticated, appconfig.getAppconfig);
router.post('/config/create',middleware.ensureAuthenticated, appconfig.createAppconfig);


//Profile Routes
router.get('/api/profile/:_id',middleware.ensureAuthenticated, profile.getUserProfile);
router.post('/api/profile/update',middleware.ensureAuthenticated, profile.updateUserProfile);

//Membership Routes
router.post('/api/membership/create',middleware.ensureAuthenticated, membership.createMembership);
router.get('/api/membership/referredUsers/:_id/:level',middleware.ensureAuthenticated, membership.getUsersReferredLevel);

module.exports = router;
