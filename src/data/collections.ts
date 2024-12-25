import { Collection } from '@/types/watch'

export const collections: Collection[] = [
  {
    id: 'Series 10',
    name: 'Apple Watch Series 10',
    sizes: [
      {id: '41mm', size: '41mm', price: 399 },
      {id: '45mm', size: '45mm', price: 429 }
    ],
    cases: [
        {
            id: "aluminum",
            name: "Aluminum",
            variations: [
              {
                id: "aluminum_silver",
                name: "Silver Aluminum Case",
                price: 329,
                image: "/images/cases/aluminum_silver_10.png",
              },
              {
                id: "aluminum_gold",
                name: "Gold Aluminum Case",
                price: 349,
                image: "/images/cases/aluminum_gold_10.png",
              },
              {
                id: "aluminum_black",
                name: "Jet Black Aluminum Case",
                price: 359,
                image: "/images/cases/aluminum_black_10.png",
              },
            ],
          },
          {
            id: "titanium",
            name: "Titanium",
            variations: [
              {
                id: "titanium_natural",
                name: "Natural Titanium Case",
                price: 499,
                image: "/images/cases/titanium_natural_10.png",
              },
              {
                id: "titanium_gold",
                name: "Gold Titanium Case",
                price: 519,
                image: "/images/cases/titanium_gold_10.png",
              },
              {
                id: "titanium_slate",
                name: "Slate Titanium Case",
                price: 539,
                image: "/images/cases/titanium_slate_10.png",
              },
            ],
          },
      // Add more cases...
    ],
    bands: [
      {
        id: 'sport-midnight',
        name: 'Sport Band - Midnight',
        type: 'Sport Band',
        color: '#1D1D1F',
        price: 49,
        imageUrl: '/placeholder.svg?height=600&width=600'
      },
  
    ]
  },
  {
    id: 'Hermès',
    name: 'Apple Watch Hermès Series 10',
    sizes:[
        { id: "42mm", size: "42mm", price: 20 },
        { id: "46mm", size: "46mm", price: 40 },
      ],
    cases: [
        {
            id: "titanium",
            name: "Titanium",
            variations: [
              {
                id: "titanium_silver",
                name: "Silver Titanium Case",
                price: 250,
                image: "/images/cases/titanium_silver_hermes.png",
              },
            ],
          },

    ],
    bands: [
      {
        id: 'sport-midnight',
        name: 'Sport Band - Midnight',
        type: 'Sport Band',
        color: '#1D1D1F',
        price: 49,
        imageUrl: '/placeholder.svg?height=600&width=600'
      },

    ]
  },
  {
    id: 'SE',
    name: 'Apple Watch SE',
    sizes: [
        { id: "40mm", size: "40mm", price: 10 },
        { id: "44mm", size: "44mm", price: 30 },
      ],
    cases: [
        {
            id: "aluminum",
            name: "Aluminum",
            variations: [
              {
                id: "aluminum_midnight",
                name: "Midnight Aluminum Case",
                price: 150,
                image: "/images/cases/aluminum_midnight_se.png",
              },
              {
                id: "aluminum_starlight",
                name: "Starlight Aluminum Case",
                price: 150,
                image: "/images/cases/aluminum_starlight_se.png",
              },
    
              {
                id: "aluminum_silver",
                name: "Silver Aluminum Case",
                price: 150,
                image: "/images/cases/aluminum_silver_se.png",
              },
            ],
          },
     
    ],
    bands: [
      {
        id: 'sport-midnight',
        name: 'Sport Band - Midnight',
        type: 'Sport Band',
        color: '#1D1D1F',
        price: 49,
        imageUrl: '/placeholder.svg?height=600&width=600'
      },
      // Add more bands...
    ]
  },
  // Add Hermès and SE collections...
]

