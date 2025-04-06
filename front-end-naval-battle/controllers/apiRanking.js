export async function getPlayerRanking() {
    try {
        const response = await fetch('http://127.0.0.1:5000/ranking');
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        const rankingData = await response.json();

        // Ordenar los datos por puntaje (mayor a menor)
        const sortedData = rankingData.sort((a, b) => b.score - a.score);

        // Llenar la tabla con los datos ordenados
        fillRankingTable(sortedData);

        return sortedData;
    } catch (error) {
        console.error('Error al obtener el ranking:', error);
        return null;
    }
}

function fillRankingTable(data) {
    const tableBody = document.getElementById('ranking-body');
    tableBody.innerHTML = ''; // Limpiar el contenedor antes de llenarlo

    if (!data || data.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="4" class="text-center text-danger">No hay datos disponibles</td></tr>`;
        return;
    }

    data.forEach((player, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td><img src="https://flagcdn.com/16x12/${player.country_code.toLowerCase()}.png" class="flag-img" alt="${player.country_code}"></td>
            <td>${player.nick_name}</td>
            <td>${player.score}</td>
        `;
        tableBody.appendChild(row);
    });
}

document.addEventListener('DOMContentLoaded', getPlayerRanking);