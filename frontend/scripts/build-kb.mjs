// Génère data/knowledge.generated.ts depuis le corpus markdown partagé (../data/corpus_kb).
// Le corpus vit hors de frontend/ : le fichier généré est commité pour rester
// disponible sur un déploiement dont la racine est frontend/.

import { readdir, readFile, stat, writeFile } from "node:fs/promises";
import { join, resolve, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";

const FRONTEND_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const CORPUS_DIR = resolve(FRONTEND_ROOT, "../data/corpus_kb");
const OUT_FILE = join(FRONTEND_ROOT, "data/knowledge.generated.ts");

const CATEGORY_MAP = {
  "comptes et authentification": "Comptes & authentification",
  "reseau et connectivite": "Réseau & connectivité",
  "materiel informatique - postes de travail": "Matériel",
  "materiel informatique - peripheriques d'affichage et de bureau": "Matériel",
  "materiel informatique - equipements reseau locaux": "Matériel",
  "logiciels et applications": "Logiciels & applications",
  "imprimantes et peripheriques": "Imprimantes",
  "droits d'acces": "Droits d'accès",
  cybersecurite: "Cybersécurité",
  "autre ou indetermine": "Autre",
};

const TYPE_BY_PREFIX = {
  AUTH: "procédure",
  NET: "fiche technique",
  HW: "fiche technique",
  SW: "procédure",
  PRINT: "procédure",
  ACC: "procédure",
  SEC: "règle de sécurité",
  OTH: "procédure",
};

const STOPWORDS = new Set([
  "de", "du", "des", "la", "le", "les", "un", "une", "et", "ou", "a", "au", "aux",
  "en", "sur", "pour", "par", "plus", "ne", "non", "d", "l", "se", "sa", "son",
  "kb", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12",
]);

const deaccent = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "");

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else if (entry.name.endsWith(".md") && entry.name !== "README.md") out.push(full);
  }
  return out;
}

function parseDoc(rawInput, file) {
  const raw = rawInput.replace(/\r\n/g, "\n").replace(/^﻿/, "");
  const header = /^# ID:\s*(.+)\r?\n# Titre:\s*(.+)\r?\n# Catégorie:\s*(.+)\r?\n/.exec(raw);
  if (!header) throw new Error(`En-tête ID/Titre/Catégorie introuvable dans ${file}`);

  const [, id, title, rawCategory] = header.map((s) => s.trim());
  const category = CATEGORY_MAP[deaccent(rawCategory).toLowerCase()];
  if (!category) throw new Error(`Catégorie non mappée « ${rawCategory} » dans ${file}`);

  const prefix = id.split("-")[1];
  const type = TYPE_BY_PREFIX[prefix];
  if (!type) throw new Error(`Préfixe d'ID inconnu « ${prefix} » dans ${file}`);

  const tags = [
    ...new Set(
      basename(file, ".md")
        .split("_")
        .slice(1)
        .flatMap((w) => w.split("-"))
        .map((w) => w.toLowerCase())
        .filter((w) => w.length > 2 && !STOPWORDS.has(w))
    ),
  ];

  return {
    id,
    title,
    category,
    type,
    content: raw.slice(header[0].length).trim(),
    tags,
    usedByAI: true,
    author: "Équipe Support ISPM",
  };
}

const files = (await walk(CORPUS_DIR)).sort();
const docs = [];
const seen = new Map();

for (const file of files) {
  const doc = parseDoc(await readFile(file, "utf8"), file);
  if (seen.has(doc.id)) throw new Error(`ID dupliqué ${doc.id} : ${seen.get(doc.id)} et ${file}`);
  seen.set(doc.id, file);
  doc.updatedAt = (await stat(file)).mtime.toISOString().slice(0, 10);
  docs.push(doc);
}

docs.sort((a, b) => a.id.localeCompare(b.id));

const body = `// Fichier généré par scripts/build-kb.mjs — ne pas éditer à la main.
// Source de vérité : data/corpus_kb/ à la racine du dépôt. Régénérer : npm run build:kb
import { KnowledgeDocument } from "@/types";

export const KNOWLEDGE_DOCS: KnowledgeDocument[] = ${JSON.stringify(docs, null, 2)};
`;

await writeFile(OUT_FILE, body, "utf8");
console.log(`${docs.length} fiches générées vers ${OUT_FILE}`);
