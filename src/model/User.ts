import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: 'string',
  email: 'string',
})

const User = mongoose.model('User', userSchema);

export default User;