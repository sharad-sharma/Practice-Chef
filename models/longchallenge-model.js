const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contestSchema = new Schema({
  code: String,
  name: String,
  problemsList: [{
    problemCode: String,
    submission: Number,
    accuracy: Number,
    viewStart: String,
    submitStart: String,
    visibleStart: String,
    end: String,
    problemCode: String,
    contestCode: String,
    successfulSubmissions: Number,
    accuracy: Number
  }]
});

const LongChallenge = mongoose.model('longchallenge', contestSchema);

module.exports = LongChallenge;