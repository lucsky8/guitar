import React from "react";
import "../styles/Controls.css";


const Controls = ({ keyValue, setKey, scaleType, setScaleType, isHighNeck, setIsHighNeck }) => {
  const keys = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];
  
  const scaleTypes = [
    { value: "minor-pentatonic", label: "Minor Pentatonic" },
    { value: "major-pentatonic", label: "Major Pentatonic" },
    // Could add more scale types here in the future
  ];

  const getFormattedScaleName = () => {
    const scaleObj = scaleTypes.find(scale => scale.value === scaleType);
    return scaleObj ? scaleObj.label : scaleType.replace("-", " ");
  };

  return (
    <>
      <div className="controls">
        <div className="control-group">
          <label htmlFor="key">Key</label>
          <select 
            id="key" 
            value={keyValue} 
            onChange={(e) => setKey(e.target.value)}
            aria-label="Select key"
          >
            {keys.map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </select>
        </div>

        <div className="control-group">
          <label htmlFor="scale-type">Scale Type</label>
          <select
            id="scale-type"
            value={scaleType}
            onChange={(e) => setScaleType(e.target.value)}
            aria-label="Select scale type"
          >
            {scaleTypes.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        <div className="control-group">
          <label>Neck Position</label>
          <label className="toggle-switch" title="Toggle between low and high neck positions">
            <input
              type="checkbox"
              checked={isHighNeck}
              onChange={(e) => setIsHighNeck(e.target.checked)}
              aria-label="Toggle high neck position"
            />
            <span className="toggle-slider"></span>
          </label>
          <div className="toggle-labels">
            <span>Low</span>
            <span>High</span>
          </div>
          <div className="fret-indicator">
            {isHighNeck ? 'Frets 12-24' : 'Frets 0-12'}
          </div>
        </div>
      </div>
      
      <div className="scale-display">
        Currently viewing: <span>{keyValue} {getFormattedScaleName()}</span>
      </div>
    </>
  );
};

export default Controls;