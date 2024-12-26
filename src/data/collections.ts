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
                image: "",
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
  
    ],
    bands: [
        {
            id: "stainless_steel",
            name: "Stainless Steel",
            variations: [
              {
                id: "natural_milanese",
                name: "Natural Milanese Loop",
                price: 129,
                image: "/images/bands/milanese_natural_10.jpg",
              },
              {
                id: "gold_milanese",
                name: "Gold Milanese Loop",
                price: 139,
                image: "/images/bands/milanese_gold_10.jpg",
              },
              {
                id: "slate_milanese",
                name: "Slate Milanese Loop",
                price: 149,
                image: "/images/bands/milanese_slate_10.jpg",
              },
            ],
          },
          {
            id: "sport_loop",
            name: "Sport Loop",
            variations: [
              {
                id: "ultramarine_sport",
                name: "Ultramarine Sport Loop",
                price: 49,
                image: "/images/bands/sport_ultramarine_10.jpg",
              },
              {
                id: "lake_green_sport",
                name: "Lake Green Sport Loop",
                price: 49,
                image: "/images/bands/sport_lake_green_10.jpg",
              },
              {
                id: "blue_cloud_sport",
                name: "Blue Cloud Sport Loop",
                price: 49,
                image: "/images/bands/sport_blue_cloud_10.jpg",
              },
            ],
          },
          {
            id: "solo_loop",
            name: "Solo Loop",
            variations: [
              {
                id: "star_fruit_solo",
                name: "Star Fruit Solo Loop",
                price: 79,
                image: "/images/bands/solo_star_fruit_10.jpg",
              },
              {
                id: "ultramarine_solo",
                name: "Ultramarine Solo Loop",
                price: 79,
                image: "/images/bands/solo_ultramarine_10.jpg",
              },
              {
                id: "lake_green_solo",
                name: "Lake Green Solo Loop",
                price: 79,
                image: "/images/bands/solo_lake_green_10.jpg",
              },
              {
                id: "black_solo",
                name: "Black Solo Loop",
                price: 79,
                image: "/images/bands/solo_black_10.jpg",
              },
              {
                id: "ligh_blush_solo",
                name: "Light Blush Solo Loop",
                price: 79,
                image: "/images/bands/solo_light_blush_10.jpg",
              },
            ],
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
            id: "hermes_toile_h",
            name: "Hermès Toile H",
            variations: [
              {
                id: "toile_hermes",
                name: "Gold/Écru Toile H Single Tour",
                price: 149,
                image: "/images/bands/toile_single_tour_hermes.jpg",
              },
            ],
          },
          {
            id: "hermes_torsade",
            name: "Hermès Torsade",
            variations: [
              {
                id: "navy_hermes",
                name: "Navy Torsade Single Tour",
                price: 550,
                image: "/images/bands/navy_torsade_tour_hermes.jpg",
              },
              {
                id: "rouge_hermes",
                name: "Rouge Grenat Torsade Single Tour",
                price: 550,
                image: "/images/bands/rouge_torsade_tour_hermes.jpg",
              },
            ],
          },
          {
            id: "hermes_grand_h",
            name: "Hermès Grand H",
            variations: [
              {
                id: "satine_hermes",
                name: "Satiné Grand H",
                price: 650,
                image: "/images/bands/satine_grand_hermes.jpg",
              },
            ],
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
            id: "stainless_steel",
            name: "Stainless Steel",
            variations: [
              {
                id: "natural_milanese",
                name: "Natural Milanese Loop",
                price: 129,
                image: "/images/bands/milanese_natural_10.jpg",
              },
              {
                id: "gold_milanese",
                name: "Gold Milanese Loop",
                price: 139,
                image: "/images/bands/milanese_gold_10.jpg",
              },
              {
                id: "slate_milanese",
                name: "Slate Milanese Loop",
                price: 149,
                image: "/images/bands/milanese_slate_10.jpg",
              },
            ],
          },
          {
            id: "sport_loop",
            name: "Sport Loop",
            variations: [
              {
                id: "ultramarine_sport",
                name: "Ultramarine Sport Loop",
                price: 49,
                image: "/images/bands/sport_ultramarine_10.jpg",
              },
              {
                id: "lake_green_sport",
                name: "Lake Green Sport Loop",
                price: 49,
                image: "/images/bands/sport_lake_green_10.jpg",
              },
              {
                id: "blue_cloud_sport",
                name: "Blue Cloud Sport Loop",
                price: 49,
                image: "/images/bands/sport_blue_cloud_10.jpg",
              },
            ],
          },
          {
            id: "solo_loop",
            name: "Solo Loop",
            variations: [
              {
                id: "star_fruit_solo",
                name: "Star Fruit Solo Loop",
                price: 69,
                image: "/images/bands/solo_star_fruit_10.jpg",
              },
              {
                id: "ultramarine_solo",
                name: "Ultramarine Solo Loop",
                price: 69,
                image: "/images/bands/solo_ultramarine_10.jpg",
              },
              {
                id: "lake_green_solo",
                name: "Lake Green Solo Loop",
                price: 69,
                image: "/images/bands/solo_lake_green_10.jpg",
              },
              {
                id: "black_solo",
                name: "Black Solo Loop",
                price: 69,
                image: "/images/bands/solo_black_10.jpg",
              },
              {
                id: "ligh_blush_solo",
                name: "Light Blush Solo Loop",
                price: 69,
                image: "/images/bands/solo_light_blush_10.jpg",
              },
            ],
          }
        
    ]
  },

]

export const  watchImageSize = (size: string) => {
   
    if (size === '41mm') {
      return 'w-[41vh] h-[41vh]';
    } else if (size === '45mm') {
      return 'w-[45vh] h-[45vh]';
    } else if (size === '42mm') {
      return 'w-[42vh] h-[42vh]';
    } else if (size === '46mm') {
      return 'w-[46vh] h-[46vh]';
    }
    else if (size === '40mm') {
      return 'w-[40vh] h-[40vh]';
    }else if (size === '44mm') {
      return 'w-[44vh] h-[44vh]';
    }
    return 'w-[41vh] h-[41vh]';
  };