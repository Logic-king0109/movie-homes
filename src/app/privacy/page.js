export const metadata = {
  title: 'Privacy Policy – MOVIE HOMES',
  description: 'Privacy Policy for MOVIE HOMES',
}

export default function PrivacyPage() {
  return (
    <div className="container-custom py-12 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-6">Privacy Policy</h1>
      <p className="text-gray-400 mb-4">Last updated: July 2026</p>
      
      <div className="space-y-6 text-gray-300 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-white mb-2">1. Information We Collect</h2>
          <p>MOVIE HOMES does not collect personal information directly. We use third-party services that may collect data as described in their privacy policies. We do not store, record, or upload any video content on our servers.</p>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold text-white mb-2">2. Cookies</h2>
          <p>We use cookies to improve your browsing experience. You can disable cookies in your browser settings. Third-party services integrated into our site may also use cookies.</p>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold text-white mb-2">3. Third-Party Services</h2>
          <p>Our site links to external APIs and services for content delivery. We are not responsible for the privacy practices of these third-party services.</p>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold text-white mb-2">4. Contact</h2>
          <p>For privacy concerns, contact us at moviehomes.info@gmail.com</p>
        </section>
      </div>
    </div>
  )
}