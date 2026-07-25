export const metadata = {
  title: 'About Us – MOVIE HOMES',
  description: 'About MOVIE HOMES - Stream & Download Movies, TV Shows, Anime',
}

export default function AboutPage() {
  return (
    <div className="container-custom py-12 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-6">About MOVIE HOMES</h1>
      
      <div className="space-y-6 text-gray-300 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-white mb-2">Our Mission</h2>
          <p>MOVIE HOMES is a free streaming and download platform for movies, TV shows, and anime. We help users discover and access video content in HD quality with subtitle options.</p>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold text-white mb-2">How It Works</h2>
          <p>Search for any movie or TV show title. Browse through our extensive collection powered by multiple content sources. Choose your preferred quality and download for offline viewing.</p>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold text-white mb-2">Disclaimer</h2>
          <p>This site does not store any files on its server. All contents are provided by non-affiliated third parties. For learning and exchange only. Please support official releases.</p>
        </section>
      </div>
    </div>
  )
}