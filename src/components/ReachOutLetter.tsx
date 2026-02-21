import type { Listing } from '../api/listings'

type ReachOutLetterProps = {
  listing: Listing
  onBack: () => void
}

const generateSuggestions = (listing: Listing): string[] => {
  const suggestions: string[] = []

  if (listing.daysOnMarket > 60) {
    suggestions.push('Extended time on market - we recommend a pricing adjustment and updated marketing strategy')
  }
  if (listing.daysOnMarket > 90) {
    suggestions.push('Market fatigue has set in - fresh photography and professional staging will help attract new buyers')
  }

  // Check if property is expired or expiring soon
  const now = new Date()
  const expireDate = new Date(listing.expiresOn)
  const daysUntilExpire = Math.ceil((expireDate.getTime() - now.getTime()) / (24 * 60 * 60 * 1000))

  if (daysUntilExpire < 0) {
    suggestions.push('Listing has expired - this is a missed opportunity to stay on market and attract active buyers')
  } else if (daysUntilExpire < 30) {
    suggestions.push('Listing expiring soon - we can renew and enhance your listing with better visibility')
  }

  if (listing.price > 500000) {
    suggestions.push('High-value property requires premium marketing and targeted outreach to qualified buyers')
  }

  if (listing.beds >= 4) {
    suggestions.push('Family home - we specialize in marketing to growing families with proven results')
  }

  suggestions.push('Professional listing optimization with enhanced description and virtual tours')
  suggestions.push('Active buyer outreach campaign to reach pre-qualified purchasers')

  return suggestions.slice(0, 5) // Show top 5 suggestions
}

const ReachOutLetter = ({ listing, onBack }: ReachOutLetterProps) => {
  const suggestions = generateSuggestions(listing)
  const expiryDate = new Date(listing.expiresOn).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5', padding: '20px' }}>
      <button
        onClick={onBack}
        style={{
          marginBottom: '20px',
          padding: '10px 20px',
          backgroundColor: '#333',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '500'
        }}
      >
        ← Back to Listings
      </button>

      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: 'white',
        padding: '60px 40px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        fontFamily: 'Georgia, serif',
        lineHeight: '1.8',
        color: '#333'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px', borderBottom: '3px solid #4CAF50', paddingBottom: '20px' }}>
          <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#4CAF50', marginBottom: '5px' }}>
            SERHANT
          </div>
          <div style={{ fontSize: '12px', color: '#666', letterSpacing: '1px' }}>
            Real Estate Solutions for Modern Sellers
          </div>
        </div>

        {/* Date */}
        <div style={{ marginBottom: '30px', textAlign: 'right', color: '#666', fontSize: '12px' }}>
          {new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>

        {/* Recipient */}
        <div style={{ marginBottom: '30px' }}>
          <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Dear Homeowner,</div>
        </div>

        {/* Body */}
        <div style={{ marginBottom: '25px', textAlign: 'justify' }}>
          <p>
            I am reaching out to you regarding your property located at <strong>{listing.address}, {listing.city}, {listing.state} {listing.zip}</strong>.
          </p>

          <p>
            I have noticed that your listing expired on <strong>{expiryDate}</strong>. This represents a significant opportunity that we would like to help you capture. Our team at SERHANT has spent the last 10 years helping homeowners like you navigate the real estate market with proven strategies and results.
          </p>

          <p>
            After reviewing your property, I have identified several areas where we can improve your listing's performance and attractiveness to qualified buyers:
          </p>

          <ul style={{ marginLeft: '20px', marginBottom: '20px' }}>
            {suggestions.map((suggestion, index) => (
              <li key={index} style={{ marginBottom: '10px' }}>
                {suggestion}
              </li>
            ))}
          </ul>

          <p>
            What sets SERHANT apart is our comprehensive, data-driven approach to selling homes. We combine:
          </p>
          <ul style={{ marginLeft: '20px', marginBottom: '20px' }}>
            <li>Advanced digital marketing and targeted buyer outreach</li>
            <li>Professional photography, staging, and virtual tours</li>
            <li>Regular market analysis and pricing optimization</li>
            <li>Dedicated support from listing professionals with 10+ years of experience</li>
          </ul>

          <p>
            Your property has significant potential, and with the right strategy and presentation, we are confident we can attract serious buyers and achieve your selling goals. I would welcome the opportunity to discuss how SERHANT can work with you to make this happen.
          </p>

          <p>
            Please feel free to reach out at your earliest convenience. I'm excited to show you how we can turn this property into a successful sale.
          </p>
        </div>

        {/* Closing */}
        <div style={{ marginTop: '40px' }}>
          <p style={{ marginBottom: '5px' }}>Warm regards,</p>
          <div style={{ marginTop: '40px', paddingTop: '20px' }}>
            <div style={{ fontWeight: 'bold' }}>Camila Garcia Voelkl</div>
            <div style={{ color: '#666', fontSize: '13px' }}>Senior Real Estate Agent</div>
            <div style={{ color: '#666', fontSize: '13px' }}>SERHANT</div>
            <div style={{ color: '#666', fontSize: '13px', marginTop: '5px' }}>
              📧 camila@serhant.com | 📱 (703) 717-2687
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          marginTop: '60px',
          paddingTop: '20px',
          borderTop: '1px solid #e0e0e0',
          textAlign: 'center',
          color: '#999',
          fontSize: '11px'
        }}>
          <p>
            This letter has been generated for {listing.address} | Property ID: {listing.id}
          </p>
          <button
            onClick={() => window.print()}
            style={{
              padding: '8px 16px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '500',
              marginTop: '10px'
            }}
          >
            🖨️ Print Letter
          </button>
        </div>
      </div>
    </div>
  )
}

export default ReachOutLetter
