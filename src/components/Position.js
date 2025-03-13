import React from "react";

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
  // 1) find min & max fret
  let minFret = Infinity;
  let maxFret = -Infinity;
  position.forEach(stringFrets => {
    stringFrets.forEach(fret => {
      if (fret !== null) {
        if (fret < minFret) minFret = fret;
        if (fret > maxFret) maxFret = fret;
      }
    });
  });
  if (minFret === Infinity) minFret = 0;
  if (maxFret === -Infinity) maxFret = 0;
  const fretCount = maxFret - minFret + 1;

  return (
    <div className="position">
      <div className="position-title">Position {positionIndex + 1}</div>
      <div 
        className="fretboard"
        style={{
          display: "grid",
          gridTemplateColumns: `25px repeat(${fretCount}, 1fr)`,
          gap: "2px",
        }}
      >
        {/* Header row: empty cell + fret numbers */}
        <div></div>
        {Array.from({ length: fretCount }, (_, i) => {
          const fretNumber = minFret + i;
          return (
            <div key={fretNumber} className="fret-header">
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

              // Determine if it's root or scale
              let noteClass = "note normal"; // fallback
              if (noteName === rootNote) {
                noteClass = "note root"; // red
              } else if (scaleNotes.includes(noteName)) {
                noteClass = "note scale"; // blue
              }

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
