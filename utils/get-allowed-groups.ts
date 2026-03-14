let cache: Array<number> | null = null;

export function getAllowedGroups(): Array<number> {
  if (cache !== null) return cache;

  const allowedGroups =
    process.env.ALLOWED_GROUPS?.split(",").map(Number) ?? [];
  cache = allowedGroups;

  return allowedGroups;
}
