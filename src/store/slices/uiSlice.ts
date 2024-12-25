import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UIState {
  isLanding: boolean
  isCollectionDrop: boolean
  featureButtonOpen: string | null
}

const initialState: UIState = {
  isLanding: true,
  isCollectionDrop: false,
  featureButtonOpen: null
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLanding: (state, action: PayloadAction<boolean>) => {
      state.isLanding = action.payload
    },
    setIsCollectionDrop: (state, action: PayloadAction<boolean>) => {
      state.isCollectionDrop = action.payload
    },
    setFeatureButtonOpen: (state, action: PayloadAction<string>) => {
      state.featureButtonOpen = state.featureButtonOpen === action.payload ? null : action.payload;
    }
  }
})

export const { setLanding, setIsCollectionDrop, setFeatureButtonOpen } = uiSlice.actions

export default uiSlice.reducer

