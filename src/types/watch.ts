export type WatchCollection = 'Series 10' | 'Hermès' | 'SE'

export type WatchSize = string

export type CaseMaterial = 'Aluminum' | 'Titanium' | 'Stainless Steel'

export interface Case {
  id: string
  name: string
//   material: CaseMaterial
//   color: string
//   price: number
//   imageUrl: string
//   sideViewUrl: string 
  variations : {
    id: string
    name: string
    price: number,
    image: string,
  }[],
}

export interface Band {
  id: string
  name: string
  type: string
  color: string
  price: number
  imageUrl: string
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
  sizes: { id:string,size: WatchSize; price: number }[]
  cases: Case[]
  bands: Band[]
}

