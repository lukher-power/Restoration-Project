async function loadDatasetPreview() {
  const tbody = document.getElementById("dataset-preview");

  try {
    const response = await fetch("data/revelations.csv");
    const csv = await response.text();
    const [headerLine, ...rows] = csv.trim().split(/\r?\n/);
    const headers = headerLine.split(",");

    const parsedRows = rows.map((row) => {
      const values = [];
      let current = "";
      let insideQuotes = false;

      for (let index = 0; index < row.length; index += 1) {
        const character = row[index];

        if (character === '"') {
          insideQuotes = !insideQuotes;
        } else if (character === "," && !insideQuotes) {
          values.push(current);
          current = "";
        } else {
          current += character;
        }
      }

      values.push(current);
      const entry = {};
      headers.forEach((header, index) => {
        entry[header] = (values[index] || "").replace(/^"|"$/g, "");
      });
      return entry;
    });

    tbody.innerHTML = parsedRows
      .slice(0, 8)
      .map(
        (entry) => `
          <tr>
            <td>${entry.Section}</td>
            <td>${entry.Date}</td>
            <td>${entry.Location}</td>
            <td>${entry.Primary_Recipient}</td>
            <td>${entry.Primary_Theme}</td>
          </tr>
        `,
      )
      .join("");
  } catch (error) {
    tbody.innerHTML = '<tr><td colspan="5">Dataset preview unavailable.</td></tr>';
    console.error("Unable to load data/revelations.csv", error);
  }
}

loadDatasetPreview();