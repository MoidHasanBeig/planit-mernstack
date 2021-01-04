import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project'
  },
  creator: Schema.Types.ObjectId,
  assigned: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  duedate: Date,
  status: String
});

const Task = mongoose.model('Task',taskSchema);

export default Task;
