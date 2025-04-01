// Recibir del input el nickname del jugador y guardarlo en la sesión
document.addEventListener("DOMContentLoaded", function () {
  // Obtener los parámetros de la URL
  const params = new URLSearchParams(window.location.search);
  const nickname = params.get("nickname");
  const nation = params.get("nation");

  // Ejemplo de uso: mostrar el nickname en la barra de navegación
  if (nickname) {
    const nicknameElement = document.getElementById("nickname");
    if (nicknameElement) {
      nicknameElement.textContent = nickname;
    }
  }

  // Ejemplo de uso: mostrar la nación en la consola
  if (nation) {
    console.log(`Nación seleccionada: ${nation}`);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  let boton = document.getElementById("botonNumero");
  let matrix = [];
  let selectedFigure = null;
  let rotation = 0; // 0: horizontal, 1: vertical
  const maxFigures = { figure1: 4, figure2: 3, figure3: 2, figure4: 1 };
  const placedFigures = { figure1: 0, figure2: 0, figure3: 0, figure4: 0 };

  function createMatrix(size) {
    let contenedorTabla = document.getElementById("contenedorTablero");
    contenedorTabla.innerHTML = "";

    // Crear un contenedor para el tablero con tamaño fijo y centrado
    let tablero = document.createElement("div");
    tablero.className = "d-flex flex-wrap";
    tablero.style.width = "100%";
    tablero.style.maxWidth = "500px"; // Tamaño máximo del tablero
    tablero.style.aspectRatio = "1 / 1"; // Mantener proporción cuadrada
    tablero.style.border = "2px solid black";

    contenedorTabla.appendChild(tablero);

    matrix = []; // Reiniciar la matriz
    for (let i = 0; i < size; i++) {
      let list = [];
      for (let j = 0; j < size; j++) {
        let cell = document.createElement("div");
        cell.className = "grid";
        cell.id = i + "," + j;
        cell.style.flex = `0 0 ${100 / size}%`; // Ajustar tamaño de las celdas según el tamaño del tablero
        cell.style.aspectRatio = "1 / 1"; // Mantener proporción cuadrada
        cell.style.border = "1px solid black";
        cell.style.boxSizing = "border-box"; // Incluir bordes en el tamaño total
        cell.addEventListener("click", function () {
          if (selectedFigure) {
            const size = parseInt(selectedFigure.dataset.size);
            const x = parseInt(this.id.split(",")[0]);
            const y = parseInt(this.id.split(",")[1]);

            if (rotation === 0 && y + size <= matrix.length) {
              for (let i = y; i < y + size; i++) {
                document.getElementById(`${x},${i}`).classList.add("selected");
                document.getElementById(`${x},${i}`).style.backgroundColor =
                  "grey"; // Cambiar el color de la celda a gris
                matrix[x][i] = "ship";
              }
              placedFigures[selectedFigure.id]++;
              selectedFigure = null; // Deseleccionar la figura después de colocarla
            } else if (rotation === 1 && x + size <= matrix.length) {
              for (let i = x; i < x + size; i++) {
                document.getElementById(`${i},${y}`).classList.add("selected");
                document.getElementById(`${i},${y}`).style.backgroundColor =
                  "grey"; // Cambiar el color de la celda a gris
                matrix[i][y] = "ship";
              }
              placedFigures[selectedFigure.id]++;
              selectedFigure = null; // Deseleccionar la figura después de colocarla
            } else {
              alert("La figura no cabe en esta posición");
            }
          }
        });
        tablero.appendChild(cell);
        list.push("");
      }
      matrix.push(list);
    }

    // Eliminar el div con id "inputTamañoTablero"
    document.getElementById("inputTamañoTablero").remove();

    // Crear contenedor para las figuras
    const figureContainer = document.getElementById("figureContainer");
    figureContainer.innerHTML = ""; // Limpiar el contenedor de figuras

    // Crear botón para girar figuras
    const rotateButton = document.createElement("button");
    rotateButton.className = "btn btn-secondary";
    rotateButton.innerText = "Girar Figura";
    rotateButton.addEventListener("click", function () {
      rotation = (rotation + 1) % 2; // Alternar entre 0 y 1
    });
    figureContainer.appendChild(rotateButton);

    // Crear figuras
    const figures = [
      { id: "figure1", size: 1 },
      { id: "figure2", size: 2 },
      { id: "figure3", size: 3 },
      { id: "figure4", size: 4 },
    ];

    figures.forEach((figure) => {
      const figureElement = document.createElement("div");
      figureElement.id = figure.id;
      figureElement.className = "figure";
      figureElement.innerText = `Figura ${figure.size}`;
      figureElement.dataset.size = figure.size;
      figureElement.style.border = "1px solid black";
      figureElement.style.padding = "10px";
      figureElement.style.margin = "5px";
      figureElement.style.cursor = "pointer";
      figureElement.addEventListener("click", function () {
        if (placedFigures[figure.id] < maxFigures[figure.id]) {
          selectedFigure = figureElement; // Seleccionar la figura al hacer clic
        } else {
          alert(`Ya has colocado el máximo de ${figure.id}`);
        }
      });
      figureContainer.appendChild(figureElement);
    });
  }

  boton.addEventListener("click", function () {
    let n = parseFloat(document.getElementById("tamañoTablero").value);
    if (n >= 10 && n <= 20) {
      createMatrix(n);
    } else {
      console.log("Ingrese numero valido entre 10 y 20");
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("contenedorTablero").style.width = "65%";
  document.getElementById("contenedorTablero").style.margin = "0 auto";
  document
    .getElementById("contenedorTablero")
    .classList.add("contenedor-tablero");

  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("grid")) {
      let img = document.createElement("img");
      img.style.width = "100%";
      img.style.height = "100%";
      img.classList.add("img-juego");
      // if (Math.random() > 0.5) {
      //   img.src = "front-end-naval-battle/assets/images/ships/ship1.png"; // Replace with the actual image URL for a hit
      // }
      event.target.innerHTML = "";
      event.target.appendChild(img);
    }
  });
});
