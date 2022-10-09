const { removeRecent, autoSelect, resetAllBooleans } = require('../lib/notes');

const express = require('express');
const router = express.Router();
const path = require('path');

router.use(express.urlencoded({ extended: true }));
router.use(express.json());
router.use(express.static('./public'));

const noteDb = require('../data/db.json');

router.get('/:id', function (req, res) {
  var Invalid = true;
  noteDb.forEach((item) => {
    if (req.params.id == item.id) {
      Invalid = false;
    }
  });

  if (Invalid) {
    res.sendFile(path.join(__dirname, '../public/views/notes-editor.html'));
  } else {
    autoSelect(noteDb, req.params.id);
    removeRecent(noteDb);
    res.sendFile(path.join(__dirname, '../public/views/notes-preview.html'));
  }
});

router.get('/', (req, res) => {
  resetAllBooleans(noteDb);
  res.sendFile(path.join(__dirname, '../public/views/notes-editor.html'));
});

module.exports = router;
