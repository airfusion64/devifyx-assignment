/**
 * Exports the current canvas as a PNG image.
 * @param {HTMLCanvasElement} canvas - The canvas element to export.
 * @param {string} filename - The filename for the downloaded PNG.
 */
export function exportCanvasAsPNG(canvas, filename) {
  if (!canvas) return
  // Create a temporary link and trigger download
  const link = document.createElement('a')
  link.download = filename
  link.href = canvas.toDataURL('image/png')
  link.click()
} 