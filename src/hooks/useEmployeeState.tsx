import { useReducer } from 'react'
import Employee from 'models/employee'

export interface EmployeeState {
  employees: Employee[]
  isLoading: boolean
}

export type EmployeeAction = {
  type: 'ON_LOAD_EMPLOYEES'
  payload: Employee[]
}

const reducer = (state: EmployeeState, action: EmployeeAction) => {
  switch (action.type) {
    case 'ON_LOAD_EMPLOYEES':
      return { ...state, employees: action.payload, isLoading: false }
    default:
      return state
  }
}

const useEmployeeState = () => {
  const [state, dispatch] = useReducer(reducer, {
    employees: [],
    isLoading: false,
  })

  return { state, dispatch }
}

export default useEmployeeState
