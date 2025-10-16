import { animate } from "animejs";
import Masonry from "masonry-layout";

const textForNote = document.getElementById("textForNote");
const addBoton = document.getElementById("addNote");
const container = document.querySelector(".container");

// 🎨 Colores disponibles
const colors = {
  1: "#fdc86d",
  2: "#ff9c74",
  3: "#b993fd",
  4: "#00d3fe",
  5: "#e4ed8d",
};

// 🧱 Iniciar Masonry
const masonry = new Masonry(container, {
  itemSelector: ".note",
  columnWidth: ".grid-sizer",
  percentPosition: true,
  gutter: 15,
});

// 📦 Recuperar notas guardadas
let notes = JSON.parse(localStorage.getItem("notes")) || [];

// ➕ Agregar nueva nota
addBoton.addEventListener("click", () => {
  const text = textForNote.value.trim();
  if (!text) {
    alert("You must write something!");
    return;
  }

  const color = colors[Math.floor(Math.random() * 5) + 1];
  const date = new Date().toLocaleDateString("es-ES");

  const newNote = {
    id: Date.now(),
    text,
    color,
    date,
  };

  notes.push(newNote);
  saveNotes();
  renderNotes();

  textForNote.value = "";
});

// 💾 Guardar notas en localStorage
function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

// 🗑️ Eliminar nota
function deleteNote(id, noteElement) {
  animate(noteElement, {
    scale: [1, 0],
    opacity: [1, 0],
    duration: 400,
    easing: "easeInOutCirc",
    complete: () => {
      notes = notes.filter((n) => n.id !== id);
      saveNotes();
      renderNotes();
    },
  });
}

// 🧩 Renderizar notas
function renderNotes() {
  container.innerHTML = '<div class="grid-sizer"></div>';

  notes.map((note) => {
    const noteDiv = document.createElement("div");
    noteDiv.className = "note";
    noteDiv.style.backgroundColor = note.color;
    noteDiv.style.width = "0px";
    noteDiv.style.height = "0px";

    const noteData = document.createElement("p");
    noteData.innerText = note.text;

    const info = document.createElement("div");
    info.className = "info";

    const noteDate = document.createElement("p");
    noteDate.className = "noteDate";
    noteDate.innerText = note.date;

    const bin = document.createElement("img");
    bin.src = "/bin.svg";
    bin.addEventListener("click", () => deleteNote(note.id, noteDiv));

    info.appendChild(noteDate);
    info.appendChild(bin);

    noteDiv.appendChild(noteData);
    noteDiv.appendChild(info);
    container.appendChild(noteDiv);

    // Animación de aparición
    animate(noteDiv, {
      width: "260px",
      height: "200px",
      easing: "easeInOutCirc",
      duration: 400,
      complete: () => {
        masonry.appended(noteDiv);
        masonry.layout();
      },
    });
  });

  masonry.reloadItems();
  masonry.layout();
}

// 🚀 Mostrar notas al iniciar
document.addEventListener("DOMContentLoaded", () => {
  renderNotes();
});
