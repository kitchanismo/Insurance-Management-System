import Joi from 'joi'
import jwtDecode from 'jwt-decode'

export const lettersOnly = (label: string) => {
  return Joi.string()
    .required()
    .label(label)
    .regex(/^[A-Za-z\s]*$/)
    .error((errors: any) => {
      errors.forEach((err: any) => {
        switch (err.code) {
          case 'string.empty':
            err.message = `"${label}" is required`
            break
          case 'string.pattern.base':
            err.message = `"${label}" must not have a number or special character`
            break
          default:
            break
        }
      })
      return errors
    })
}

export function toElipse(str, end = 20) {
  const x = str.substring(0, end)
  const hasElipse = str.length > end ? '...' : ''
  return `${x} ${hasElipse}`
}

export const alphaNumeric = (label: string) => {
  return Joi.string()
    .required()
    .label(label)
    .alphanum()
    .error((errors: any) => {
      errors.forEach((err: any) => {
        if (err.code === 'string.empty') {
          err.message = `"${label}" is required`
        }
      })
      return errors
    })
}

export const notNull = (label: string) => {
  return Joi.required()
    .not(null)
    .not('')
    .messages({
      'any.invalid': `"${label}" is required`,
      'any.required': `"${label}" is required`,
    })
}

export const nameCapitalize = (name: string) =>
  name.charAt(0).toUpperCase() + name.slice(1) || ''

export const getDecodeToken: any = () => {
  const token = localStorage.getItem('access_token')

  try {
    if (token) {
      return jwtDecode(token)
    }
  } catch (error) {
    return null
  }
}

export const getCurrentUser = () =>
  getDecodeToken() ? { ...getDecodeToken().data } : null

export const saveToken = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}

export const calculateAge = (date: any) => {
  if (!date) return 0
  const birthdate = new Date(new Date(date).toLocaleDateString())

  const ageDif = Date.now() - birthdate.getTime()
  const ageDate = new Date(ageDif)
  return Math.abs(ageDate.getUTCFullYear() - 1970)
}

export const getNumberWithOrdinal = (num: number) => {
  var s = ['th', 'st', 'nd', 'rd'],
    v = num % 100
  return num + (s[(v - 20) % 10] || s[v] || s[0])
}

export const capitalize = (s: string) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase()
}

export const toMoney = (num: number) => {
  return '₱ ' + num?.toLocaleString(undefined, { minimumFractionDigits: 2 })
}

function convertToCSV(arr) {
  const array = [Object.keys(arr[0])].concat(arr)

  return array
    .map((it) => {
      return Object.values(it).toString()
    })
    .join('\n')
}

export const downloadCSV = (csvData) => {
  const csv = convertToCSV(csvData)
  var data = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  var csvURL = window.URL.createObjectURL(data)
  var tempLink = document.createElement('a')
  tempLink.href = csvURL
  tempLink.setAttribute('download', `${new Date().getTime()}.csv`)
  tempLink.click()
}
