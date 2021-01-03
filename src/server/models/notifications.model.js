import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project'
  },
  task: {
    type: Schema.Types.ObjectId,
    ref: 'Task'
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  content: String,
  read: Boolean
},{
  timestamps: true
});

const Notification = mongoose.model('Notification',notificationSchema);

export default Notification;
