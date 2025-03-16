import React, { useState } from "react";
import songData from "../utils/songData";
import Fretboard from "./Fretboard";
import ScaleInfo from "./ScaleInfo";
import ImprovisationExamples from "./ImprovisationExamples"; // Import the new component
import "../styles/ImprovisationExamples.css"; // Import the new CSS

const SongScales = ({ setShowSongScales }) => {
  const [selectedSong, setSelectedSong] = useState(songData[0]);
  const [selectedScale, setSelectedScale] = useState(null);
  const [showScaleVisualization, setShowScaleVisualization] = useState(false);
  
  // Toggle states
  const [showChordAnalysis, setShowChordAnalysis] = useState(false);
  const [expandedScaleTheory, setExpandedScaleTheory] = useState(null);
  const [showPracticeSuggestions, setShowPracticeSuggestions] = useState(false);
  const [showExamples, setShowExamples] = useState(true); // New state for examples toggle
  
  const handleSongSearch = (searchTerm) => {
    console.log("Searching for:", searchTerm);
  };
  
  const handleSelectScale = (scale) => {
    setSelectedScale(scale);
    setShowScaleVisualization(true);
    setShowPracticeSuggestions(false);
    setShowExamples(true); // Show examples by default when switching scales
  };
  
  const handleBackToSongInfo = () => {
    setShowScaleVisualization(false);
    setExpandedScaleTheory(null);
  };
  
  const handleBackToScales = () => {
    setShowSongScales(false);
  };
  
  const toggleScaleTheory = (scaleIndex) => {
    if (expandedScaleTheory === scaleIndex) {
      setExpandedScaleTheory(null);
    } else {
      setExpandedScaleTheory(scaleIndex);
    }
  };

  return (
    <div className="song-scales-container">
      <button className="back-button" onClick={handleBackToScales}>
        ← Back to Scales
      </button>
      
      <h2>Song Scale Helper</h2>
      
      {!showScaleVisualization ? (
        <div className="song-info-section">
          <div className="song-header">
            <h3>{selectedSong.title}</h3>
            <p className="song-artist">by {selectedSong.artist}</p>
            <p className="song-details">
              {selectedSong.album} ({selectedSong.year}) • Key of {selectedSong.key}
              {selectedSong.bpm && ` • ${selectedSong.bpm} BPM`}
            </p>
          </div>
          
          {/* Rest of the song info section remains the same */}
          <div className="song-description">
            <p>{selectedSong.description}</p>
            <div className="chord-progression">
              <h4>Chord Progression</h4>
              <p>{selectedSong.chordProgression}</p>
              
              {selectedSong.progressionAnalysis && (
                <div className="toggle-section">
                  <button 
                    className="toggle-button chord-toggle"
                    onClick={() => setShowChordAnalysis(!showChordAnalysis)}
                  >
                    Chord Analysis{showChordAnalysis ? ' −' : ' +'}
                  </button>
                  
                  {showChordAnalysis && (
                    <div className="progression-analysis">
                      <p>{selectedSong.progressionAnalysis}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          <div className="recommended-scales">
            <h4>Recommended Scales for Improvisation</h4>
            <div className="scale-options">
              {selectedSong.recommendedScales.map((scale, index) => (
                <div 
                  key={index} 
                  className="scale-option"
                >
                  <div className="scale-option-header">
                    <h5>{scale.name}</h5>
                    <button onClick={() => handleSelectScale(scale)}>View Scale</button>
                  </div>
                  <p>{scale.description}</p>
                  
                  {scale.theoryExplanation && (
                    <div className="toggle-section">
                      <div className="toggle-container">
                        <button 
                          className="toggle-button theory-toggle"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleScaleTheory(index);
                          }}
                        >
                          Why This Scale Works{expandedScaleTheory === index ? ' −' : ' +'}
                        </button>
                      </div>
                      
                      {expandedScaleTheory === index && (
                        <div className="theory-explanation">
                          <p>{scale.theoryExplanation}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="scale-visualization-section">
          <button 
            className="back-to-song-info" 
            onClick={handleBackToSongInfo}
          >
            ← Back to "{selectedSong.title}"
          </button>
          
          <h3>
            {selectedScale.name} for "{selectedSong.title}"
          </h3>
          
          <ScaleInfo 
            keyValue={selectedScale.value} 
            scaleType={selectedScale.type} 
          />
          
          {selectedScale.theoryExplanation && (
            <div className="theory-tips">
              <div className="toggle-section">
                <button 
                  className="toggle-button full-width"
                  onClick={() => setShowPracticeSuggestions(!showPracticeSuggestions)}
                >
                  Theory Tips & Practice Suggestions{showPracticeSuggestions ? ' −' : ' +'}
                </button>
                
                {showPracticeSuggestions && (
                  <div className="practice-content">
                    <p>{selectedScale.theoryExplanation}</p>
                    
                    <div className="practice-suggestions">
                      <h5>Practice Suggestions:</h5>
                      <ul>
                        <li>Try targeting the root note ({selectedScale.value}) during chord changes to G</li>
                        <li>Experiment with playing slower, melodic phrases that follow the fingerpicking pattern</li>
                        <li>Focus on using the pentatonic scale to create simple melodies rather than fast runs</li>
                        <li>Listen carefully to the song and try to match the folk-inspired mood in your improvisation</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          
          <Fretboard 
            keyValue={selectedScale.value} 
            scaleType={selectedScale.type} 
            isHighNeck={false} 
          />
          
          {/* New Improvisation Examples Section */}
          {selectedScale.improvisationExamples && (
            <div className="toggle-section improvisation-toggle">
              <button 
                className="toggle-button full-width"
                onClick={() => setShowExamples(!showExamples)}
              >
                Example Licks & Phrases{showExamples ? ' −' : ' +'}
              </button>
              
              {showExamples && (
                <ImprovisationExamples examples={selectedScale.improvisationExamples} />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SongScales;