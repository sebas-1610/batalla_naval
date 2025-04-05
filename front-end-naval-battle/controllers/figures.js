import { matrix } from "./board.js";
import { createButtons } from "./buttons.js";

let draggedFigure = null;
let rotation = 0; // 0: horizontal, 1: vertical
const maxFigures = {
  BarcoExtraGrande: 1,
  BarcoGrande: 1,
  BarcoMediano: 2,
  BarcoPequeño: 2,
};
const placedFigures = {
  BarcoExtraGrande: 0,
  BarcoGrande: 0,
  BarcoMediano: 0,
  BarcoPequeño: 0,
};

function initializeFigures() {
  const figureContainer = document.getElementById("figureContainer");
  figureContainer.innerHTML = ""; // Limpiar el contenedor de figuras

  // Crear botones utilizando la función de buttons.js
  createButtons(figureContainer);

  // Crear figuras
  const figures = getFigures();
  figures.forEach(createFigureElement);
}

function getFigures() {
  return [
    {
      id: "BarcoExtraGrande",
      size: 5,
      max: 1,
      image: "../assets/images/ships/ship3.png",
    },
    {
      id: "BarcoGrande",
      size: 4,
      max: 1,
      image: "../assets/images/ships/ship3.png",
    },
    {
      id: "BarcoMediano",
      size: 3,
      max: 2,
      image: "../assets/images/ships/ship2.png",
    },
    {
      id: "BarcoPequeño",
      size: 2,
      max: 2,
      image: "../assets/images/ships/ship1.png",
    },
  ];
}

function createFigureElement(figure) {
  const figureContainer = document.getElementById("figureContainer");
  const figureElement = document.createElement("div");
  figureElement.id = figure.id;
  figureElement.className = "figure";
  figureElement.dataset.size = figure.size;
  figureElement.style.border = "1px solid black";
  figureElement.style.padding = "10px";
  figureElement.style.margin = "5px";
  figureElement.style.cursor = "pointer";
  figureElement.style.width = "100px";
  figureElement.style.height = "100px";
  figureElement.style.backgroundImage = `url('${figure.image}')`;
  figureElement.style.backgroundSize = "contain";
  figureElement.style.backgroundRepeat = "no-repeat";
  figureElement.style.backgroundPosition = "center";

  figureElement.setAttribute("draggable", true);
  figureElement.addEventListener("dragstart", () => handleDragStart(figure));
  figureElement.addEventListener("dragend", handleDragEnd);

  figureContainer.appendChild(figureElement);
}

function handleDragStart(figure) {
  if (placedFigures[figure.id] < maxFigures[figure.id]) {
    draggedFigure = figure;
  } else {
    alert(`Ya has colocado el máximo permitido de ${figure.id}`);
    draggedFigure = null;
  }
}

function handleDragEnd() {
  draggedFigure = null;
}

function enableDraggingFromBoard() {
  matrix.forEach((row, x) => {
    row.forEach((cell, y) => {
      if (cell === "ship") {
        const cellElement = document.getElementById(`${x},${y}`);
        cellElement.setAttribute("draggable", true);

        cellElement.addEventListener("dragstart", () =>
          handleDragStartFromBoard(x, y)
        );
        cellElement.addEventListener("dragend", handleDragEnd);
      }
    });
  });
}

function handleDragStartFromBoard(x, y) {
  draggedFigure = { id: "ship", size: 1 }; // Tamaño temporal
  clearShipFromMatrix(x, y);
}

function clearShipFromMatrix(x, y) {
  matrix.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (matrix[i][j] === "ship") {
        matrix[i][j] = "";
        const cellElement = document.getElementById(`${i},${j}`);
        if (cellElement) {
          cellElement.style.backgroundColor = ""; // Limpiar color
        }
      }
    });
  });
}

function handleDragOver(event) {
  event.preventDefault();
  if (draggedFigure) {
    const size = parseInt(draggedFigure.dataset?.size || draggedFigure.size);
    const x = parseInt(this.id.split(",")[0]);
    const y = parseInt(this.id.split(",")[1]);

    // Verificar si las celdas están libres y dentro del tablero
    if (canPlaceFigure(x, y, size)) {
      highlightCells(x, y, size, "red");
    } else {
      highlightCells(x, y, size, "orange");
    }
  }
}

function handleDragLeave() {
  const size = parseInt(
    draggedFigure?.dataset?.size || draggedFigure?.size || 1
  );
  const x = parseInt(this.id.split(",")[0]);
  const y = parseInt(this.id.split(",")[1]);

  highlightCells(x, y, size, "");
}

function handleDrop(event) {
  event.preventDefault();
  if (draggedFigure) {
    const size = parseInt(draggedFigure.dataset?.size || draggedFigure.size);
    const id = draggedFigure.id;
    const x = parseInt(this.id.split(",")[0]);
    const y = parseInt(this.id.split(",")[1]);

    if (placedFigures[id] >= maxFigures[id]) {
      alert(`Ya has colocado el máximo permitido de ${id}`);
      return;
    }

    if (canPlaceFigure(x, y, size)) {
      placeFigureOnBoard(x, y, size, id);
    } else {
      alert("La figura no cabe en esta posición");
    }
  }
}

function canPlaceFigure(x, y, size) {
  return Array.from({ length: size }, (_, k) =>
    rotation === 0 ? matrix[x][y + k] : matrix[x + k]?.[y]
  ).every((cell) => cell === "");
}

function highlightCells(x, y, size, color) {
  for (let k = 0; k < size; k++) {
    const targetCell =
      rotation === 0
        ? document.getElementById(`${x},${y + k}`)
        : document.getElementById(`${x + k},${y}`);
    if (targetCell) {
      targetCell.style.backgroundColor = color;
    }
  }
}

function placeFigureOnBoard(x, y, size, id) {
  for (let k = 0; k < size; k++) {
    const targetCell =
      rotation === 0
        ? document.getElementById(`${x},${y + k}`)
        : document.getElementById(`${x + k},${y}`);
    if (targetCell) {
      targetCell.style.backgroundColor = "grey";
      matrix[x + (rotation === 1 ? k : 0)][y + (rotation === 0 ? k : 0)] =
        "ship";
    }
  }
  placedFigures[id]++;
  draggedFigure = null;
}

function placeShipsRandomly() {
  // Reiniciar el tablero
  matrix.forEach((row, x) =>
    row.forEach((_, y) => {
      matrix[x][y] = "";
      const cell = document.getElementById(`${x},${y}`);
      if (cell) cell.style.backgroundColor = ""; // Limpiar celdas
    })
  );

  // Reiniciar conteo de barcos colocados
  Object.keys(placedFigures).forEach((key) => (placedFigures[key] = 0));

  const figures = getFigures();
  figures.forEach((figure) => {
    for (let count = 0; count < figure.max; count++) {
      let placed = false;

      while (!placed) {
        const randomRotation = Math.random() < 0.5 ? 0 : 1; // 0: horizontal, 1: vertical
        const x = Math.floor(Math.random() * matrix.length);
        const y = Math.floor(Math.random() * matrix.length);

        if (canPlaceFigure(x, y, figure.size)) {
          placeFigureOnBoard(x, y, figure.size, figure.id);
          placed = true;
        }
      }
    }
  });
}

export {
  initializeFigures,
  enableDraggingFromBoard,
  clearShipFromMatrix,
  handleDragOver,
  handleDragLeave,
  handleDrop,
  placeShipsRandomly,
};
