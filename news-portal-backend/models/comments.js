const mongoose = require('mongoose');
const User = require('./user');
const News = require('./news');

const CommentsSchema = new mongoose.Schema({
  commentBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  commentTo: { type: mongoose.Schema.Types.ObjectId, ref: 'News' },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});



CommentsSchema.set('toObject', { virtuals: true });
CommentsSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Comment', CommentsSchema);
