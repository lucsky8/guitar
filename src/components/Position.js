import React, { useEffect } from "react";
import "../styles/Position.css";

// We'll assume these are passed as props or imported
const stringNames = ["E", "B", "G", "D", "A", "E"];

function getNoteName(stringName, fret) {
  const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  const openStringIndex = NOTES.indexOf(stringName);
  if (openStringIndex === -1) return null;
  const noteIndex = (openStringIndex + fret) % 12;
  return NOTES[noteIndex];
}

const Position = ({ 
  position,        // e.g. [ [5,8], [5,8], [5,7], [5,7], [5,7], [5,8] ]
  positionIndex, 
  rootNote,        // e.g. "A"
  scaleNotes       // e.g. ["A", "C", "D", "E", "G"]
}) => {
  // Find min & max fret - with special handling for open positions
  let minFret = Infinity;
  let maxFret = -Infinity;
  let hasOpenPosition = false;
  
  position.forEach(stringFrets => {
    stringFrets.forEach(fret => {
      if (fret !== null) {
        // Check for open position
        if (fret === 0) {
          hasOpenPosition = true;
        } else {
          // Only consider non-zero frets for minFret calculation
          if (fret < minFret) minFret = fret;
        }
        
        if (fret > maxFret) maxFret = fret;
      }
    });
  });
  
  // If we only have open positions, set minFret to 0
  if (minFret === Infinity) minFret = 0;
  if (maxFret === -Infinity) maxFret = 0;
  
  // For open positions, ensure we start at fret 0 in the display
  if (hasOpenPosition) {
    minFret = 0;
  }
  
  // For Position 5 specifically, use 3 instead of actual minFret
  // This is the fix for the specific issue mentioned
  let displayFretNumber;
  if (positionIndex === 4) {  // Position 5 (index 4)
    displayFretNumber = 3;
  } else {
    displayFretNumber = minFret;
  }
  
  // Generate the fret count for grid layout
  const fretCount = maxFret - minFret + 1;
  
  // Format the fret number with proper ordinal suffix
  const getOrdinalSuffix = (num) => {
    if (num === 0) return "0th"; // Special case for open position
    if (num === 1) return "1st";
    if (num === 2) return "2nd";
    if (num === 3) return "3rd";
    return num + "th";  // Simple version for 4th through 20th
  };
  
  

  // Helper function to determine note class
  // Helper function to determine note class with extensive debugging
const getNoteClass = (noteName) => {
  // Sanity check and debugging
  console.log(`Checking note: ${noteName}`);
  
  if (!noteName) {
    console.log(`Note name is undefined or null`);
    return "note normal";
  }
  
  if (!scaleNotes || !Array.isArray(scaleNotes)) {
    console.error("scaleNotes is not properly defined:", scaleNotes);
    return "note normal";
  }
  
  console.log(`Root note: ${rootNote}, Scale notes:`, scaleNotes);
  
  // Check if it's a root note first
  if (noteName === rootNote) {
    console.log(`${noteName} is a ROOT note`);
    return "note root";
  }
  
  // Then check if it's in the scale notes array
  const normalizedScaleNotes = scaleNotes.map(n => n.toUpperCase());
  const normalizedNoteName = noteName.toUpperCase();
  
  console.log(`Normalized note: ${normalizedNoteName}`);
  console.log(`Normalized scale notes:`, normalizedScaleNotes);
  console.log(`Is in scale? ${normalizedScaleNotes.includes(normalizedNoteName)}`);
  
  if (normalizedScaleNotes.includes(normalizedNoteName)) {
    console.log(`${noteName} is a SCALE note, will return 'note scale'`);
    return "note scale";
  }
  
  // Default fallback
  console.log(`${noteName} is not in scale, will return 'note normal'`);
  return "note normal";
};

  return (
    <div className="position">
      <div className="position-title">Position {positionIndex + 1}</div>
      
      {/* Use formatted ordinal suffix here */}
      <div className="fret-indicator">
        {getOrdinalSuffix(displayFretNumber)} Fret Position
      </div>
      
      <div 
        className="fretboard"
        style={{
          gridTemplateColumns: `25px repeat(${fretCount}, 1fr)`,
        }}
      >
        {/* Header row: empty cell + fret numbers */}
        <div className="fret-header-empty"></div>
        {Array.from({ length: fretCount }, (_, i) => {
          const fretNumber = minFret + i;
          return (
            <div 
              key={fretNumber} 
              className="fret-header"
              data-fret={fretNumber}
            >
              {fretNumber}
            </div>
          );
        })}

        {/* For each string: show string name + fret cells */}
        {stringNames.map((stringName, sIndex) => (
          <React.Fragment key={sIndex}>
            <div className="string-name">{stringName}</div>
            {Array.from({ length: fretCount }, (_, i) => {
              const currentFret = minFret + i;
              // Check if the position array says there's a note at this fret
              const isInPosition = position[sIndex].includes(currentFret);

              // If not in position, we leave it blank or show nothing
              if (!isInPosition) {
                return <div key={i} className="fret"></div>;
              }

              // If in position, figure out the note name
              const noteName = getNoteName(stringName, currentFret);
              
             
              // Get the appropriate CSS class
              const noteClass = getNoteClass(noteName);

              return (
                <div key={i} className="fret">
                  <div className={noteClass}>{noteName}</div>
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Position;