import { useReducer } from 'react'
import Employee from 'models/employee'

export interface EmployeeState {
  employees: Employee[]
  isLoading: boolean
  employee: Employee
}

export type EmployeeAction =
  | {
      type: 'ON_ADD_EMPLOYEE'
      payload: Employee
    }
  | {
      type: 'ON_GET_EMPLOYEE'
      payload: number
    }
  | {
      type: 'ON_LOAD_EMPLOYEES'
      payload: Employee[]
    }
  | {
      type: 'SET_IS_LOADING'
      payload: boolean
    }

const reducer = (state: EmployeeState, action: EmployeeAction) => {
  switch (action.type) {
    case 'ON_LOAD_EMPLOYEES':
      return { ...state, employees: action.payload, isLoading: false }
    case 'ON_ADD_EMPLOYEE':
      return { ...state, employees: [...state.employees, action.payload] }
    case 'ON_GET_EMPLOYEE':
      const employee = state.employees.filter(
        (employee) => employee.id === action.payload,
      )[0]
      console.log('reducer:', employee)
      return { ...state, employee }
    case 'SET_IS_LOADING':
      return { ...state, isLoading: action.payload }
    default:
      return state
  }
}

const useEmployeeState = () => {
  const [state, dispatch] = useReducer(reducer, {
    employees: [],
    isLoading: false,
    employee: {},
  })

  return { state, dispatch }
}

export default useEmployeeState
