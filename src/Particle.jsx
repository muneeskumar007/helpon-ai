



import React, { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function StarryFireflyBackground() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  if (!init) return null;

  return (
    <Particles
      id="starry-fireflies"
      options={{
        background: { color: { value: "#0a0f2c" } }, // navy blue
        fullScreen: { enable: true, zIndex: 1},
        particles: {
          number: { value: 250, density: { enable: true, area: 800 } },
          shape: { type: "circle" },
          opacity: {
            value: 0.8,
            animation: { enable: true},
          },
          size: {
            value: { min: 1, max: 3 },
          },
          move: {
            enable: true,
            speed: 3,
            random: true,
            direction: "none",
            outModes: "out",
          },
          color: {
            value: ["#ffffff", "#ffff66"], // stars = white, fireflies = yellow
          },
          glow: {
            enable: true,
            color: "#ffff66",
            blur: 5,
            opacity: 0.5,
          },
        },
        detectRetina: true,
      }}
    />
  );
}
