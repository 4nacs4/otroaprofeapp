var mongoose = require('mongoose'),
    customId = require('mongoose-hook-custom-id'),
    Schema = mongoose.Schema;

var Appconfig = new Schema({
    id:{type: String, unique: true, required: true, dropDups: true},
    levels: {type: Number, unique: true, required: true, dropDups: true},
    status: {type: String, required: true},
    created: {type: Date, required: true, default: Date.now},
    updated: {type: Date, required: true, default: Date.now},
    referredList: Schema.Types.Mixed,
    owner:{type: String, unique: true, required: true, dropDups: true}
});

Appconfig.plugin(customId, {mongoose: mongoose});
module.exports = mongoose.model('Appconfig', Appconfig);  