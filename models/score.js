const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scoreSchema = new Schema ({
    username: {
        type: String,
        required: true
    },
    score: {
        type: String,
        required: true
    },
    datetime: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('score',scoreSchema);