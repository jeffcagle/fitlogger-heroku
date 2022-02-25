export default function capitalize(string) {
  const array = string.split(' ');

  for (let item in array) {
    array[item] = array[item].charAt(0).toUpperCase() + array[item].slice(1);
  }

  return array.join(' ');
}
