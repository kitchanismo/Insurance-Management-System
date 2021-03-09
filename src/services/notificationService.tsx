import Notification from 'models/notification'
import http from 'utils/http'

export const getNotifications = () => {
  return http.get('/notifications').then(({ data }) => data)
}

export const getUnread = () => {
  return http.get('/notifications/unread').then(({ data }) => data)
}

export const markAsRead = (notification: Notification) => {
  return http
    .get('/notifications/unread/' + notification?.id)
    .then(({ data }) => data)
}

export const markAllAsRead = () => {
  return http.get('/notifications/unread/all').then(({ data }) => data)
}

export const send = (notification: Notification) => {
  return http.post('/notifications/send', notification).then(({ data }) => data)
}
