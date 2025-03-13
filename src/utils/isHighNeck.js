import scaleData from "../scaleData.json";

/**
 * getPositionsForKey(keyValue, scaleType, isHighNeck)
 * - Fetches the positions from scaleData
 * - If isHighNeck is true, add 12 to each fret
 */
export function getPositionsForKey(keyValue, scaleType, isHighNeck = false) {
  // 1) Fetch from JSON
  const positions =
    scaleData[keyValue] && scaleData[keyValue][scaleType]
      ? scaleData[keyValue][scaleType]
      : [];

  // 2) If we want high-neck, transpose each fret +12
  if (isHighNeck) {
    return transposePositions(positions, 12);
  }

  // Otherwise, return as-is
  return positions;
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
