var firstLaunch = true;
localStorage.setItem('firstLaunch', JSON.stringify(firstLaunch));


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
      notes.forEach((note) => {
        generateNoteEl(note);
      });
    }

  } catch (error) {
    getNotes();
  }
};

var noteContainer = document.getElementById('note-list');
function generateNoteEl(notes) {
  var noteEl = document.createElement('a');
  noteEl.classList.add(`note`, `note-${notes.id}`);
  noteEl.innerHTML = `
  <p>${notes.Title}</p>
  <i class="fa-solid fa-trash-can trash trash-1" aria-hidden="true"></i>
  `;
  noteContainer.appendChild(noteEl);
}

getNotes();