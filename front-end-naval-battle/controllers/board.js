import { handleDragOver, handleDragLeave, handleDrop } from "./figures.js";

let matrix = [];

function createMatrix(size) {
  let contenedorTabla = document.getElementById("contenedorTablero");
  contenedorTabla.innerHTML = "";

  let tablero = document.createElement("div");
  tablero.className = "d-flex flex-wrap";
  tablero.style.width = "100%";
  tablero.style.maxWidth = "500px";
  tablero.style.aspectRatio = "1 / 1";
  tablero.style.border = "2px solid black";

  contenedorTabla.appendChild(tablero);

  matrix = [];
  for (let i = 0; i < size; i++) {
    let list = [];
    for (let j = 0; j < size; j++) {
      let cell = document.createElement("div");
      cell.className = "grid";
      cell.id = i + "," + j;
      cell.style.flex = `0 0 ${100 / size}%`;
      cell.style.aspectRatio = "1 / 1";
      cell.style.border = "1px solid black";
      cell.style.boxSizing = "border-box";

      cell.addEventListener("dragover", handleDragOver);
      cell.addEventListener("dragleave", handleDragLeave);
      cell.addEventListener("drop", handleDrop);

      tablero.appendChild(cell);
      list.push("");
    }
    matrix.push(list);
  }

  document.getElementById("inputTamañoTablero").remove();
}

// Limpiar el tablero y reinicia la matriz.
function cleanBoard() {
  matrix.forEach((row, x) =>
    row.forEach((_, y) => {
      matrix[x][y] = "";
      const cell = document.getElementById(`${x},${y}`);
      if (cell) {
        cell.style.backgroundColor = "";
        cell.removeAttribute("draggable");
        cell.innerHTML = "";
      }
    })
  );
  console.log("Tablero limpiado.");
}

export { matrix, createMatrix, cleanBoard };
