import { store } from "@/store/store"

export const generateShareableUrl = () => {
  const state = store.getState().watch
  const params = new URLSearchParams()

  params.set('collection', state.collection)
  params.set('size', state.size.id)
  params.set('case', state.selectedFace.id)
  params.set('band', state.selectedBand.id)

  const baseUrl = window.location.origin + window.location.pathname
  return `${baseUrl}?${params.toString()}`
}

export const parseUrlParams = () => {
  if (typeof window === 'undefined') return null

  const params = new URLSearchParams(window.location.search)
  
  const configuration = {
    collection: params.get('collection'),
    size: params.get('size'),
    case: params.get('case'),
    band: params.get('band')
  }

  // Only return if all parameters are present
  if (Object.values(configuration).every(value => value)) {
    return configuration
  }

  return null
}

export const clearUrlParams = () => {
  if (typeof window === 'undefined') return
  
  window.history.replaceState({}, '', window.location.pathname)
}