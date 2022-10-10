const saveBtn = document.querySelector('.save');
const formInput = document.querySelectorAll('.note-input');
const bodyInput = document.getElementById('note-body');
const titleInput = document.getElementById('note-title');
var noteContainer = document.getElementById('note-list');
const fade = document.querySelector('.placeholder');

window.onpageshow = function (event) {
  if (event.persisted) {
    window.location.reload();
  }
};

document.getElementById('note-title').focus();

var localFirstLaunch = localStorage.getItem('firstLaunch');
parsedScore = JSON.parse(localFirstLaunch);
if (!parsedScore) {
  fade.className = '';
} else {
  firstLaunch = false;
  localStorage.setItem('firstLaunch', JSON.stringify(firstLaunch));
  fade.className = 'first-launch';
}

var validData = [false, false];
formInput.forEach((item) => {
  item.addEventListener('keyup', (e) => {

    if (e.target.dataset.input == 'title') {
      if (e.target.value.length >= 1) {
        validData[0] = true;
      } else {
        validData[0] = false;
      }
    }

    if (e.target.dataset.input == 'body') {
      if (e.target.value.length >= 1) {
        validData[1] = true;
      } else {
        validData[1] = false;
      }
    }

    if (validData[0] && validData[1]) {
      saveBtn.classList.remove('inactive');
    } else {
      saveBtn.classList.add('inactive');
    }
  });
});

function deleteNote(id) {
  fetch(`/api/notes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  var allNotes = document.querySelectorAll('.singleNote-container');
  allNotes.forEach((noteEl) => {
    var noteElId = noteEl.childNodes[0].classList[3].split('-')[1];
    if (id == noteElId) {
      noteEl.remove();
    }
  });
}

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
      notes.forEach((note) => {
        generateNoteEl(note);
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

function generateNoteEl(notes) {
  var singleNote = document.createElement('div');
  singleNote.classList.add('singleNote-container');
  singleNote.innerHTML = `<i class="fa-solid fa-trash-can trash trash-${notes.id}" aria-hidden="true"></i>`;
  var noteEl = document.createElement('a');
  noteEl.href = `/notes/${notes.id}`;
  noteEl.classList.add(`note`, `note-${notes.id}`);
  noteEl.innerHTML = `<p>${notes.Title}</p>`;

  singleNote.appendChild(noteEl);
  noteContainer.appendChild(singleNote);
}

getNotes();


saveBtn.addEventListener('click', () => {
  document.querySelector('form').submit();

  firstLaunch = false;
  localStorage.setItem('firstLaunch', JSON.stringify(firstLaunch));
});
