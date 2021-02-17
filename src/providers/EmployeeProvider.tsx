import { Dispatch, createContext, useReducer, useEffect } from 'react'
import Employee from 'models/employee'
import { produce } from 'immer'
import Branch from 'models/branch'
import Position from 'models/position'

interface EmployeeState {
  employees: Employee[]
  isLoading: boolean
  employee: Employee
  branches: Branch[]
  positions: Position[]
  pages: number
  total: number
}

type EmployeeAction =
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
      payload: { employees: Employee[]; pages?: number; total?: number }
    }
  | {
      type: 'SET_IS_LOADING'
      payload: boolean
    }
  | {
      type: 'ON_LOAD_BRANCHES'
      payload: Branch[]
    }
  | {
      type: 'ON_LOAD_POSITIONS'
      payload: Position[]
    }
  | {
      type: 'SET_PAGES'
      payload: number
    }
  | {
      type: 'SET_TOTAL'
      payload: number
    }

const reducer = (state: EmployeeState, action: EmployeeAction) => {
  switch (action.type) {
    case 'ON_LOAD_BRANCHES':
      state.branches = action.payload
      break
    case 'ON_LOAD_POSITIONS':
      state.positions = action.payload
      break
    case 'ON_LOAD_EMPLOYEES':
      state.employees = action.payload.employees
      state.pages = action.payload.pages!
      state.total = action.payload.total!
      state.isLoading = false
      break
    case 'ON_ADD_EMPLOYEE':
      state.employees = [...state.employees, action.payload]
      break
    case 'ON_GET_EMPLOYEE':
      state.employee = state.employees.filter(
        (employee) => employee.id === action.payload,
      )[0]
      break
    case 'SET_IS_LOADING':
      state.isLoading = action.payload
      break
    case 'SET_PAGES':
      state.pages = action.payload
      break
    case 'SET_TOTAL':
      state.total = action.payload
      break
    default:
      return state
  }
  return state
}

export const EmployeeContext = createContext<
  [state: EmployeeState, dispatch: Dispatch<EmployeeAction>] | null
>(null)

export const EmployeeProvider: React.FC = (props) => {
  const [state, dispatch] = useReducer(produce(reducer), {
    employees: [],
    isLoading: false,
    employee: {},
    branches: [],
    positions: [
      { id: 1, name: 'Branch Manager' },
      { id: 2, name: 'Agency Manager' },
      { id: 3, name: 'Supervisor' },
      { id: 4, name: 'Sales Agent' },
    ],
    pages: 0,
    total: 0,
  })

  return (
    <EmployeeContext.Provider value={[state, dispatch]}>
      {props.children}
    </EmployeeContext.Provider>
  )
}
