import React from "react";
import Particle from "../../Particle";
import StarryBackground from "../../Stars"; // stars\
import { useNavigate } from "react-router-dom";
import '../../App.css'

// animations
import  SplitText from "../../TextAnimations/SplitText/SplitText";




export default function Home() {

  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen flex items-center justify-center text-white overflow-hidden">
      {/* Firefly Particles */}
      <StarryBackground />

      <Particle />

      {/* Content */}
      
      <div className="relative z-10 text-center">
         <SplitText className="text-5xl font-bold drop-shadow-lg" tag="h1" text="Welcome to HelpOn !" />
        
       
       
        <p className="mt-4 text-lg opacity-90">Glowing Firefly UI ✨</p>

        <div className="mt-6 flex justify-center gap-4">
          <button onClick={() => navigate("/login")} className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-2xl shadow-lg hover:bg-yellow-300 transition">
            Get Started
          </button>
          <button className="px-6 py-3 bg-transparent border border-yellow-300 text-yellow-300 rounded-2xl shadow-lg hover:bg-yellow-200 hover:text-black transition">
            Learn More
          </button>
          
        </div>
         
      </div>
    </div>
  );
}
