import React, { useRef, useEffect } from 'react'
import { drawLSystem } from '../utils/draw'

/**
 * Canvas component for rendering the L-System fractal.
 * @param {Object} props
 * @param {Object} system - The selected L-System definition.
 * @param {number} iterations
 * @param {number} angle
 * @param {number} length
 * @param {string} backgroundColor
 * @param {string} lineColor
 */
function Canvas({ system, iterations, angle, length, backgroundColor, lineColor }) {
  const canvasRef = useRef(null)

  // Draw the fractal whenever parameters change
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = backgroundColor
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.strokeStyle = lineColor
    ctx.lineWidth = 2
    // Generate L-System string
    let result = system.axiom
    for (let i = 0; i < iterations; i++) {
      let newResult = ''
      for (let char of result) {
        newResult += system.rules[char] || char
      }
      result = newResult
    }
    // Draw the L-System fractal
    drawLSystem(ctx, result, canvas.width / 2, canvas.height - 50, angle, length, lineColor)
  }, [system, iterations, angle, length, backgroundColor, lineColor])

  // Resize the canvas when the parent container size changes
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current
        const container = canvas.parentElement
        canvas.width = container.clientWidth
        canvas.height = container.clientHeight
      }
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return <canvas ref={canvasRef}></canvas>
}

export default Canvas 