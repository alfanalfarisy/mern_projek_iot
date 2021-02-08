const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SiteSchema = new Schema({
  id: {type: Number, required:true},
  name: {type : String, required: true},
  address : {type: String, required: true},
  loc: [{type: Number, required: true},{type: Number, required: true}],
  others : {type: String}
},
{
    timestamps: true
});

const Site = mongoose.model('Site',SiteSchema, 'site');

module.exports = Site;