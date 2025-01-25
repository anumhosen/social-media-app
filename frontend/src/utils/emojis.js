export const funEmojis = [
  "🎃",
  "🎉",
  "🎄",
  "🎁",
  "🎆",
  "🎇",
  "😍",
  "❤",
  "💋",
  "👏",
  "😎",
  "🤩",
  "⚽",
  "⏳",
  "💙",
  "☢",
  "👍",
];

export const getRandomEmoji = () => {
  const randomIndex = Math.floor(Math.random() * funEmojis.length);
  return funEmojis[randomIndex];
};
