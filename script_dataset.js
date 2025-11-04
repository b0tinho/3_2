// Fetchowanie listy stacji z lokalnego proxy na porcie 3000
async function fetchDatasets() {
  try {
    const response = await fetch("http://localhost:3000/datasets");
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
function createTable(datasets) {
  if (datasets.length === 0) {
    document.getElementById("table-container").textContent = "Brak danych do wyświetlenia.";
    return;
  }

  const rows = datasets.map(dataset => {
    return `
      <tr>
        <td>${dataset.id}</td>
        <td>${dataset.name}</td>
        <td>${dataset.datacoverage}</td>
        <td>${dataset.mindate}</td>
        <td>${dataset.maxdate}</td>
      </tr>
    `;
  }).join("");

  const tableHTML = `
    <table border="1" cellspacing="0" cellpadding="8" style="margin: 0 auto;">
      <thead>
        <tr>
          <th>Dataset ID</th>
          <th>Name</th>
          <th>Data Coverage</th>
          <th>Mindate</th>
          <th>Maxdate</th>
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
  const datasets = await fetchDatasets();
  createTable(datasets);
}

// Uruchom po załadowaniu strony
window.onload = main;
