import React, { useState } from "react";

const ImprovisationExamples = ({ examples }) => {
  const [selectedExample, setSelectedExample] = useState(examples.length > 0 ? 0 : null);

  if (!examples || examples.length === 0) {
    return (
      <div className="no-examples-message">
        No improvisation examples available for this scale.
      </div>
    );
  }

  return (
    <div className="improvisation-examples">
      <h4>Practice Examples</h4>
      <p className="examples-intro">
        Try these example phrases to get comfortable improvising with this scale:
      </p>
      
      <div className="example-tabs">
        {examples.map((example, index) => (
          <button
            key={index}
            className={`example-tab ${selectedExample === index ? 'active' : ''}`}
            onClick={() => setSelectedExample(index)}
          >
            {example.name}
          </button>
        ))}
      </div>
      
      {selectedExample !== null && (
        <div className="example-content">
          <div className="example-description">
            <p>{examples[selectedExample].description}</p>
            <div className="positions-used">
              <span className="positions-label">Positions used: </span>
              {examples[selectedExample].positions.map((pos, idx) => (
                <span key={idx} className="position-badge">
                  {pos}
                </span>
              ))}
            </div>
          </div>
          
          <div className="tab-notation">
            <h5>Tab Notation</h5>
            <pre className="tab-display">
              {examples[selectedExample].tabNotation.map((line, idx) => (
                <div key={idx} className="tab-line">
                  {line}
                </div>
              ))}
            </pre>
          </div>
          
          <div className="practice-tip">
            <strong>Tip:</strong> Start slowly and gradually increase speed. Focus on clean transitions between positions.
          </div>
        </div>
      )}
    </div>
  );
};

export default ImprovisationExamples;