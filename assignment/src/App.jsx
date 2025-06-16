import { useState } from 'react'
import './App.css'
import Controls from './components/Controls'
import Canvas from './components/Canvas'
import HelpModal from './components/HelpModal'

function App() {
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

  // Export as PNG
  const handleExportPNG = () => {
    const canvas = document.querySelector('.canvas-container canvas')
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
            <Controls
              lSystems={lSystems}
              selectedSystem={selectedSystem}
              setSelectedSystem={setSelectedSystem}
              iterations={iterations}
              setIterations={setIterations}
              angle={angle}
              setAngle={setAngle}
              length={length}
              setLength={setLength}
              backgroundColor={backgroundColor}
              setBackgroundColor={setBackgroundColor}
              lineColor={lineColor}
              setLineColor={setLineColor}
              handleReset={handleReset}
              handleExportPNG={handleExportPNG}
              onShowHelp={() => setShowHelp(true)}
            />
            <HelpModal show={showHelp} onClose={() => setShowHelp(false)} />
          </div>
        </div>
        <div className="canvas-container">
          <Canvas
            system={lSystems[selectedSystem]}
            iterations={iterations}
            angle={angle}
            length={length}
            backgroundColor={backgroundColor}
            lineColor={lineColor}
          />
        </div>
      </div>
    </div>
  )
}

export default App
