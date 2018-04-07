import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// mongoose.plugin(schema => { schema.options.usePushEach = true; });

const laneSchema = new Schema({
  name: { type: 'String', required: true },
  notes: [{ type: Schema.ObjectId, ref: 'Note', required: true }],
  id: { type: 'String', unique: true, required: true },
});

export default mongoose.model('Lane', laneSchema);
