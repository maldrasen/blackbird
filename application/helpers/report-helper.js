global.ReportHelper = (function() {

  function pad(value, width) { return String(value).padEnd(width); }
  function padNumber(value, width) { return String(value).padStart(width); }

  // Build a fixed-width text table from a set of column definitions ({ label, align }) and an array of rows, each row
  // an array of cell values in column order. Column widths are set to the longest string in each column +1. Returns an
  // array of lines.
  function formatTable(columns, rows) {
    const widths = columns.map((column,index) => {
      const longest = Math.max(column.label.length, ...rows.map(cells => `${cells[index]}`.length));
      return longest + 1;
    });

    const line = cells => columns.map((column,index) => {
      const cell = `${cells[index]}`;
      return column.align === 'right' ? padNumber(cell, widths[index]) : pad(cell, widths[index]);
    }).join(' ');

    const header = line(columns.map(column => column.label));
    return [header, '-'.repeat(header.length), ...rows.map(line)];
  }

  return Object.freeze({
    pad,
    padNumber,
    formatTable,
  });

})();
