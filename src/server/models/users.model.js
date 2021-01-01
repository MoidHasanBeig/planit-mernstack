import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  email: String,
  userid: String,
  image: String,
  contacts: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  projects: [{
    type: Schema.Types.ObjectId,
    ref: 'Project'
  }],
  notifications: [{
    type: Schema.Types.ObjectId,
    ref: 'Notification'
  }],
  sentMessages: [{
    type: Schema.Types.ObjectId,
    ref: 'IndivMsg'
  }],
  receivedMessages: [{
    type: Schema.Types.ObjectId,
    ref: 'IndivMsg'
  }]
});

const User = mongoose.model('User',userSchema);

export default User;
