/* eslint-disable functional/immutable-data */
export function pasteIntoTextArea(textarea: HTMLTextAreaElement, text: string): boolean {
  textarea.focus();
  if (typeof textarea.selectionStart == 'number' && typeof textarea.selectionEnd == 'number') {
    const value = textarea.value;
    const selStart = textarea.selectionStart;
    textarea.value = value.slice(0, selStart) + text + value.slice(textarea.selectionEnd);
    const selection = selStart + text.length;
    textarea.selectionEnd = selection;
    textarea.selectionStart = selection;
    return true;
  } else {
    return false;
  }
}
