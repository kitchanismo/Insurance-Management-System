import useEmployeeState, {
  EmployeeState,
  EmployeeAction,
} from 'hooks/useEmployeeState'
import { Dispatch, createContext } from 'react'

export const EmployeeContext = createContext<
  [state: EmployeeState, dispatch: Dispatch<EmployeeAction>] | null
>(null)

export const EmployeeProvider: React.FC = (props) => {
  const { state, dispatch } = useEmployeeState()
  return (
    <EmployeeContext.Provider value={[state, dispatch]}>
      {props.children}
    </EmployeeContext.Provider>
  )
}
