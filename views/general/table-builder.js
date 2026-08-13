/**
 * Using the DOM manipulation functions to do this is just a giant pain in the ass. Just building a table from an HTML
 * string is way easier.
 *
 * @param options
 * @constructor
 *
 * ### Usage:
 * ```
 * const table = TableBuilder({ classname:'example-table' });
 * table.addRow();
 * table.addCell('horny stuff', { classname:'horny-stuff' });
 * table.addCell('pleasant things');
 * table.addRow({ classname:'better' });
 * table.addCell('perverted stuff', { id:'pervertedStuff' });
 * table.addCell('disgusting things');
 * table.getTable();
 * ```
 */
global.TableBuilder = function(options) {
  const tableId = options.id;
  const tableClassname = options.classname;
  const rows = [];

  function addRow(options={}) {
    const row = { cells:[] };
    if (options.id) { row.id = options.id; }
    if (options.classname) { row.classname = options.classname; }
    rows.push(row);
  }

  function addCell(content, options={}) {
    const cell = { content:content };
    if (options.id) { cell.id = options.id }
    if (options.classname) { cell.classname = options.classname; }
    rows[rows.length-1].cells.push(cell);
  }

  function getTable() {
    let table = `<table`;
    if (tableId) { table += ` id='${tableId}'`; }
    if (tableClassname) { table+= ` class='${tableClassname}'`; }
    table += `>`

    rows.forEach(row => {
      table += `<tr`;
      if (row.id) { table += ` id='${row.id}'`; }
      if (row.classname) { table += ` class=${row.classname}` }
      table += `>`

      row.cells.forEach(cell => {
        table += `<td`;
        if (cell.id) { table += ` id='${cell.id}'`; }
        if (cell.classname) { table += ` class='${cell.classname}'` }
        table += `>${cell.content}</td>`;
      });

      table += `</tr>`
    });

    return X.createElement(`${table}</table>`);
  }

  return Object.freeze({
    addRow,
    addCell,
    getTable,
  });

}