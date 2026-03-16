import path from "path";
import chalk from "chalk";
import { gatherChoices } from "./prompts.js";
import { scaffold } from "./scaffold.js";
import { logger } from "./logger.js";
import { validateProjectName } from "./validate.js";

async function main() {
  const args = process.argv.slice(2);
  const nameArg = args[0];

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

  const choices = await gatherChoices(nameArg);
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
    const installCmd =
      choices.packageManager === "npm" ? "npm install" : `${choices.packageManager} install`;
    const devCmd =
      choices.packageManager === "npm" ? "npm run dev" : `${choices.packageManager} dev`;
    console.log(chalk.cyan(`  ${installCmd}`));
    console.log(chalk.cyan(`  ${devCmd}`));
    console.log();
    console.log(chalk.dim(`Edit ${chalk.reset("src/App.tsx")} to start building.`));
    console.log();
  } catch (err) {
    logger.error((err as Error).message);
    process.exit(1);
  }
}

main();
