import { GlobalProps, AlertProps } from '../contexts/globalContext'

import { useReducer, useState } from 'react'

export interface GlobalState {
  alert: AlertProps | null
  title: string
  isDark: boolean
}

export type GlobalAction =
  | { type: 'setAlert'; payload: AlertProps | null }
  | { type: 'hideAlert' }
  | { type: 'setTitle'; payload: string }
  | { type: 'toggleTheme' }

const globalReducer = (state: GlobalState, action: GlobalAction) => {
  switch (action.type) {
    case 'setAlert':
      return { ...state, alert: action.payload }
    case 'hideAlert':
      return { ...state, alert: null }
    case 'setTitle':
      return { ...state, title: action.payload }
    case 'toggleTheme':
      return { ...state, isDark: !state.isDark }
    default:
      return state
  }
}

const useGlobalState = () => {
  const reducer = useReducer(globalReducer, {
    alert: null,
    title: '',
    isDark: false,
  })

  return reducer
}

export default useGlobalState
