import React, { useState } from "react";
import songData from "../utils/songData";
import Fretboard from "./Fretboard";
import ScaleInfo from "./ScaleInfo";
import ImprovisationExamples from "./ImprovisationExamples"; 
import ChordChart from "./ChordChart";
import "../styles/ImprovisationExamples.css";
import "../styles/ChordChart.css";
import "../styles/SongScales.css";

const SongScales = ({ setActiveSection }) => {
  // State for selected song and view
  const [selectedSong, setSelectedSong] = useState(songData[0]); // Default to first song (Blackbird)
  const [selectedScale, setSelectedScale] = useState(null);
  const [viewMode, setViewMode] = useState("songList"); // "songList", "songDetail", "scaleVisualization"
  
  // UI state toggles
  const [showChordAnalysis, setShowChordAnalysis] = useState(false);
  const [expandedScaleTheory, setExpandedScaleTheory] = useState(null);
  const [showPracticeSuggestions, setShowPracticeSuggestions] = useState(false);
  const [showExamples, setShowExamples] = useState(true);
  const [showChordChart, setShowChordChart] = useState(true);
  
  // State for song detail tabs
  const [activeTab, setActiveTab] = useState("overview"); // "overview", "chords", "scales"
  
  // Handle song selection from list
  const handleSelectSong = (song) => {
    setSelectedSong(song);
    setViewMode("songDetail");
    setActiveTab("overview");
  };
  
  // Handle scale selection
  const handleSelectScale = (scale) => {
    setSelectedScale(scale);
    setViewMode("scaleVisualization");
    setShowPracticeSuggestions(false);
    setShowExamples(true);
  };
  
  // Handle navigation
  const handleBackToScaleViewer = () => {
    setActiveSection("scaleViewer");
  };
  
  const handleBackToSongList = () => {
    setViewMode("songList");
  };
  
  const handleBackToSongDetail = () => {
    setViewMode("songDetail");
  };
  
  // Toggle scale theory expansion
  const toggleScaleTheory = (scaleIndex) => {
    if (expandedScaleTheory === scaleIndex) {
      setExpandedScaleTheory(null);
    } else {
      setExpandedScaleTheory(scaleIndex);
    }
  };

  // Render song list view
  const renderSongList = () => (
    <div className="song-list-container">
      <h2>Song Library</h2>
      <p className="song-library-intro">
        Select a song to view its chord shapes, progressions, and recommended scales for improvisation.
      </p>
      
      <div className="song-grid">
        {songData.map((song, index) => (
          <div 
            key={index}
            className="song-card"
            onClick={() => handleSelectSong(song)}
          >
            <h3>{song.title}</h3>
            <p className="song-artist">{song.artist}</p>
            <p className="song-details">Key of {song.key} • {song.year}</p>
            <div className="song-card-footer">
              <span className="song-tag">Chords</span>
              <span className="song-tag">Scales</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Render song detail view with tabs
  const renderSongDetail = () => (
    <div className="song-detail-container">
      <button className="back-button" onClick={handleBackToSongList}>
        ← Back to Song Library
      </button>
      
      <div className="song-header">
        <h2>{selectedSong.title}</h2>
        <p className="song-artist">by {selectedSong.artist} • {selectedSong.album} ({selectedSong.year})</p>
      </div>
      
      {/* Tab navigation */}
      <div className="tab-navigation">
        <button 
          className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`tab-button ${activeTab === 'chords' ? 'active' : ''}`}
          onClick={() => setActiveTab('chords')}
        >
          Chord Charts
        </button>
        <button 
          className={`tab-button ${activeTab === 'scales' ? 'active' : ''}`}
          onClick={() => setActiveTab('scales')}
        >
          Scales
        </button>
      </div>
      
      {/* Overview Tab Content */}
      {activeTab === 'overview' && (
        <div className="tab-content">
          <div className="song-description">
            <p>{selectedSong.description}</p>
            
            <div className="key-details">
              <div className="detail-item">
                <span className="detail-label">Key:</span>
                <span className="detail-value">{selectedSong.key}</span>
              </div>
              {selectedSong.bpm && (
                <div className="detail-item">
                  <span className="detail-label">Tempo:</span>
                  <span className="detail-value">{selectedSong.bpm} BPM</span>
                </div>
              )}
            </div>
            
            <div className="chord-progression">
              <h4>Chord Progression</h4>
              <p>{selectedSong.chordProgression}</p>
              
              {selectedSong.progressionAnalysis && (
                <div className="toggle-section">
                  <button 
                    className="toggle-button chord-toggle"
                    onClick={() => setShowChordAnalysis(!showChordAnalysis)}
                  >
                    Chord Analysis {showChordAnalysis ? '−' : '+'}
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
          
          <div className="overview-preview">
            <div className="preview-section">
              <h4>Chord Preview</h4>
              <div className="chord-sequence">
                {selectedSong.chordProgression.split(', ').map((chord, idx) => (
                  <div key={idx} className="chord-sequence-box">
                    {chord}
                  </div>
                ))}
              </div>
              <button 
                className="view-more-button"
                onClick={() => setActiveTab('chords')}
              >
                View Full Chord Charts
              </button>
            </div>
            
            <div className="preview-section">
              <h4>Recommended Scales</h4>
              <div className="scale-preview">
                {selectedSong.recommendedScales.slice(0, 2).map((scale, idx) => (
                  <div key={idx} className="scale-preview-item">
                    <span className="scale-name">{scale.name}</span>
                  </div>
                ))}
              </div>
              <button 
                className="view-more-button"
                onClick={() => setActiveTab('scales')}
              >
                View Scales
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Chord Charts Tab Content */}
      {activeTab === 'chords' && (
        <div className="tab-content">
          <ChordChart song={selectedSong} />
          
          <div className="how-to-play">
            <h3>How to Play {selectedSong.title}</h3>
            <p>
              {selectedSong.title} uses a fingerpicking pattern with the thumb playing alternating bass notes 
              while the fingers play melody notes on the higher strings. Follow the chord progression: 
              {selectedSong.chordProgression}
            </p>
            <p>
              Practice each chord transition slowly, making sure each note rings clearly.
            </p>
          </div>
        </div>
      )}
      
      {/* Scales Tab Content */}
      {activeTab === 'scales' && (
        <div className="tab-content">
          <div className="scale-options">
            <h3>Recommended Scales for {selectedSong.title}</h3>
            <p className="scale-intro">
              Select a scale to view its pattern on the fretboard and learn how to use it with this song.
            </p>
            
            <div className="scale-grid">
              {selectedSong.recommendedScales.map((scale, index) => (
                <div key={index} className="scale-option">
                  <div className="scale-option-header">
                    <h4>{scale.name}</h4>
                    <button 
                      onClick={() => handleSelectScale(scale)}
                      className="view-scale-button"
                    >
                      View Scale
                    </button>
                  </div>
                  <p>{scale.description}</p>
                  
                  {scale.theoryExplanation && (
                    <div className="toggle-section">
                      <button 
                        className="toggle-button theory-toggle"
                        onClick={() => toggleScaleTheory(index)}
                      >
                        Why This Scale Works {expandedScaleTheory === index ? '−' : '+'}
                      </button>
                      
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
      )}
    </div>
  );

  // Render scale visualization
  const renderScaleVisualization = () => (
    <div className="scale-visualization-section">
      <button className="back-button" onClick={handleBackToSongDetail}>
        ← Back to "{selectedSong.title}"
      </button>
      
      <h3>
        {selectedScale.name} for "{selectedSong.title}"
      </h3>
      
      <ScaleInfo 
        keyValue={selectedScale.value} 
        scaleType={selectedScale.type} 
      />
      
      <div className="toggle-section chord-chart-toggle">
        <button 
          className="toggle-button full-width"
          onClick={() => setShowChordChart(!showChordChart)}
        >
          Chord Shapes for "{selectedSong.title}" {showChordChart ? '−' : '+'}
        </button>
        
        {showChordChart && (
          <ChordChart song={selectedSong} />
        )}
      </div>
      
      {selectedScale.theoryExplanation && (
        <div className="theory-tips">
          <div className="toggle-section">
            <button 
              className="toggle-button full-width"
              onClick={() => setShowPracticeSuggestions(!showPracticeSuggestions)}
            >
              Theory Tips & Practice Suggestions {showPracticeSuggestions ? '−' : '+'}
            </button>
            
            {showPracticeSuggestions && (
              <div className="practice-content">
                <p>{selectedScale.theoryExplanation}</p>
                
                <div className="practice-suggestions">
                  <h5>Practice Suggestions:</h5>
                  <ul>
                    <li>Try targeting the root note ({selectedScale.value}) during chord changes</li>
                    <li>Experiment with playing slower, melodic phrases that follow the fingerpicking pattern</li>
                    <li>Focus on using the pentatonic scale to create simple melodies rather than fast runs</li>
                    <li>Listen carefully to the song and try to match the mood in your improvisation</li>
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
      
      {/* Improvisation Examples Section */}
      {selectedScale.improvisationExamples && (
        <div className="toggle-section improvisation-toggle">
          <button 
            className="toggle-button full-width"
            onClick={() => setShowExamples(!showExamples)}
          >
            Example Licks & Phrases {showExamples ? '−' : '+'}
          </button>
          
          {showExamples && (
            <ImprovisationExamples examples={selectedScale.improvisationExamples} />
          )}
        </div>
      )}
    </div>
  );
  
  // Main render logic based on view mode
  return (
    <div className="song-scales-container">
      {viewMode === "songList" && renderSongList()}
      {viewMode === "songDetail" && renderSongDetail()}
      {viewMode === "scaleVisualization" && renderScaleVisualization()}
    </div>
  );
};

export default SongScales;