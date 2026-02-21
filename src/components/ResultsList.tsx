import type { Listing } from '../api/listings'

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

const formatDate = (value: string) => new Date(value).toLocaleDateString('en-US')

const getExpiryMeta = (expiresOn: string) => {
  const now = new Date()
  const expiry = new Date(expiresOn)
  const diffDays = Math.ceil((expiry.getTime() - now.getTime()) / (24 * 60 * 60 * 1000))

  if (diffDays < 0) {
    return {
      status: 'expired',
      label: `Expired ${Math.abs(diffDays)}d ago`,
    }
  }
  if (diffDays <= 30) {
    return {
      status: 'expiring',
      label: `Expires in ${diffDays}d`,
    }
  }
  return {
    status: 'active',
    label: `Expires in ${diffDays}d`,
  }
}

type ResultsListProps = {
  items: Listing[]
  isLoading: boolean
  hasSearch: boolean
  onLetterClick?: (listing: Listing) => void
}

const ResultsList = ({ items, isLoading, hasSearch, onLetterClick }: ResultsListProps) => {
  if (isLoading) {
    return (
      <div className="results__grid">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="skeleton" />
        ))}
      </div>
    )
  }

  if (!hasSearch) {
    return <div className="empty-state">Start with a zip code to reveal expiring and expired listings.</div>
  }

  if (items.length === 0) {
    return <div className="empty-state">No listings match these filters. Try expanding the range.</div>
  }

  return (
    <div className="results__grid">
      {items.map((listing) => {
        const expiryMeta = getExpiryMeta(listing.expiresOn)
        const statusClassName = `status status--${expiryMeta.status}`

        return (
          <article key={listing.id} className="card">
            <div className="card__header">
              <div>
                <div className="card__address">{listing.address}</div>
                <div className="card__meta">
                  {listing.city}, {listing.state} {listing.zip}
                </div>
              </div>
              <span className={statusClassName}>{expiryMeta.status}</span>
            </div>

            <div className="card__price">{currencyFormatter.format(listing.price)}</div>

            <div className="card__meta">
              {listing.beds} bd | {listing.baths} ba | {listing.sqft.toLocaleString('en-US')} sqft
            </div>
            <div className="card__meta">Days on market: {listing.daysOnMarket}</div>
            <div className="card__meta">Listed: {formatDate(listing.listedOn)}</div>
            <div className="card__meta">{expiryMeta.label}</div>

            <hr style={{ margin: '12px 0', borderColor: '#e0e0e0' }} />

            <div className="card__meta" style={{ fontWeight: '600', color: '#333' }}>Owner: {listing.ownerName}</div>
            <div className="card__meta" style={{ fontSize: '0.9em', color: '#666' }}>Type: {listing.ownershipType}</div>
            
            <a href={listing.publicRecordsUrl} target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-block',
              marginTop: '8px',
              padding: '6px 12px',
              backgroundColor: '#4CAF50',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '4px',
              fontSize: '0.85em',
              fontWeight: '500',
              transition: 'background-color 0.2s',
              marginRight: '8px'
            }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#45a049'}
               onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4CAF50'}
            >
              View Public Records →
            </a>
            
            {onLetterClick && (
              <button
                onClick={() => onLetterClick(listing)}
                style={{
                  display: 'inline-block',
                  marginTop: '8px',
                  padding: '6px 12px',
                  backgroundColor: '#2196F3',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '0.85em',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0b7dda'}
                   onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2196F3'}
              >
                ✉️ Create Letter
              </button>
            )}
          </article>
        )
      })}
    </div>
  )
}

export default ResultsList
