export const calcTime = (time: number): string => {
  const date: Date = new Date(time);
  const diff: number = (new Date().getTime() - date.getTime()) / 1000;
  if (diff < 60) return Math.floor(diff) + "s";
  if (diff < 3600) return Math.floor(diff / 60) + "m";
  if (diff < 86400) return Math.floor(diff / 3600) + "h";
  if (diff < 604800) return Math.floor(diff / 86400) + "d";
  if (diff < 2592000) return Math.floor(diff / 604800) + "w";
  if (diff < 31104000) return Math.floor(diff / 2592000) + "mo";
  return Math.floor(diff / 31104000) + "yr";
};
