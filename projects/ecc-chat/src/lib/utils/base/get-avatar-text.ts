export function getAvatarText<T extends { name?: string; surname?: string }>(user: T): string {
  return [user.name?.[0], user.surname?.[0]].filter(x => x !== undefined && x !== null).join('').toUpperCase();
}
