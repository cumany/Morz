// Zero-dependency registry validator. Run: node registry/validate.mjs
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const file = join(root, "index.json");
const errors = [];
const semver = /^v?\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?$/;
const repoPattern = /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/;
const idPattern = /^[a-z0-9][a-z0-9._-]*$/;
const commitPattern = /^[0-9a-fA-F]{7,40}$/;

let data;
try {
  data = JSON.parse(readFileSync(file, "utf8"));
} catch (error) {
  console.error(`registry/index.json is not valid JSON: ${error.message}`);
  process.exit(1);
}

if (!data || typeof data !== "object" || Array.isArray(data)) {
  console.error("registry/index.json root must be an object");
  process.exit(1);
}
if (data.schemaVersion !== 1) errors.push("schemaVersion must be 1");
if (typeof data.name !== "string" || !data.name.trim()) errors.push("name is required");
for (const key of ["plugins", "themes"]) {
  if (!Array.isArray(data[key])) errors.push(`${key} must be an array`);
}

const seenIds = new Set();
const seenRepos = { plugins: new Set(), themes: new Set() };

function checkImage(value, at) {
  if (value === undefined) return;
  if (typeof value !== "string" || !value.trim()) { errors.push(`${at} must be a non-empty string`); return; }
  if (/^(https:|data:)/i.test(value)) return;
  if (/^[a-z][a-z0-9+.-]*:/i.test(value)) { errors.push(`${at} must be https:, data: or a repo-relative path`); return; }
  if (value.startsWith("/") || value.replace(/\\/g, "/").split("/").includes("..")) {
    errors.push(`${at} must be repo-relative (no leading / or ..)`);
  }
}

function checkEntry(kind, entry, index) {
  const at = `${kind}[${index}]`;
  if (!entry || typeof entry !== "object" || Array.isArray(entry)) { errors.push(`${at} must be an object`); return; }
  for (const key of ["id", "name", "repo", "version"]) {
    if (typeof entry[key] !== "string" || !entry[key].trim()) errors.push(`${at}.${key} is required`);
  }
  if (typeof entry.id === "string") {
    if (!idPattern.test(entry.id)) errors.push(`${at}.id must match ${idPattern}`);
    if (seenIds.has(entry.id)) errors.push(`${at}.id duplicates another entry: ${entry.id}`);
    seenIds.add(entry.id);
  }
  if (typeof entry.repo === "string") {
    if (!repoPattern.test(entry.repo)) errors.push(`${at}.repo must be owner/repo`);
    if (seenRepos[kind].has(entry.repo.toLowerCase())) errors.push(`${at}.repo duplicates another ${kind} entry: ${entry.repo}`);
    seenRepos[kind].add(entry.repo.toLowerCase());
  }
  if (typeof entry.version === "string" && !semver.test(entry.version)) errors.push(`${at}.version must be semver`);
  if (!entry.tag && !entry.commit) errors.push(`${at} needs tag or commit (installs must be pinned)`);
  if (entry.commit && !commitPattern.test(entry.commit)) errors.push(`${at}.commit must be a 7–40 char hex hash`);
  if (entry.trust && entry.trust !== "community") errors.push(`${at}.trust must be community in PRs`);
  if (entry.permissions && (!Array.isArray(entry.permissions) || entry.permissions.some(item => typeof item !== "string"))) {
    errors.push(`${at}.permissions must be an array of strings`);
  }
  if (entry.sha256 && (typeof entry.sha256 !== "object" || Array.isArray(entry.sha256) ||
    Object.values(entry.sha256).some(value => typeof value !== "string"))) {
    errors.push(`${at}.sha256 must be an object of strings`);
  }
  if (entry.changelog !== undefined && typeof entry.changelog !== "string") errors.push(`${at}.changelog must be a string`);
  if (kind === "plugins") checkImage(entry.icon, `${at}.icon`);
  if (kind === "themes") checkImage(entry.preview, `${at}.preview`);
}

if (Array.isArray(data.plugins)) data.plugins.forEach((entry, index) => checkEntry("plugins", entry, index));
if (Array.isArray(data.themes)) data.themes.forEach((entry, index) => checkEntry("themes", entry, index));

if (errors.length) {
  console.error(`registry/index.json has ${errors.length} error(s):`);
  for (const error of errors) console.error(` - ${error}`);
  process.exit(1);
}
console.log(`registry/index.json OK (${Array.isArray(data.plugins) ? data.plugins.length : 0} plugins, ${Array.isArray(data.themes) ? data.themes.length : 0} themes)`);
