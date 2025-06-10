/**
 * Пример:
 * titleForNum1 = 'группа' для 1, 21 и т.д
 * titleForNum2 = 'группы' для 2, 3 и т.д
 * titleForNum5 = 'групп' для 5, 6 и т.д
 */
export function pluralize(num: number, titleForNum1 = '', titleForNum2 = '', titleForNum5 = ''): string {
  if (num % 10 === 1 && num % 100 !== 11) {
    return titleForNum1;
  } else if (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20)) {
    return titleForNum2;
  } else {
    return titleForNum5;
  }
}
