export const metadata = {
  title: 'Terms of Service – MOVIE HOMES',
  description: 'Terms of Service for MOVIE HOMES',
}

export default function TermsPage() {
  return (
    <div className="container-custom py-12 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-6">Terms of Service</h1>
      <p className="text-gray-400 mb-4">Last updated: July 2026</p>
      
      <div className="space-y-6 text-gray-300 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-white mb-2">1. Acceptance of Terms</h2>
          <p>By accessing MOVIE HOMES, you agree to these terms. If you do not agree, please do not use our service.</p>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold text-white mb-2">2. Service Description</h2>
          <p>MOVIE HOMES is a search engine for publicly available video content. We do not host, store, or upload any video files on our servers. All content is provided by third-party services.</p>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold text-white mb-2">3. User Conduct</h2>
          <p>Users agree not to misuse the service, violate any laws, or infringe on intellectual property rights. We reserve the right to terminate access for violations.</p>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold text-white mb-2">4. Disclaimer</h2>
          <p>MOVIE HOMES is provided "as is" without warranties. We are not liable for any damages arising from use of the service. Video availability depends on third-party sources.</p>
        </section>
      </div>
    </div>
  )
}