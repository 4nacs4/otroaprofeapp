var mongoose = require('mongoose'),
    customId = require('mongoose-hook-custom-id'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;

var User = new Schema({
    id: {type: String, unique: true, required: true, dropDups: true},
    email: {type: String, unique: true, required: true, dropDups: true},
    personType: {type: String, required: true},
    password: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    avatar: {type: String, required: true},
    status: {type: String},
    role: {type: String, required: true},
    displayName: {type: String, required: true},
    created: {type: Date, default: Date.now},
    updated: {type: Date, default: Date.now},
    dob: {type: Date},
    civilStatus: {type: String},
    weight: {type: Number},
    height: {type: Number},
    earnedPoints: {type: Number, default: 0},
    availablePoints: {type: Number, default: 0},
    spentPoints: {type: Number, default: 0},
    cellphone: {type: String},
    phone: {type: String},
    location: Schema.Types.Mixed,
    bussiness: Schema.Types.Mixed,
    extraData: Schema.Types.Mixed,
    membership: Schema.Types.Mixed
});

User.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password'))
        return next();
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err)
            console.log(err);
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err)
                return next(err);
            user.password = hash;
            next();
        });
    });
});

User.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err)
            return cb(err);
        cb(null, isMatch);
    });
};

User.plugin(customId, {mongoose: mongoose});
module.exports = mongoose.model('User', User);  