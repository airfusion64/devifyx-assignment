import React from 'react'

/**
 * Controls component for L-System parameters and actions.
 * @param {Object} props
 * @param {Object} lSystems
 * @param {string} selectedSystem
 * @param {function} setSelectedSystem
 * @param {number} iterations
 * @param {function} setIterations
 * @param {number} angle
 * @param {function} setAngle
 * @param {number} length
 * @param {function} setLength
 * @param {string} backgroundColor
 * @param {function} setBackgroundColor
 * @param {string} lineColor
 * @param {function} setLineColor
 * @param {function} handleReset
 * @param {function} handleExportPNG
 * @param {function} onShowHelp
 */
function Controls({
  lSystems,
  selectedSystem,
  setSelectedSystem,
  iterations,
  setIterations,
  angle,
  setAngle,
  length,
  setLength,
  backgroundColor,
  setBackgroundColor,
  lineColor,
  setLineColor,
  handleReset,
  handleExportPNG,
  onShowHelp
}) {
  return (
    <>
      {/* Help button for opening instructions modal */}
      <button 
        className="help-button"
        onClick={onShowHelp}
        title="Help & Instructions"
      >
        ?
      </button>
      {/* L-System type dropdown */}
      <div className="control-group">
        <label>L-System Type:</label>
        <select 
          value={selectedSystem} 
          onChange={e => {
            setSelectedSystem(e.target.value)
            setAngle(lSystems[e.target.value].angle)
            setLength(lSystems[e.target.value].length)
          }}
        >
          {Object.entries(lSystems).map(([key, system]) => (
            <option key={key} value={key}>{system.name}</option>
          ))}
        </select>
      </div>
      {/* Iterations slider */}
      <div className="control-group">
        <label>Iterations: {iterations}</label>
        <input 
          type="range" 
          min="1" 
          max="6" 
          value={iterations}
          onChange={e => setIterations(Number(e.target.value))}
        />
      </div>
      {/* Angle slider */}
      <div className="control-group">
        <label>Angle: {angle}°</label>
        <input 
          type="range" 
          min="1" 
          max="180" 
          value={angle}
          onChange={e => setAngle(Number(e.target.value))}
        />
      </div>
      {/* Length slider */}
      <div className="control-group">
        <label>Length: {length}</label>
        <input 
          type="range" 
          min="1" 
          max="20" 
          value={length}
          onChange={e => setLength(Number(e.target.value))}
        />
      </div>
      {/* Color pickers for background and fractal line */}
      <div className="control-group">
        <label>Colors</label>
        <div className="color-controls">
          <div className="color-input">
            <label>Background:</label>
            <input 
              type="color" 
              value={backgroundColor}
              onChange={e => setBackgroundColor(e.target.value)}
              title="Background Color"
            />
          </div>
          <div className="color-input">
            <label>Fractal:</label>
            <input 
              type="color" 
              value={lineColor}
              onChange={e => setLineColor(e.target.value)}
              title="Fractal Line Color"
            />
          </div>
        </div>
      </div>
      {/* Action buttons for reset and export */}
      <div className="control-group">
        <div className="button-group">
          <button 
            onClick={handleReset}
            className="control-button"
          >
            Reset
          </button>
          <button 
            onClick={handleExportPNG}
            className="control-button export-button"
          >
            Export PNG
          </button>
        </div>
      </div>
    </>
  )
}

export default Controls 