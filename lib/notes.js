const fs = require('fs');
const path = require('path');

var returnData = () => {
  fs.readFile('./data/db.json', 'utf8', (err, jsonString) => {
    if (err) {
      console.log('File read failed:', err);
      return;
    }
    console.log('File data:', jsonString);
  });
};

function addNote(notesArray, newData, res) {
  notesArray.forEach((note) => {
    note.currentlyPosted = false;
  });
  notesArray.push(newData);
  fs.writeFileSync(
    path.join(__dirname, '../data/db.json'),
    JSON.stringify(notesArray, null, 2)
  );
}

function deleteNote(noteDb, noteId) {
  const index = noteDb.findIndex((note) => note.id == noteId);
  noteDb.splice(index, 1);

  noteDb.forEach((note, index) => {
    note.id = index;
    note.currentlyPosted = false;
    note.currentlySelected = false;
  });

  fs.writeFileSync(
    path.join(__dirname, '../data/db.json'),
    JSON.stringify(noteDb, null, 2)
  );

  return noteDb;
}

function autoSelect(notesArray, id) {
  notesArray.forEach((note, index) => {
    note.id = index;
  });
  notesArray.forEach((note) => {
    note.currentlySelected = false;
    if (id == note.id) {
      note.currentlySelected = true;
    }
  });
  fs.writeFileSync(
    path.join(__dirname, '../data/db.json'),
    JSON.stringify(notesArray, null, 2)
  );
}

function removeRecent(notesArray) {
  notesArray.forEach((note) => {
    note.currentlyPosted = false;
  });

  fs.writeFileSync(
    path.join(__dirname, '../data/db.json'),
    JSON.stringify(notesArray, null, 2)
  );
}

function resetAllBooleans(notesArray) {
  notesArray.forEach((note, index) => {
    note.id = index;
    note.currentlyPosted = false;
    note.currentlySelected = false;
  });

  fs.writeFileSync(
    path.join(__dirname, '../data/db.json'),
    JSON.stringify(notesArray, null, 2)
  );
}

module.exports = {
  returnData,
  addNote,
  removeRecent,
  autoSelect,
  resetAllBooleans,
  deleteNote,
};
