const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DpsSchema = new Schema({
	dt: Date,
	site: Number,
	tma: [Number,Number],
	vair: [Number,Number],
	ch: [Number,Number]

	},
	{
		timestamps: true
	});

// const Dps = mongoose.model('Dps', DpsSchema, 'main_dps');
const Dps = mongoose.model('Dps', DpsSchema, 'temp_dps');

module.exports = Dps;

