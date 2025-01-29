const express = require("express");
const router = express.Router();
const User = require('../models/AttendanceUser');

// Route to mark attendance
router.post("/mark-attendance/:subjectId", async (req, res) => {
    try {
        const userId = req.user._id;
        const { subjectId } = req.params;
        const { status } = req.body; // 'present' or 'absent'
  
        // Find the user
        const user = await User.findById(userId);
  
        if (!user) {
            return res.status(404).send("User not found");
        }
  
        // Find the subject within the user's subject array
        const subject = user.subject.id(subjectId);
  
        if (!subject) {
            return res.status(404).send("Subject not found");
        }
  
        // Calculate the attendance update
        const attendancePerClass = subject.attendancePerClass;
        if (status === 'present') {
            subject.totalClasses += attendancePerClass;
            subject.attendedClasses += attendancePerClass;
        } else if (status === 'absent') {
            subject.totalClasses += attendancePerClass;
            subject.attendedClasses += 0; // Set attendedClasses to 0 for absent
        } else {
            return res.status(400).send("Invalid status. Use 'present' or 'absent'");
        }
  
        // Update total attendance for the user
        user.totalAttendance = user.subject.reduce((total, sub) => total + sub.totalClasses, 0);
        user.totalAttended = user.subject.reduce((total, sub) => total + sub.attendedClasses, 0);
  
        // Save the updated user document
        await user.save();
        req.flash('success', 'Attendance marked successfully!');
  
        res.redirect('/'); // Redirect to the subject page
  
    } catch (error) {
        console.error("Error marking attendance:", error);
        res.status(500).send("Server error");
    }
  });

module.exports = router;