// Fetchowanie listy stacji z lokalnego proxy na porcie 3000
async function fetchStations() {
  try {
    const response = await fetch("http://localhost:3000/stations");
    if (!response.ok) throw new Error(`Błąd HTTP: ${response.status}`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Błąd pobierania danych:", error);
    document.getElementById("table-container").textContent = "Błąd pobierania danych.";
    return [];
  }
}

// Tworzenie tabeli HTML z danymi stacji
function createTable(stations) {
  if (stations.length === 0) {
    document.getElementById("table-container").textContent = "Brak danych do wyświetlenia.";
    return;
  }

  const rows = stations.map(station => {
    const parts = station.name.split(",");
    const name = parts[0].trim();
    const state = parts.length > 1 ? parts[1].trim() : "";

    return `
      <tr>
        <td>${station.id}</td>
        <td>${name}</td>
        <td>${state}</td>
        <td>${station.latitude}</td>
        <td>${station.longitude}</td>
      </tr>
    `;
  }).join("");

  const tableHTML = `
    <table border="1" cellspacing="0" cellpadding="8" style="margin: 0 auto;">
      <thead>
        <tr>
          <th>Station ID</th>
          <th>Name</th>
          <th>State</th>
          <th>Latitude</th>
          <th>Longitude</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
  `;

  document.getElementById("table-container").innerHTML = tableHTML;
}

// Główna funkcja
async function main() {
  const stations = await fetchStations();
  createTable(stations);
}

// Uruchom po załadowaniu strony
window.onload = main;
