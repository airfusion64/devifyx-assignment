/**
 * Draws the L-System on a canvas context using turtle graphics.
 * @param {CanvasRenderingContext2D} ctx - The canvas context.
 * @param {string} instructions - The L-System string.
 * @param {number} startX - Starting X coordinate.
 * @param {number} startY - Starting Y coordinate.
 * @param {number} angle - The turning angle.
 * @param {number} length - The length of each segment.
 * @param {string} lineColor - The color of the fractal lines.
 */
export function drawLSystem(ctx, instructions, startX, startY, angle, length, lineColor) {
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
        // Move forward and draw a line
        x += Math.cos(currentAngle * Math.PI / 180) * length
        y += Math.sin(currentAngle * Math.PI / 180) * length
        ctx.lineTo(x, y)
        break
      case '+':
        // Turn right
        currentAngle += angle
        break
      case '-':
        // Turn left
        currentAngle -= angle
        break
      case '[':
        // Save current state
        stack.push({ x, y, angle: currentAngle })
        break
      case ']':
        // Restore previous state
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