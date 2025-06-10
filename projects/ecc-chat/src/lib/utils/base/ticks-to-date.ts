export function ticksToDate(ticks: number): Date | null {
  return Number.isInteger(ticks) ? new Date(ticks / 1e4 + new Date('0001-01-01T00:00:00Z').getTime()) : null;
}
