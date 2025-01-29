const express = require("express");
const router = express.Router();
const User = require('../models/AttendanceUser');

router.get("/add/new/subject", async (req,res)=>{
    res.render("./class/addSubject.ejs");
})

router.post('/user/add/new/subject', async (req, res) => {
  const { subjectName, attendancePerClass } = req.body;
  
  if (!subjectName || attendancePerClass === undefined) {
      req.flash('error', 'Subject Name and Attendance per Class are required');
      return res.redirect('/your-form-page');  // Redirect back to the form page
  }

  try {
      const user = await User.findById(req.user._id);
      if (!user) {
          req.flash('error', 'User not found');
          return res.redirect('/your-form-page');
      }

      // Add the new subject
      user.subject.push({ subjectName, attendancePerClass });
      await user.save();

      req.flash('success', 'Subject added successfully!');
      res.redirect('/'); // Redirect to home page or another page where you want to show the message
  } catch (error) {
      console.error('Error adding subject:', error);
      req.flash('error', 'Error adding subject');
      res.redirect('/your-form-page');  // Redirect back to the form page
  }
});

router.post('/delete-subject/:subjectId', async (req, res) => {
    const subjectId = req.params.subjectId;
  
    try {
        // Find and remove the subject by its ID from the User's subjects
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).send('User not found');
        }
  
        // Remove the subject from the user's subjects array
        const subjectIndex = user.subject.findIndex(subject => subject._id.toString() === subjectId);
        if (subjectIndex === -1) {
            return res.status(404).send('Subject not found');
        }
  
        user.subject.splice(subjectIndex, 1); // Remove the subject from the array
  
        // Save the updated user
        await user.save();
  
        req.flash('success', 'Subject deleted successfully!');
        res.redirect('/'); // Redirect back to the home page or a list of subjects
    } catch (error) {
        console.error('Error deleting subject:', error);
        req.flash('error', 'Error deleting subject');
        res.status(500).send('Error deleting subject');
    }
  });
  

  router.get("/show/this/subject/:subjectId", async (req, res) => {
    try {
        const subjectId = req.params.subjectId;
        const userId = req.user._id;
  
        // Find the user by their ID
        const user = await User.findById(userId);
  
        if (!user) {
            return res.status(404).send("User not found");
        }
  
        // Find the subject inside the user's subject array
        const subject = user.subject.find(subject => subject._id.toString() === subjectId);
  
        if (!subject) {
            return res.status(404).send("Subject not found for this user");
        }
        console.log("Found Subject:", subject);
        res.render("./class/thisSubject.ejs", { subject: subject });
    } catch (error) {
        console.error("Error fetching subject:", error);
        res.status(500).send("Server error");
    }
  });
  

router.post('/edit-subject/:subjectId', async (req, res) => {
    const { subjectName, attendancePerClass, totalClasses, attendedClasses } = req.body;
    if (!subjectName || attendancePerClass === undefined || totalClasses === undefined || attendedClasses === undefined) {
        return res.status(400).send('All fields are required');
    }
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        const subject = user.subject.find(sub => sub.subjectName === subjectName);
        if (!subject) {
            return res.status(404).send('Subject not found');
        }
        subject.attendancePerClass = attendancePerClass;
        subject.totalClasses = totalClasses;
        subject.attendedClasses = attendedClasses;
        await user.save();
        req.flash('success', 'Details Updated successfully!');
        res.redirect('/')
    } catch (error) {
        console.error('Error updating subject:', error);
        res.status(500).send('Error updating subject');
    }
});


module.exports = router;