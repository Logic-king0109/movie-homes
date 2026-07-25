export const metadata = {
  title: 'DMCA Copyright – MOVIE HOMES',
  description: 'DMCA Copyright Notice for MOVIE HOMES',
}

export default function DMCAPage() {
  return (
    <div className="container-custom py-12 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-6">DMCA Copyright Notice</h1>
      
      <div className="space-y-6 text-gray-300 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-white mb-2">Copyright Infringement</h2>
          <p>MOVIE HOMES respects intellectual property rights. We do not host any video content on our servers. All videos are provided by third-party services and their copyrights belong to the original creators.</p>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold text-white mb-2">Filing a DMCA Notice</h2>
          <p>If you believe your copyrighted work has been infringed, send a written notification to:</p>
          <p className="mt-2 text-purple-400 font-medium">moviehomes.info@gmail.com</p>
          <p className="mt-2">Include: (1) Description of the copyrighted work, (2) URL of infringing material, (3) Your contact information, (4) A statement of good faith belief, (5) A statement under penalty of perjury.</p>
        </section>
      </div>
    </div>
  )
}