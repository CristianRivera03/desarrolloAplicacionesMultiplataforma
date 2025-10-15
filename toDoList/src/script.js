
const textForNote = document.getElementById("textForNote")
const addBoton = document.getElementById("addNote")
const checker = document.getElementById("checker")

addBoton.addEventListener("click", () =>{
    console.log("click puah")
    createNote()
})


function createNote(){
    if (textForNote.value === ""){
        alert("You must write something!")
    }else{
        const container = document.querySelector(".container")
        const note = document.createElement("div")
        const noteData = document.createElement("p")
        const noteDate = document.createElement("p")

        noteData.innerText = textForNote.value
        note.className = "note"

        //Fecha de nota
        noteDate.innerText= new Date().toLocaleDateString("ES-ES").toString()
        noteDate.className = "noteDate"

        container.appendChild(note)
        note.appendChild(noteData)
        note.appendChild(noteDate)
        textForNote.value = ""
    }
}



function markAsComplete(){
    checker.addEventListener("click" , () => {
        console.log("ya completaste esta shit")
        note.style.color = "blue"
    })
}