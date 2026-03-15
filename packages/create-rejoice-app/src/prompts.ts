import prompts from "prompts";
import { validateProjectName } from "./validate.js";

export interface UserChoices {
  projectName: string;
  language: "ts";
  includeRouter: boolean;
  defaultTheme: "light" | "dark";
  packageManager: "pnpm" | "npm" | "yarn";
  initGit: boolean;
}

export async function gatherChoices(nameFromArg?: string): Promise<UserChoices> {
  const questions: prompts.PromptObject[] = [];

  if (!nameFromArg) {
    questions.push({
      type: "text",
      name: "projectName",
      message: "Project name:",
      initial: "my-rejoice-app",
      validate: (v: string) => {
        const result = validateProjectName(v);
        return result === true ? true : result;
      },
    });
  }

  questions.push(
    {
      type: "toggle",
      name: "includeRouter",
      message: "Include React Router v6?",
      initial: true,
      active: "yes",
      inactive: "no",
    },
    {
      type: "select",
      name: "defaultTheme",
      message: "Default theme:",
      choices: [
        { title: "Light (default)", value: "light" },
        { title: "Dark", value: "dark" },
      ],
      initial: 0,
    },
    {
      type: "select",
      name: "packageManager",
      message: "Package manager:",
      choices: [
        { title: "pnpm", value: "pnpm" },
        { title: "npm", value: "npm" },
        { title: "yarn", value: "yarn" },
      ],
      initial: 0,
    },
    {
      type: "toggle",
      name: "initGit",
      message: "Initialize git repository?",
      initial: true,
      active: "yes",
      inactive: "no",
    }
  );

  const answers = await prompts(questions, {
    onCancel: () => {
      console.log("\nCancelled.");
      process.exit(0);
    },
  });

  return {
    projectName: nameFromArg ?? answers.projectName,
    language: "ts",
    includeRouter: answers.includeRouter ?? true,
    defaultTheme: answers.defaultTheme ?? "light",
    packageManager: answers.packageManager ?? "pnpm",
    initGit: answers.initGit ?? true,
  };
}
