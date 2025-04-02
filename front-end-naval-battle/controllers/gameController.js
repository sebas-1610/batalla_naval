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
      console.log(`Nickname: ${nickname}`);
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
  let draggedFigure = null; // Figura que se está arrastrando
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

  function enableDraggingFromBoard() {
    matrix.forEach((row, x) => {
      row.forEach((cell, y) => {
        if (cell === "ship") {
          const cellElement = document.getElementById(`${x},${y}`);
          cellElement.setAttribute("draggable", true);

          cellElement.addEventListener("dragstart", function () {
            draggedFigure = { id: "ship", size: 1 }; // Tamaño temporal
            // Limpiar las celdas ocupadas por el barco
            clearShipFromMatrix(x, y);
          });

          cellElement.addEventListener("dragend", function () {
            draggedFigure = null;
          });
        }
      });
    });
  }

  function clearShipFromMatrix(x, y) {
    // Limpiar las celdas ocupadas por el barco
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix.length; j++) {
        if (matrix[i][j] === "ship") {
          matrix[i][j] = "";
          const cellElement = document.getElementById(`${i},${j}`);
          if (cellElement) {
            cellElement.style.backgroundColor = ""; // Limpiar color
          }
        }
      }
    }
  }

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

        // Evento para soltar el barco en la celda
        cell.addEventListener("dragover", function (event) {
          event.preventDefault(); // Permitir el drop
          if (draggedFigure) {
            const size = parseInt(draggedFigure.dataset?.size || 1);
            const x = parseInt(this.id.split(",")[0]);
            const y = parseInt(this.id.split(",")[1]);

            // Verificar si las celdas están libres y dentro del tablero
            if (
              (rotation === 0 && y + size <= matrix.length) ||
              (rotation === 1 && x + size <= matrix.length)
            ) {
              const canPlace = Array.from({ length: size }, (_, k) =>
                rotation === 0 ? matrix[x][y + k] : matrix[x + k]?.[y]
              ).every((cell) => cell === "");

              for (let k = 0; k < size; k++) {
                const targetCell =
                  rotation === 0
                    ? document.getElementById(`${x},${y + k}`)
                    : document.getElementById(`${x + k},${y}`);
                if (targetCell && matrix[x][y] !== "ship") {
                  targetCell.style.border = "1px solid black"; // Restaurar borde por defecto
                }
              }

              // Aplicar borde rojo al contorno externo
              if (canPlace) {
                const startCell = document.getElementById(`${x},${y}`);
                const endCell =
                  rotation === 0
                    ? document.getElementById(`${x},${y + size - 1}`)
                    : document.getElementById(`${x + size - 1},${y}`);
                if (startCell && endCell) {
                  startCell.style.borderLeft = "2px solid red";
                  startCell.style.borderTop = "2px solid red";
                  endCell.style.borderRight = "2px solid red";
                  endCell.style.borderBottom = "2px solid red";
                }
              }
            }
          }
        });

        cell.addEventListener("dragleave", function () {
          // Restaurar los bordes originales de las celdas
          const size = parseInt(draggedFigure?.dataset?.size || 1);
          const x = parseInt(this.id.split(",")[0]);
          const y = parseInt(this.id.split(",")[1]);

          for (let k = 0; k < size; k++) {
            const targetCell =
              rotation === 0
                ? document.getElementById(`${x},${y + k}`)
                : document.getElementById(`${x + k},${y}`);
            if (targetCell && matrix[x][y] !== "ship") {
              targetCell.style.border = "1px solid black"; // Restaurar bordes originales
            }
          }
        });

        cell.addEventListener("drop", function (event) {
          event.preventDefault();
          if (draggedFigure) {
            const size = parseInt(draggedFigure.dataset?.size || 1);
            const id = draggedFigure.id; // Obtener el ID del barco
            const x = parseInt(this.id.split(",")[0]);
            const y = parseInt(this.id.split(",")[1]);

            // Verificar si se alcanzó el máximo permitido para este tipo de barco
            if (placedFigures[id] >= maxFigures[id]) {
              alert(`Ya has colocado el máximo permitido de ${id}`);
              return;
            }

            if (rotation === 0 && y + size <= matrix.length) {
              const canPlace = Array.from(
                { length: size },
                (_, k) => matrix[x][y + k]
              ).every((cell) => cell === "");

              if (canPlace) {
                for (let k = 0; k < size; k++) {
                  const targetCell = document.getElementById(`${x},${y + k}`);
                  targetCell.style.backgroundColor = "grey"; // Color de fondo gris
                  targetCell.style.border = "none"; // Eliminar bordes
                  matrix[x][y + k] = "ship";
                }
                placedFigures[id]++; // Incrementar el conteo de barcos colocados
                draggedFigure = null;
              }
            } else if (rotation === 1 && x + size <= matrix.length) {
              const canPlace = Array.from(
                { length: size },
                (_, k) => matrix[x + k]?.[y]
              ).every((cell) => cell === "");

              if (canPlace) {
                for (let k = 0; k < size; k++) {
                  const targetCell = document.getElementById(`${x + k},${y}`);
                  targetCell.style.backgroundColor = "grey"; // Color de fondo gris
                  targetCell.style.border = "none"; // Eliminar bordes
                  matrix[x + k][y] = "ship";
                }
                placedFigures[id]++; // Incrementar el conteo de barcos colocados
                draggedFigure = null;
              }
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
      // Aplicar rotación a las imágenes de los barcos
      const figures = document.querySelectorAll(".figure");
      figures.forEach((figure) => {
        figure.style.transform =
          rotation === 0 ? "rotate(0deg)" : "rotate(90deg)";
      });
    });
    figureContainer.appendChild(rotateButton);

    // Crear botón para colocar barcos aleatoriamente
    const randomButton = document.createElement("button");
    randomButton.className = "btn btn-primary btn-sm"; // Clase para hacerlo más pequeño
    randomButton.innerText = "Random"; // Cambiar texto a "Random"
    randomButton.style.padding = "5px 10px"; // Ajustar tamaño del botón
    randomButton.addEventListener("click", placeShipsRandomly);
    figureContainer.appendChild(randomButton);

    // Crear botón para limpiar el tablero
    const cleanButton = document.createElement("button");
    cleanButton.className = "btn btn-danger btn-sm"; // Clase para hacerlo pequeño
    cleanButton.innerText = "Clean"; // Texto del botón
    cleanButton.style.marginLeft = "10px"; // Espaciado
    cleanButton.addEventListener("click", cleanBoard);
    figureContainer.appendChild(cleanButton);

    // Crear figuras
    const figures = [
      {
        id: "BarcoExtraGrande",
        size: 5,
        max: 1,
        image: "../assets/images/ships/ship3.png", // Cambiar las imagenes
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

    figures.forEach((figure) => {
      const figureElement = document.createElement("div");
      figureElement.id = figure.id;
      figureElement.className = "figure";
      figureElement.dataset.size = figure.size;
      figureElement.style.border = "1px solid black";
      figureElement.style.padding = "10px";
      figureElement.style.margin = "5px";
      figureElement.style.cursor = "pointer";
      figureElement.style.width = "100px"; // Ajustar el tamaño del botón
      figureElement.style.height = "100px"; // Ajustar el tamaño del botón

      // Asignar imagen al barco
      figureElement.style.backgroundImage = `url('${figure.image}')`;
      figureElement.style.backgroundSize = "contain";
      figureElement.style.backgroundRepeat = "no-repeat";
      figureElement.style.backgroundPosition = "center";

      // Eventos para arrastrar el barco
      figureElement.setAttribute("draggable", true);
      figureElement.addEventListener("dragstart", function () {
        const id = figure.id; // Obtener el ID del barco
        if (placedFigures[id] < maxFigures[id]) {
          draggedFigure = figureElement; // Seleccionar la figura al iniciar el arrastre
        } else {
          alert(`Ya has colocado el máximo permitido de ${id}`);
          draggedFigure = null; // No permitir arrastrar si se alcanzó el máximo
        }
      });

      figureElement.addEventListener("dragend", function () {
        draggedFigure = null; // Deseleccionar la figura al terminar el arrastre
      });

      figureContainer.appendChild(figureElement);
    });

    enableDraggingFromBoard();
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

    const figures = [
      { id: "BarcoExtraGrande", size: 5, max: 1 },
      { id: "BarcoGrande", size: 4, max: 1 },
      { id: "BarcoMediano", size: 3, max: 2 },
      { id: "BarcoPequeño", size: 2, max: 2 },
    ];

    figures.forEach((figure) => {
      for (let count = 0; count < figure.max; count++) {
        let placed = false;

        while (!placed) {
          const rotation = Math.random() < 0.5 ? 0 : 1; // 0: horizontal, 1: vertical
          const x = Math.floor(Math.random() * matrix.length);
          const y = Math.floor(Math.random() * matrix.length);

          if (rotation === 0 && y + figure.size <= matrix.length) {
            // Verificar si las celdas están libres
            const canPlace = Array.from(
              { length: figure.size },
              (_, i) => matrix[x][y + i]
            ).every((cell) => cell === "");
            if (canPlace) {
              // Colocar el barco
              for (let i = 0; i < figure.size; i++) {
                matrix[x][y + i] = "ship";
                document.getElementById(`${x},${y + i}`).style.backgroundColor =
                  "grey";
              }
              placed = true;
            }
          } else if (rotation === 1 && x + figure.size <= matrix.length) {
            // Verificar si las celdas están libres
            const canPlace = Array.from(
              { length: figure.size },
              (_, i) => matrix[x + i][y]
            ).every((cell) => cell === "");
            if (canPlace) {
              // Colocar el barco
              for (let i = 0; i < figure.size; i++) {
                matrix[x + i][y] = "ship";
                document.getElementById(`${x + i},${y}`).style.backgroundColor =
                  "grey";
              }
              placed = true;
            }
          }
        }
        placedFigures[figure.id]++;
      }
    });
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

    // Reiniciar conteo de barcos colocados
    Object.keys(placedFigures).forEach((key) => (placedFigures[key] = 0));

    // Habilitar nuevamente el arrastre desde el tablero
    enableDraggingFromBoard();

    console.log("Tablero limpiado.");
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
      event.target.innerHTML = "";
      event.target.appendChild(img);
    }
  });
});
