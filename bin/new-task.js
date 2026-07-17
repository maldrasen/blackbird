// Creates a new task file in docs/tasks with id, title, and created date filled in from the frontmatter.
// Priority and tags are left blank for manual triage.
// Run with: node bin/new-task.js "Task Title"

const fs = require('fs');
const path = require('path');

const ROOT = path.normalize(__dirname).replace(/\\/g, '/').replace(/\/bin$/, '');
const TASKS_DIR = `${ROOT}/docs/tasks`;

const title = process.argv.slice(2).join(' ').trim();
if (!title) {
  console.error('Usage: node bin/new-task.js "Task Title"');
  process.exit(1);
}

const slug = title
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '');

function collectTaskFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    if (entry.isDirectory()) { return collectTaskFiles(path.join(dir, entry.name)); }
    return entry.name.endsWith('.md') && entry.name !== 'index.md' ? [entry.name] : [];
  });
}

const maxId = collectTaskFiles(TASKS_DIR).reduce((max, name) => {
  const match = name.match(/^(\d+)-/);
  return match ? Math.max(max, Number(match[1])) : max;
}, 0);

const id = String(maxId + 1).padStart(3, '0');
const created = new Date().toISOString().slice(0, 10);
const fileName = `${id}-${slug}.md`;
const filePath = `${TASKS_DIR}/${fileName}`;

const contents = `---
id: ${id}
title: ${title}
priority:
created: ${created}
tags: []
points: 0
---
---
`;

fs.writeFileSync(filePath, contents);
console.log(`Created docs/tasks/${fileName}`);
