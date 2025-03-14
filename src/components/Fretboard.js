import React, { useEffect, useState } from "react";
import Position from "./Position";
import { getPositionsForKey } from "../utils/isHighNeck";
import { getScale } from "../utils/scales";
import "../styles/Fretboard.css";

const Fretboard = ({ keyValue, scaleType, isHighNeck }) => {
  const [positions, setPositions] = useState([]);
  const [rootNote, setRootNote] = useState("");
  const [scaleNotes, setScaleNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    
    // Small delay to show loading transition
    setTimeout(() => {
      try {
        // 1) Get positions (with or without +12)
        const newPositions = getPositionsForKey(keyValue, scaleType, isHighNeck);
        setPositions(newPositions);
  
        // 2) Set root
        setRootNote(keyValue);
  
        // 3) Get scale notes
        const newScaleNotes = getScale(keyValue, scaleType);
        setScaleNotes(newScaleNotes);
      } catch (error) {
        console.error("Error updating fretboard:", error);
      } finally {
        setLoading(false);
      }
    }, 100);
  }, [keyValue, scaleType, isHighNeck]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading scale positions...</p>
      </div>
    );
  }

  return (
    <div className="fretboard-container">
      {positions.length === 0 ? (
        <div className="no-positions-message">
          <p>No scale positions found for {keyValue} {scaleType.replace("-", " ")}.</p>
        </div>
      ) : (
        positions.map((position, index) => (
          <Position
            key={`${keyValue}-${scaleType}-${isHighNeck}-${index}`}
            position={position}
            positionIndex={index}
            rootNote={rootNote}
            scaleNotes={scaleNotes}
          />
        ))
      )}
    </div>
  );
};

export default Fretboard;