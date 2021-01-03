import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const projectSchema = new Schema({
  _id: Schema.Types.ObjectId,
  title: String,
  creator: Schema.Types.ObjectId,
  members: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  tasks: [{
    type: Schema.Types.ObjectId,
    ref: 'Task'
  }],
});

const Project = mongoose.model('Project',projectSchema);

export default Project;
