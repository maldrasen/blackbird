/**
 * Using the DOM manipulation functions to do this is just a giant pain in the ass. Just building a table from an HTML
 * string is way easier.
 *
 * @param options { classname }
 * @constructor
 *
 * ### Usage:
 * ```
 * const table = TableBuilder({ table:{ classname:'example-table' } });
 * table.addRow();
 * table.addCell('horny stuff');
 * table.addCell('pleasant things');
 * table.addRow({ classname:'better' });
 * table.addCell('perverted stuff');
 * table.addCell('disgusting things');
 * table.getTable();
 * ```
 */
global.TableBuilder = function(options) {
  const rows = [];

  function addRow(options={}) {
    rows.push({ cells:[], classname:(options.classname||'') });
  }

  function addCell(content, options={}) {
    rows[rows.length-1].cells.push({ content:content, classname:(options.classname||'') });
  }

  function getTable() {
    let table = options.classname ? `<table class=${options.classname}>` : `<table>`
    rows.forEach(row => {
      table += row.classname ? `<tr class='${row.classname}'>` : `<tr>`
      row.cells.forEach(cell => {
        table += cell.classname ? `<td class='${cell.classname}'>` : `<td>`
        table += `${cell.content}</td>`
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