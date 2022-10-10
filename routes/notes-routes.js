const { removeRecent, autoSelect, resetAllBooleans } = require('../lib/notes');

const express = require('express');
const router = express.Router();
const path = require('path');

router.use(express.urlencoded({ extended: true }));
router.use(express.json());
router.use(express.static('./public'));

// Import the JSON data
const noteDb = require('../data/db.json');

// '/notes/<id-number>' will return the notes-preview HTML
// This route allows users to look through notes
router.get('/:id', function (req, res) {
  // Declare a variable to determine which endpoint returns valid data
  var Invalid = true;
  // Check through each note in the database with it's associated ID
  noteDb.forEach((item) => {
    // If the requested id matches a note from the database, the data is valid
    if (req.params.id == item.id) {
      Invalid = false;
    }
  });

  // If the data is invalid meaning the ID doesn't exist in the database....
  if (Invalid) {
    // Return the general editor page
    res.sendFile(path.join(__dirname, '../public/views/notes-editor.html'));
  } else {
    // Else use the id param to auto select the note with matching id from the database
    autoSelect(noteDb, req.params.id);
    // Set all 'recentlyPosted' booleans in the database to false so it doesn't auto click on any of them when previewing notes
    removeRecent(noteDb);
    res.sendFile(path.join(__dirname, '../public/views/notes-preview.html'));
  }
});

// '/notes' will return main note editor HTML which allows users to post new notes
router.get('/', (req, res) => {
  // Reset all booleans when you visit the editor page
  resetAllBooleans(noteDb);
  res.sendFile(path.join(__dirname, '../public/views/notes-editor.html'));
});

module.exports = router;
