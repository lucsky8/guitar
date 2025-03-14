import React from "react";
import { getScale } from "../utils/scales";
import "../styles/ScaleInfo.css";

const ScaleInfo = ({ keyValue, scaleType }) => {
  const scaleNotes = getScale(keyValue, scaleType);
  
  const getScaleTypeName = () => {
    switch (scaleType) {
      case "minor-pentatonic":
        return "Minor Pentatonic";
      case "major-pentatonic":
        return "Major Pentatonic";
      default:
        return scaleType.replace("-", " ");
    }
  };
  
  return (
    <div className="scale-info">
      <h3>{keyValue} {getScaleTypeName()}</h3>
      
      <div className="scale-notes">
        <div className="scale-notes-title">Scale Notes:</div>
        <div className="note-bubbles">
          {scaleNotes.map((note, index) => (
            <div 
              key={index} 
              className={`note-bubble ${note === keyValue ? 'root' : ''}`}
            >
              {note}
            </div>
          ))}
        </div>
      </div>
      
      <div className="scale-theory">
        {scaleType === "minor-pentatonic" && (
          <p>
            The <strong>Minor Pentatonic</strong> scale contains 5 notes and is commonly 
            used in blues, rock, and many other genres. It's versatile and works well 
            over minor and dominant 7th chords.
          </p>
        )}
        
        {scaleType === "major-pentatonic" && (
          <p>
            The <strong>Major Pentatonic</strong> scale contains 5 notes and has a bright, 
            happy sound. It's commonly used in country, folk, pop, and rock music, 
            and works well over major chords.
          </p>
        )}
      </div>
    </div>
  );
};

export default ScaleInfo;