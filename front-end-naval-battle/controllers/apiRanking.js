export async function getPlayerRanking() {
    try {
        const response = await fetch('http://127.0.0.1:5000/ranking');
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        const rankingData = await response.json();
        
        // Llenar la estructura de divs con los datos
        fillRankingDiv(rankingData);
        
        return rankingData;
    } catch (error) {
        console.error('Error al obtener el ranking:', error);
        return null;
    } 
}

function fillRankingDiv(data) {
    const rankingBody = document.getElementById('ranking-body');
    rankingBody.innerHTML = ''; // Limpiar el contenedor antes de llenarlo

    if (!data || data.length === 0) {
        const noDataMessage = document.createElement('div');
        noDataMessage.className = 'ranking-row'; // Clase para estilos
        noDataMessage.textContent = 'No hay datos disponibles';
        rankingBody.appendChild(noDataMessage);
        return;
    }

    data.forEach(player => {
        // Crear una fila (div) para cada jugador
        const playerRow = document.createElement('div');
        playerRow.className = 'ranking-row'; // Clase para estilos

        // Columna País (con clase para estilos)
        const countryDiv = document.createElement('div');
        countryDiv.className = 'ranking-column';
        countryDiv.textContent = player.country_code.toUpperCase(); // Ejemplo: "CO"
        playerRow.appendChild(countryDiv);

        // Columna Nickname
        const nickDiv = document.createElement('div');
        nickDiv.className = 'ranking-column';
        nickDiv.textContent = player.nick_name;
        playerRow.appendChild(nickDiv);

        // Columna Puntaje
        const scoreDiv = document.createElement('div');
        scoreDiv.className = 'ranking-column';
        scoreDiv.textContent = player.score;
        playerRow.appendChild(scoreDiv);

        // Añadir la fila al cuerpo
        rankingBody.appendChild(playerRow);
    });
}
// Llamar a la función para obtener el ranking al cargar la página
document.addEventListener('DOMContentLoaded', getPlayerRanking);