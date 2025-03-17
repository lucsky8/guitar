import React, { useState, useEffect } from "react";
import Controls from "./components/Controls";
import Fretboard from "./components/Fretboard";
import Legend from "./components/Legend";
import ScaleInfo from "./components/ScaleInfo";
import SongScales from "./components/SongScales";
import "./index.css"; // This imports all the CSS files

function App() {
  const [keyValue, setKeyValue] = useState("A");
  const [scaleType, setScaleType] = useState("minor-pentatonic");
  const [isHighNeck, setIsHighNeck] = useState(false);
  const [theme, setTheme] = useState("light");
  const [showInfo, setShowInfo] = useState(false);
  const [showSongScales, setShowSongScales] = useState(false);
  
  // Only two main sections now: Scale Viewer and Song Library
  const [activeSection, setActiveSection] = useState("scaleViewer"); // "scaleViewer" or "songLibrary"

  return (
    <div className={`container ${theme}`}>
      <header className="app-header">
        <div className="header-controls">
          {activeSection === "scaleViewer" && (
            <button 
              className={`info-toggle ${showInfo ? 'active' : ''}`} 
              onClick={() => setShowInfo(!showInfo)}
              aria-label={showInfo ? "Hide scale info" : "Show scale info"}
              title={showInfo ? "Hide scale information" : "Show scale information"}
            >
              ℹ️
            </button>
          )}
          <button 
            className="theme-toggle" 
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            aria-label="Toggle dark mode"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>
      </header>
      
      {/* Simplified feature toggle with just two options */}
      <div className="feature-toggle">
        <button 
          className={`feature-button ${activeSection === "scaleViewer" ? 'active' : ''}`}
          onClick={() => setActiveSection("scaleViewer")}
        >
          Scale Viewer
        </button>
        <button 
          className={`feature-button ${activeSection === "songLibrary" ? 'active' : ''}`}
          onClick={() => {
            setActiveSection("songLibrary");
            setShowSongScales(true);
          }}
        >
          Song Library
        </button>
      </div>

      {activeSection === "scaleViewer" ? (
        <>
          <div className="info-box">
            <h1>Guitar Scale Viewer</h1>
            <h3>Scale Guide</h3>
            <p>
              Choose a key and scale type to visualize positions on the guitar
              fretboard. Red dots are root notes, blue dots are other notes of the
              scale or arpeggio.
            </p>
          </div>

          <Controls
            keyValue={keyValue}
            setKey={setKeyValue}
            scaleType={scaleType}
            setScaleType={setScaleType}
            isHighNeck={isHighNeck}
            setIsHighNeck={setIsHighNeck}
          />
          
          {showInfo && <ScaleInfo keyValue={keyValue} scaleType={scaleType} />}
          
          {!showInfo && (
            <div className="scale-display">
              Currently viewing: <span>{keyValue} {scaleType.replace('-', ' ')}</span>
              <button 
                className="show-info-button"
                onClick={() => setShowInfo(true)}
              >
                Show scale information
              </button>
            </div>
          )}

          <Legend />

          <Fretboard keyValue={keyValue} scaleType={scaleType} isHighNeck={isHighNeck} />
        </>
      ) : (
        // Render Song Library (previously SongScales)
        <SongScales 
          // No need for setShowSongScales anymore since it's handled by section toggle
          // Just pass a function to return to Scale Viewer if needed
          setActiveSection={setActiveSection}
        />
      )}
      
      <footer>
        <p>Guitar Scale Viewer © {new Date().getFullYear()}</p>
        <div className="footer-controls">
          <button 
            className="print-button"
            onClick={() => window.print()}
            aria-label="Print scale diagrams"
          >
            🖨️ Print
          </button>
        </div>
      </footer>
    </div>
  );
}

export default App;