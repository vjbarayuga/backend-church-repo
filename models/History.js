// models/History.js
import mongoose from 'mongoose';

const historySchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

export default mongoose.model('History', historySchema);
