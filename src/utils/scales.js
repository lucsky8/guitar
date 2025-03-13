// A simple 12-note array:
import scaleData from "../scaleData.json";

const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

/**
 * getPositionsForKey(keyValue, scaleType):
 * Returns an array of positions. Each "position" is an array of 6 arrays (strings).
 * Each string array lists the fret numbers for that shape.
 */
export function getPositionsForKey(keyValue, scaleType) {
    if (scaleData[keyValue] && scaleData[keyValue][scaleType]) {
      return scaleData[keyValue][scaleType];
    }
    return [];
  }

/**
 * getScale(rootNote, scaleType):
 * Returns an array of note names in the chosen scale.
 * e.g. for A minor pentatonic => ["A", "C", "D", "E", "G"]
 */
export function getScale(rootNote, scaleType) {
    // 1) Find the index of the root in the NOTES array
    const rootIndex = NOTES.indexOf(rootNote);
    if (rootIndex < 0) return [];

    // 2) Define intervals for each scale type
    let intervals = [];
    switch (scaleType) {
        case "minor-pentatonic":
            intervals = [0, 3, 5, 7, 10]; // A -> A, C, D, E, G
            break;
        case "major-pentatonic":
            intervals = [0, 2, 4, 7, 9];  // A -> A, B, C#, E, F#
            break;
        // Add more scale types if you want (major scale, minor scale, etc.)
        default:
            intervals = [0, 3, 5, 7, 10]; // fallback to minor pentatonic
    }

    // 3) Map intervals to note names
    return intervals.map(interval => {
        const noteIndex = (rootIndex + interval) % 12;
        return NOTES[noteIndex];
    });
}
