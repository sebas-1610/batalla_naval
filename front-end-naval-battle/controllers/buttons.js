import { placeShipsRandomly } from "./figures.js";

let rotation = 0; // 0: horizontal, 1: vertical

function createButtons(figureContainer) {
  // Crear un contenedor para los botones
  const buttonContainer = document.createElement("div");
  buttonContainer.className = "d-flex gap-2"; // Alinear botones horizontalmente

  // Crear botón para girar figuras
  const rotateButton = document.createElement("button");
  rotateButton.className = "btn btn-secondary";
  rotateButton.innerText = "Girar Figura";
  rotateButton.addEventListener("click", function () {
    rotation = (rotation + 1) % 2; // Alternar entre 0 y 1
    const figures = document.querySelectorAll(".figure");
    figures.forEach((figure) => {
      figure.style.transform =
        rotation === 0 ? "rotate(0deg)" : "rotate(90deg)";
    });
  });
  buttonContainer.appendChild(rotateButton);

  // Crear botón para ubicar barcos aleatoriamente
  const randomButton = document.createElement("button");
  randomButton.className = "btn btn-primary btn-sm";
  randomButton.innerText = "Random";
  randomButton.addEventListener("click", placeShipsRandomly);
  buttonContainer.appendChild(randomButton);

  // Agregar el contenedor de botones al contenedor principal
  figureContainer.appendChild(buttonContainer);
}

export { createButtons };
