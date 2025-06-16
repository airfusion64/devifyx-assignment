import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const canvasRef = useRef(null)
  const defaultValues = {
    iterations: 3,
    angle: 25,
    length: 10,
    selectedSystem: 'tree',
  }

  // State management
  const [iterations, setIterations] = useState(defaultValues.iterations)
  const [angle, setAngle] = useState(defaultValues.angle)
  const [length, setLength] = useState(defaultValues.length)
  const [selectedSystem, setSelectedSystem] = useState(defaultValues.selectedSystem)
  const [backgroundColor, setBackgroundColor] = useState('#ffffff')
  const [lineColor, setLineColor] = useState('#2c3e50')
  const [showHelp, setShowHelp] = useState(false)

  // Predefined L-System definitions (no custom)
  const lSystems = {
    tree: {
      name: 'Binary Tree',
      axiom: 'F',
      rules: {
        'F': 'F[+F]F[-F]F'
      },
      angle: 25,
      length: 10
    },
    koch: {
      name: 'Koch Snowflake',
      axiom: 'F',
      rules: {
        'F': 'F+F-F-F+F'
      },
      angle: 90,
      length: 5
    },
    sierpinski: {
      name: 'Sierpinski Triangle',
      axiom: 'F-G-G',
      rules: {
        'F': 'F-G+F+G-F',
        'G': 'GG'
      },
      angle: 120,
      length: 8
    }
  }

  // Generate L-System string
  const generateLSystem = (system, iterations) => {
    let result = system.axiom
    for (let i = 0; i < iterations; i++) {
      let newResult = ''
      for (let char of result) {
        newResult += system.rules[char] || char
      }
      result = newResult
    }
    return result
  }

  // Draw L-System using turtle graphics
  const drawLSystem = (ctx, instructions, startX, startY) => {
    let x = startX
    let y = startY
    let currentAngle = -90
    let stack = []

    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.strokeStyle = lineColor

    for (let instruction of instructions) {
      switch (instruction) {
        case 'F':
        case 'G':
          x += Math.cos(currentAngle * Math.PI / 180) * length
          y += Math.sin(currentAngle * Math.PI / 180) * length
          ctx.lineTo(x, y)
          break
        case '+':
          currentAngle += angle
          break
        case '-':
          currentAngle -= angle
          break
        case '[':
          stack.push({ x, y, angle: currentAngle })
          break
        case ']':
          if (stack.length > 0) {
            const state = stack.pop()
            x = state.x
            y = state.y
            currentAngle = state.angle
            ctx.moveTo(x, y)
          }
          break
      }
    }
    ctx.stroke()
  }

  // Redraw function
  const redraw = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = backgroundColor
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.strokeStyle = lineColor
    ctx.lineWidth = 2
    const currentSystem = lSystems[selectedSystem]
    const instructions = generateLSystem(currentSystem, iterations)
    drawLSystem(ctx, instructions, canvas.width / 2, canvas.height - 50)
  }

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current
        const container = canvas.parentElement
        canvas.width = container.clientWidth
        canvas.height = container.clientHeight
        redraw()
      }
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Redraw on parameter change
  useEffect(() => {
    if (canvasRef.current) {
      redraw()
    }
  }, [iterations, angle, length, selectedSystem, backgroundColor, lineColor])

  // Export as PNG
  const handleExportPNG = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const link = document.createElement('a')
    link.download = `fractal-${selectedSystem}-${iterations}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  // Reset to defaults
  const handleReset = () => {
    setIterations(defaultValues.iterations)
    setAngle(defaultValues.angle)
    setLength(defaultValues.length)
    setSelectedSystem(defaultValues.selectedSystem)
    setBackgroundColor('#ffffff')
    setLineColor('#2c3e50')
  }

  return (
    <div className="app">
      <h1>L-System Visualizer</h1>
      <div className="main-content">
        <div className="controls-wrapper">
          <div className="controls">
            <button 
              className="help-button"
              onClick={() => setShowHelp(true)}
              title="Help & Instructions"
            >
              ?
            </button>
            {showHelp && (
              <div className="help-modal">
                <div className="help-content">
                  <button 
                    className="close-button"
                    onClick={() => setShowHelp(false)}
                  >
                    ×
                  </button>
                  <h2>L-System Visualizer Help</h2>
                  
                  <section>
                    <h3>What are L-Systems?</h3>
                    <p>
                      L-Systems (Lindenmayer Systems) are a mathematical formalism for modeling growth processes 
                      and self-similar patterns. They were developed by biologist Aristid Lindenmayer in 1968 
                      to model the growth patterns of plants.
                    </p>
                  </section>

                  <section>
                    <h3>How to Use the Visualizer</h3>
                    <ol>
                      <li>
                        <strong>Select an L-System:</strong> Choose from predefined patterns or create your own custom system.
                      </li>
                      <li>
                        <strong>Adjust Parameters:</strong>
                        <ul>
                          <li><strong>Iterations:</strong> Controls the complexity of the pattern (1-6)</li>
                          <li><strong>Angle:</strong> Determines the branching angle (1-180 degrees)</li>
                          <li><strong>Length:</strong> Sets the length of each line segment (1-20)</li>
                        </ul>
                      </li>
                      <li>
                        <strong>Custom L-System:</strong>
                        <ul>
                          <li><strong>Axiom:</strong> The initial string (e.g., "F")</li>
                          <li><strong>Rules:</strong> Define how symbols are replaced (e.g., F → F[+F]F[-F]F)</li>
                        </ul>
                      </li>
                    </ol>
                  </section>

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
            )}
            <div className="control-group">
              <label>L-System Type:</label>
              <select 
                value={selectedSystem} 
                onChange={(e) => {
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
            <div className="control-group">
              <label>Iterations: {iterations}</label>
              <input 
                type="range" 
                min="1" 
                max="6" 
                value={iterations}
                onChange={(e) => setIterations(Number(e.target.value))}
              />
            </div>
            <div className="control-group">
              <label>Angle: {angle}°</label>
              <input 
                type="range" 
                min="1" 
                max="180" 
                value={angle}
                onChange={(e) => setAngle(Number(e.target.value))}
              />
            </div>
            <div className="control-group">
              <label>Length: {length}</label>
              <input 
                type="range" 
                min="1" 
                max="20" 
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
              />
            </div>
            <div className="control-group">
              <label>Colors</label>
              <div className="color-controls">
                <div className="color-input">
                  <label>Background:</label>
                  <input 
                    type="color" 
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    title="Background Color"
                  />
                </div>
                <div className="color-input">
                  <label>Fractal:</label>
                  <input 
                    type="color" 
                    value={lineColor}
                    onChange={(e) => setLineColor(e.target.value)}
                    title="Fractal Line Color"
                  />
                </div>
              </div>
            </div>
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
          </div>
        </div>
        <div className="canvas-container">
          <canvas ref={canvasRef}></canvas>
        </div>
      </div>
    </div>
  )
}

export default App
