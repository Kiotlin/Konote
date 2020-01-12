var beautifyUnique = require('mongoose-beautiful-unique-validation');
var mongoose = require("mongoose");

var memoSchema = mongoose.Schema({
    username: { type: String, require: true },
    timestamp: { type: String, require: true, default: Date.now },
    title: { type: String, require: true },
    author: { type: String, require: true },
    content: { type: String, default: Date.now }
});

memoSchema.plugin(beautifyUnique);

var Memo = mongoose.model('Memo', memoSchema);
module.exports = Memo;