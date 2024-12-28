"use client";

import { tsParticles } from "@tsparticles/engine";
import { loadFireflyPreset } from "@tsparticles/preset-firefly";

const fireflyParticles = () => {
  (async () => {
    await loadFireflyPreset(tsParticles);

    await tsParticles.load({
      id: "tsparticles",
      options: {
        preset: "firefly",
      },
    });
  })();
};

export default fireflyParticles;
