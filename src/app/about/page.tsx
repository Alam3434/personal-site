export default function AboutPage() {
  return (
    <main className="min-h-screen pt-20">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">About Me</h1>
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg mb-4 bg-black text-white rounded-lg p-4">
          Hi, I&apos;m Mohammad Alam, a Senior at UC Berkeley majoring in Computer Science with a passion for Software Engineering. 
          I specialize in building scalable, efficient systems and love solving complex problems through code. 
          When I&apos;m not immersed in software development, I love to channel my creativity into designing clothes and art. I believe that the intersection of technology and creativity is where innovation thrives, and I strive to blend both in every project I take on.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Technical Skills</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8">
            {[
                "Python",
                "SwiftUI",
                "Java",
                "Go",
                "React",
                "JavaScript",
                "Node.js",
                "Docker",
                "Git",
                "Express",
                "Firebase",
                "MongoDB",
                "Three.js",
                "Numpy",
                "Material-UI"
            ].map((skill) => (
              <div
                key={skill}
                className="bg-green-800 px-4 py-2 rounded-lg text-center hover:bg-green-600"
              >
                {skill}
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Education</h2>
          <div className="flex items-start border border-white/10 rounded-lg p-6 bg-black/20">
            <img 
              src="/assets/Projects/Seal_of_University_of_California,_Berkeley.svg" // Replace with the actual image path
              alt="University of California, Berkeley"
              className="w-24 h-24 rounded-lg mr-4" // Adjust size and margin as needed
            />
            <div>
              <h3 className="text-xl font-semibold">Bachelor&apos;s in Computer Science</h3>
              <p className="text-gray-400">University of California- Berkeley • 2025</p>
              <h4 className="text-lg font-semibold mt-2">Relevant Coursework</h4>
              <ul className="list-disc list-inside">
                <li>Data Structures</li>
                <li>Algorithms</li>
                <li>Web Development</li>
                <li>Linear Algebra</li>
                <li>Discrete Math</li>
                <li>Discrete Probability</li>
                <li>Computer Architecture</li>
                <li>Networking</li>
                <li>Operating Systems</li>
                <li>Computer Security</li>
                <li>Multivariable Calculus</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
