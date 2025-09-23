console.log("Notes App");

// Show existing notes on page load
showNotes();

// Add note
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function () {
  let addText = document.getElementById("addText");
  let notes = localStorage.getItem("notes");

  let notesObj = notes ? JSON.parse(notes) : [];

  if (addText.value.trim() !== "") {
    notesObj.push(addText.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addText.value = "";
    showNotes();
  }
});

// Show all notes
function showNotes() {
  let notes = localStorage.getItem("notes");
  let notesObj = notes ? JSON.parse(notes) : [];

  let html = "";
  notesObj.forEach(function (element, index) {
    html += `
      <div class="my-2 mx-2 card noteCard" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">Note ${index + 1}</h5>
          <p class="card-text">${element}</p>
          <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-danger">Delete Note</button>
        </div>
      </div>
    `;
  });

  let notesElm = document.getElementById("notes");
  if (notesObj.length !== 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `<p class="text-muted">Nothing to show! Use "Add Note" above to add notes.</p>`;
  }
}

// Delete note
function deleteNote(index) {
  let notes = localStorage.getItem("notes");
  let notesObj = notes ? JSON.parse(notes) : [];

  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

// Search functionality
let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
  let inputVal = search.value.toLowerCase();
  let noteCards = document.getElementsByClassName("noteCard");

  Array.from(noteCards).forEach(function (element) {
    let cardText = element.getElementsByTagName("p")[0].innerText.toLowerCase();
    if (cardText.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});
