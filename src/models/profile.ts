import Joi from 'joi'

export default interface Profile {
  id?: number
  firstname?: string
  middlename?: string
  lastname?: string
  gender?: 'Male' | 'Female' | 'Other'
  civil?: 'Single' | 'Married' | 'Widowed'
  address?: string
  birthdate?: Date
  contact?: string
  image?: Blob
  image_url?: string
}
