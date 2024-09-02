/**
 * Gets the value of a custom CSS property.
 * @param {Element} elem The element to get the property from.
 * @param {string} prop The name of the property to get.
 * @returns {number} The value of the property, or 0 if it is not set.
 */
export function getCustomProperty(elem, prop) {
  return parseFloat(getComputedStyle(elem).getPropertyValue(prop)) || 0
}

/**
 * Sets the value of a custom CSS property.
 * @param {Element} elem The element to set the property on.
 * @param {string} prop The name of the property to set.
 * @param {number|string} value The value to set the property to.
 */
export function setCustomProperty(elem, prop, value) {
  elem.style.setProperty(prop, value)
}

/**
 * Increments the value of a custom CSS property by a given amount.
 * @param {Element} elem The element to increment the property on.
 * @param {string} prop The name of the property to increment.
 * @param {number} inc The amount to increment the property by.
 */
export function incrementCustomProperty(elem, prop, inc) {
  setCustomProperty(elem, prop, getCustomProperty(elem, prop) + inc)
}

