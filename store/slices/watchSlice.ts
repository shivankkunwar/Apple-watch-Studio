import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Case, Band, WatchSize, WatchCollection } from "../../types/watch";
import { collections } from "../../data/collections";
interface selectedFace {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface selectedBand {
  id: string;
  name: string;
  price: number;
  image: string;
}
interface WatchState {
  collection: WatchCollection;
  size: WatchSize;
  face: Case;
  band: Band;
  totalPrice: number;
  view: "front" | "side";
  activeSection: "size" | "face" | "band" | null;
  selectedBand: selectedBand;
  selectedFace: selectedFace;
  currentBandImage: string;
  currentFaceImage: string;
  mainFace:Case
  mainBand: { id: string, name: string} ,
  sideImage:string
}

const defaultCollection = collections[0];
const defaultCase = defaultCollection.cases[0];
const defaultBand = defaultCollection.bands[0];
const defaultSize = defaultCollection.sizes[0];

const initialState: WatchState = {
  collection: defaultCollection.id,
  size: defaultSize,
  face: defaultCase,
  band: defaultBand,
  mainFace: {
    id: "aluminum",
    name: "Aluminum",
  },
  mainBand:  { id: "solo_loop", name: "Solo Loop" },
  totalPrice:
    defaultCase?.variations?.[0]?.price ?? 0 +
    defaultBand.variations[0].price+
    defaultCollection.sizes[0].price,
  view: "front",
  activeSection: null,
  currentBandImage:defaultBand.variations[0].image,
  currentFaceImage:defaultCase.variations?.[0]?.image ?? '',
  sideImage:`/images/side/${defaultCase?.variations?.[0]?.id ?? 'aluminium_black'}_${defaultBand?.variations?.[0].id}_side.jpg`,
  selectedBand:{
    id: "black_solo",
    name: "Black Solo Loop",
    price: 49,
    image: "/images/bands/solo_black_10.jpg",
  },
  selectedFace:{
    id: "aluminum_black",
    name: "Jet Black Aluminum Case",
    price: 359,
    image: "/images/cases/aluminum_black_10.png",
  }
};

export const watchSlice = createSlice({
  name: "watch",
  initialState,
  reducers: {
    setCollection: (state, action: PayloadAction<WatchCollection>) => {
      const newCollection = collections.find((c) => c.id === action.payload);
      if (!newCollection) return;
      // console.log(newCollection) 
      state.collection = newCollection.id;
      state.size = newCollection.sizes[0];
      state.selectedFace = newCollection.cases[0]?.variations?.[0] as selectedFace;
      state.mainFace = newCollection.cases[0];
      console.log(newCollection.bands[0]?.variations?.[0])
      state.selectedBand = newCollection.bands[0]?.variations?.[0] as selectedBand;
      console.log(newCollection.cases[0]?.variations?.[0])
      state.mainBand = newCollection.bands[0];

      state.currentBandImage = newCollection.bands[0].variations[0].image;
      state.currentFaceImage = newCollection.cases[0].variations?.[0]?.image ?? '';
      console.log(newCollection.cases[0].variations?.[0]?.id)
      state.sideImage = `/images/side/${newCollection.cases[0].variations?.[0]?.id ?? 'aluminium_black'}_${newCollection.bands[0].variations[0].id}_side.jpg`;
      state.totalPrice =
        newCollection.cases[0].variations?.[0]?.price ?? 0 +
        newCollection.bands[0].variations[0].price +
        newCollection.sizes[0].price;
      },

    setSize: (state, action: PayloadAction<WatchSize>) => {
      const collection = collections.find((c) => c.id === state.collection);
      if (!collection) return;

      const sizeConfig = collection.sizes.find(
        (s) => s.size === action.payload.size
      );
      if (!sizeConfig) return;

      state.size = action.payload;
      state.totalPrice =
        (state.face?.variations?.[0]?.price ?? 0) + state.band.variations[0].price + sizeConfig.price;
    },

    setFace(
      state,
      action: PayloadAction<{
        subCase: selectedFace;
        mainCase: { id: string; name: string };
      }>
    ) {
      state.selectedFace = action.payload.subCase;
      state.mainFace = action.payload.mainCase;
      state.currentFaceImage = action.payload.subCase.image;

      state.sideImage = `/images/side/${state.selectedFace.id}_${state.selectedBand.id}_side.jpg`;
      state.totalPrice =
        state.selectedFace?.price + state.selectedBand.price + state.size.price;
    },

    setBand(
      state,
      action: PayloadAction<{
        subBand: selectedBand;
        mainBand: { id: string; name: string };
      }>
    ) {
      state.selectedBand = action.payload.subBand;
      state.mainBand = action.payload.mainBand;
      state.currentBandImage = action.payload.subBand.image;

      

    
      state.sideImage = `/images/side/${state.selectedFace.id}_${state.selectedBand.id}_side.jpg`;

      
      state.totalPrice =
        state.selectedFace.price + state.selectedBand.price + state.size.price;
      console.log(state.totalPrice)
    },
    setSelectedMainCase(
      state,
      action: PayloadAction<{ id: string; name: string }>
    ) {
      const collectionCases = collections.find(
        (col) => col.id === state.collection
      );
      if (!collectionCases) return;

      const mainCase = collectionCases.cases.find(
        (c) => c.id === action.payload.id
      );
      if (!mainCase) return;
      const firstCase = mainCase?.variations ? mainCase.variations[0] : undefined;
      if (!firstCase) return;

      state.mainFace = action.payload;
      state.selectedFace= firstCase;
      state.currentFaceImage = firstCase.image;

      state.sideImage = `/images/side/${firstCase.id}_${state.selectedBand.id}_side.jpg`;


      state.totalPrice =
        firstCase.price + state.selectedBand.price + state.size.price;
    },
    setSelectedMainBand(
      state,
      action: PayloadAction<{ id: string; name: string }>
    ) {
      const collectionBands = collections.find(
        (col) => col.id === state.collection
      );
      if (!collectionBands) return;

      const mainBand = collectionBands.bands.find(
        (c) => c.id === action.payload.id
      );
      if (!mainBand) return;

      const firstBand = mainBand.variations[0];
      if (!firstBand) return;

      state.mainBand = action.payload;
      state.selectedBand = firstBand;
      state.currentBandImage = firstBand.image;

      state.totalPrice =
        state.selectedFace.price + firstBand.price + state.size.price;
    },

    setView: (state, action: PayloadAction<"front" | "side">) => {
      state.view = action.payload;
    },

    setActiveSection: (
      state,
      action: PayloadAction<"size" | "face" | "band" | null>
    ) => {
      state.activeSection = action.payload;
    },
  },
});

export const {
  setCollection,
  setSize,
  setFace,
  setBand,
  setView,
  setActiveSection,
  setSelectedMainCase,
  setSelectedMainBand
} = watchSlice.actions;

export default watchSlice.reducer;
