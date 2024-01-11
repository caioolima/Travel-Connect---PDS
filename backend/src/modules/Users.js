const mongoose = require("mongoose");



const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  hashedPassword: {
    type: String,
    required: true
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

// exporta User como um esquema de mongoDB como ele deve ser
