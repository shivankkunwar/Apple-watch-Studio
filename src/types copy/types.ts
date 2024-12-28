export type WatchCollection = 'Series 10' | 'Hermès' | 'SE'

export type WatchSize = '41mm' | '45mm'

export type CaseMaterial = 'Aluminum' | 'Titanium' | 'Stainless Steel'

export type CaseColor = 'Silver' | 'Space Black' | 'Gold' | 'Natural' | 'Space Gray'

export type BandType = 
  | 'Sport Loop'
  | 'Solo Loop'
  | 'Braided Solo Loop'
  | 'Sport Band'
  | 'Nike Sport Loop'
  | 'Nike Sport Band'

export type BandColor = {
  id: string
  name: string
  color: string
}

export interface WatchConfiguration {
  collection: WatchCollection
  size: WatchSize
  caseMaterial: CaseMaterial
  caseColor: CaseColor
  bandType: BandType
  bandColor: BandColor
  price: number
}

