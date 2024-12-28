import { configureStore } from '@reduxjs/toolkit'
import watchReducer from './slices/watchSlice'
import uiReducer from './slices/uiSlice'

export const store = configureStore({
  reducer: {
    watch: watchReducer,
    ui: uiReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

