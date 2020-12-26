import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const dataSchema = new Schema({
  todo: String,
});

const Data = mongoose.model('Data',dataSchema);

export default Data;
export { dataSchema };
