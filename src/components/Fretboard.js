import React, { useEffect, useState } from "react";
import Position from "./Position";
import { getPositionsForKey } from "../utils/isHighNeck";
import { getScale } from "../utils/scales";



const Fretboard = ({ keyValue, scaleType, isHighNeck }) => {
  const [positions, setPositions] = useState([]);
  const [rootNote, setRootNote] = useState("");
  const [scaleNotes, setScaleNotes] = useState([]);

  useEffect(() => {
    // 1) Get positions (with or without +12)
    const newPositions = getPositionsForKey(keyValue, scaleType, isHighNeck);
    setPositions(newPositions);

    // 2) Set root
    setRootNote(keyValue);

    // 3) Get scale notes
    const newScaleNotes = getScale(keyValue, scaleType); // or however you do this
    setScaleNotes(newScaleNotes);
  }, [keyValue, scaleType, isHighNeck]);

  return (
    <div className="fretboard-container">
      {positions.map((position, index) => (
        <Position
          key={index}
          position={position}
          positionIndex={index}
          rootNote={rootNote}
          scaleNotes={scaleNotes}
        />
      ))}
    </div>
  );
};

export default Fretboard;
