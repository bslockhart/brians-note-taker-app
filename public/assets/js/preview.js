var previewTitleEl = document.getElementById('note-preview-title');
var previewBodyEl = document.getElementById('note-preview-body');
var addBtn = document.querySelector('.add');
var noteContainer = document.getElementById('note-preview-list');

// On page load, refresh the window so the data is up to date
window.onpageshow = function (event) {
  if (event.persisted) {
    window.location.reload();
  }
};

// Extract data from API database
var getNotes = async () => {
  var url = '/api/notes';
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res.status > 400) {
      alert('No data returned!');
    } else {
      var notes = await res.json();
      // Assign an id to all existing notes and increment by each note
      notes.forEach((note, index) => {
        note.id = index;
      });

      // For each note, generate the elements
      notes.forEach((note) => {
        generateNoteEl(note);

        // When we visit this preview page, if the note was previously added, auto select it
        if (note.currentlyPosted) {
          selectNewestNote(note);
        }
        if (note.currentlySelected) {
          selectNote(note);
        }

        handleNoteEvent(notes);
      });

      // To handle deleting items from the data base
      // Add the event listeners for the trash buttons
      var deleteBtns = document.querySelectorAll('.trash');
      deleteBtns.forEach((button) => {
        button.addEventListener('click', (e) => {
          // Extract the ID from the trash class which is associated with the note id
          var noteId = e.target.classList[3].split('-')[1];
          // Execute deleteNote() with the given id (uses delete method)
          deleteNote(noteId);
          updateEl();
        });
      });
      return notes;
    }
    // If the above fetch fails
  } catch (error) {
    // Re-execute the fetch
    getNotes();
  }
};

// The bottom function will execute in the getNotes() function and it will generate the HTML elements using the notes data
function generateNoteEl(note) {
  var singleNote = document.createElement('div');
  singleNote.classList.add('singleNote-container');
  singleNote.innerHTML = `<i class="fa-solid fa-trash-can trash trash-${note.id}" aria-hidden="true"></i>`;
  var noteEl = document.createElement('a');
  noteEl.classList.add(`note`, `note-${note.id}`);
  noteEl.innerHTML = `<p>${note.Title}</p>`;

  singleNote.appendChild(noteEl);
  noteContainer.appendChild(singleNote);
}

// The below function will update the preview title and body in the preview page HTML
// It will look through the Database and compare with the existing elements in the webpage
var handleNoteEvent = (dbArr) => {
  var previewNotes = document.querySelectorAll('.note');
  previewNotes.forEach((previewNote) => {
    previewNote.addEventListener('click', () => {
      previewNote.classList.add('active');
      dbArr.forEach((dbNote) => {
        // If the database id matches with the note id of the existing element...
        if (dbNote.id == previewNote.classList[1].split('-')[1]) {
          // Update the actual title and body in the HTML page to display the clicked note
          previewBodyEl.textContent = dbNote.Body;
          previewTitleEl.textContent = dbNote.Title;
          // Check through all elements to see if any has an active class at the same time the user
          // clicks on a note. If there is an existing active class, remove it so we can add
          // a new one when clicking on the next note
          resetActive(previewNotes);
          // Add class of active to the clicked note
          previewNote.classList.add('active');
        }
      });
    });
  });
};

// Removes all active classes from the notes
var resetActive = (htmlNodeList) => {
  htmlNodeList.forEach((checkClass) => {
    if (checkClass.classList.contains('active')) {
      checkClass.classList.remove('active');
    }
  });
};

// This auto selects the newest note that was created
var selectNewestNote = (note) => {
  var previewNotes = document.querySelectorAll('.note');
  resetActive(previewNotes);
  previewBodyEl.textContent = note.Body;
  previewTitleEl.textContent = note.Title;
  previewNotes[previewNotes.length].classList.add('active');
};

// This auto selects the selected note
var selectNote = (note) => {
  var previewNotes = document.querySelectorAll('.note');
  resetActive(previewNotes);
  previewBodyEl.textContent = note.Body;
  previewTitleEl.textContent = note.Title;
  previewNotes[note.id].classList.add('active');
};

// Execute delete request and remove the appropriate element
function deleteNote(id) {
  fetch(`/api/notes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  // If the note was originally selected then the trash event triggers, remove the elements
  var activePreviewEl = document.getElementById('note-preview');
  activePreviewEl.innerHTML = '';

  // After data has been deleted from the JSON database, remove the element from the DOM
  var allNotes = document.querySelectorAll('.singleNote-container');
  allNotes.forEach((noteEl) => {
    // Extract all the IDs of the active elements
    var noteElId = noteEl.childNodes[0].classList[3].split('-')[1];
    // The id in this case would be the element associated with the trash icon we click on
    if (id == noteElId) {
      noteEl.remove();
    }
  });
}

// Upon deleting a note, update all other elements to ensure consistency in label values
// Update all links and labels (ids) starting value 0 and incrementing by 1
function updateEl() {
  var noteList = document.querySelectorAll('.note');
  var trashList = document.querySelectorAll('.trash');
  noteList.forEach((note, index) => {
    note.href = `/notes/${index}`;
    note.className = `note note-${index}`;
  });
  trashList.forEach((note, index) => {
    note.className = `fa-solid fa-trash-can trash trash-${index}`;
  });
}

getNotes();

addBtn.addEventListener('click', () => {
  window.location.href = '/notes';
});
