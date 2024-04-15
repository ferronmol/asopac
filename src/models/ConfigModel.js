const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const configSchema = new Schema({
    associationName: {
        type: String,
        required: true
    },
    diseaseOrPathology: {
        type: String,
        required: true
    },
    keywords: {
        type: [String],
        required: true
    },
    description: {
        type: String
    }
});

const Config = mongoose.model('Config', configSchema);

module.exports = Config;
