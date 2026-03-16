import path from "path";
import fs from "fs-extra";
import { execSync } from "child_process";
import { fileURLToPath } from "url";
import chalk from "chalk";
import type { UserChoices } from "./prompts.js";
import { logger } from "./logger.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function isInsideWorkspace(dir: string): Promise<boolean> {
  let current = path.dirname(dir);
  while (current !== path.dirname(current)) {
    if (await fs.pathExists(path.join(current, "pnpm-workspace.yaml"))) return true;
    current = path.dirname(current);
  }
  return false;
}

export async function scaffold(choices: UserChoices, targetDir: string): Promise<void> {
  const { includeRouter, defaultTheme, projectName } = choices;

  // Warn if scaffolding inside a pnpm workspace — deps won't install correctly
  if (await isInsideWorkspace(targetDir)) {
    logger.warn(
      "You are inside a pnpm workspace. Run " +
        chalk.cyan(`pnpm install --ignore-workspace`) +
        " inside the created app instead of plain " +
        chalk.cyan("pnpm install") +
        "."
    );
  }

  // 1. Ensure target directory exists and is empty
  if (await fs.pathExists(targetDir)) {
    const contents = await fs.readdir(targetDir);
    if (contents.length > 0) {
      throw new Error(`Directory "${path.basename(targetDir)}" is not empty.`);
    }
  }
  await fs.ensureDir(targetDir);

  // 2. Copy template
  const templateDir = path.join(__dirname, "..", "templates", "ts");
  logger.step("Copying TypeScript template...");
  await fs.copy(templateDir, targetDir);

  // 3. Process package.json — inject project name + optional deps
  const pkgPath = path.join(targetDir, "package.json");
  const pkg = await fs.readJson(pkgPath);
  pkg.name = projectName;
  if (includeRouter) {
    pkg.dependencies = pkg.dependencies ?? {};
    pkg.dependencies["react-router-dom"] = "^6.23.0";
  }
  await fs.writeJson(pkgPath, pkg, { spaces: 2 });

  // 4. Replace vite.config placeholders
  const viteConfigPath = path.join(targetDir, "vite.config.ts");
  if (await fs.pathExists(viteConfigPath)) {
    let viteConfig = await fs.readFile(viteConfigPath, "utf-8");
    viteConfig = viteConfig.replace("{{jsxImportSource}}", "rejoice-js");
    await fs.writeFile(viteConfigPath, viteConfig);
  }

  // 5. Replace main.tsx placeholders
  const mainPath = path.join(targetDir, "src", "main.tsx");
  if (await fs.pathExists(mainPath)) {
    let mainContent = await fs.readFile(mainPath, "utf-8");
    mainContent = mainContent.replace("{{defaultTheme}}", defaultTheme);
    await fs.writeFile(mainPath, mainContent);
  }

  // 6. Remove router files if not selected
  if (!includeRouter) {
    const routerFiles = [
      path.join(targetDir, "src", "router.tsx"),
      path.join(targetDir, "src", "pages"),
    ];
    for (const f of routerFiles) {
      await fs.remove(f);
    }
  }

  logger.success("Template files created.");

  // 7. Git init
  if (choices.initGit) {
    logger.step("Initializing git repository...");
    try {
      execSync("git init", { cwd: targetDir, stdio: "ignore" });
      execSync("git add -A", { cwd: targetDir, stdio: "ignore" });
      execSync('git commit -m "Initial commit from create-rejoice-app"', {
        cwd: targetDir,
        stdio: "ignore",
      });
      logger.success("Git repository initialized.");
    } catch {
      logger.warn("Could not initialize git repository.");
    }
  }
}
