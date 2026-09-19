import { existsSync, readdirSync, statSync, readFileSync, writeFileSync } from "node:fs";
import { join, relative, resolve } from "node:path";

const root = resolve(".");
const legacyRoots = ["public/sprites", "public/sprite-sheets"];
const sourceRoot = resolve("rougue-like-character-sprites");
const sourceFiles = new Set();

function walk(directory) {
  if (!existsSync(directory)) return [];
  const files = [];
  for (const entry of readdirSync(directory)) {
    const fullPath = join(directory, entry);
    const stats = statSync(fullPath);
    if (stats.isDirectory()) files.push(...walk(fullPath));
    else files.push(fullPath);
  }
  return files;
}

for (const file of walk(sourceRoot)) sourceFiles.add(relative(root, file));

const codeFiles = walk(resolve("src"))
  .concat(walk(resolve("public")))
  .concat(walk(resolve("scripts")))
  .filter((file) => /\.(css|js|jsx|mjs|ts|tsx|json|html)$/i.test(file));
const references = new Map();

for (const file of codeFiles) {
  const text = readFileSync(file, "utf8");
  for (const legacyRoot of legacyRoots) {
    if (!text.includes(legacyRoot.replace("public/", "/")) && !text.includes(legacyRoot)) continue;
    references.set(relative(root, file), text);
  }
}

const rows = [
  "# Auditoria de Assets Legados",
  "",
  "Status: `IN_PROGRESS`. Nenhuma pasta legada foi removida.",
  "",
  "A fonte válida de personagens do Caminho Digital é `rougue-like-character-sprites`. Este inventário existe para impedir remoção antes de migração e teste.",
  "",
  "| Arquivo legado | Categoria | Referência runtime encontrada | Substituto validado na fonte correta | Status |",
  "|---|---|---|---|---|",
];

for (const legacyRoot of legacyRoots) {
  const files = walk(resolve(legacyRoot)).filter((file) => !file.endsWith(":Zone.Identifier"));
  for (const file of files) {
    const relativePath = relative(root, file);
    const extension = relativePath.split(".").pop()?.toLowerCase() ?? "unknown";
    const publicPath = `/${relativePath.replace(/^public\//, "")}`;
    const matches = [...references.entries()]
      .filter(([, text]) => text.includes(relativePath) || text.includes(publicPath))
      .map(([reference]) => reference);
    const hasPatternReference = relativePath.startsWith("public/sprites/animated/") && [...references.values()].some((text) => text.includes("/sprites/animated/${") || text.includes("/sprites/animated/"));
    const status = matches.length || hasPatternReference ? "ainda utilizado" : "sem referencia; precisa de analise";
    const evidence = hasPatternReference && !matches.length ? "padrao de caminho" : matches.length ? matches.join("; ") : "nao";
    rows.push(`| \`${relativePath}\` | ${extension} | ${evidence} | nao comprovado | ${status} |`);
  }
}

rows.push("", "## Referências de código que mencionam assets legados", "");
for (const file of [...references.keys()].sort()) rows.push(`- \`${file}\``);
rows.push(
  "",
  "## Fonte correta",
  "",
  `- Arquivos inventariados em \`rougue-like-character-sprites\`: ${sourceFiles.size}.`,
  "- Nenhum arquivo foi movido, recortado ou marcado como substituto automaticamente.",
  "- A remoção de `public/sprites` e `public/sprite-sheets` permanece bloqueada até manifests, migração visual, testes de runtime e busca global sem referências ativas.",
  "",
);

writeFileSync(resolve("docs/digital-path/legacy-assets-audit.md"), `${rows.join("\n")}\n`);
console.log(`Wrote legacy asset audit: ${rows.length} lines`);