import fs from "fs";
import path from "path";

const dist = path.resolve("dist");
const docs = path.resolve("docs");

// Borrar /docs si existe
if (fs.existsSync(docs)) {
  fs.rmSync(docs, { recursive: true, force: true });
}

// Copiar dist → docs recursivamente
function copyRecursive(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  for (const item of fs.readdirSync(src)) {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);

    if (fs.lstatSync(srcPath).isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

copyRecursive(dist, docs);

console.log("✔ Copia completa: dist → docs");