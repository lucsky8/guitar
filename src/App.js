import React, { useState, useEffect } from "react";
import Controls from "./components/Controls";
import Fretboard from "./components/Fretboard";
import Legend from "./components/Legend";
import "./App.css";

function App() {
  const [keyValue, setKeyValue] = useState("A");
  const [scaleType, setScaleType] = useState("minor-pentatonic");
  const [isHighNeck, setIsHighNeck] = useState(false);

  return (
    <div className="container">
      <h1>Guitar Scale Viewer</h1>
      <div className="info-box">
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

      <Legend />

      <Fretboard keyValue={keyValue} scaleType={scaleType} isHighNeck={isHighNeck} />
    </div>
  );
}

export default App;
