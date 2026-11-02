#!/usr/bin/env node
// Buduje paczki moja-firma-serwis z jednego źródła: skills/<nazwa>/SKILL.md.
//
//   node scripts/build.mjs          sprawdza skille i buduje dist/
//   node scripts/build.mjs --check  tylko sprawdza (do CI)
//
// dist/skills/<nazwa>/SKILL.md   bez zmian: Claude, Codex, OpenClaw, Copilot Cowork (import SKILL.md)
// dist/instrukcje/<nazwa>.md     instrukcja „spłaszczona” do wklejenia: agent M365 Copilot,
//                                Gem w Gemini, projekt lub GPT w ChatGPT
//
// Bez zależności, Node 18+.

import { readdir, readFile, writeFile, mkdir, rm, cp } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SKILLS = join(ROOT, "skills");
const DIST = join(ROOT, "dist");
const CHECK_ONLY = process.argv.includes("--check");

// Bezpieczny limit długości instrukcji przy wklejaniu do kreatorów agentów.
const INSTRUCTION_LIMIT = 8000;
const NAME_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;

const plugin = JSON.parse(await readFile(join(ROOT, ".claude-plugin", "plugin.json"), "utf8"));

function parseSkill(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!m) return null;
  const fm = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^([a-z_]+):\s*(.*)$/); // tylko klucze najwyższego poziomu
    if (kv && kv[2] !== "") fm[kv[1]] = kv[2].replace(/^["']|["']$/g, "");
  }
  return { fm, body: m[2].trim() };
}

const errors = [];
const warnings = [];
const skills = [];

for (const dir of (await readdir(SKILLS, { withFileTypes: true })).filter((d) => d.isDirectory())) {
  const file = join(SKILLS, dir.name, "SKILL.md");
  let text;
  try {
    text = await readFile(file, "utf8");
  } catch {
    errors.push(`${dir.name}: brak SKILL.md`);
    continue;
  }
  const parsed = parseSkill(text);
  if (!parsed) {
    errors.push(`${dir.name}: brak nagłówka YAML (---)`);
    continue;
  }
  const { fm, body } = parsed;
  if (!fm.name) errors.push(`${dir.name}: brak pola name`);
  else {
    if (fm.name !== dir.name) errors.push(`${dir.name}: name „${fm.name}” różni się od nazwy katalogu`);
    if (!NAME_RE.test(fm.name) || fm.name.length > 64)
      errors.push(`${dir.name}: name musi mieć małe litery ASCII, cyfry i myślniki, maks. 64 znaki`);
  }
  if (!fm.description) errors.push(`${dir.name}: brak pola description`);
  else if (fm.description.length > 1024) errors.push(`${dir.name}: description dłuższy niż 1024 znaki`);

  const title = (body.match(/^#\s+(.+)$/m) || [, dir.name])[1];
  const flat = [
    `# ${title} (${plugin.name} ${plugin.version})`,
    "",
    `Kiedy używać: ${fm.description}`,
    "",
    body.replace(/^#\s+.+\r?\n/, "").trim(),
    "",
    "---",
    `Procedura „${fm.name}” z paczki ${plugin.name} ${plugin.version} (${plugin.repository}), licencja MIT.`,
    "Jeśli nie masz pliku moja-firma.md, poproś użytkownika o profil firmy albo zapytaj o brakujące informacje.",
    "",
  ].join("\n");
  if (flat.length > INSTRUCTION_LIMIT)
    warnings.push(`${dir.name}: instrukcja ma ${flat.length} znaków (limit ${INSTRUCTION_LIMIT}) — przy wklejaniu dodaj SKILL.md jako plik wiedzy`);

  skills.push({ name: dir.name, title, flat, chars: flat.length });
}

for (const w of warnings) console.warn(`uwaga: ${w}`);
if (errors.length) {
  for (const e of errors) console.error(`błąd: ${e}`);
  process.exit(1);
}

if (CHECK_ONLY) {
  console.log(`OK: ${skills.length} skilli poprawnych.`);
  process.exit(0);
}

await rm(DIST, { recursive: true, force: true });
await mkdir(join(DIST, "instrukcje"), { recursive: true });
await cp(SKILLS, join(DIST, "skills"), { recursive: true });
for (const s of skills) await writeFile(join(DIST, "instrukcje", `${s.name}.md`), s.flat, "utf8");

console.log(`Zbudowano dist/ dla ${skills.length} skilli:`);
for (const s of skills) console.log(`  ${s.name.padEnd(32)} ${String(s.chars).padStart(5)} znaków`);
