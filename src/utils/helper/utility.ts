export const truncateString = (originString: string, showingLength: number) => {
  return `${originString.substring(
    0,
    showingLength
  )}...${originString.substring(
    originString.length - showingLength,
    originString.length
  )}`;
};
