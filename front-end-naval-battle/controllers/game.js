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
  let matrix = [];
  let selectedFigure = null;
  let rotation = 0; // 0: horizontal, 1: vertical
  const maxFigures = { figure1: 4, figure2: 3, figure3: 2, figure4: 1 };
  const placedFigures = { figure1: 0, figure2: 0, figure3: 0, figure4: 0 };

  function createMatrix(size) {
    let contenedorTabla = document.getElementById("contenedorTablero");
    contenedorTabla.innerHTML = "";
    matrix = []; // Reiniciar la matriz
    for (let i = 0; i < size; i++) {
      let row = document.createElement("div");
      row.className = "myRow";
      row.style.display = "flex"; // Asegurarse de que las celdas se alineen horizontalmente
      contenedorTabla.appendChild(row);
      let list = [];
      for (let j = 0; j < size; j++) {
        let cell = document.createElement("div");
        cell.className = "grid";
        cell.id = i + "," + j;
        cell.style.width = "40px";
        cell.style.height = "40px";
        cell.style.border = "1px solid black";
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
        row.appendChild(cell);
        list.push("");
      }
      matrix.push(list);
    }
    let botonValidar = document.createElement("button");
    botonValidar.className = "btn btn-primary";
    botonValidar.innerText = "START";
    contenedorTabla.appendChild(botonValidar);

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

// Add this code at the end of the file
