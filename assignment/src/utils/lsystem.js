/**
 * Generates the L-System string after a given number of iterations.
 * @param {Object} system - The L-System definition (axiom, rules).
 * @param {number} iterations - Number of iterations to apply.
 * @returns {string} The resulting L-System string.
 */
export function generateLSystem(system, iterations) {
  // Start with the axiom
  let result = system.axiom
  // Apply rules for the specified number of iterations
  for (let i = 0; i < iterations; i++) {
    let newResult = ''
    for (let char of result) {
      // Replace each character using the rules, or keep it if no rule
      newResult += system.rules[char] || char
    }
    result = newResult
  }
  return result
} 