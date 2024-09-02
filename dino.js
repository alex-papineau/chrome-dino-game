/**
 * Module for managing the dino.
 * @module dino
 */

import {
  incrementCustomProperty,
  setCustomProperty,
  getCustomProperty,
} from "./updateCustomProperty.js"

/**
 * The HTML element for the dino.
 * @constant {Element}
 */
const dinoElem = document.querySelector("[data-dino]")

/**
 * Constants for jumping.
 * @constant {number}
 */
const JUMP_SPEED = 0.45
const GRAVITY = 0.0015

/**
 * Constants for running.
 * @constant {number}
 */
const DINO_FRAME_COUNT = 2
const FRAME_TIME = 100

/**
 * State variables for the dino.
 */
let isJumping
let dinoFrame
let currentFrameTime
let yVelocity

/**
 * Sets up the dino.
 * @function
 */
export function setupDino() {
  isJumping = false
  dinoFrame = 0
  currentFrameTime = 0
  yVelocity = 0
  setCustomProperty(dinoElem, "--bottom", 0)
  document.removeEventListener("keydown", onJump)
  document.addEventListener("keydown", onJump)
}

/**
 * Updates the dino.
 * @param {number} delta The time since the last frame in milliseconds.
 * @param {number} speedScale The speed at which the game is running.
 * @function
 */
export function updateDino(delta, speedScale) {
  handleRun(delta, speedScale)
  handleJump(delta)
}

/**
 * Gets the dino's bounding rectangle.
 * @returns {DOMRect} The dino's bounding rectangle.
 * @function
 */
export function getDinoRect() {
  return dinoElem.getBoundingClientRect()
}

/**
 * Sets the dino to the lose state.
 * @function
 */
export function setDinoLose() {
  dinoElem.src = "imgs/dino-lose.png"
}

/**
 * Handles running.
 * @param {number} delta The time since the last frame in milliseconds.
 * @param {number} speedScale The speed at which the game is running.
 * @function
 */
function handleRun(delta, speedScale) {
  if (isJumping) {
    dinoElem.src = `imgs/dino-stationary.png`
    return
  }

  if (currentFrameTime >= FRAME_TIME) {
    dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT
    dinoElem.src = `imgs/dino-run-${dinoFrame}.png`
    currentFrameTime -= FRAME_TIME
  }
  currentFrameTime += delta * speedScale
}

/**
 * Handles jumping.
 * @param {number} delta The time since the last frame in milliseconds.
 * @function
 */
function handleJump(delta) {
  if (!isJumping) return

  incrementCustomProperty(dinoElem, "--bottom", yVelocity * delta)

  if (getCustomProperty(dinoElem, "--bottom") <= 0) {
    setCustomProperty(dinoElem, "--bottom", 0)
    isJumping = false
  }

  yVelocity -= GRAVITY * delta
}

/**
 * Handles the jump event.
 * @param {KeyboardEvent} e The keyboard event.
 * @function
 */
function onJump(e) {
  if (e.code !== "Space" || isJumping) return

  yVelocity = JUMP_SPEED
  isJumping = true
}

