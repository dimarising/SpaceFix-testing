import fs from "node:fs";
import path from "node:path";

const BASE = "/SpaceFix-testing";
const ROOT = path.resolve("dist");

// Only rewrite static markup/styles. JS bundles must use import.meta.env.BASE_URL at build time.
const FILE_PATTERN = /\.(html|css)$/;

function rewrite(content) {
  return content.replace(/(["'(])\/(?!SpaceFix-testing\/)/g, (match, quote, offset) => {
    const afterSlash = content.slice(offset + match.length - 1);

    if (afterSlash.startsWith("//")) {
      return match;
    }

    const pathStart = afterSlash.slice(1);
    if (/^(https?:|data:|mailto:|tel:)/.test(pathStart)) {
      return match;
    }

    return `${quote}${BASE}/`;
  });
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }

    if (!FILE_PATTERN.test(entry.name)) {
      continue;
    }

    const content = fs.readFileSync(fullPath, "utf8");
    const updated = rewrite(content);

    if (updated !== content) {
      fs.writeFileSync(fullPath, updated);
    }
  }
}

walk(ROOT);
