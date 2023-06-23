const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  twitterId: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  displayName: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  accessToken: {
    type: String,
    required: true
  },
  
});

const User = mongoose.model('User', userSchema);

module.exports = User;
