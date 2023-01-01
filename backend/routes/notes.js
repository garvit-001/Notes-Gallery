const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");

//Route 1 : Get notes corresponding to a user using :GET "/api/notes/fetchallnotes",,, require login
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.send(notes);
  } catch (error) {
    // console.log(error.message);
    res.status(500).json("Some error occured");
  }
});

//Route 2 : Add notes using :POST "/api/notes/addnotes",,, require login
router.post(
  "/addnotes",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 5 }),
    body("description", "description to too short").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      // if therenare error, return bad request and error
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { title, description, tag } = req.body;
      const newNote = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savedNotes = await newNote.save();
      res.json(savedNotes);
    } catch (error) {
      onsole.log(error.message);
      res.status(500).json("Some error occured");
    }
  }
);

//Route 3 : upadate notes using :PUT "/api/notes/updatenote",,, require login
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    // if therenare error, return bad request and error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { title, description, tag } = req.body;
    const newNote = {};

    // set  the title and description to given new title and description for newNote
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }

    // find note for that id,,, if not found return ,, if user is not same return
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("not found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Access Denied");
    }

    // otherwise update the note as new note and send note as res
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json(note);
  } catch (error) {
    // console.log(error.message);
    res.status(500).json("Some error occured");
  }
});

//Route 4 : Delete a note using :DELETE "/api/notes/deletenote",,, require login
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    // if therenare error, return bad request and error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // find note for that id,,, if not found return ,, if user is not same return
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("not found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Access Denied");
    }

    // otherwise update the note as new note and send note as res
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ success: "note deleted successfully" });
  } catch (error) {
    // console.log(error.message);
    res.status(500).json("Some error occured");
  }
});

module.exports = router;
