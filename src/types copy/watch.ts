export type WatchCollection = 'Series 10' | 'Hermès' | 'SE'

export type WatchSize = { id: string, size: string, price: number }

export type CaseMaterial = 'Aluminum' | 'Titanium' | 'Stainless Steel'
export interface variations{
  id: string
  name: string
  price: number,
  image: string,
}
export interface Case {
  id: string
  name: string
//   material: CaseMaterial
//   color: string
//   price: number
//   imageUrl: string
//   sideViewUrl: string 
  variations? :variations[],
}

export interface Band {
  id: string
  name: string
  variations : variations[],
}

export interface WatchConfiguration {
  collection: WatchCollection
  size: WatchSize
  case: Case
  band: Band
  totalPrice: number
}

export interface Collection {
  id: WatchCollection
  name: string
  sizes: WatchSize[]
  cases: Case[]
  bands: Band[]
}

