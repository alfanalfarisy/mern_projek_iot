const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  numberPhone: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  confirmed: { type: Boolean, default: false },
  admin : {type: Boolean, default :false}
  
},
{
    timestamps: true
});

const User = mongoose.model('users', userSchema, 'users');

module.exports = User;