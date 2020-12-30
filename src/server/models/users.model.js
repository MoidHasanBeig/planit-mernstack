import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  email: String,
  userid: String,
  image: String,
});

const User = mongoose.model('User',userSchema);

export default User;
