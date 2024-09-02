import {
  getCustomProperty,
  incrementCustomProperty,
  setCustomProperty,
} from "./updateCustomProperty.js";

const GROUND_SPEED = 0.05;
const GROUND_WIDTH = 300;
const groundElems = document.querySelectorAll("[data-ground]");

export function setupGround() {
  setCustomProperty(groundElems[0], "--left", 0);
  setCustomProperty(groundElems[1], "--left", GROUND_WIDTH);
}

export function updateGround(delta, speedScale) {
  groundElems.forEach(ground => {
    incrementCustomProperty(
      ground,
      "--left",
      -(delta * speedScale * GROUND_SPEED)
    );

    if (getCustomProperty(ground, "--left") <= -GROUND_WIDTH) {
      incrementCustomProperty(
        ground,
        "--left",
        GROUND_WIDTH * 2
      );
    }
  });
}

