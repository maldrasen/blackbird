// Shared tallying and printing for the loot reports. Each report generates a number of loot results and passes them
// here along with the drop table they were rolled from, so the output shows both what could drop and what did.

function tally(results) {
  const stats = {};
  let empty = 0;

  results.forEach(loot => {
    if (loot.length === 0) { empty += 1; }
    loot.forEach(entry => {
      const stat = stats[entry.articleCode] || (stats[entry.articleCode] = { drops:0, total:0 });
      stat.drops += 1;
      stat.total += entry.quantity;
    });
  });

  return { stats, empty };
}

function percent(count, samples) {
  return `${Math.round((count / samples) * 100)}%`;
}

function printDropTable(table) {
  const rows = [];
  Object.keys(table).sort().forEach(group => {
    table[group].forEach(entry => {
      rows.push([group, entry.code, entry.rarity, Article.lookup(entry.code).getValue(), entry.quantity ? entry.quantity.join('-') : 1]);
    });
  });

  console.log(`\nDrop Table\n`);
  ReportHelper.formatTable([
    { label:'Group' },
    { label:'Article' },
    { label:'Rarity' },
    { label:'Value', align:'right' },
    { label:'Qty', align:'right' },
  ], rows).forEach(line => console.log(line));
}

function printResults(results, table) {
  const samples = results.length;
  const { stats, empty } = tally(results);

  const rows = Object.entries(stats).sort((a,b) => b[1].drops - a[1].drops).map(([code, stat]) => {
    return [code, Article.lookup(code).getValue(), stat.drops, percent(stat.drops, samples), stat.total, (stat.total / stat.drops).toFixed(1)];
  });

  const inTable = new Set(Object.values(table).flat().map(entry => entry.code));
  const never = [...inTable].filter(code => stats[code] == null).sort();

  console.log(`\nGenerated ${samples} times, ${empty} empty (${percent(empty, samples)})\n`);
  ReportHelper.formatTable([
    { label:'Article' },
    { label:'Value', align:'right' },
    { label:'Drops', align:'right' },
    { label:'Rate', align:'right' },
    { label:'Total', align:'right' },
    { label:'Avg', align:'right' },
  ], rows).forEach(line => console.log(line));

  if (never.length > 0) {
    console.log(`\nNever dropped: ${never.join(', ')}`);
  }
}

function average(values) {
  return values.reduce((sum,value) => sum + value, 0) / values.length;
}

function spread(values) {
  return `${Math.min(...values).toFixed(1)} - ${Math.max(...values).toFixed(1)} (avg ${average(values).toFixed(1)})`;
}

// The ceiling is rolled down to a random percentage each generation, so the ranges are shown as the spread of what
// was rolled along with the most the ceiling could ever have been.
function printValueRanges(ranges) {
  console.log(`Value ceiling: ${Math.max(...ranges.map(range => range.max)).toFixed(1)} at most`);
  console.log(`Rolled ceiling: ${spread(ranges.map(range => range.ceiling))}`);
  console.log(`Rolled floor: ${spread(ranges.map(range => range.floor))}`);
}

module.exports = {
  printDropTable,
  printResults,
  printValueRanges,
  spread,
};
