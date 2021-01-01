import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const indivmsgSchema = new Schema({
  from: {
    type: Schema.Types.ObjectId,
    ref: 'User'
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

const IndivMsg = mongoose.model('IndivMsg',indivmsgSchema);

export default IndivMsg;
