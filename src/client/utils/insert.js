export const insert = (array, element, index) =>
  array.slice(0, index).concat(element, array.slice(index));
