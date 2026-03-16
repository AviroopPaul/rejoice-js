import fs from "node:fs/promises";
import path from "node:path";

const version = process.argv[2];

if (!version || !/^\d+\.\d+\.\d+$/.test(version)) {
  console.error("Usage: npm run release:version -- <x.y.z>");
  process.exit(1);
}

const root = process.cwd();

const targets = [
  {
    file: "packages/rejoice/package.json",
    update(pkg) {
      pkg.version = version;
      return pkg;
    },
  },
  {
    file: "packages/create-rejoice-app/package.json",
    update(pkg) {
      pkg.version = version;
      return pkg;
    },
  },
  {
    file: "packages/create-rejoice-app/templates/ts/package.json",
    update(pkg) {
      pkg.version = version;
      pkg.dependencies = pkg.dependencies ?? {};
      pkg.dependencies["rejoice-js"] = `^${version}`;
      return pkg;
    },
  },
];

for (const target of targets) {
  const filePath = path.join(root, target.file);
  const raw = await fs.readFile(filePath, "utf8");
  const updated = target.update(JSON.parse(raw));
  await fs.writeFile(filePath, `${JSON.stringify(updated, null, 2)}\n`);
  console.log(`updated ${target.file} -> ${version}`);
}
