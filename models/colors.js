const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const colorSchema = new mongoose.Schema({
  // id: {type: mongoose.SchemaTypes.ObjectId, required: true},
  name: { type: String, required: true },
  value: { type: String, required: true },
  username: {type: String}
}, 
{ timestamps: true });

const Color = mongoose.model("Color", colorSchema);

module.exports = Color;