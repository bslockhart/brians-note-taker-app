const fs = require('fs');
const path = require('path');

// Parse the JSON data from the database file
var returnData = () => {
  fs.readFile('./data/db.json', 'utf8', (err, jsonString) => {
    if (err) {
      // If it doesn't exist, return error
      console.log('File read failed:', err);
      return;
    }
    // Else, return the file and all it's data
    console.log('File data:', jsonString);
  });
};

// Take the original DB array
function addNote(notesArray, newData, res) {
  // For each note that was previously 'currentlyPosted = true', set it to false
  notesArray.forEach((note) => {
    note.currentlyPosted = false;
  });
  // Push the new data to the DB array
  notesArray.push(newData);
  // Write the file and push the new changes
  fs.writeFileSync(
    path.join(__dirname, '../data/db.json'),
    JSON.stringify(notesArray, null, 2)
  );
}

// When a DELETE requests is made, execute this function
function deleteNote(noteDb, noteId) {
  // Find the index of the note the user wants to delete
  const index = noteDb.findIndex((note) => note.id == noteId);
  // Then use the splice method to remove that note
  noteDb.splice(index, 1);

  // Then update the ID with the index and reset all booleans
  noteDb.forEach((note, index) => {
    note.id = index;
    note.currentlyPosted = false;
    note.currentlySelected = false;
  });

  // Finally push the latest changes
  fs.writeFileSync(
    path.join(__dirname, '../data/db.json'),
    JSON.stringify(noteDb, null, 2)
  );

  return noteDb;
}

// This executes when notes/preview/ endpoint is visited and allows client to:
// View what they clicked vs. showing the most recently added response
function autoSelect(notesArray, id) {
  notesArray.forEach((note, index) => {
    note.id = index;
  });
  notesArray.forEach((note) => {
    // Reset existing booleans
    note.currentlySelected = false;
    // Convert to true AFTER we click the element
    if (id == note.id) {
      note.currentlySelected = true;
    }
  });
  fs.writeFileSync(
    path.join(__dirname, '../data/db.json'),
    JSON.stringify(notesArray, null, 2)
  );
}

// Set the boolean for all notes (currentlyPosted) to false
function removeRecent(notesArray) {
  notesArray.forEach((note) => {
    note.currentlyPosted = false;
  });

  fs.writeFileSync(
    path.join(__dirname, '../data/db.json'),
    JSON.stringify(notesArray, null, 2)
  );
}

// Reset all booleans
function resetAllBooleans(notesArray) {
  notesArray.forEach((note, index) => {
    note.id = index;
    note.currentlyPosted = false;
    note.currentlySelected = false;
  });

  // Write the file
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