export function reorder(list, startIndex, endIndex) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  // console.log("Initial list:", list);
  // console.log("Start index:", startIndex);
  // console.log("End index:", endIndex);
  // console.log("Reordered list:", result);

  return result;
}
