export function formatFileSize(value: number): string {
  if (value < 1024) {
    return `${value} Б`;
  }

  if (value <= 1024 * 100) {
    return `${Math.ceil(value / 1024)} Кб`;
  }
  return `${Math.round((value / 1024 / 1024) * 100) / 100} Мб`;
}
