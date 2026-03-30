export const splitHighlightedText = (text: string, highlights: string[]) => {
  let remaining = text;
  const parts: Array<{ text: string; highlighted: boolean }> = [];

  while (remaining.length > 0) {
    const match = highlights
      .map((item) => {
        const index = remaining.indexOf(item);
        return index === -1 ? null : { item, index };
      })
      .filter((item): item is { item: string; index: number } => Boolean(item))
      .sort((a, b) => a.index - b.index || b.item.length - a.item.length)[0];

    if (!match) {
      parts.push({ text: remaining, highlighted: false });
      break;
    }

    if (match.index > 0) {
      parts.push({ text: remaining.slice(0, match.index), highlighted: false });
    }

    parts.push({ text: match.item, highlighted: true });
    remaining = remaining.slice(match.index + match.item.length);
  }

  return parts;
};
