import Joi from 'joi'

export default interface Profile {
  id?: number | Joi.NumberSchema
  firstname: string | Joi.StringSchema
  middlename: string | Joi.StringSchema
  lastname: string | Joi.StringSchema
  gender: 'Male' | 'Female' | 'Other' | Joi.StringSchema | ''
  civil: 'Single' | 'Married' | 'Widowed' | Joi.StringSchema | ''
  address?: string | Joi.StringSchema | ''
  birthdate: Date | Joi.DateSchema | null
  contact?: string | Joi.StringSchema | ''
}
