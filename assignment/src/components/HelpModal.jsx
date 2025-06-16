import React from 'react'

/**
 * HelpModal component displays instructions and information about L-Systems.
 * @param {Object} props
 * @param {boolean} props.show - Whether the modal is visible.
 * @param {Function} props.onClose - Function to close the modal.
 */
function HelpModal({ show, onClose }) {
  // Only render the modal if show is true
  if (!show) return null
  return (
    <div className="help-modal">
      <div className="help-content">
        {/* Close button for the modal */}
        <button 
          className="close-button"
          onClick={onClose}
        >
          ×
        </button>
        <h2>L-System Visualizer Help</h2>
        {/* L-System explanation */}
        <section>
          <h3>What are L-Systems?</h3>
          <p>
            L-Systems (Lindenmayer Systems) are a mathematical formalism for modeling growth processes 
            and self-similar patterns. They were developed by biologist Aristid Lindenmayer in 1968 
            to model the growth patterns of plants.
          </p>
        </section>
        {/* Usage instructions */}
        <section>
          <h3>How to Use the Visualizer</h3>
          <ol>
            <li>
              <strong>Select an L-System:</strong> Choose from predefined patterns.
            </li>
            <li>
              <strong>Adjust Parameters:</strong>
              <ul>
                <li><strong>Iterations:</strong> Controls the complexity of the pattern (1-6)</li>
                <li><strong>Angle:</strong> Determines the branching angle (1-180 degrees)</li>
                <li><strong>Length:</strong> Sets the length of each line segment (1-20)</li>
              </ul>
            </li>
          </ol>
        </section>
        {/* Symbol reference */}
        <section>
          <h3>Symbols Used</h3>
          <ul>
            <li><strong>F, G:</strong> Draw a line forward</li>
            <li><strong>+:</strong> Turn right by the angle</li>
            <li><strong>-:</strong> Turn left by the angle</li>
            <li><strong>[:</strong> Save current position and angle</li>
            <li><strong>]:</strong> Restore previous position and angle</li>
          </ul>
        </section>
        {/* Tips section */}
        <section>
          <h3>Tips</h3>
          <ul>
            <li>Start with lower iterations to understand the pattern</li>
            <li>Experiment with different angles for unique patterns</li>
            <li>Use the Reset button to return to default settings</li>
            <li>Export your creations as PNG images</li>
          </ul>
        </section>
      </div>
    </div>
  )
}

export default HelpModal 