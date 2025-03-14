export default function AboutPage() {
  return (
    <main className="min-h-screen pt-20">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">About Me</h1>
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg mb-4">
            I'm a software developer passionate about creating elegant solutions to complex problems.
            With expertise in web development, I focus on building fast, responsive, and user-friendly applications.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Technical Skills</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-8">
            {[
              "JavaScript/TypeScript",
              "React",
              "Next.js",
              "Node.js",
              "Python",
              "SQL",
            ].map((skill) => (
              <div
                key={skill}
                className="bg-black/20 px-4 py-2 rounded-lg text-center"
              >
                {skill}
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Experience</h2>
          <div className="space-y-6">
            <div className="border border-white/10 rounded-lg p-6 bg-black/20">
              <h3 className="text-xl font-semibold">Software Engineer</h3>
              <p className="text-gray-400">Company Name • 2023 - Present</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Key achievement or responsibility</li>
                <li>Another significant contribution</li>
              </ul>
            </div>
            {/* Add more experience items here */}
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Education</h2>
          <div className="border border-white/10 rounded-lg p-6 bg-black/20">
            <h3 className="text-xl font-semibold">Bachelor's in Computer Science</h3>
            <p className="text-gray-400">University Name • Graduation Year</p>
            <p className="mt-2">Relevant coursework or achievements</p>
          </div>
        </div>
      </div>
    </main>
  );
}
