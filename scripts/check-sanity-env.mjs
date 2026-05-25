#!/usr/bin/env node
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

const envPath = resolve(process.cwd(), ".env.local");
const required = ["NEXT_PUBLIC_SANITY_PROJECT_ID", "NEXT_PUBLIC_SANITY_DATASET"];

console.log("\n🔍 Vérification Sanity — LA DECADES\n");

if (!existsSync(envPath)) {
  console.log("❌ Fichier .env.local introuvable.");
  console.log("   → Copiez .env.example vers .env.local");
  console.log("   → Suivez SETUP-SANITY.md (étape 4)\n");
  process.exit(1);
}

const content = readFileSync(envPath, "utf8");
const vars = Object.fromEntries(
  content
    .split("\n")
    .filter((l) => l.trim() && !l.startsWith("#"))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
    }),
);

let ok = true;
for (const key of required) {
  const val = vars[key];
  if (!val || val.includes("votre_project") || val === "placeholder") {
    console.log(`❌ ${key} : non configuré`);
    ok = false;
  } else {
    console.log(`✅ ${key} = ${val}`);
  }
}

if (ok) {
  console.log("\n✅ Configuration OK. Lancez : npm run dev");
  console.log("   Studio : http://localhost:3000/studio\n");
} else {
  console.log("\n⚠️  Complétez .env.local puis relancez ce script.\n");
  process.exit(1);
}
