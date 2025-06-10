export function dateToTicks(date: Date): number {
  const epochOffset = 621355968000000000;
  const ticksPerMillisecond = 10000;

  return date.getTime() * ticksPerMillisecond + epochOffset;
}
