export function convertSecondsToMinutes(seconds) {
  const min = Math.trunc(seconds / 60);
  const sec = seconds % 60;
  return `${min ? min : ''}${min && sec ? ':' : ''}${sec ? sec : ''}${
    sec && !min ? ' sec' : ''
  }`;
}
