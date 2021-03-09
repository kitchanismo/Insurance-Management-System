import { createContext, Dispatch, useReducer } from 'react'
import { produce } from 'immer'
import Branch from 'models/branch'

export const StatContext = createContext<
  [state: StatState, dispatch: Dispatch<StatAction>] | null
>(null)

interface StatisticsProps {
  totalClients: number
  grossSales: number
  netSales: number
  near: number
  lapsed: number
  releaseCommissions: number
  unreleaseCommissions: number
  draft: number
}

interface StatState {
  stat: StatisticsProps
}

export type StatAction = {
  type: 'ON_LOAD_STAT'
  payload: StatisticsProps
}

const reducer = (state: StatState, action: StatAction) => {
  switch (action.type) {
    case 'ON_LOAD_STAT':
      state.stat = action.payload
      break
    default:
      return state
  }
  return state
}

export const StatisticProvider: React.FC = (props) => {
  const [state, dispatch] = useReducer(produce(reducer), {
    stat: {
      totalClients: 0,
      grossSales: 0,
      netSales: 0,
      near: 0,
      lapsed: 0,
      releaseCommissions: 0,
      unreleaseCommissions: 0,
      draft: 0,
    },
  })

  return (
    <StatContext.Provider value={[state, dispatch]}>
      {props.children}
    </StatContext.Provider>
  )
}
