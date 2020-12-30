require('dotenv').config();

import mongoose from 'mongoose';

const altlasUri = process.env.ATLAS_URI;

const mongoInit = () => {
  mongoose.connect(altlasUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log("MongoDB connected");
  });
}

export default mongoInit;
