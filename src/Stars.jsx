
// import React from "react";
// import Particles from "@tsparticles/react";
// import { loadSlim } from "@tsparticles/slim";

// export default function StarryBackground() {
//   const particlesInit = async (engine) => {
//     await loadSlim(engine);
//   };

//   return (
//     <Particles
//   id="stars"
//   init={particlesInit}
//   options={{
//     background: { color: { value: "#0a0f2c" } }, // navy blue
//     fullScreen: { enable: true, zIndex: 1 }, // behind fireflies
//     particles: {
//       number: { value: 100 },
//       size: { value: { min: 1, max: 2 } },
//       move: { enable: false }, // static stars
//       opacity: { value: 0.8 },
//       color: { value: "#ffffff" }, // white stars
//     },
//     detectRetina: true,
//   }}
// />

//   );
// }


import React, { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function StarryBackground() {
  const [init, setInit] = useState(true);

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
      id="stars"
      options={{
        background: { color: { value: "#0a0f2c" } }, // navy blue
        fullScreen: { enable: true, zIndex: 1}, // behind other layers
        particles: {
          number: { value: 100 },
          size: { value: { min: 1, max: 2 } },
          move: { enable: true }, // static stars
          opacity: { value: 0.8 },
          color: { value: "#ffffff" }, // white stars
        },
        detectRetina: true,
      }}
    />
  );
}
