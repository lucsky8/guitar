import React from "react";

const ChordChart = ({ song }) => {
  // Define chord diagrams for common chords
  // Format: [topRow, 1st string, 2nd string, 3rd string, 4th string, 5th string, 6th string]
  // -1 means don't play, 0 means open string, positive numbers are fret numbers
  const chordDiagrams = {
    "G": {
      frets: [3, 2, 0, 0, 0, 3],
      fingers: ["3", "2", "", "", "", "4"],
      topFret: 1
    },
    "Am": {
      frets: [0, 1, 2, 2, 0, -1],
      fingers: ["", "1", "3", "2", "", "x"],
      topFret: 1
    },
    "Am7": {
      frets: [0, 1, 0, 2, 0, -1],
      fingers: ["", "1", "", "2", "", "x"], 
      topFret: 1
    },
    "C": {
      frets: [0, 1, 0, 2, 3, -1],
      fingers: ["", "1", "", "2", "3", "x"],
      topFret: 1
    },
    "D": {
      frets: [2, 3, 2, 0, -1, -1],
      fingers: ["2", "3", "1", "", "x", "x"],
      topFret: 1
    },
    "D7": {
      frets: [2, 1, 2, 0, -1, -1],
      fingers: ["2", "1", "3", "", "x", "x"],
      topFret: 1
    },
    "Em": {
      frets: [0, 0, 0, 2, 2, 0],
      fingers: ["", "", "", "2", "3", ""],
      topFret: 1
    },
    "G/B": {
      frets: [0, 0, 0, 0, 2, 2],
      fingers: ["", "", "", "", "2", "1"],
      topFret: 1
    },
    "G/D": {
      frets: [3, 3, 0, 0, 2, 3],
      fingers: ["3", "4", "", "", "1", "2"],
      topFret: 1
    }
  };

  const renderChordDiagram = (chord, chordName) => {
    const { frets, fingers, topFret } = chord;
    
    // Create fret grid (5 frets displayed)
    const fretLines = Array(6).fill(0).map((_, i) => i);
    
    return (
      <div className="chord-diagram">
        <div className="chord-name">{chordName}</div>
        <div className="chord-grid">
          {/* Nut or top fret marker */}
          <div className={`chord-nut ${topFret > 1 ? 'hidden' : ''}`}></div>
          
          {/* Fret position marker (if not starting at the nut) */}
          {topFret > 1 && (
            <div className="fret-marker">{topFret}</div>
          )}
          
          {/* String lines */}
          <div className="strings">
            {[0, 1, 2, 3, 4, 5].map((stringIndex) => (
              <div key={`string-${stringIndex}`} className="string-line">
                {/* Show X or O for string markings above the nut */}
                <div className="string-marker">
                  {frets[stringIndex] === -1 ? 'x' : (frets[stringIndex] === 0 ? 'o' : '')}
                </div>
                
                {/* String line with finger positions */}
                {fretLines.map((fretIndex) => {
                  const actualFret = fretIndex + (topFret === 1 ? 1 : topFret);
                  const showFinger = frets[stringIndex] === actualFret;
                  
                  return (
                    <div 
                      key={`fret-${stringIndex}-${fretIndex}`} 
                      className={`fret-position ${showFinger ? 'finger-position' : ''}`}
                    >
                      {showFinger && (
                        <div className="finger">{fingers[stringIndex]}</div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const getRelatedChordsForSong = (song) => {
    if (song.title === "Blackbird") {
      // Return the chord progression for Blackbird
      return [
        "G", "Am7", "G/B", "C", "G/D", "D7", "Em"
      ];
    }
    // Add more songs here as needed
    return [];
  }
  
  const songChords = song ? getRelatedChordsForSong(song) : [];

  return (
    <div className="chord-chart-container">
      <h4>Basic Chords for {song ? song.title : ""}</h4>
      <div className="chord-grid-container">
        {songChords.map((chordName) => {
          if (chordDiagrams[chordName]) {
            return (
              <div key={chordName} className="chord-box">
                {renderChordDiagram(chordDiagrams[chordName], chordName)}
              </div>
            );
          }
          return null;
        })}
      </div>
      
      <div className="chord-progression-display">
        <h5>Progression:</h5>
        <div className="chord-sequence">
          {songChords.map((chord, index) => (
            <div key={index} className="chord-sequence-box">
              {chord}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChordChart;