async function loadDatasetPreview() {
  const tbody = document.getElementById("dataset-body");

  if (!tbody) {
    console.error('Could not find <tbody id="dataset-body">.');
    return;
  }

  try {
    const response = await fetch("./data/revelations.csv");

    if (!response.ok) {
      throw new Error(`CSV request failed with status ${response.status}`);
    }

    const csvText = await response.text();
    const rows = parseCSV(csvText);

    if (rows.length < 2) {
      throw new Error("The CSV does not contain any data rows.");
    }

    const headers = rows[0].map((header) => header.trim());

    const entries = rows.slice(1).map((values) => {
      const entry = {};

      headers.forEach((header, index) => {
        entry[header] = values[index]?.trim() || "";
      });

      return entry;
    });

    tbody.innerHTML = entries
      .slice(0, 8)
      .map(
        (entry) => `
          <tr>
            <td>${entry["Section"] || ""}</td>
            <td>${entry["Date"] || ""}</td>
            <td>${entry["Location"] || ""}</td>
            <td>${entry["Primary Recipient"] || entry["Recipient"] || ""}</td>
            <td>${entry["Primary Theme"] || entry["Theme"] || ""}</td>
          </tr>
        `
      )
      .join("");
  } catch (error) {
    console.error("Dataset preview error:", error);

    tbody.innerHTML = `
      <tr>
        <td colspan="5">Unable to load dataset preview.</td>
      </tr>
    `;
  }
}

function parseCSV(csvText) {
  const rows = [];
  let row = [];
  let value = "";
  let insideQuotes = false;

  for (let index = 0; index < csvText.length; index += 1) {
    const character = csvText[index];
    const nextCharacter = csvText[index + 1];

    if (character === '"' && insideQuotes && nextCharacter === '"') {
      value += '"';
      index += 1;
    } else if (character === '"') {
      insideQuotes = !insideQuotes;
    } else if (character === "," && !insideQuotes) {
      row.push(value);
      value = "";
    } else if (
      (character === "\n" || character === "\r") &&
      !insideQuotes
    ) {
      if (character === "\r" && nextCharacter === "\n") {
        index += 1;
      }

      row.push(value);

      if (row.some((cell) => cell.trim() !== "")) {
        rows.push(row);
      }

      row = [];
      value = "";
    } else {
      value += character;
    }
  }

  if (value !== "" || row.length > 0) {
    row.push(value);
    rows.push(row);
  }

  return rows;
}

document.addEventListener("DOMContentLoaded", loadDatasetPreview);