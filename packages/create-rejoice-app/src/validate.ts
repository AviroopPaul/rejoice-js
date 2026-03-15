import validatePackageName from "validate-npm-package-name";

export function validateProjectName(name: string): string | true {
  const { validForNewPackages, errors, warnings } = validatePackageName(name);
  if (!validForNewPackages) {
    const issues = [...(errors ?? []), ...(warnings ?? [])];
    return issues.join(", ");
  }
  return true;
}
