import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UIState {
  isLanding: boolean
  isCollectionModal: boolean
}

const initialState: UIState = {
  isLanding: true,
  isCollectionModal: false
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLanding: (state, action: PayloadAction<boolean>) => {
      state.isLanding = action.payload
    },
    setCollectionModal: (state, action: PayloadAction<boolean>) => {
      state.isCollectionModal = action.payload
    }
  }
})

export const { setLanding, setCollectionModal } = uiSlice.actions

export default uiSlice.reducer

