// Regenerates docs/tasks/index.md from the frontmatter of every current task file. A task's status is its location:
// files directly in docs/tasks/ are current. Files filed away in a subdirectory (docs/tasks/completed/, and any other
// status directories added later, like docs/tasks/on-hold/) are considered out of scope and left out of the index.
// Run with: node bin/compile-task-index.js

const fs = require('fs');
const path = require('path');

const ROOT = path.normalize(__dirname).replace(/\\/g, '/').replace(/\/bin$/, '');
const TASKS_DIR = `${ROOT}/docs/tasks`;
const INDEX_FILE = `${TASKS_DIR}/index.md`;

function parseFrontmatter(text) {
  const match = text.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;

  const data = {};
  match[1].split('\n').forEach(line => {
    const lineMatch = line.match(/^(\w+):\s*(.*)$/);
    if (lineMatch) data[lineMatch[1]] = lineMatch[2].trim();
  });
  return data;
}

const files = fs.readdirSync(TASKS_DIR).filter(name => name.endsWith('.md') && name !== 'index.md');

const tasks = files.map(name => {
  const frontmatter = parseFrontmatter(fs.readFileSync(`${TASKS_DIR}/${name}`, 'utf8'));
  return frontmatter && { file: name, ...frontmatter };
}).filter(Boolean);

tasks.sort((a, b) => Number(a.priority) - Number(b.priority) || Number(a.id) - Number(b.id));

let output = '# Task Index\n\nGenerated automatically by `bin/compile-task-index.js`. Do not edit by hand.\n';

const priorities = [...new Set(tasks.map(task => task.priority))].sort();

priorities.forEach(priority => {
  output += `\n## Priority ${priority}\n\n`;
  tasks.filter(task => task.priority === priority).forEach(task => {
    const tags = (task.tags || '[]').replace(/^\[|\]$/g, '').split(',').map(tag => tag.trim()).filter(Boolean);
    const tagText = tags.length ? ` ${tags.map(tag => `#${tag}`).join(' ')}` : '';
    const pointText = task.points ? ` \`${task.points}pt\`` : '';
    output += `- [${task.id}] ${task.title}${pointText}${tagText} — [${task.file}](${task.file})\n`;
  });
});

fs.writeFileSync(INDEX_FILE, output);
console.log(`Wrote index for ${tasks.length} tasks to docs/tasks/index.md`);
