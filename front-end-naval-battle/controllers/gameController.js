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
      if (Math.random() > 0.5) {
        img.src = "XXXX"; // Replace with the actual image URL for a hit
      } else {
        img.src = "OOOO"; // Replace with the actual image URL for a miss
      }
      event.target.innerHTML = "";
      event.target.appendChild(img);
    }
  });
});
