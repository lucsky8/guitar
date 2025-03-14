import React from "react";
import "../styles/Legend.css";

const Legend = () => {
  return (
    <div className="legend">
      <div className="legend-item">
        <div className="legend-circle root"></div>
        <span>Root Note</span>
      </div>
      <div className="legend-item">
        <div className="legend-circle scale"></div>
        <span>Scale Note</span>
      </div>
      <div className="legend-item">
        <div className="legend-circle normal"></div>
        <span>Other</span>
      </div>
    </div>
  );
};

export default Legend;