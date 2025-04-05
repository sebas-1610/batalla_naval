document.addEventListener("DOMContentLoaded", function () {
  // Obtener los parámetros de la URL
  const params = new URLSearchParams(window.location.search);
  const nickname = params.get("nickname");
  const nation = params.get("nation");

  // Mostrar el nickname en el navbar
  if (nickname) {
    const nicknameElement = document.getElementById("nickname");
    if (nicknameElement) {
      nicknameElement.textContent = nickname; // Asignar el texto del nickname
      console.log(`Nickname: ${nickname}`);
    }
  }

  // Mostrar la nación en la consola
  if (nation) {
    console.log(`Nación seleccionada: ${nation}`);
  }
});
