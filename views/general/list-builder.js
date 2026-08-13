// The list builder is a utility class that builds an html string within an
// object, which looks cleaner than doing it inline I think.

global.ListBuilder = function(root, classname=null) {
  let html = classname ? `<${root} class='${classname}'>` : `<${root}>`;

  return Object.freeze({
    add: (string) => { html += `${string}`; },
    getList: () => { return `${html}</${root}>`; },
  });
}
