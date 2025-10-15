const contenedorPelicula = document.getElementById("contenedorPelicula")

document.addEventListener("DOMContentLoaded", () => {
  const buscar = document.getElementById("search");
  buscar.addEventListener("keydown", consulta);
});

const consulta = (e) => {
  if (e.key === "Enter") {
    fetchData(e.target.value.toLowerCase());
  }
};

const APIkey = "http://www.omdbapi.com/?apikey=4bb21c7b&";

const fetchData = async (busqueda) => {
  try {
    console.log(busqueda);
    const res = await fetch(`${APIkey}s=${busqueda}`);

    if (res.status === 200) {
      const data = await res.json();
      if (data.Search && data.Search.length > 0) {
        const contenedorPelicula = document.getElementById("contenedorPelicula");
        contenedorPelicula.textContent = ""; // limpiar resultados anteriores

        data.Search.forEach(async (peli) => {
          // Obtener detalles individuales
          const resDetalle = await fetch(`${APIkey}i=${peli.imdbID}`);
          const detalle = await resDetalle.json();
          const pelicula = {
            titulo: peli.Title,
            año: peli.Year,
            poster: peli.Poster,
            descripcion: detalle.Plot,
          };
          mostrarCard(pelicula);
        });
      } else {
        noEncontrado();
        console.log("algo fallo");
      }
    } else {
      noEncontrado();
      console.log("algo fallo");
    }
  } catch (error) {
    console.log(error);
    console.log("algo fallo");
  }
};


function mostrarCard(pelicula) {
  const contenedorPelicula = document.getElementById("contenedorPelicula");

  contenedorPelicula.innerHTML += `
    <div class="grid grid-cols-1 h-125 w-100 gap-6">
        <div class="relative w-full h-full rounded-2xl overflow-hidden">
          <img
            src="${pelicula.poster}"
            alt="poster"
            class="absolute inset-0 w-full h-full object-cover mask-b-from-20% mask-b-to-80%"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
          <div class="absolute bottom-0 left-0 w-full p-6 text-white">
            <p class="font-bold text-xl">${pelicula.titulo}</p>
            <p class="text-sm">${pelicula.descripcion}</p>
            <p class="mt-2 px-2 rounded-full text-black font-light bg-white w-fit text-sm">${pelicula.año}</p>
          </div>
        </div>
      </div>
  `;
}


// const noEncontrado = () => {
//   const flex = document.querySelector(".flex");
//   const template = document.getElementById("template-movie").content;
//   const clone = template.cloneNode(true);
//   const fragment = document.createDocumentFragment();

//   flex.textContent = "";

//   clone
//     .querySelector(".card-body-img")
//     .setAttribute("src", "/images/no-movie.png");
//   clone.querySelector(
//     ".card-body-title"
//   ).innerHTML = `No encontrado <span></span>`;
//   clone.querySelector(".card-body-text").textContent = "N/A";
//   fragment.appendChild(clone);
//   flex.appendChild(fragment);
//   setCardColor("default");
// };
