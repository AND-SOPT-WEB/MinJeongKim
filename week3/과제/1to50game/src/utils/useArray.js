export const createShuffledArray = (start, end) => {
  return Array.from({ length: end - start + 1 }, (_, i) => i + start).sort(
    () => Math.random() - 0.5,
  );
};
