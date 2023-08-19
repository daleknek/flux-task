export const move = (
  sourceList,
  destinationList,
  droppableSource,
  droppableDestination
) => {
  const source = Array.from(sourceList);
  const destination = Array.from(destinationList);
  const [removed] = source.splice(droppableSource.index, 1);

  destination.splice(droppableDestination.index, 0, removed);

  return { updatedSource: source, updatedDestination: destination };
};
