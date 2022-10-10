// Upon first load, set variable to true and add it to localstorage.
// Then in the main page, after animation has occurred, set the variable to false
// so it does not re-fade every time you visit /notes/
var firstLaunch = true;
localStorage.setItem('firstLaunch', JSON.stringify(firstLaunch));

// On page load, refresh the window so the data is up to date
window.onpageshow = function (event) {
  if (event.persisted) {
    window.location.reload(); //reload page if it has been loaded from cache
  }
};

// This file ensures that the accurate number of notes are shown even in the blurred intro screen
// Extract the data from the API and populate our local array with it
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
      // For each note, generate the elements
      notes.forEach((note) => {
        generateNoteEl(note);
      });
    }

    // If the above fetch fails...
  } catch (error) {
    // Re-execute the fetch
    getNotes();
  }
};

// The bottom function will execute in the getNotes() function and it will generate the HTML elements using the notes data
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
