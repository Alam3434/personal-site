import React from "react";
import Image from "next/image";
import fs from "fs";
import path from "path";
import StarBackground from "@/components/StarBackground";

// Function to get all image files from the Clothing directory
function getClothingImages() {
  const directory = path.join(process.cwd(), 'public/assets/Clothing');
  const fileNames = fs.readdirSync(directory);
  return fileNames.filter(file => {
    const extension = path.extname(file).toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(extension);
  });
}

export default function CreativePage() {
  const images = getClothingImages();

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="fixed inset-0 z-0">
        <StarBackground creativeMode={true} />
      </div>
      <div className="z-10 max-w-7xl w-full">
        <h1 className="text-4xl font-bold mb-8">Creative Projects</h1>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Clothing Designs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image, index) => (
              <div 
                key={index} 
                className="relative group overflow-hidden rounded-lg"
              >
                <Image
                  src={`/assets/Clothing/${image}`}
                  alt={`Clothing design ${index + 1}`}
                  width={400}
                  height={400}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                />
                {/* <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-sm">{image.replace(/\.[^/.]+$/, '')}</p>
                </div> */}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}