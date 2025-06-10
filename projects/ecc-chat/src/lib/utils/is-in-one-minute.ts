import {format} from 'date-fns'

export function isInOneMinute(a: Date | null, b: Date | null): boolean {
  return (
    (a !== null && a !== undefined) &&
    (b !== null && b !== undefined) &&
    format(a, 'yyyy.MM.dd hh:mm') === format(b, 'yyyy.MM.dd hh:mm')
  );
}
