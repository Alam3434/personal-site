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
  hue?: number;
  burstRadius?: number;
  burstAngle?: number;
  lastUpdate?: number;
  glowIntensity?:number;
}

interface StarBackgroundProps {
  matrixMode?: boolean;
  creativeMode?: boolean;
}

export default function StarBackground({ matrixMode = false, creativeMode = false }: StarBackgroundProps) {
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

    // Clear any existing content with appropriate background
    ctx.fillStyle = matrixMode ? '#000' : (creativeMode ? '#000' : '#0f0f23');
    ctx.fillRect(0, 0, width, height);

    // Matrix characters
    const matrixChars = '0123456789ABCDEF';
    const getRandomChar = () => matrixChars[Math.floor(Math.random() * matrixChars.length)];
    const getRandomColor = () => {
      if (matrixMode) {
        // const green = 220 + Math.floor(Math.random() * 35);
        // return `rgb(0, ${green}, 0)`;
        return `rgb(0, 255, 0)`;
      } else if (creativeMode) {
        const hue = Math.random() * 360;
        const saturation = 85 + Math.random() * 15; // Higher saturation
        const lightness = 60 + Math.random() * 15; // Brighter colors
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
      } else {
        // Default star mode
        const brightness = 180 + Math.floor(Math.random() * 75);
        return `rgb(${brightness}, ${brightness}, ${brightness})`;
      }
    };

    // const getRandomShape = () => {
    //   const shapes: ('circle' | 'square' | 'triangle' | 'star')[] = ['circle', 'square', 'triangle', 'star'];
    //   return shapes[Math.floor(Math.random() * shapes.length)];
    // };

    const particles = particlesRef.current;

    // Initialize or update particles
    if (particles.length === 0) {
      // First initialization
      const columns = Math.floor(width / 20); // Space characters evenly
      for (let i = 0; i < 400; i++) {
        const columnIndex = i % columns;
        particles.push({
          x: (columnIndex * width) / columns + (Math.random() * 10 - 5),
          y: Math.random() * height,
          size: Math.random() * 3,
          speed: 0.8 + Math.random() * 0.5,
          char: getRandomChar(),
          color: getRandomColor(),
          opacity: Math.random() * 0.5 + 0.5,
          transitionProgress: 0,
          hue: Math.random() * 360,
          burstRadius: 0,
          burstAngle: Math.random() * Math.PI * 2,
          lastUpdate: Date.now()
        });
      }
    }

    // Initialize creative mode properties
    if (creativeMode) {
      for (const particle of particles) {
        if (particle.burstRadius === 0) {
          particle.burstRadius = 0;
          particle.burstAngle = Math.random() * Math.PI * 2;
          particle.lastUpdate = Date.now();
          particle.size = 2 + Math.random() * 2;
          particle.speed = 1.5 + Math.random();
          particle.hue = Math.random() * 360;
        }
      }
    }
    
    // Update transition time
    if (matrixMode || creativeMode) {
      transitionTimeRef.current = Date.now();
    }
    
    // Start transition
    transitionTimeRef.current = Date.now();

    // Animation function
    function animate() {
      if (!isAnimating) return;

      // Calculate transition progress
      const timePassed = Date.now() - transitionTimeRef.current;
      const globalProgress = Math.min(timePassed / TRANSITION_DURATION, 1);
      
      // Clear with appropriate background
      let bgOpacity;
      if (matrixMode) {
        bgOpacity = 0.15 + (0.85 * globalProgress);
      } else if (creativeMode) {
        bgOpacity = 0.1 + (0.05 * Math.sin(Date.now() / 1000)); // Subtle pulsing effect
      } else {
        bgOpacity = 0.3 - (0.15 * globalProgress);
      }
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
        
        // Handle mode transitions
        let targetProgress = 0;
        if (matrixMode || creativeMode) targetProgress = 1;
        
        // Faster transition for creative mode
        const transitionSpeed = creativeMode ? 0.08 : 0.03;
        particle.transitionProgress = particle.transitionProgress || 0;
        particle.transitionProgress += (targetProgress - particle.transitionProgress) * transitionSpeed;

        // Update particle properties based on mode
        if (creativeMode && particle.transitionProgress > 0.1) {
          // Ensure creative mode particles have required properties
          if (particle.hue === undefined) {
            particle.hue = Math.random() * 360;
            particle.size = 2 + Math.random() * 2;
            particle.speed = 1.5 + Math.random();
          }
        }

        if (particle.y > height) {
          if (matrixMode) {
            // Matrix mode reset
            particle.y = 0;
            particle.char = getRandomChar();
            particle.speed = 2 + Math.random();
          } else if (creativeMode) {
            // Creative mode reset with burst effect
            particle.y = -Math.random() * height * 0.3;
            particle.x = Math.random() * width;
            particle.speed = 1.5 + Math.random();
            particle.size = 2 + Math.random() * 2;
            particle.hue = Math.random() * 360;
          } else {
            // Default star mode reset
            particle.y = 0;
            particle.x = Math.random() * width;
            particle.speed = 0.8 + Math.random() * 0.5;
          }
        }

        // Interpolate particle properties based on mode
        const minSize = 0.5; // Minimum size to prevent gradient errors
        let currentSize, currentSpeed;
        
        if (creativeMode) {
          currentSize = Math.max(minSize, particle.size || 2);
          currentSpeed = particle.speed || 1.5;
        } else {
          currentSize = Math.max(
            minSize,
            particle.transitionProgress * 14 + (1 - particle.transitionProgress) * particle.size
          );
          currentSpeed = particle.transitionProgress * (2 + Math.random() * 1.5) + 
                       (1 - particle.transitionProgress) * (0.8 + Math.random() * 0.5);
        }
        particle.speed = currentSpeed;

        if (particle.transitionProgress > 0.1) {
          if (creativeMode && particle.transitionProgress > 0.1) {
            const now = Date.now();
            const opacity = Math.min(particle.transitionProgress * 2, 1);
            
            // Update particle animation with smooth transitions
            if (particle.lastUpdate) {
              const delta = (now - particle.lastUpdate) / 1000; // Convert to seconds
              const burstRadius = particle.burstRadius || 0;
              const burstAngle = particle.burstAngle || 0;
              const hue = particle.hue || 0;
              
              // Smooth color transitions
              particle.hue = (hue + delta * 45) % 360; // Even slower hue rotation
              
              // Dynamic burst effect
              const maxBurst = 20 + Math.sin(now / 800) * 8; // Larger, slower breathing
              particle.burstRadius = Math.min(maxBurst, burstRadius + delta * 25);
              particle.burstAngle = (burstAngle + delta * Math.PI * 0.8) % (Math.PI * 2);
            }
            particle.lastUpdate = now;
            
            const x = Math.floor(particle.x);
            const y = Math.floor(particle.y);
            
            // Draw expanding burst with trails
            const numPoints = 8; // More points for smoother effect
            for (let i = 0; i < numPoints; i++) {
              const angle = (particle.burstAngle || 0) + (i * 2 * Math.PI / numPoints);
              const distance = (particle.burstRadius || 0) * (0.8 + Math.sin(now / 400 + i) * 0.4);
              const x1 = x + Math.cos(angle) * distance;
              const y1 = y + Math.sin(angle) * distance;
              
              // Create shimmering gradient trail
              const gradient = ctx.createRadialGradient(x1, y1, 0, x1, y1, particle.size * 4);
              // const trailOpacity = opacity * (0.8 + Math.sin(now / 250 + i) * 0.2);
              // const hueOffset = Math.sin(now / 1000 + i) * 15; // Subtle hue variation
              
              // const trailHue = (particle.hue || 0) + hueOffset;
              // gradient.addColorStop(0, `hsla(${trailHue}, 90%, 65%, ${trailOpacity})`); 
              // gradient.addColorStop(0.4, `hsla(${trailHue}, 80%, 55%, ${trailOpacity * 0.5})`);
              // gradient.addColorStop(1, `hsla(${trailHue}, 70%, 45%, 0)`);
              
              ctx.fillStyle = gradient;
              ctx.beginPath();
              ctx.arc(x1, y1, particle.size * 3, 0, Math.PI * 2);
              ctx.fill();
            }
            
            // Draw pulsing center glow with enhanced colors
            const pulseSize = particle.size * (2 + Math.sin(now / 300) );
            const centerGradient = ctx.createRadialGradient(x, y, 0, x, y, pulseSize);
            const centerOpacity = opacity * (0.95 + Math.sin(now / 200) * 0.05);
            const glowHue = (particle.hue || 0) + Math.sin(now / 500) * 10; // Subtle hue shift
            
            // Create vibrant center with smooth color transitions
            centerGradient.addColorStop(0, `hsla(${glowHue}, 95%, 70%, ${centerOpacity})`); 
            centerGradient.addColorStop(0.2, `hsla(${glowHue}, 90%, 65%, ${centerOpacity * 0.8})`);
            centerGradient.addColorStop(0.5, `hsla(${glowHue}, 85%, 60%, ${centerOpacity * 0.5})`);
            centerGradient.addColorStop(0.8, `hsla(${glowHue}, 80%, 55%, ${centerOpacity * 0.2})`);
            centerGradient.addColorStop(1, `hsla(${glowHue}, 75%, 50%, 0)`);
            
            ctx.fillStyle = centerGradient;
            ctx.beginPath();
            ctx.arc(x, y, pulseSize, 0, Math.PI * 2);
            ctx.fill();
            
            // Reset burst with smooth transition
            if ((particle.burstRadius || 0) >= 20) {
              particle.burstRadius = 0;
              particle.hue = (particle.hue || 0) + 45; // Larger hue shift on reset
            }
          } else if (matrixMode) {
            // Draw matrix character
            
            const opacity = Math.min(particle.transitionProgress * 1.5, 1);
            
            if (!particle.char) particle.char = getRandomChar();
            if (particle.glowIntensity === undefined) particle.glowIntensity = 0;
            
            // Brighter base color using RGB values above 255
            particle.color = 'rgb(140, 255, 140)'; // Brighter green with some white mixed in
            
            const x = Math.floor(particle.x);
            const y = Math.floor(particle.y);
            
            // Randomly start glowing
            if (Math.random() < 0.02) {
                particle.glowIntensity = 25;
            }
            
            if (particle.glowIntensity > 0) {
                particle.glowIntensity -= 0.5;
            }
            
            ctx.font = '20px "Courier New", monospace';
            
            // Draw multiple layers for brighter effect
            // Base glow layer
            ctx.shadowBlur = particle.glowIntensity;
            ctx.shadowColor = 'rgb(0, 255, 0)';
            ctx.fillStyle = 'rgba(0, 255, 0, ' + opacity * 0.5 + ')';
            ctx.fillText(particle.char, x, y);
            
            // Bright center layer
            ctx.shadowBlur = particle.glowIntensity * 0.5;
            ctx.fillStyle = 'rgba(140, 255, 140, ' + opacity + ')';
            ctx.fillText(particle.char, x, y);
            
            // Super bright core for glowing characters
            if (particle.glowIntensity > 0) {
                ctx.shadowBlur = 0;
                ctx.fillStyle = 'rgba(220, 255, 220, ' + opacity + ')';
                ctx.fillText(particle.char, x, y);
            }
            
            // Reset shadow
            ctx.shadowBlur = 0;
            
            // Randomly change characters
            if (Math.random() < 0.05) {
              particle.char = getRandomChar();
            }
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
  }, [matrixMode, creativeMode]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full pointer-events-none"
      style={{ background: matrixMode ? '#000' : 'linear-gradient(to bottom, #0f0f23, #1a1b4b)' }}
    />
  );
}
