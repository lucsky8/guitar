import React from "react";

const Controls = ({ keyValue, setKey, scaleType, setScaleType, isHighNeck, setIsHighNeck }) => {
  const keys = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];
  const scaleTypes = [
    { value: "minor-pentatonic", label: "Minor Pentatonic" },
    { value: "major-pentatonic", label: "Major Pentatonic" },
  ];

  return (
    <div className="controls">
      <div className="control-group">
        <label htmlFor="key">Key</label>
        <select id="key" value={keyValue} onChange={(e) => setKey(e.target.value)}>
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
        >
          {scaleTypes.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      <div className="control-group">
        <label htmlFor="high-neck">High Neck</label>
        <input
          id="high-neck"
          type="checkbox"
          checked={isHighNeck}
          onChange={(e) => setIsHighNeck(e.target.checked)}
        />
      </div>
    </div>
  );
};

export default Controls;
