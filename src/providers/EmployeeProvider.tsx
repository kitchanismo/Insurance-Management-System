import { Dispatch, createContext, useReducer } from 'react'
import Employee from 'models/employee'
import { produce } from 'immer'

interface EmployeeState {
  employees: Employee[]
  isLoading: boolean
  employee: Employee
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
      payload: Employee[]
    }
  | {
      type: 'SET_IS_LOADING'
      payload: boolean
    }

const reducer = (state: EmployeeState, action: EmployeeAction) => {
  switch (action.type) {
    case 'ON_LOAD_EMPLOYEES':
      state.employees = action.payload
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
  })

  return (
    <EmployeeContext.Provider value={[state, dispatch]}>
      {props.children}
    </EmployeeContext.Provider>
  )
}
