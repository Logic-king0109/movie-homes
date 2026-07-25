export const metadata = {
  title: 'Contact Us – MOVIE HOMES',
  description: 'Contact MOVIE HOMES',
}

export default function ContactPage() {
  return (
    <div className="container-custom py-12 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-6">Contact Us</h1>
      
      <div className="space-y-6 text-gray-300 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-white mb-2">Get in Touch</h2>
          <p>For inquiries, support, or feedback, reach us at:</p>
          <p className="mt-2 text-purple-400 font-medium">moviehomes.info@gmail.com</p>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold text-white mb-2">Response Time</h2>
          <p>We typically respond within 24-48 hours during business days.</p>
        </section>
      </div>
    </div>
  )
}