import React from "react";

const Legend = () => {
  return (
    <div className="legend">
      <div className="legend-item">
        <div className="legend-color-root root-color"></div>
        <span>Root</span>
      </div>
      <div className="legend-item">
        <div className="legend-color-scale scale-color"></div>
        <span>Scale Note</span>
      </div>
      <div className="legend-item">
        <div className="legend-color normal-color"></div>
        <span>Other Notes</span>
      </div>
    </div>
  );
};

export default Legend;
