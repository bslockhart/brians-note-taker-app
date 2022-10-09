const { addNote, deleteNote } = require('../lib/notes');
const express = require('express');
const router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.use(express.json());
router.use(express.static('./public'));

const noteDb = require('../data/db.json');

router.get('/notes', (req, res) => {
  res.json(noteDb);
});

router.post('/notes', (req, res) => {
  var validData = true;
  var newData = {
    Title: req.body.titleData,
    Body: req.body.bodyData,
    id: noteDb.length,
    currentlyPosted: true,
    currentlySelected: false,
  };

  if (newData.Body == '' || newData.Title == '') {
    res.send(
      '<script>alert("Invalid Data, please fill in both fields."); window.location.href = "/notes";</script>'
    );
  } else {
    noteDb.forEach((dbNote) => {
      if (
        newData.Title.toLowerCase() == dbNote.Title.toLowerCase() &&
        newData.Body.toLowerCase() == dbNote.Body.toLowerCase()
      ) {
        validData = false;
      }
    });

    if (validData) {
      addNote(noteDb, newData, res);
      res.redirect(`/notes/${newData.id}`);
    } else {
      res.send(
        '<script>alert("Note already exists."); window.location.href = "/notes";</script>'
      );
      validData = true;
    }
  }
});

router.delete('/notes/:id', (req, res) => {
  const noteId = req.params.id;
  let newArr = deleteNote(noteDb, noteId);
  res.json(newArr);
});

module.exports = router;
