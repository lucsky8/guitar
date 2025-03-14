import scaleData from "../scaleData.json";

/**
 * getPositionsForKey(keyValue, scaleType, isHighNeck)
 * - Fetches the positions from scaleData
 * - If isHighNeck is true, add 12 to each fret
 * - For "natural" playing, position 5 wraps to lower frets
 */
export function getPositionsForKey(keyValue, scaleType, isHighNeck = false) {
  // 1) Fetch from JSON
  const positions =
    scaleData[keyValue] && scaleData[keyValue][scaleType]
      ? scaleData[keyValue][scaleType]
      : [];

  // 2) If no positions found, return empty array
  if (positions.length === 0) {
    return [];
  }

  // 3) If high neck position, transpose all by 12 frets
  if (isHighNeck) {
    return transposePositions(positions, 12);
  }

  // 4) Otherwise, return positions as-is (without modifying position 5)
  return positions;
}

/**
 * calculateWrappedPosition(keyValue, scaleType, position1)
 * - Creates a wrapped position 5 based on position 1
 * - Typically starts 2-3 frets below position 1
 */
function calculateWrappedPosition(keyValue, scaleType, position1) {
  // Start with a deep copy of position 1
  const wrappedPosition = JSON.parse(JSON.stringify(position1));
  
  // For most scales, position 5 is similar to position 1 but starts 3 frets lower
  // We'll offset each fret in position 1 by -3 (or adjust based on scale)
  const offsetFrets = -3;
  
  // Apply the offset to each fret
  for (let stringIndex = 0; stringIndex < wrappedPosition.length; stringIndex++) {
    for (let fretIndex = 0; fretIndex < wrappedPosition[stringIndex].length; fretIndex++) {
      const newFret = wrappedPosition[stringIndex][fretIndex] + offsetFrets;
      // Ensure we don't go below fret 0
      wrappedPosition[stringIndex][fretIndex] = Math.max(0, newFret);
    }
  }
  
  return wrappedPosition;
}

/**
 * transposePositions(positions, semitones)
 * - positions is an array of "Position" arrays
 * - each "Position" is an array of 6 arrays (one per string)
 * - each string array has fret numbers
 */
function transposePositions(positions, semitones) {
  // Deep-copy or map to avoid mutating the original
  return positions.map((position) =>
    position.map((stringFrets) =>
      stringFrets.map((fret) => fret + semitones)
    )
  );
}