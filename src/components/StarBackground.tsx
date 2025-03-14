'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speed: number;
  char?: string;
  color?: string;
  opacity: number;
  transitionProgress: number;
}

interface StarBackgroundProps {
  matrixMode?: boolean;
}

export default function StarBackground({ matrixMode = false }: StarBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const transitionTimeRef = useRef<number>(Date.now());
  const TRANSITION_DURATION = 2000; // 2 seconds transition

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    let animationFrameId: number;
    let isAnimating = true;

    // Set canvas size to window size
    const setCanvasSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      return { width, height };
    };

    const { width, height } = setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Create a draw context that we know is not null
    const ctx = context!;

    // Clear any existing content with solid black
    ctx.fillStyle = matrixMode ? '#000' : '#0f0f23';
    ctx.fillRect(0, 0, width, height);

    // Matrix characters
    const matrixChars = '0123456789ABCDEF';
    const getRandomChar = () => matrixChars[Math.floor(Math.random() * matrixChars.length)];
    const getRandomColor = () => {
      const green = 200 + Math.floor(Math.random() * 56);
      return `rgb(0, ${green}, 0)`;
    };

    // Initialize or update particles
    if (particlesRef.current.length === 0) {
      // First initialization
      const columns = Math.floor(width / 20); // Space characters evenly
      particlesRef.current = Array.from({ length: 400 }, (_, i) => {
        const columnIndex = i % columns;
        return {
          x: (columnIndex * width) / columns + (Math.random() * 10 - 5), // Add slight x variation
          y: Math.random() * height,
          size: Math.random() * 3,
          speed: 0.8 + Math.random() * 0.5,
          char: getRandomChar(),
          color: getRandomColor(),
          opacity: Math.random() * 0.5 + 0.5,
          transitionProgress: matrixMode ? 1 : 0
        };
      });
    }
    
    // Start transition
    transitionTimeRef.current = Date.now();
    const particles = particlesRef.current;

    // Animation function
    function animate() {
      if (!isAnimating) return;

      // Calculate transition progress
      const timePassed = Date.now() - transitionTimeRef.current;
      const globalProgress = Math.min(timePassed / TRANSITION_DURATION, 1);
      
      // Clear with appropriate background
      const bgOpacity = matrixMode ? 
        0.15 + (0.85 * globalProgress) : 
        0.3 - (0.15 * globalProgress);
      ctx.fillStyle = `rgba(0, 0, 0, ${bgOpacity})`;
      ctx.fillRect(0, 0, width, height);
      
      // Set text rendering for matrix mode
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.imageSmoothingEnabled = false;
      ctx.font = `14px 'Courier New', monospace`;
      
      // Update and draw particles
      particles.forEach((particle: Particle) => {
        particle.y += particle.speed;
        
        // Simple linear transition
        const targetProgress = matrixMode ? 1 : 0;
        particle.transitionProgress = particle.transitionProgress || 0;
        particle.transitionProgress += (targetProgress - particle.transitionProgress) * 0.03;

        if (particle.y > height) {
          particle.y = 0;
          particle.char = getRandomChar();
          
          // Keep x position in columns during matrix mode
          if (matrixMode) {
            particle.speed = 2 + Math.random();
          } else {
            particle.x = Math.random() * width;
            particle.speed = 0.8 + Math.random() * 0.5;
          }
        }

        // Interpolate between star and matrix properties
        const minSize = 0.5; // Minimum size to prevent gradient errors
        const currentSize = Math.max(
          minSize,
          particle.transitionProgress * 14 + (1 - particle.transitionProgress) * particle.size
        );
        const currentSpeed = particle.transitionProgress * (2 + Math.random() * 1.5) + 
                           (1 - particle.transitionProgress) * (0.8 + Math.random() * 0.5);
        particle.speed = currentSpeed;

        if (particle.transitionProgress > 0.1) {
          // Draw matrix character
          const opacity = Math.min(particle.transitionProgress * 1.5, 1);
          
          if (!particle.char) particle.char = getRandomChar();
          if (!particle.color) particle.color = getRandomColor();
          
          ctx.fillStyle = particle.color.replace('rgb', 'rgba').replace(')', `, ${opacity})`);
          const x = Math.floor(particle.x);
          const y = Math.floor(particle.y);
          
          // Draw character
          ctx.fillText(particle.char, x, y);
          
          // Randomly change characters
          if (Math.random() < 0.05) {
            particle.char = getRandomChar();
          }
        }
        
        if (particle.transitionProgress < 0.9) {
          // Draw star with opacity based on inverse transition
          const starOpacity = particle.opacity * (1 - particle.transitionProgress);
          
          // Only draw star if it has some opacity and size
          if (starOpacity > 0.01 && currentSize > 0) {
            const gradient = ctx.createRadialGradient(
              particle.x, particle.y, 0,
              particle.x, particle.y, currentSize
            );
            gradient.addColorStop(0, `rgba(255, 255, 255, ${starOpacity})`);
            gradient.addColorStop(0.6, `rgba(255, 255, 255, ${starOpacity * 0.4})`);
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

            ctx.beginPath();
            ctx.fillStyle = gradient;
            ctx.arc(particle.x, particle.y, currentSize, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    // Cleanup function
    return () => {
      isAnimating = false;
      window.removeEventListener('resize', setCanvasSize);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      // Clear canvas with solid color
      ctx.fillStyle = matrixMode ? '#000' : '#0f0f23';
      ctx.fillRect(0, 0, width, height);
    };
  }, [matrixMode]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full pointer-events-none"
      style={{ background: matrixMode ? '#000' : 'linear-gradient(to bottom, #0f0f23, #1a1b4b)' }}
    />
  );
}
