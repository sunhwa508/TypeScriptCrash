export function getUnixTimestamp(date: string) {
  return new Date(date).getTime();
}

export function $<T extends HTMLElement>(selector: string): T {
  const element = document.querySelector(selector) as T;
  if (element === null) throw new Error('element is null');
  return element;
}
