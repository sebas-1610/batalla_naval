// Recibir del input el nickname del jugador y guardarlo en la sesión
// No Terminado
document.addEventListener("DOMContentLoaded", function () {
  const nicknameElement = document.getElementById("nickname");
  if (nicknameElement) {
    console.log(nicknameElement.textContent);
    // nicknameElement.textContent = nicknameElement.textContent; // Replace with the actual nickname
    nicknameElement.textContent = "Player 1"; // Solo es un intento
  }
});
// ----------------------------
document.addEventListener("DOMContentLoaded", function () {
  let boton = document.getElementById("botonNumero");
  function agregarTable() {
    let n = parseFloat(document.getElementById("tamañoTablero").value);

    if (n >= 10 && n <= 20) {
      let nuevaTabla = document.createElement("table");
      nuevaTabla.id = "tabla-juego";
      nuevaTabla.classList.add("tabla-juego");

      let contenedorTabla = document.getElementById("contenedorTablero");
      nuevaTabla.style.width = "100%";
      nuevaTabla.style.tableLayout = "fixed";
      contenedorTabla.innerHTML = "";
      contenedorTabla.appendChild(nuevaTabla);

      for (let i = 0; i < n; i++) {
        let nuevafila = document.createElement("tr");
        for (let j = 0; j < n; j++) {
          let nuevaCelda = document.createElement("td");
          nuevaCelda.id = "celda" + i + j;
          nuevaCelda.classList.add("celda-juego");
          nuevaCelda.style.width = "auto";
          nuevaCelda.style.height = "40px";
          nuevaCelda.style.border = "1px solid black";
          nuevaCelda.addEventListener("dragover", function (event) {
            event.preventDefault();
          });
          nuevaCelda.addEventListener("drop", function (event) {
            event.preventDefault();
            const figureId = event.dataTransfer.getData("text/plain");
            const figureElement = document.getElementById(figureId);
            const size = parseInt(figureElement.dataset.size);
            const x = parseInt(this.id.substring(5, 6));
            const y = parseInt(this.id.substring(6, 7));

            if (y + size <= n) {
              for (let i = y; i < y + size; i++) {
                document
                  .getElementById(`celda${x}${i}`)
                  .classList.add("selected");
              }
            } else {
              alert("La figura no cabe en esta posición");
            }
          });
          nuevafila.appendChild(nuevaCelda);
        }
        nuevaTabla.appendChild(nuevafila);
      }
      let botonValidar = document.createElement("button");
      botonValidar.className = "btn btn-primary";
      botonValidar.innerText = "START";
      contenedorTabla.appendChild(botonValidar);

      // Ocultar el div con id "inputTamañoTablero"
      document.getElementById("inputTamañoTablero").style.display = "none";

      // Crear contenedor para las figuras
      const figureContainer = document.createElement("div");
      figureContainer.id = "figureContainer";
      figureContainer.style.display = "flex";
      figureContainer.style.justifyContent = "center";
      figureContainer.style.marginTop = "20px";
      document.body.appendChild(figureContainer);

      // Crear figuras
      const figures = [
        { id: "figure1", size: 5 },
        { id: "figure2", size: 4 },
        { id: "figure3", size: 3 },
        { id: "figure4", size: 2 },
      ];

      figures.forEach((figure) => {
        const figureElement = document.createElement("div");
        figureElement.id = figure.id;
        figureElement.className = "figure";
        figureElement.draggable = true;
        figureElement.innerText = `Figura ${figure.size}`;
        figureElement.dataset.size = figure.size;
        figureElement.style.border = "1px solid black";
        figureElement.style.padding = "10px";
        figureElement.style.margin = "5px";
        figureElement.style.cursor = "grab";
        figureElement.addEventListener("dragstart", function (event) {
          event.dataTransfer.setData("text/plain", event.target.id);
        });
        figureContainer.appendChild(figureElement);
      });
    } else {
      console.log("Ingrese numero valido entre 10 y 20");
    }
  }
  boton.addEventListener("click", function () {
    agregarTable();
  });
});
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("contenedorTablero").style.width = "65%";
  document.getElementById("contenedorTablero").style.margin = "0 auto";
  document
    .getElementById("contenedorTablero")
    .classList.add("contenedor-tablero");

  document.addEventListener("click", function (event) {
    if (event.target.tagName === "TD") {
      let img = document.createElement("img");
      img.style.width = "100%";
      img.style.height = "100%";
      img.classList.add("img-juego");
      // if (Math.random() > 0.5) {
      //   img.src = "front-end-naval-battle/assets/images/ships/ship1.png"; // Replace with the actual image URL for a hit
      // }
      event.target.innerHTML = "";
      event.target.style.backgroundColor = "grey"; // Cambiar el color de la celda a gris
      event.target.appendChild(img);
    }
  });
});
