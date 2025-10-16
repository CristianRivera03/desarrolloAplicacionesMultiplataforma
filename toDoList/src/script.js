import { animate } from "animejs";
import Masonry from "masonry-layout";


const textForNote = document.getElementById("textForNote");
const addBoton = document.getElementById("addNote");
const container = document.querySelector(".container");



//Iniciador de Mansory
const masonry = new Masonry(container, {
  itemSelector: ".note",
  columnWidth: ".grid-sizer",
  percentPosition: true,
  gutter: 15
});

const colors = {
  1: "#fdc86d",
  2: "#ff9c74",
  3: "#b993fd",
  4: "#00d3fe",
  5: "#e4ed8d",
};

addBoton.addEventListener("click", () => {
  console.log("click puah");
  createNote();
});

function eraseNote() {
  console.log("Borrando esta shit");
}

function createNote() {
  if (textForNote.value === "") {
    alert("You must write something!");
  } else {
    // color random
    const color = Math.floor(Math.random() * 5) + 1;

    //seleccion de contenedor
    const container = document.querySelector(".container");

    //Creacion de nota
    const note = document.createElement("div");
    //Contenido de nota
    const noteData = document.createElement("p");

    //Fecha, bin  y contenedor
    const info = document.createElement("div");
    const noteDate = document.createElement("p");
    const bin = document.createElement("img");

    //Fecha de nota
    noteDate.innerText = new Date().toLocaleDateString("ES-ES").toString();
    noteDate.className = "noteDate";
    info.appendChild(noteDate);

    //bin
    bin.src = "/bin.svg";
    info.appendChild(bin);

    //Contenedor de bin y fecha
    info.className = "info";

    //Color, texto y clase para la nota
    note.style.backgroundColor = colors[color];
    noteData.innerText = textForNote.value;
    note.className = "note";

    //Anexando
    container.appendChild(note);
    note.appendChild(noteData);
    note.appendChild(info);

    textForNote.value = "";
    note.style.width = "0px";
    note.style.height = "0px";

    animate(note, {
      width: "260px",
      height: "200px",
      ease: "inOutCirc",
      complete: () => {
        masonry.appended(note);
        masonry.layout();
        saveTodos();
      },
    });


    //borrar
    bin.addEventListener("click", () => {
      animate(note, {
        scale: [1, 0],
        opacity: [1, 0],
        duration: 400,
        easing: "ease-in-out",
        complete: () => {
          note.remove();
          masonry.layout();
          saveTodos();
        },
      });
    });
  }
}



function saveTodos(){
    localStorage.setItem("todos" , container.innerHTML)
}

function showTodos(){
    container.innerHTML = localStorage.getItem("todos")

}

showTodos()