import path from "path";
import chalk from "chalk";
import { gatherChoices, type CliFlags } from "./prompts.js";
import { scaffold } from "./scaffold.js";
import { logger } from "./logger.js";
import { validateProjectName } from "./validate.js";

function parseArgs(argv: string[]): { nameArg?: string; flags: CliFlags } {
  const flags: CliFlags = {};
  let nameArg: string | undefined;

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];

    if (arg === "--router") {
      flags.router = true;
    } else if (arg === "--no-router") {
      flags.router = false;
    } else if (arg === "--theme") {
      const val = argv[++i];
      if (val !== "light" && val !== "dark") {
        logger.error(`Invalid --theme value: "${val}". Must be "light" or "dark".`);
        process.exit(1);
      }
      flags.theme = val;
    } else if (arg === "--git") {
      flags.git = true;
    } else if (arg === "--no-git") {
      flags.git = false;
    } else if (!arg.startsWith("-") && !nameArg) {
      nameArg = arg;
    }
  }

  return { nameArg, flags };
}

async function main() {
  const { nameArg, flags } = parseArgs(process.argv.slice(2));

  console.log();
  logger.title("create-rejoice-app");
  console.log(chalk.dim("React, but set up already.\n"));

  // Validate name if passed as arg
  if (nameArg) {
    const valid = validateProjectName(nameArg);
    if (valid !== true) {
      logger.error(`Invalid project name: ${valid}`);
      process.exit(1);
    }
  }

  const choices = await gatherChoices(nameArg, flags);
  const targetDir = path.resolve(process.cwd(), choices.projectName);

  console.log();
  logger.step(`Creating ${chalk.bold(choices.projectName)} in ${chalk.dim(targetDir)}`);
  console.log();

  try {
    await scaffold(choices, targetDir);
    console.log();
    logger.success(chalk.bold("Done! Your rejoice app is ready."));
    console.log();
    console.log("Next steps:");
    console.log(chalk.cyan(`  cd ${choices.projectName}`));
    console.log(chalk.cyan("  bun install"));
    console.log(chalk.cyan("  bun dev"));
    console.log();
    console.log(chalk.dim(`Edit ${chalk.reset("src/App.tsx")} to start building.`));
    console.log();
  } catch (err) {
    logger.error((err as Error).message);
    process.exit(1);
  }
}

main();
