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
  ownerName: string
  ownershipType: string
  publicRecordsUrl: string
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
    // Arlington, VA 22201
    {
      id: 'MLS-VA-1001',
      address: '1425 Clarendon Blvd',
      city: 'Arlington',
      state: 'VA',
      zip: '22201',
      price: 525000,
      beds: 3,
      baths: 2,
      sqft: 1850,
      daysOnMarket: 48,
      expiresOn: makeDate(12),
      listedOn: makeDate(-52),
      propertyType: 'Single Family',
      ownerName: 'Margaret Chen',
      ownershipType: 'Individual',
      publicRecordsUrl: 'https://www.arlingtonva.us/government/assessments/property-assessments?search=1425+Clarendon+Blvd+Arlington+VA+22201',
    },
    {
      id: 'MLS-VA-1002',
      address: '2847 N Rolfe St',
      city: 'Arlington',
      state: 'VA',
      zip: '22201',
      price: 710000,
      beds: 4,
      baths: 3,
      sqft: 2420,
      daysOnMarket: 64,
      expiresOn: makeDate(-6),
      listedOn: makeDate(-88),
      propertyType: 'Townhome',
      ownerName: 'Robert & Deborah Williams',
      ownershipType: 'Joint Tenancy',
      publicRecordsUrl: 'https://www.arlingtonva.us/government/assessments/property-assessments?search=2847+N+Rolfe+St+Arlington+VA+22201',
    },
    {
      id: 'MLS-VA-1003',
      address: '415 N Glebe Rd',
      city: 'Arlington',
      state: 'VA',
      zip: '22201',
      price: 458000,
      beds: 2,
      baths: 2,
      sqft: 1320,
      daysOnMarket: 21,
      expiresOn: makeDate(4),
      listedOn: makeDate(-35),
      propertyType: 'Condo',
      ownerName: 'David Martinez Trust',
      ownershipType: 'Trust',
      publicRecordsUrl: 'https://www.arlingtonva.us/government/assessments/property-assessments?search=415+N+Glebe+Rd+Arlington+VA+22201',
    },
    {
      id: 'MLS-VA-1004',
      address: '3102 N Park Ave',
      city: 'Arlington',
      state: 'VA',
      zip: '22201',
      price: 935000,
      beds: 5,
      baths: 4,
      sqft: 3280,
      daysOnMarket: 92,
      expiresOn: makeDate(45),
      listedOn: makeDate(-120),
      propertyType: 'Single Family',
      ownerName: 'Sarah & James Thompson',
      ownershipType: 'Joint Tenancy',
      publicRecordsUrl: 'https://www.arlingtonva.us/government/assessments/property-assessments?search=3102+N+Park+Ave+Arlington+VA+22201',
    },
    {
      id: 'MLS-VA-1005',
      address: '2205 S Arlington Mill Dr',
      city: 'Arlington',
      state: 'VA',
      zip: '22201',
      price: 615000,
      beds: 3,
      baths: 2,
      sqft: 1985,
      daysOnMarket: 56,
      expiresOn: makeDate(-2),
      listedOn: makeDate(-75),
      propertyType: 'Single Family',
      ownerName: 'Vivian Park',
      ownershipType: 'Individual',
      publicRecordsUrl: 'https://www.arlingtonva.us/government/assessments/property-assessments?search=2205+S+Arlington+Mill+Dr+Arlington+VA+22201',
    },
    // Alexandria, VA 22301
    {
      id: 'MLS-VA-2001',
      address: '432 Queen St',
      city: 'Alexandria',
      state: 'VA',
      zip: '22301',
      price: 398000,
      beds: 2,
      baths: 1,
      sqft: 980,
      daysOnMarket: 38,
      expiresOn: makeDate(8),
      listedOn: makeDate(-54),
      propertyType: 'Condo',
      ownerName: 'Elizabeth Hoffman',
      ownershipType: 'Individual',
      publicRecordsUrl: 'https://www.alexandriava.gov/revenue/property-tax?search=432+Queen+St+Alexandria+VA+22301',
    },
    {
      id: 'MLS-VA-2002',
      address: '808 N Patrick St',
      city: 'Alexandria',
      state: 'VA',
      zip: '22301',
      price: 580000,
      beds: 3,
      baths: 2,
      sqft: 1650,
      daysOnMarket: 71,
      expiresOn: makeDate(-12),
      listedOn: makeDate(-102),
      propertyType: 'Single Family',
      ownerName: 'Michael & Karen Lopez',
      ownershipType: 'Joint Tenancy',
      publicRecordsUrl: 'https://www.alexandriava.gov/revenue/property-tax?search=808+N+Patrick+St+Alexandria+VA+22301',
    },
    {
      id: 'MLS-VA-2003',
      address: '3010 Mt Vernon Ave',
      city: 'Alexandria',
      state: 'VA',
      zip: '22301',
      price: 820000,
      beds: 4,
      baths: 3,
      sqft: 2550,
      daysOnMarket: 35,
      expiresOn: makeDate(18),
      listedOn: makeDate(-55),
      propertyType: 'Single Family',
      ownerName: 'Johnson Properties LLC',
      ownershipType: 'LLC',
      publicRecordsUrl: 'https://www.alexandriava.gov/revenue/property-tax?search=3010+Mt+Vernon+Ave+Alexandria+VA+22301',
    },
    {
      id: 'MLS-VA-2004',
      address: '1825 George Mason Dr',
      city: 'Alexandria',
      state: 'VA',
      zip: '22301',
      price: 495000,
      beds: 3,
      baths: 2,
      sqft: 1510,
      daysOnMarket: 28,
      expiresOn: makeDate(2),
      listedOn: makeDate(-46),
      propertyType: 'Townhome',
      ownerName: 'Amelia Cross',
      ownershipType: 'Individual',
      publicRecordsUrl: 'https://www.alexandriava.gov/revenue/property-tax?search=1825+George+Mason+Dr+Alexandria+VA+22301',
    },
    // Falls Church, VA 22046
    {
      id: 'MLS-VA-3001',
      address: '2715 W Broad St',
      city: 'Falls Church',
      state: 'VA',
      zip: '22046',
      price: 1015000,
      beds: 4,
      baths: 3,
      sqft: 2900,
      daysOnMarket: 83,
      expiresOn: makeDate(-18),
      listedOn: makeDate(-112),
      propertyType: 'Single Family',
      ownerName: 'Richard & Patricia Moore',
      ownershipType: 'Joint Tenancy',
      publicRecordsUrl: 'https://fallschurch.gov/government/taxation-and-assessment?search=2715+W+Broad+St+Falls+Church+VA+22046',
    },
    {
      id: 'MLS-VA-3002',
      address: '307 N Washington St',
      city: 'Falls Church',
      state: 'VA',
      zip: '22046',
      price: 740000,
      beds: 3,
      baths: 2,
      sqft: 2050,
      daysOnMarket: 58,
      expiresOn: makeDate(9),
      listedOn: makeDate(-86),
      propertyType: 'Condo',
      ownerName: 'Heritage Estate Trust',
      ownershipType: 'Trust',
      publicRecordsUrl: 'https://fallschurch.gov/government/taxation-and-assessment?search=307+N+Washington+St+Falls+Church+VA+22046',
    },
    {
      id: 'MLS-VA-3003',
      address: '401 East Broad St',
      city: 'Falls Church',
      state: 'VA',
      zip: '22046',
      price: 640000,
      beds: 2,
      baths: 2,
      sqft: 1400,
      daysOnMarket: 29,
      expiresOn: makeDate(29),
      listedOn: makeDate(-44),
      propertyType: 'Townhome',
      ownerName: 'Thomas Sullivan',
      ownershipType: 'Individual',
      publicRecordsUrl: 'https://fallschurch.gov/government/taxation-and-assessment?search=401+East+Broad+St+Falls+Church+VA+22046',
    },
    {
      id: 'MLS-VA-3004',
      address: '215 S Washington St',
      city: 'Falls Church',
      state: 'VA',
      zip: '22046',
      price: 1200000,
      beds: 5,
      baths: 4,
      sqft: 3650,
      daysOnMarket: 94,
      expiresOn: makeDate(60),
      listedOn: makeDate(-140),
      propertyType: 'Single Family',
      ownerName: 'Catherine & Thomas Owens',
      ownershipType: 'Joint Tenancy',
      publicRecordsUrl: 'https://fallschurch.gov/government/taxation-and-assessment?search=215+S+Washington+St+Falls+Church+VA+22046',
    },
    // Reston, VA 20190
    {
      id: 'MLS-VA-4001',
      address: '1850 Fountain Dr',
      city: 'Reston',
      state: 'VA',
      zip: '20190',
      price: 675000,
      beds: 3,
      baths: 2,
      sqft: 1920,
      daysOnMarket: 40,
      expiresOn: makeDate(15),
      listedOn: makeDate(-62),
      propertyType: 'Single Family',
      ownerName: 'Jennifer Walsh',
      ownershipType: 'Individual',
      publicRecordsUrl: 'https://www.fairfaxcounty.gov/ddt/property-tax-assessor?search=1850+Fountain+Dr+Reston+VA+20190',
    },
    {
      id: 'MLS-VA-4002',
      address: '11850 Jones Bridge Rd',
      city: 'Reston',
      state: 'VA',
      zip: '20190',
      price: 550000,
      beds: 2,
      baths: 2,
      sqft: 1280,
      daysOnMarket: 77,
      expiresOn: makeDate(-1),
      listedOn: makeDate(-110),
      propertyType: 'Condo',
      ownerName: 'Avalon Properties Corp',
      ownershipType: 'Corporation',
      publicRecordsUrl: 'https://www.fairfaxcounty.gov/ddt/property-tax-assessor?search=11850+Jones+Bridge+Rd+Reston+VA+20190',
    },
    {
      id: 'MLS-VA-4003',
      address: '2521 Rill Rd',
      city: 'Reston',
      state: 'VA',
      zip: '20190',
      price: 920000,
      beds: 4,
      baths: 3,
      sqft: 2680,
      daysOnMarket: 52,
      expiresOn: makeDate(24),
      listedOn: makeDate(-78),
      propertyType: 'Single Family',
      ownerName: 'Adam & Lisa Chen',
      ownershipType: 'Joint Tenancy',
      publicRecordsUrl: 'https://www.fairfaxcounty.gov/ddt/property-tax-assessor?search=2521+Rill+Rd+Reston+VA+20190',
    },
    // Charlottesville, VA 22902
    {
      id: 'MLS-VA-5001',
      address: '415 14th St NW',
      city: 'Charlottesville',
      state: 'VA',
      zip: '22902',
      price: 515000,
      beds: 3,
      baths: 2,
      sqft: 1765,
      daysOnMarket: 60,
      expiresOn: makeDate(-9),
      listedOn: makeDate(-92),
      propertyType: 'Single Family',
      ownerName: 'William Brooks Estate',
      ownershipType: 'Estate',
      publicRecordsUrl: 'https://www.albemarle.org/government/county-services/property-assessor?search=415+14th+St+NW+Charlottesville+VA+22902',
    },
    {
      id: 'MLS-VA-5002',
      address: '1318 W Main St',
      city: 'Charlottesville',
      state: 'VA',
      zip: '22902',
      price: 492000,
      beds: 2,
      baths: 1,
      sqft: 1110,
      daysOnMarket: 33,
      expiresOn: makeDate(6),
      listedOn: makeDate(-49),
      propertyType: 'Townhome',
      ownerName: 'Patricia Smith',
      ownershipType: 'Individual',
      publicRecordsUrl: 'https://www.albemarle.org/government/county-services/property-assessor?search=1318+W+Main+St+Charlottesville+VA+22902',
    },
    {
      id: 'MLS-VA-5003',
      address: '2222 Arlington Blvd',
      city: 'Charlottesville',
      state: 'VA',
      zip: '22902',
      price: 780000,
      beds: 3,
      baths: 2,
      sqft: 2100,
      daysOnMarket: 85,
      expiresOn: makeDate(36),
      listedOn: makeDate(-121),
      propertyType: 'Condo',
      ownerName: 'Pinnacle Investments LLC',
      ownershipType: 'LLC',
      publicRecordsUrl: 'https://www.albemarle.org/government/county-services/property-assessor?search=2222+Arlington+Blvd+Charlottesville+VA+22902',
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
