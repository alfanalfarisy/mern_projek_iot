const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const KlinikSchema = new Schema({
  id: {type:Number, required: true},
  name: {type: String, required: true},
  owner : {type: String, required: true},
  loc: [{type: Number, required: true},{type: Number, required: true}],
},
{
    timestamps: true
});

const Klinik = mongoose.model('klinik', KlinikSchema, 'klinik');

module.exports = Klinik;