import { createContext, Dispatch, useReducer, useEffect } from 'react'
import { produce } from 'immer'
import Notification from 'models/notification'
import { getUnread } from 'services/notificationService'
import { getCurrentUser } from 'utils/helper'

export const NotificationContext = createContext<
  [state: NotificationState, dispatch: Dispatch<NotificationAction>] | null
>(null)

interface NotificationState {
  notifications: Notification[]
  unread: number
}

export type NotificationAction =
  | {
      type: 'ON_LOAD_NOTIFICATIONS'
      payload: Notification[]
    }
  | {
      type: 'ON_LOAD_UNREAD'
      payload: number
    }

const reducer = (state: NotificationState, action: NotificationAction) => {
  switch (action.type) {
    case 'ON_LOAD_NOTIFICATIONS':
      state.notifications = action.payload
      break
    case 'ON_LOAD_UNREAD':
      state.unread = action.payload
      break
    default:
      return state
  }
  return state
}

export const NotificationProvider: React.FC = (props) => {
  const [state, dispatch] = useReducer(produce(reducer), {
    notifications: [],
    unread: 0,
  })

  useEffect(() => {
    if (getCurrentUser()?.role === 'admin') {
      getUnread().then((data) => {
        dispatch({ type: 'ON_LOAD_UNREAD', payload: data.count })
      })
    }
  }, [state.notifications])

  return (
    <NotificationContext.Provider value={[state, dispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}
