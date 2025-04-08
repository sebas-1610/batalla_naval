document.addEventListener("DOMContentLoaded", function () {
  // Obtener nickname y nation desde localStorage
  const nickname = localStorage.getItem("nickname");
  const nation = localStorage.getItem("nation");

  // Mostrar el nickname en el navbar
  if (nickname) {
    const nicknameElement = document.getElementById("nickname");
    if (nicknameElement) {
      nicknameElement.textContent = nickname; // Asignar el texto del nickname
      console.log(`Nickname: ${nickname}`);
    }
  } else {
    console.error("No se encontró el nickname en localStorage.");
  }

  // Mostrar la bandera de la nación en el navbar
  if (nation) {
    const nationFlagElement = document.getElementById("nationFlag");
    if (nationFlagElement) {
      nationFlagElement.src = nation; // Asignar la URL de la bandera
      console.log(`Nación seleccionada: ${nation}`);
    }
  } else {
    console.error("No se encontró la nación en localStorage.");
  }
});
