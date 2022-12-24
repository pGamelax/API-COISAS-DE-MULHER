import mongoose from "mongoose";

const ScheduleSchema = new mongoose.Schema({
  date: {
    type: String,
    require: true,
  },
  hours: {
    type: String,
    require: true,
  },
  costumer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Costumers",
    required: true,
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employees",
    required: true,
  },
  service: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Schedule = mongoose.model("Schedule", ScheduleSchema);

export default Schedule;
/* 
import db from '../database/database.js'

const Schedule = db.mariadb.define('schedules', {
    name: 
}) */
