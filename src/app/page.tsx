"use client";

import { useState } from "react";
import StarBackground from "@/components/StarBackground";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three-stdlib";
import { useLoader } from "@react-three/fiber";
import { useRouter } from 'next/navigation';



interface BrainModelProps {
  onPointerMove: (event: PointerEvent) => void;
  onPointerOut: () => void;
  onDoubleClick: (event: MouseEvent) => void;
  cursorStyle?: string;
}


function BrainModel({ onPointerMove, onPointerOut, onDoubleClick, cursorStyle }: BrainModelProps) {
  // Load GLB model
  const gltf = useLoader(GLTFLoader, "/assets/brain_3d.glb");


  return (
    <primitive 
      object={gltf.scene} 
      scale={6} 
      position={[0, 0, 0]} 
      onPointerMove={onPointerMove}
      onPointerOut={onPointerOut} 
      onDoubleClick={onDoubleClick}
      style={{ cursor: cursorStyle }}
    />
  );
}

export default function Home() {
  const [isMatrixHovering, setIsMatrixHovering] = useState(false);
  const [isCreativeHovering, setIsCreativeHovering] = useState(false);
  const [leftLightIntensity, setLeftLightIntensity] = useState(2);
  const [rightLightIntensity, setRightLightIntensity] = useState(2);
  const [directionalLight, setdirectionalLight] = useState(0.5);

  const [cursor, setCursor] = useState<string>("auto");

  const router = useRouter(); // Hook to handle routing

  const handleClick = (e: MouseEvent) => {
    const clickedPosition = e.clientX;
    const screenWidth = window.innerWidth; // Or use a specific container width
    const midPoint = screenWidth / 2;
    if (clickedPosition > midPoint) {
      // Redirect to the Creative page
      router.push("/projects");
    } else {
      // Redirect to the Projects page
      router.push("/creative");
    }
  };

  return (
    <>
      <div className="fixed inset-0">
        <StarBackground matrixMode={isMatrixHovering} creativeMode={isCreativeHovering} />
      </div>
      <main className="relative z-10">
  {/* Hero Section */}
        <section className="h-screen flex items-center px-2 mb-0"> {/* Adjust margin-bottom */}
          <div className="container mx-auto max-w-4xl">
            <h1 className="text-4xl sm:text-6xl font-bold mb-0">
              Hi, I&apos;m Mohammad Alam 👋
            </h1>
            <p className="text-xl text-gray-300 mb-0 max-w-2xl">
              I&apos;m a Senior at UC Berkeley majoring in Computer Science with a passion for Software Engineering. On the side I also love to make clothing designs and Art.
            </p>
            <div className="flex justify-center my-4"> {/* Added parent flex container for centering */}
          <div className="inline-flex flex-col items-center bg-black rounded-lg p-4"> {/* Inner container */}
            <p className="text-xl text-white mb-2">Interact with the brain</p>
            <div className="animate-bounce">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 48" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7 7 7-7" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 30l7 7 7-7" />
              </svg>
            </div>
          </div>
        </div>
          </div>

        </section>

        {/* Interaction Prompt Section */}
       

        {/* 3D Brain Model Section */}
        <section className="h-screen flex justify-center items-center m-0 p-0"> {/* Removed margin and padding */}
          <Canvas
            camera={{ position: [0, 3, 10], fov: 50 }}
            style={{ width: "70vw", height: "120vh", cursor: cursor }}
          >
            <ambientLight intensity={1} />
            {/* Directional light */}
            <directionalLight position={[0, 0, 5]} intensity={directionalLight} color={"white"} />

            {/* Left light */}
            <directionalLight 
              position={[-5, 0, 5]} 
              intensity={leftLightIntensity} 
              color={"red"} 
            />
           
            {/* Right light */}
            <directionalLight 
              position={[5, 0, 5]} 
              intensity={rightLightIntensity} 
              color={"green"} 
            />

            <BrainModel 
              onPointerMove={(e) => {
                const x = e.clientX; // Accessing clientX instead of point.x
                const screenWidth = window.innerWidth; // Or use a specific container width
                const midPoint = screenWidth / 2;
                setCursor("pointer"); // Change cursor to pointer on hover
                setdirectionalLight(0.5);
                if (x > midPoint) {
                  setRightLightIntensity(3); 
                  setIsMatrixHovering(true);
                  setLeftLightIntensity(0); // Reset left light intensity
                  setIsCreativeHovering(false); // Reset creative hover state
                } else {
                  setLeftLightIntensity(3);
                  setIsCreativeHovering(true);
                  setRightLightIntensity(0); // Reset right light intensity
                  setIsMatrixHovering(false); // Reset matrix hover state
                }
              }}
              onPointerOut={() => {
                setCursor("auto"); // Reset cursor to default
                setLeftLightIntensity(3);
                setRightLightIntensity(3);
                setdirectionalLight(0.5);
                setIsCreativeHovering(false);
                setIsMatrixHovering(false);
              }}
              onDoubleClick= {(e) => {handleClick(e)}}
              cursorStyle= "pointer"
            />

            <OrbitControls
              target={[0, 0, 0]}
              minDistance={2}
              maxDistance={10}
              enableZoom={false}
            />
          </Canvas>
          <div
            className="absolute left-1/9 top-1/2 transform -translate-y-1/2 text-white text-xl font-medium tracking-wide"
            style={{ pointerEvents: "none"}}
          >
            {isCreativeHovering ? (
              <p className="relative bg-gradient-to-r from-red-900 to-black text-white p-6 rounded-xl shadow-lg max-w-xs whitespace-normal text-center font-semibold text-xl tracking-wide transform transition-all duration-300 hover:scale-110 hover:shadow-2xl overflow-hidden">
                Double Click to view Creative Experiences
              </p>
            ) : null}
          </div>
          <div
            className="absolute right-1/9 top-1/2 transform -translate-y-1/2 text-white text-xl font-medium tracking-wide"
            style={{ pointerEvents: "none" }}
          >
            {isMatrixHovering ? (
              <p className="relative bg-gradient-to-r from-black to-green-900 text-white p-6 rounded-xl shadow-lg max-w-xs whitespace-normal text-center font-semibold text-xl tracking-wide transform transition-all duration-300 hover:scale-110 hover:shadow-2xl overflow-hidden">
                {/* <span className="absolute inset-0 bg-gradient-to-r from-blue-400 via-teal-500 to-green-500 opacity-30 blur-xl animate-pulse"></span> */}
                Double Click to view Technical Experiences
              </p>
            ) : null}
          </div>
        </section>
      </main>

      <footer className="py-8 px-4 border-t border-white/10 bg-black/60">
        <div className="container mx-auto max-w-4xl text-center text-gray-400">
          © {new Date().getFullYear()} Mohammad Alam. All rights reserved.
        </div>
      </footer>
    </>
  );
}
