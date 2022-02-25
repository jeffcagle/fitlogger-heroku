export function isNew(item) {
  const logDate = new Date(item.date || item.createdAt);
  const fiveSeconds = 5000;
  const now = Date.now();

  const newItem = now - logDate < fiveSeconds;

  if (newItem) {
    return true;
  } else {
    return false;
  }
}
