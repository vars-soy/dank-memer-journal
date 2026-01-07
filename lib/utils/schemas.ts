export function mapIssues(issues: [string, ...string[]] | undefined) {
  if (!issues) {
    return [];
  }

  return issues.map((message) => ({ message }));
}
