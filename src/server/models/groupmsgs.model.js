import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const groupmsgSchema = new Schema({
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project'
  },
  from: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  content: String,
  read: Boolean
},{
  timestamps: true
});

const GroupMsg = mongoose.model('GroupMsg',groupmsgSchema);

export default GroupMsg;
