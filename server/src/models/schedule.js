const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
  dataVisit: {
    id : { type: String, required: true},
    session: {type: Number, default: 1},
    done: {type: Boolean, default: false},
  },
  userName: { type: String, required: true},
  doctor: { type: String, required: true },
  location: { type: String, required: true },
  datetime: { type: Date, required: true },
  report: { type: String, required: true },
},
{
    timestamps: true
});

const Schedule = mongoose.model('schedules', scheduleSchema, 'schedules');

module.exports = Schedule;