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
