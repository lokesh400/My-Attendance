const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");


const SubjectSchema = new mongoose.Schema({
  subjectName: {
    type: String,
  },
  attendancePerClass: {
    type: Number,
    default: 0,
  },
  totalClasses: {
    type: Number,
    default: 0,
  },
  attendedClasses: {
    type: Number,
    default: 0,
  },
});

const AttendanceUserSchema = new mongoose.Schema({
  name:{
    type:String,
  },
  email:{
    type:String,
    required:true,
    
  },
  totalAttendance: {
    type: Number,
    default: 0,
  },
  totalAttended: {
    type: Number,
    default: 0,
  },
  username:{
    type:String,
    required:true,
  },
  subject:[SubjectSchema]
});

AttendanceUserSchema.plugin(passportLocalMongoose);

const User = mongoose.model('AttendanceUser', AttendanceUserSchema);

module.exports = User;