"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import StarBackground from "@/components/StarBackground";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three-stdlib";
import { useLoader } from "@react-three/fiber";
import * as THREE from 'three';
import { useRouter } from 'next/navigation';

interface BrainModelProps {
  onPointerMove: (event: any) => void;
  onPointerOut: () => void;
  onDoubleClick: (event: any) => void;
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
  const [isMatrixClicked, setIsMatrixClicked] = useState(false);
  const [isCreativeClicked, setIsCreativeClicked] = useState(false);
  const [lightColor, setLightColor] = useState("white");
  const [leftLightIntensity, setLeftLightIntensity] = useState(3);
  const [rightLightIntensity, setRightLightIntensity] = useState(3);
  const [directionalLight, setdirectionalLight] = useState(0);

  const [cursor, setCursor] = useState<string>("auto");

  const router = useRouter(); // Hook to handle routing

  const handleClick = (e: any) => {
    const clickedPosition = e.point.x;
    if (clickedPosition > 0) {
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
        <StarBackground matrixMode={isMatrixHovering || isMatrixClicked} creativeMode={isCreativeHovering} />
      </div>
      <main className="relative z-10">
  {/* Hero Section */}
        <section className="h-screen flex items-center px-2 mb-0"> {/* Adjust margin-bottom */}
          <div className="container mx-auto max-w-4xl">
            <h1 className="text-4xl sm:text-6xl font-bold mb-0">
              Hi, I'm Mohammad Alam 👋
            </h1>
            <p className="text-xl text-gray-300 mb-0 max-w-2xl">
              A software engineer passionate about building scalable and efficient web applications.
            </p>
            {/* <div className="flex gap-4 flex-wrap">
              <Link
                href="/projects"
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
              >
                View My Work
              </Link>
              <div className="flex gap-4 items-center">
                <div
                  className="relative w-12 h-12 cursor-pointer transition-transform duration-300 hover:scale-110"
                  onMouseEnter={() => setIsMatrixHovering(true)}
                  onMouseLeave={() => setIsMatrixHovering(false)}
                  onClick={() => setIsMatrixClicked(prev => !prev)}
                >
                  <Image
                    src="/circle.svg"
                    alt="Matrix mode"
                    fill
                    className={`transition-all duration-300 ${isMatrixHovering ? 'opacity-100 rotate-180' : 'opacity-70'}`}
                  />
                </div>
                <div
                  className="relative w-12 h-12 cursor-pointer transition-transform duration-300 hover:scale-110"
                  onMouseEnter={() => setIsCreativeHovering(true)}
                  onMouseLeave={() => setIsCreativeHovering(false)}
                  onClick={() => setIsCreativeClicked(prev => !prev)}
                >
                  <Image
                    src="/creative-circle.svg"
                    alt="Creative mode"
                    fill
                    className={`transition-all duration-300 ${isCreativeHovering ? 'opacity-100 rotate-180' : 'opacity-70'}`}
                  />
                </div>
              </div>
              <Link
                href="/contact"
                className="border border-white/10 text-white px-6 py-3 rounded-lg hover:bg-white/5 transition-colors"
              >
                Contact Me
              </Link>
            </div> */}
          </div>
        </section>

        {/* 3D Brain Model Section */}
        <section className="h-screen flex justify-center items-center m-0 p-0"> {/* Removed margin and padding */}
          <Canvas
            camera={{ position: [0, 3, 10], fov: 50 }}
            style={{ width: "70vw", height: "120vh", cursor: cursor }}
          >
            <ambientLight intensity={1} />
            {/* Directional light */}
            <directionalLight position={[0, 0, 5]} intensity={directionalLight} color={lightColor} />

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
                const x = e.point.x;
                setCursor("pointer"); // Change cursor to pointer on hover
                setdirectionalLight(0.5);
                if (x > 0) {
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
                setdirectionalLight(1);
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
              <p className="bg-black/60 p-4 rounded-lg shadow-xl max-w-xs whitespace-normal text-center font-bold">
                Double Click to view Creative Experiences
              </p>
            ) : null}
          </div>
          <div
            className="absolute right-1/9 top-1/2 transform -translate-y-1/2 text-white text-xl font-medium tracking-wide"
            style={{ pointerEvents: "none", marginRight: "5px" }}
          >
            {isMatrixHovering ? (
              <p className="bg-black/60 p-4 rounded-lg shadow-xl max-w-xs whitespace-normal text-center font-bold">
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
