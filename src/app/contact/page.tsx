export default function ContactPage() {
  return (
    <main className="min-h-screen pt-20">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Get in Touch</h1>
        <div className="space-y-8">
          <p className="text-lg">
            I'm always open to new opportunities and collaborations.
            Feel free to reach out through any of the following channels!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email Contact */}
            <div className="border border-white/10 rounded-lg p-6 bg-black/20">
              <h2 className="text-xl font-semibold mb-4">Email</h2>
              <a
                href="mailto:your.email@example.com"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                aamiyo2003@gmail.com
              </a>
            </div>

            {/* Social Links */}
            <div className="border border-white/10 rounded-lg p-6 bg-black/20">
              <h2 className="text-xl font-semibold mb-4">Social Media</h2>
              <div className="space-y-3">
                <a
                  href="https://github.com/Alam3434"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-400 hover:text-blue-300 transition-colors"
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/mohammad-alam-a4a787238/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-400 hover:text-blue-300 transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="mt-12 border border-white/10 rounded-lg p-6 bg-black/20">
            <h2 className="text-2xl font-semibold mb-6">Send a Message</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="message" className="block mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 focus:outline-none focus:border-blue-500"
                ></textarea>
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
