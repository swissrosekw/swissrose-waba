const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  from: String,
  text: String,
  timestamp: String,
  messageId: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Message', messageSchema);
