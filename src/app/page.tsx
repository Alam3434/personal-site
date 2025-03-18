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

interface BrainModelProps {
  onPointerOver: (event: any) => void;
  onPointerOut: () => void;
}

function BrainModel({ onPointerOver, onPointerOut }: BrainModelProps) {
  // Load GLB model
  const gltf = useLoader(GLTFLoader, "/assets/brain_crush_brain_v2.glb");

  return <primitive object={gltf.scene} scale={0.5} position={[0, 0, 0]} onPointerOver={onPointerOver} onPointerOut={onPointerOut}/>;
}

export default function Home() {
  const [isMatrixHovering, setIsMatrixHovering] = useState(false);
  const [isCreativeHovering, setIsCreativeHovering] = useState(false);
  const [isMatrixClicked, setIsMatrixClicked] = useState(false);
  const [isCreativeClicked, setIsCreativeClicked] = useState(false);
  const [lightColor, setLightColor] = useState("white");
  const [leftLightIntensity, setLeftLightIntensity] = useState(0);
  const [rightLightIntensity, setRightLightIntensity] = useState(0);
  const [directionalLight, setdirectionalLight] = useState(1);

  const modelRef = useRef<THREE.Object3D>(null);

  return (
    <>
      <div className="fixed inset-0">
        <StarBackground matrixMode={isMatrixHovering || isMatrixClicked} creativeMode={isCreativeHovering} />
      </div>
      <main className="relative z-10 min-h-screen">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center px-2">
          <div className="container mx-auto max-w-4xl">
            <h1 className="text-4xl sm:text-6xl font-bold mb-6">
              Hi, I'm Mohammad Alam 👋
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl">
              A software engineer passionate about building scalable and efficient web applications.
            </p>
            <div className="flex gap-4 flex-wrap">
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
            </div>
          </div>
        </section>

        {/* 3D Brain Model Section */}
        <section className="min-h-screen flex justify-center items-center">
        <Canvas
            camera={{ position: [0, 3, 7], fov: 50 }}
            style={{ width: "70vw", height: "70vh" }}
          >
            <ambientLight intensity={0.5} />
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
              color={"blue"} 
            />

            <BrainModel 
              onPointerOver={(e) => {
                // Check mouse position relative to the model's position
                const x = e.point.x;
                if (x > 0) {
                  // Right side of the model
                  setdirectionalLight(0)
                  setRightLightIntensity(2); // Turn off the right light
                  setLeftLightIntensity(0); // Keep the left light on
                } else {
                  // Left side of the model
                  setdirectionalLight(0)
                  setLeftLightIntensity(2); // Turn off the left light
                  setRightLightIntensity(0); // Keep the right light on
                }
              }}
              onPointerOut={() => {
                // Reset lights when pointer leaves
                setLeftLightIntensity(0);
                setRightLightIntensity(0);
                setdirectionalLight(1)
              }}
            />

            <OrbitControls
              target={[0, 0, 0]} // Ensure target is at model's center
              minDistance={2} // Set minimum zoom distance
              maxDistance={10} // Set maximum zoom distance
              enableZoom={true}
            />
          </Canvas>
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
