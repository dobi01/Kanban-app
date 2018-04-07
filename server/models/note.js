import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  task: { type: 'String', required: true },
  id: { type: 'String', unique: true, required: true },
});

export default mongoose.model('Note', noteSchema);
