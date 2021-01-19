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
          case 'any.empty':
            err.message = `"${label}" is not allowed to be empty`
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

export const nameCapitalize = (name: string) =>
  name.charAt(0).toUpperCase() + name.slice(1) || ''

export const getDecodeToken: any = () => {
  const token = localStorage.getItem('access-token')

  try {
    if (token) {
      return jwtDecode(token)
    }
  } catch (error) {
    return null
  }
}
