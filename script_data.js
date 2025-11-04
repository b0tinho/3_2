document.getElementById("data-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const params = new URLSearchParams(new FormData(form)).toString();

  const url = `http://localhost:3000/data?${params}`;
  const resultDiv = document.getElementById("result");
  resultDiv.textContent = "Ładowanie...";

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Błąd HTTP: ${response.status}`);

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      resultDiv.textContent = "Brak danych dla podanych parametrów.";
      return;
    }

    // Proste wyświetlenie wyników w tabeli
    const rows = data.results.map(item => `
      <tr>
        <td>${item.date}</td>
        <td>${item.datatype}</td>
        <td>${item.station}</td>
        <td>${item.value}</td>
        <td>${item.attributes}</td>
      </tr>
    `).join("");

    const tableHTML = `
      <table border="1" cellspacing="0" cellpadding="8">
        <thead>
          <tr>
            <th>Data</th>
            <th>Typ danych</th>
            <th>Stacja</th>
            <th>Wartość</th>
            <th>Atrybuty</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    `;

    resultDiv.innerHTML = tableHTML;

  } catch (error) {
    resultDiv.textContent = "Błąd pobierania danych.";
    console.error(error);
  }
});
