const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// MongoDB connection (later replace with your real URI)
mongoose.connect('mongodb://localhost:27017/routineDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create database models
const TeacherSchema = new mongoose.Schema({ name: String });
const ScheduleSchema = new mongoose.Schema({
  faculty: String,
  teacherId: String,
  subject: String,
  semester: Number,
  day: String,
  startTime: String,
  endTime: String,
});

const Teacher = mongoose.model('Teacher', TeacherSchema);
const Schedule = mongoose.model('Schedule', ScheduleSchema);

// Routes

// Add Teacher
app.post('/teachers', async (req, res) => {
  const teacher = new Teacher({ name: req.body.name });
  await teacher.save();
  res.send(teacher);
});

// Get all Teachers
app.get('/teachers', async (req, res) => {
  const teachers = await Teacher.find();
  res.send(teachers);
});

// Add Schedule
app.post('/schedules', async (req, res) => {
  const schedule = new Schedule(req.body);
  await schedule.save();
  res.send(schedule);
});

// Get all Schedules
app.get('/schedules', async (req, res) => {
  const schedules = await Schedule.find();
  res.send(schedules);
});

// Delete Schedule
app.delete('/schedules/:id', async (req, res) => {
  await Schedule.findByIdAndDelete(req.params.id);
  res.send({ success: true });
});

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
