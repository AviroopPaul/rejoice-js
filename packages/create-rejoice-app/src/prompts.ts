import prompts from "prompts";
import { validateProjectName } from "./validate.js";

export interface UserChoices {
  projectName: string;
  includeRouter: boolean;
  defaultTheme: "light" | "dark";
  initGit: boolean;
}

export interface CliFlags {
  router?: boolean;
  theme?: "light" | "dark";
  git?: boolean;
}

export async function gatherChoices(
  nameFromArg?: string,
  flags: CliFlags = {}
): Promise<UserChoices> {
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

  if (flags.router === undefined) {
    questions.push({
      type: "toggle",
      name: "includeRouter",
      message: "Include React Router v6?",
      initial: true,
      active: "yes",
      inactive: "no",
    });
  }

  if (flags.theme === undefined) {
    questions.push({
      type: "select",
      name: "defaultTheme",
      message: "Default theme:",
      choices: [
        { title: "Light (default)", value: "light" },
        { title: "Dark", value: "dark" },
      ],
      initial: 0,
    });
  }

  if (flags.git === undefined) {
    questions.push({
      type: "toggle",
      name: "initGit",
      message: "Initialize git repository?",
      initial: true,
      active: "yes",
      inactive: "no",
    });
  }

  const answers =
    questions.length > 0
      ? await prompts(questions, {
          onCancel: () => {
            console.log("\nCancelled.");
            process.exit(0);
          },
        })
      : {};

  return {
    projectName: nameFromArg ?? answers.projectName,
    includeRouter: flags.router ?? answers.includeRouter ?? true,
    defaultTheme: flags.theme ?? answers.defaultTheme ?? "light",
    initGit: flags.git ?? answers.initGit ?? true,
  };
}
