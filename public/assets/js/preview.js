var previewTitleEl = document.getElementById('note-preview-title');
var previewBodyEl = document.getElementById('note-preview-body');
var addBtn = document.querySelector('.add');
var noteContainer = document.getElementById('note-preview-list');


window.onpageshow = function (event) {
  if (event.persisted) {
    window.location.reload(); 
  }
};


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

      notes.forEach((note, index) => {
        note.id = index;
      });


      notes.forEach((note) => {
        generateNoteEl(note);


        if (note.currentlyPosted) {
          selectNewestNote(note);
        }
        if (note.currentlySelected) {
          selectNote(note);
        }

        handleNoteEvent(notes);
      });


      var deleteBtns = document.querySelectorAll('.trash');
      deleteBtns.forEach((button) => {
        button.addEventListener('click', (e) => {

          var noteId = e.target.classList[3].split('-')[1];

          deleteNote(noteId);
          updateEl();
        });
      });
      return notes;
    }

  } catch (error) {

    getNotes();
  }
};


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


var handleNoteEvent = (dbArr) => {
  var previewNotes = document.querySelectorAll('.note');
  previewNotes.forEach((previewNote) => {
    previewNote.addEventListener('click', () => {
      previewNote.classList.add('active');
      dbArr.forEach((dbNote) => {

        if (dbNote.id == previewNote.classList[1].split('-')[1]) {

          previewBodyEl.textContent = dbNote.Body;
          previewTitleEl.textContent = dbNote.Title;

          resetActive(previewNotes);

          previewNote.classList.add('active');
        }
      });
    });
  });
};


var resetActive = (htmlNodeList) => {
  htmlNodeList.forEach((checkClass) => {
    if (checkClass.classList.contains('active')) {
      checkClass.classList.remove('active');
    }
  });
};

var selectNewestNote = (note) => {
  var previewNotes = document.querySelectorAll('.note');
  resetActive(previewNotes);
  previewBodyEl.textContent = note.Body;
  previewTitleEl.textContent = note.Title;
  previewNotes[previewNotes.length].classList.add('active');
};

var selectNote = (note) => {
  var previewNotes = document.querySelectorAll('.note');
  resetActive(previewNotes);
  previewBodyEl.textContent = note.Body;
  previewTitleEl.textContent = note.Title;
  previewNotes[note.id].classList.add('active');
};

function deleteNote(id) {
  fetch(`/api/notes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  var activePreviewEl = document.getElementById('note-preview');
  activePreviewEl.innerHTML = '';


  var allNotes = document.querySelectorAll('.singleNote-container');
  allNotes.forEach((noteEl) => {

    var noteElId = noteEl.childNodes[0].classList[3].split('-')[1];

    if (id == noteElId) {
      noteEl.remove();
    }
  });
}

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
