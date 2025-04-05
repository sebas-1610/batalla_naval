import { handleDragOver, handleDragLeave, handleDrop } from "./figures.js";

let matrix = []; // Declarar y exportar matrix

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

      // Agregar eventos para arrastrar y soltar
      cell.addEventListener("dragover", handleDragOver);
      cell.addEventListener("dragleave", handleDragLeave);
      cell.addEventListener("drop", handleDrop);

      tablero.appendChild(cell);
      list.push("");
    }
    matrix.push(list);
  }

  // Eliminar el div con id "inputTamañoTablero"
  document.getElementById("inputTamañoTablero").remove();
}

function cleanBoard() {
  // Limpiar la matriz y el tablero visual
  matrix.forEach((row, x) =>
    row.forEach((_, y) => {
      matrix[x][y] = ""; // Reiniciar la matriz
      const cell = document.getElementById(`${x},${y}`);
      if (cell) {
        cell.style.backgroundColor = ""; // Limpiar celdas
        cell.removeAttribute("draggable"); // Eliminar atributos de arrastre
        cell.innerHTML = ""; // Asegurarse de que las celdas estén vacías
      }
    })
  );

  console.log("Tablero limpiado.");
}

export { matrix, createMatrix, cleanBoard };
