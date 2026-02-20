export type ListingStatus = 'expiring' | 'expired' | 'active'
export type ListingStatusFilter = 'all' | 'expiring' | 'expired'

export type Listing = {
  id: string
  address: string
  city: string
  state: string
  zip: string
  price: number
  beds: number
  baths: number
  sqft: number
  daysOnMarket: number
  expiresOn: string
  listedOn: string
  propertyType: string
}

export type SearchFilters = {
  minPrice?: number
  maxPrice?: number
  minBeds?: number
  minBaths?: number
  minDaysOnMarket?: number
  maxDaysOnMarket?: number
  minSqft?: number
  maxSqft?: number
  status: ListingStatusFilter
}

export type SearchParams = {
  zip: string
  filters: SearchFilters
  page: number
  pageSize: number
  sort: 'expiresOnAsc'
}

export type ListingsResponse = {
  items: Listing[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

const EXPIRING_WINDOW_DAYS = 30
const DAY_MS = 24 * 60 * 60 * 1000

const buildMockListings = () => {
  const base = new Date()
  const makeDate = (offsetDays: number) =>
    new Date(base.getTime() + offsetDays * DAY_MS).toISOString()

  return [
    {
      id: 'MLS-1001',
      address: '482 Maple Ridge Dr',
      city: 'Tampa',
      state: 'FL',
      zip: '33602',
      price: 425000,
      beds: 3,
      baths: 2,
      sqft: 1850,
      daysOnMarket: 48,
      expiresOn: makeDate(12),
      listedOn: makeDate(-52),
      propertyType: 'Single Family',
    },
    {
      id: 'MLS-1002',
      address: '21 Riverwalk Ave',
      city: 'Tampa',
      state: 'FL',
      zip: '33602',
      price: 610000,
      beds: 4,
      baths: 3,
      sqft: 2420,
      daysOnMarket: 64,
      expiresOn: makeDate(-6),
      listedOn: makeDate(-88),
      propertyType: 'Townhome',
    },
    {
      id: 'MLS-1003',
      address: '18 Palmetto Key',
      city: 'Tampa',
      state: 'FL',
      zip: '33602',
      price: 358000,
      beds: 2,
      baths: 2,
      sqft: 1320,
      daysOnMarket: 21,
      expiresOn: makeDate(4),
      listedOn: makeDate(-35),
      propertyType: 'Condo',
    },
    {
      id: 'MLS-1004',
      address: '99 Mariner Way',
      city: 'Tampa',
      state: 'FL',
      zip: '33602',
      price: 835000,
      beds: 5,
      baths: 4,
      sqft: 3280,
      daysOnMarket: 92,
      expiresOn: makeDate(45),
      listedOn: makeDate(-120),
      propertyType: 'Single Family',
    },
    {
      id: 'MLS-1005',
      address: '7 Harbor Pointe',
      city: 'Tampa',
      state: 'FL',
      zip: '33602',
      price: 515000,
      beds: 3,
      baths: 2,
      sqft: 1985,
      daysOnMarket: 56,
      expiresOn: makeDate(-2),
      listedOn: makeDate(-75),
      propertyType: 'Single Family',
    },
    {
      id: 'MLS-2001',
      address: '402 Juniper Lane',
      city: 'Orlando',
      state: 'FL',
      zip: '32801',
      price: 298000,
      beds: 2,
      baths: 1,
      sqft: 980,
      daysOnMarket: 38,
      expiresOn: makeDate(8),
      listedOn: makeDate(-54),
      propertyType: 'Condo',
    },
    {
      id: 'MLS-2002',
      address: '15 Lake Eola Dr',
      city: 'Orlando',
      state: 'FL',
      zip: '32801',
      price: 480000,
      beds: 3,
      baths: 2,
      sqft: 1650,
      daysOnMarket: 71,
      expiresOn: makeDate(-12),
      listedOn: makeDate(-102),
      propertyType: 'Single Family',
    },
    {
      id: 'MLS-2003',
      address: '72 Magnolia Row',
      city: 'Orlando',
      state: 'FL',
      zip: '32801',
      price: 720000,
      beds: 4,
      baths: 3,
      sqft: 2550,
      daysOnMarket: 35,
      expiresOn: makeDate(18),
      listedOn: makeDate(-55),
      propertyType: 'Single Family',
    },
    {
      id: 'MLS-2004',
      address: '3 Sunlight Ct',
      city: 'Orlando',
      state: 'FL',
      zip: '32801',
      price: 395000,
      beds: 3,
      baths: 2,
      sqft: 1510,
      daysOnMarket: 28,
      expiresOn: makeDate(2),
      listedOn: makeDate(-46),
      propertyType: 'Townhome',
    },
    {
      id: 'MLS-3001',
      address: '441 Coastal Dr',
      city: 'Miami',
      state: 'FL',
      zip: '33101',
      price: 915000,
      beds: 4,
      baths: 3,
      sqft: 2900,
      daysOnMarket: 83,
      expiresOn: makeDate(-18),
      listedOn: makeDate(-112),
      propertyType: 'Single Family',
    },
    {
      id: 'MLS-3002',
      address: '78 Biscayne Ct',
      city: 'Miami',
      state: 'FL',
      zip: '33101',
      price: 640000,
      beds: 3,
      baths: 2,
      sqft: 2050,
      daysOnMarket: 58,
      expiresOn: makeDate(9),
      listedOn: makeDate(-86),
      propertyType: 'Condo',
    },
    {
      id: 'MLS-3003',
      address: '16 Artisan Way',
      city: 'Miami',
      state: 'FL',
      zip: '33101',
      price: 540000,
      beds: 2,
      baths: 2,
      sqft: 1400,
      daysOnMarket: 29,
      expiresOn: makeDate(29),
      listedOn: makeDate(-44),
      propertyType: 'Townhome',
    },
    {
      id: 'MLS-3004',
      address: '990 Coral Ln',
      city: 'Miami',
      state: 'FL',
      zip: '33101',
      price: 1100000,
      beds: 5,
      baths: 4,
      sqft: 3650,
      daysOnMarket: 94,
      expiresOn: makeDate(60),
      listedOn: makeDate(-140),
      propertyType: 'Single Family',
    },
    {
      id: 'MLS-4001',
      address: '81 Pinecrest Ave',
      city: 'Austin',
      state: 'TX',
      zip: '78701',
      price: 575000,
      beds: 3,
      baths: 2,
      sqft: 1920,
      daysOnMarket: 40,
      expiresOn: makeDate(15),
      listedOn: makeDate(-62),
      propertyType: 'Single Family',
    },
    {
      id: 'MLS-4002',
      address: '12 South Lamar',
      city: 'Austin',
      state: 'TX',
      zip: '78701',
      price: 450000,
      beds: 2,
      baths: 2,
      sqft: 1280,
      daysOnMarket: 77,
      expiresOn: makeDate(-1),
      listedOn: makeDate(-110),
      propertyType: 'Condo',
    },
    {
      id: 'MLS-4003',
      address: '55 Congress Blvd',
      city: 'Austin',
      state: 'TX',
      zip: '78701',
      price: 820000,
      beds: 4,
      baths: 3,
      sqft: 2680,
      daysOnMarket: 52,
      expiresOn: makeDate(24),
      listedOn: makeDate(-78),
      propertyType: 'Single Family',
    },
    {
      id: 'MLS-5001',
      address: '34 Ashland Ave',
      city: 'Portland',
      state: 'OR',
      zip: '97205',
      price: 515000,
      beds: 3,
      baths: 2,
      sqft: 1765,
      daysOnMarket: 60,
      expiresOn: makeDate(-9),
      listedOn: makeDate(-92),
      propertyType: 'Single Family',
    },
    {
      id: 'MLS-5002',
      address: '201 Hawthorne St',
      city: 'Portland',
      state: 'OR',
      zip: '97205',
      price: 392000,
      beds: 2,
      baths: 1,
      sqft: 1110,
      daysOnMarket: 33,
      expiresOn: makeDate(6),
      listedOn: makeDate(-49),
      propertyType: 'Townhome',
    },
    {
      id: 'MLS-5003',
      address: '860 Pearl District',
      city: 'Portland',
      state: 'OR',
      zip: '97205',
      price: 680000,
      beds: 3,
      baths: 2,
      sqft: 2100,
      daysOnMarket: 85,
      expiresOn: makeDate(36),
      listedOn: makeDate(-121),
      propertyType: 'Condo',
    },
  ]
}

const getStatus = (expiresOn: string, referenceDate: Date): ListingStatus => {
  const expires = new Date(expiresOn)
  const expiringCutoff = new Date(referenceDate.getTime() + EXPIRING_WINDOW_DAYS * DAY_MS)
  if (expires < referenceDate) {
    return 'expired'
  }
  if (expires <= expiringCutoff) {
    return 'expiring'
  }
  return 'active'
}

const withinRange = (value: number, min?: number, max?: number) => {
  if (min !== undefined && value < min) {
    return false
  }
  if (max !== undefined && value > max) {
    return false
  }
  return true
}

export const fetchListings = async (params: SearchParams): Promise<ListingsResponse> => {
  const { zip, filters, page, pageSize } = params
  const referenceDate = new Date()

  const listings = buildMockListings()
    .filter((listing) => listing.zip === zip)
    .filter((listing) => withinRange(listing.price, filters.minPrice, filters.maxPrice))
    .filter((listing) => withinRange(listing.beds, filters.minBeds))
    .filter((listing) => withinRange(listing.baths, filters.minBaths))
    .filter((listing) => withinRange(listing.daysOnMarket, filters.minDaysOnMarket, filters.maxDaysOnMarket))
    .filter((listing) => withinRange(listing.sqft, filters.minSqft, filters.maxSqft))
    .filter((listing) => {
      if (filters.status === 'all') {
        return true
      }
      return getStatus(listing.expiresOn, referenceDate) === filters.status
    })
    .sort((a, b) => new Date(a.expiresOn).getTime() - new Date(b.expiresOn).getTime())

  const total = listings.length
  const totalPages = total === 0 ? 1 : Math.ceil(total / pageSize)
  const safePage = Math.min(Math.max(page, 1), totalPages)
  const startIndex = (safePage - 1) * pageSize
  const items = listings.slice(startIndex, startIndex + pageSize)

  await new Promise((resolve) => setTimeout(resolve, 350))

  return {
    items,
    total,
    page: safePage,
    pageSize,
    totalPages,
  }
}
