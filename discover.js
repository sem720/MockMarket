async function initDiscover() {
  const apiUrl =
    "https://api.stockdata.org/v1/data/quote?symbols=BTC-USD&api_token=iZf7sv6XrATAO0RbdQ1OEfSz6QN9Nz0TF6cEdlgh"; // Stelle sicher, dass die URL korrekt ist

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer iZf7sv6XrATAO0RbdQ1OEfSz6QN9Nz0TF6cEdlgh`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Fehler beim Abrufen der Daten");
    }

    const data = await response.json();
    console.log(data); // Debugging: Überprüfen, welche Daten zurückgegeben werden
    renderData(data); // Aufruf der Render-Funktion
  } catch (error) {
    console.error("Es gab ein Problem mit der API-Anfrage:", error);
  }
}

function renderData(data) {
  const container = document.getElementById("asset-render");
  container.innerHTML = ""; // Leere den Container, bevor neue Daten angezeigt werden

  // Überprüfe, ob die Daten vorhanden sind und das Feld 'data' enthält
  if (data && data.data && Array.isArray(data.data)) {
    // Überprüfe, ob es wirklich Daten gibt, die wir rendern können
    if (data.data.length > 0) {
      data.data.forEach((asset) => {
        const assetTemplate = createAssetTemplate(asset);
        container.appendChild(assetTemplate);
      });
    } else {
      container.innerHTML = "<p>Keine Assets gefunden.</p>";
    }
  } else {
    container.innerHTML = "<p>Keine Daten erhalten.</p>";
  }
}

// Funktion zum Erstellen des Templates für jedes Asset
function createAssetTemplate(asset) {
  const assetDiv = document.createElement("div");
  assetDiv.classList.add("asset-render", "top-50");

  // Sicherstellen, dass die Daten vorhanden sind und korrekt angezeigt werden
  assetDiv.innerHTML = `
      <div class="asset-row">
          <div class="asset-currency">
              <img height="40px" src="./imgs/crypto.png" alt="Currency Image" />
              <div class="asset-title">
                  <h5>${asset.name || "Unbekannt"}</h5>
                  <p>${asset.ticker || "Unbekannt"}</p> 
              </div>
          </div>
  
          <div class="asset-buy">
              <p>${
                asset.day_change || "0.00"
              }%</p> <!-- Falls keine Veränderung da ist, 0.00% anzeigen -->
              <img height="30px" src="./imgs/chart-up.png" alt="Chart Up" />
              <p>${
                asset.price || "0.00"
              } €</p> <!-- Falls der Preis nicht verfügbar ist, 0.00 € anzeigen -->
              <button class="buy-button">Buy</button>
          </div>
      </div>
    `;

  return assetDiv;
}
