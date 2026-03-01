export function parseCsvText(csvText) {
  const lines = csvText
    .split(/\r?\n/)
    .filter((line) => line.trim().length > 0);

  if (!lines.length) {
    return { headers: [], rows: [] };
  }

  const headers = lines[0].split(',').map((item) => item.trim());
  const rows = lines.slice(1).map((line) => {
    const values = line.split(',').map((item) => item.trim());

    return headers.reduce((acc, key, index) => {
      acc[key] = values[index] || '';
      return acc;
    }, {});
  });

  return { headers, rows };
}
