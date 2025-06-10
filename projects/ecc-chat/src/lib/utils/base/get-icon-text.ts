export function getIconText(chatName: string): string {
  const arrWords = chatName.trim().toUpperCase().split(' ');
  if (arrWords.length > 1) {
    const [firstWord] = arrWords;
    const lastWord = arrWords[arrWords.length - 1];
    return firstWord[0] + lastWord[0];
  } else {
    return arrWords[0][0];
  }
}
