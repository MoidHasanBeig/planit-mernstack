import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const projectSchema = new Schema({
  title: String,
  creator: mongoose.ObjectId,
  members: Array,
});

const Project = mongoose.model('Project',projectSchema);

export default Project;
