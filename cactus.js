/**
 * Functions for managing the cacti in the game.
 * @module cactus
 */

import {
  setCustomProperty,
  incrementCustomProperty,
  getCustomProperty,
} from "./updateCustomProperty.js"

/**
 * Speed at which the cacti move.
 * @constant {number}
 */
const SPEED = 0.05

/**
 * The minimum and maximum time between cacti spawning.
 * @constant {number}
 */
const CACTUS_INTERVAL_MIN = 500
const CACTUS_INTERVAL_MAX = 2000

/**
 * The element containing the world.
 * @constant {Element}
 */
const worldElem = document.querySelector("[data-world]")

/**
 * The time until the next cactus should be spawned.
 * @type {number}
 */
let nextCactusTime

/**
 * Resets the cactus spawner.
 */
export function setupCactus() {
  nextCactusTime = CACTUS_INTERVAL_MIN
  document.querySelectorAll("[data-cactus]").forEach(cactus => {
    cactus.remove()
  })
}

/**
 * Updates the position of all cacti and spawns new ones as needed.
 * @param {number} delta The time since the last frame in milliseconds.
 * @param {number} speedScale The speed at which the game is running.
 */
export function updateCactus(delta, speedScale) {
  document.querySelectorAll("[data-cactus]").forEach(cactus => {
    incrementCustomProperty(cactus, "--left", delta * speedScale * SPEED * -1)
    if (getCustomProperty(cactus, "--left") <= -100) {
      cactus.remove()
    }
  });

  if (nextCactusTime <= 0) {
    createCactus()
    nextCactusTime =
      randomNumberBetween(CACTUS_INTERVAL_MIN, CACTUS_INTERVAL_MAX) / speedScale
  }
  nextCactusTime -= delta
}

/**
 * Gets the bounding rectangles of all cacti.
 * @returns {Array<DOMRect>} The rectangles of all cacti.
 */
export function getCactusRects() {
  return [...document.querySelectorAll("[data-cactus]")].map(cactus => {
    return cactus.getBoundingClientRect()
  })
}

/**
 * Creates a new cactus and adds it to the world.
 */
function createCactus() {
  const cactus = document.createElement("img")
  /* Shorthand for cactus.setAttribute('data-cactus', 'true') */
  cactus.dataset.cactus = true
  cactus.src = "imgs/cactus.png"
  cactus.classList.add("cactus")
  setCustomProperty(cactus, "--left", 100)
  worldElem.append(cactus)
}

/**
 * Generates a random number between a given range.
 * @param {number} min The minimum of the range.
 * @param {number} max The maximum of the range.
 * @returns {number} A random number between the range.
 */
function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

