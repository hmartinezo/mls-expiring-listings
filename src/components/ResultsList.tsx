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
}

const ResultsList = ({ items, isLoading, hasSearch }: ResultsListProps) => {
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
          </article>
        )
      })}
    </div>
  )
}

export default ResultsList
