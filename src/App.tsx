import { useEffect, useMemo, useState } from 'react'
import './App.css'
import {
  type Listing,
  type ListingStatusFilter,
  type ListingsResponse,
  type SearchFilters,
  fetchListings,
} from './api/listings'
import Pagination from './components/Pagination'
import ResultsList from './components/ResultsList'
import SearchPanel, { type FormState } from './components/SearchPanel'

const PAGE_SIZE = 10

const initialForm: FormState = {
  zip: '',
  minPrice: '',
  maxPrice: '',
  minBeds: '',
  minBaths: '',
  minDaysOnMarket: '',
  maxDaysOnMarket: '',
  minSqft: '',
  maxSqft: '',
  status: 'all',
}

const parseNumber = (value: string) => {
  if (!value.trim()) {
    return undefined
  }
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : undefined
}

function App() {
  const [form, setForm] = useState<FormState>(initialForm)
  const [activeZip, setActiveZip] = useState('')
  const [activeFilters, setActiveFilters] = useState<SearchFilters | null>(null)
  const [activePage, setActivePage] = useState(1)
  const [data, setData] = useState<ListingsResponse | null>(null)
  const [results, setResults] = useState<Listing[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const statusFilter: ListingStatusFilter = useMemo(() => form.status, [form])

  const requestPayload = useMemo(() => {
    if (!activeZip || !activeFilters) {
      return null
    }

    return {
      zip: activeZip,
      filters: activeFilters,
      page: activePage,
      pageSize: PAGE_SIZE,
      sort: 'expiresOnAsc' as const,
    }
  }, [activeZip, activeFilters, activePage])

  useEffect(() => {
    let isActive = true
    if (!requestPayload) {
      return undefined
    }

    setIsLoading(true)
    setError(null)

    fetchListings(requestPayload)
      .then((response) => {
        if (!isActive) {
          return
        }
        setData(response)
        setResults(response.items)
      })
      .catch((err: unknown) => {
        if (!isActive) {
          return
        }
        setError(err instanceof Error ? err.message : 'Unable to load listings.')
      })
      .finally(() => {
        if (isActive) {
          setIsLoading(false)
        }
      })

    return () => {
      isActive = false
    }
  }, [requestPayload])

  const handleSearch = () => {
    const zipValue = form.zip.trim()
    if (!/^\d{5}$/.test(zipValue)) {
      setError('Enter a valid 5-digit zip code.')
      return
    }

    const filters: SearchFilters = {
      minPrice: parseNumber(form.minPrice),
      maxPrice: parseNumber(form.maxPrice),
      minBeds: parseNumber(form.minBeds),
      minBaths: parseNumber(form.minBaths),
      minDaysOnMarket: parseNumber(form.minDaysOnMarket),
      maxDaysOnMarket: parseNumber(form.maxDaysOnMarket),
      minSqft: parseNumber(form.minSqft),
      maxSqft: parseNumber(form.maxSqft),
      status: statusFilter,
    }

    setActiveZip(zipValue)
    setActiveFilters(filters)
    setActivePage(1)
    setData(null)
    setResults([])
  }

  const handleFieldChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="app">
      <header className="hero">
        <div>
          <p className="eyebrow">MLS Expiration Watch</p>
          <h1 className="hero__title">Find expiring and expired listings by zip.</h1>
          <p className="hero__subtitle">
            This is a mock data experience while we wire the RESO MLS feed. Use a 5-digit zip to view
            listings, then refine by price, beds, days on market, and status.
          </p>
        </div>
        <div className="hero__card">
          <div className="hero__metric">
            <span className="hero__metric-label">Default sort</span>
            <span className="hero__metric-value">Soonest expiration</span>
          </div>
          <div className="hero__metric">
            <span className="hero__metric-label">Results per page</span>
            <span className="hero__metric-value">10 listings</span>
          </div>
        </div>
      </header>

      <main className="content">
        <SearchPanel
          form={form}
          onFieldChange={handleFieldChange}
          onSearch={handleSearch}
          errorMessage={error}
          isLoading={isLoading}
        />

        <section className="results">
          <div className="results__header">
            <div>
              <h2>Listings</h2>
              <p className="muted">
                {data
                  ? `${data.total} listing${data.total === 1 ? '' : 's'} found for ${activeZip}`
                  : 'Enter a zip code to begin.'}
              </p>
            </div>
            {data ? (
              <div className="results__meta">
                <span className="chip">Page {data.page} of {data.totalPages}</span>
                <span className="chip">Sorted by expiration</span>
              </div>
            ) : null}
          </div>

          <ResultsList
            items={results}
            isLoading={isLoading}
            hasSearch={Boolean(activeZip)}
          />

          {data && data.totalPages > 1 ? (
            <Pagination
              page={data.page}
              totalPages={data.totalPages}
              onPageChange={(nextPage) => setActivePage(nextPage)}
            />
          ) : null}
        </section>
      </main>
    </div>
  )
}

export default App
