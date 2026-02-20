import type { FormEvent } from 'react'
import type { ListingStatusFilter } from '../api/listings'

export type FormState = {
  zip: string
  minPrice: string
  maxPrice: string
  minBeds: string
  minBaths: string
  minDaysOnMarket: string
  maxDaysOnMarket: string
  minSqft: string
  maxSqft: string
  status: ListingStatusFilter
}

type SearchPanelProps = {
  form: FormState
  onFieldChange: (field: keyof FormState, value: string) => void
  onSearch: () => void
  errorMessage: string | null
  isLoading: boolean
}

const SearchPanel = ({ form, onFieldChange, onSearch, errorMessage, isLoading }: SearchPanelProps) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSearch()
  }

  return (
    <section className="panel">
      <form className="panel__form" onSubmit={handleSubmit}>
        <div className="panel__row">
          <div className="input-group">
            <label className="input-label" htmlFor="zip">Zip code</label>
            <input
              id="zip"
              className="input"
              inputMode="numeric"
              maxLength={5}
              placeholder="e.g. 33602"
              value={form.zip}
              onChange={(event) => onFieldChange('zip', event.target.value)}
            />
          </div>
          <div className="input-group">
            <label className="input-label" htmlFor="status">Status</label>
            <select
              id="status"
              className="select"
              value={form.status}
              onChange={(event) => onFieldChange('status', event.target.value)}
            >
              <option value="all">All listings</option>
              <option value="expiring">Expiring soon</option>
              <option value="expired">Expired</option>
            </select>
          </div>
        </div>

        <div className="panel__row">
          <div className="input-group">
            <label className="input-label" htmlFor="minPrice">Min price</label>
            <input
              id="minPrice"
              className="input"
              inputMode="numeric"
              placeholder="250000"
              value={form.minPrice}
              onChange={(event) => onFieldChange('minPrice', event.target.value)}
            />
          </div>
          <div className="input-group">
            <label className="input-label" htmlFor="maxPrice">Max price</label>
            <input
              id="maxPrice"
              className="input"
              inputMode="numeric"
              placeholder="900000"
              value={form.maxPrice}
              onChange={(event) => onFieldChange('maxPrice', event.target.value)}
            />
          </div>
          <div className="input-group">
            <label className="input-label" htmlFor="minBeds">Min beds</label>
            <input
              id="minBeds"
              className="input"
              inputMode="numeric"
              placeholder="2"
              value={form.minBeds}
              onChange={(event) => onFieldChange('minBeds', event.target.value)}
            />
          </div>
          <div className="input-group">
            <label className="input-label" htmlFor="minBaths">Min baths</label>
            <input
              id="minBaths"
              className="input"
              inputMode="numeric"
              placeholder="2"
              value={form.minBaths}
              onChange={(event) => onFieldChange('minBaths', event.target.value)}
            />
          </div>
        </div>

        <div className="panel__row">
          <div className="input-group">
            <label className="input-label" htmlFor="minDaysOnMarket">Min days on market</label>
            <input
              id="minDaysOnMarket"
              className="input"
              inputMode="numeric"
              placeholder="10"
              value={form.minDaysOnMarket}
              onChange={(event) => onFieldChange('minDaysOnMarket', event.target.value)}
            />
          </div>
          <div className="input-group">
            <label className="input-label" htmlFor="maxDaysOnMarket">Max days on market</label>
            <input
              id="maxDaysOnMarket"
              className="input"
              inputMode="numeric"
              placeholder="120"
              value={form.maxDaysOnMarket}
              onChange={(event) => onFieldChange('maxDaysOnMarket', event.target.value)}
            />
          </div>
          <div className="input-group">
            <label className="input-label" htmlFor="minSqft">Min area (sqft)</label>
            <input
              id="minSqft"
              className="input"
              inputMode="numeric"
              placeholder="1200"
              value={form.minSqft}
              onChange={(event) => onFieldChange('minSqft', event.target.value)}
            />
          </div>
          <div className="input-group">
            <label className="input-label" htmlFor="maxSqft">Max area (sqft)</label>
            <input
              id="maxSqft"
              className="input"
              inputMode="numeric"
              placeholder="3200"
              value={form.maxSqft}
              onChange={(event) => onFieldChange('maxSqft', event.target.value)}
            />
          </div>
        </div>

        {errorMessage ? <div className="error">{errorMessage}</div> : null}

        <div className="panel__actions">
          <button className="button button--primary" type="submit" disabled={isLoading}>
            {isLoading ? 'Searching...' : 'Search listings'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default SearchPanel
