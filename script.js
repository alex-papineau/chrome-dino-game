/**
 * Main entry point for the Chrome Dino game.
 * Initializes the game by setting up event listeners and starting the game loop.
 * @module script
 */
import { updateGround, setupGround } from "./ground.js"
import { updateDino, setupDino, getDinoRect, setDinoLose } from "./dino.js"
import { updateCactus, setupCactus, getCactusRects } from "./cactus.js"

/**
 * Constants for the game.
 */
const WORLD_WIDTH = 100
const WORLD_HEIGHT = 30
const SPEED_SCALE_INCREASE = 0.00001

/**
 * References to the HTML elements.
 */
const worldElem = document.querySelector("[data-world]")
const scoreElem = document.querySelector("[data-score]")
const startScreenElem = document.querySelector("[data-start-screen]")

/**
 * Sets up the game by setting the initial scale and adding event listeners.
 */
setPixelToWorldScale()
window.addEventListener("resize", setPixelToWorldScale)
document.addEventListener("keydown", handleStart, { once: true })

/**
 * State variables for the game.
 */
let lastTime
let speedScale
let score

/**
 * The main game loop.
 * Updates the game state and renders the game.
 * @param {number} time The current time in milliseconds.
 */
function update(time) {
  if (lastTime == null) {
    lastTime = time
    window.requestAnimationFrame(update)
    return
  }
  const delta = time - lastTime

  updateGround(delta, speedScale)
  updateDino(delta, speedScale)
  updateCactus(delta, speedScale)
  updateSpeedScale(delta)
  updateScore(delta)
  if (checkLose()) return handleLose()

  lastTime = time
  window.requestAnimationFrame(update)
}

/**
 * Checks if the game is over by checking for collisions between the dino and the cacti.
 * @returns {boolean} True if the game is over, false otherwise.
 */
function checkLose() {
  const dinoRect = getDinoRect()
  return getCactusRects().some(rect => isCollision(rect, dinoRect))
}

/**
 * Checks if two rectangles are colliding.
 * @param {DOMRect} rect1 The first rectangle.
 * @param {DOMRect} rect2 The second rectangle.
 * @returns {boolean} True if the rectangles are colliding, false otherwise.
 */
function isCollision(rect1, rect2) {
  return (
    rect1.left < rect2.right &&
    rect1.top < rect2.bottom &&
    rect1.right > rect2.left &&
    rect1.bottom > rect2.top
  )
}

/**
 * Updates the speed scale based on the time delta.
 * @param {number} delta The time delta in milliseconds.
 */
function updateSpeedScale(delta) {
  speedScale += delta * SPEED_SCALE_INCREASE
}

/**
 * Updates the score based on the time delta.
 * @param {number} delta The time delta in milliseconds.
 */
function updateScore(delta) {
  score += delta * 0.01
  scoreElem.textContent = Math.floor(score)
}

/**
 * Handles the start of the game by resetting the state and starting the game loop.
 */
function handleStart() {
  lastTime = null
  speedScale = 1
  score = 0
  setupGround()
  setupDino()
  setupCactus()
  startScreenElem.classList.add("hide")
  window.requestAnimationFrame(update)
}

/**
 * Handles the end of the game by showing the start screen and resetting the state.
 */
function handleLose() {
  setDinoLose()
  setTimeout(() => {
    document.addEventListener("keydown", handleStart, { once: true })
    startScreenElem.classList.remove("hide")
  }, 100)
}

/**
 * Sets the pixel to world scale based on the window size.
 */
function setPixelToWorldScale() {
  let worldToPixelScale
  if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
    worldToPixelScale = window.innerWidth / WORLD_WIDTH
  } else {
    worldToPixelScale = window.innerHeight / WORLD_HEIGHT
  }

  worldElem.style.width = `${WORLD_WIDTH * worldToPixelScale}px`
  worldElem.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`
}

