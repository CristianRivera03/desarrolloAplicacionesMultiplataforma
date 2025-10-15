window.addEventListener("DOMContentLoaded" , () =>{
    const replace = (selector, text) =>{
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }

    for(const type of ["chmore" , "node" , "electron"]){
        replaceText(`${type}--version`, process.versions[type])
    }
})