import React, { useContext } from 'react'
import Joi from 'joi'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'

export interface MyFormProps<T> {
  state: [T, React.Dispatch<React.SetStateAction<T>>]
  onSubmit: () => Promise<any>
  validator?: {}
  children?: (props: RenderProps) => JSX.Element
}

export interface InputProps {
  value?: string | Joi.StringSchema
  name: string
  placeholder?: string
  type?: string | 'text'
  label: string
}

export interface RenderProps {
  myInput: (input: InputProps) => JSX.Element
  myButton: () => JSX.Element
}

function MyForm<T>(props: MyFormProps<T>) {
  const [data, setData] = props.state

  const [isDisable, setIsDisable] = React.useState<boolean>(false)

  const [errors, setErrors] = React.useState<any>()

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget
    setData({
      ...data,
      [name]: value,
    })
  }

  const onValidate = () => {
    const schema = Joi.object(props.validator).options({ abortEarly: false })

    const { error } = schema.validate(data)

    if (!error) return null

    const _errors: any = {}

    error.details.forEach((item) => (_errors[item.path[0]] = item.message))

    return _errors
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const hasErrors = onValidate()

    setIsDisable(true)

    if (hasErrors) {
      setErrors(hasErrors)
      setIsDisable(false)
      return
    }

    return props
      .onSubmit()
      .then(() => {
        setErrors({})
        setIsDisable(false)
      })
      .catch((error) => {
        setIsDisable(false)
      })
  }

  const myInput = (input: InputProps) => {
    return (
      <Grid item xs={12}>
        <TextField
          fullWidth
          name={input.name}
          variant='outlined'
          label={input.label}
          type={input.type}
          value={input.value}
          onChange={onChange}
        />
      </Grid>
    )
  }

  // const myButton = () => {
  //   return (
  //     <Button
  //       loading={isDisable}
  //       fluid
  //       disabled={isDisable}
  //       color='purple'
  //       type='submit'
  //     >
  //       Submit
  //     </Button>
  //   )
  // }

  return (
    <form noValidate autoComplete='off'>
      <Grid container spacing={2} xs={12}>
        {props.children?.call(null, {
          myInput,
        } as RenderProps)}
      </Grid>
    </form>
    // <Form onSubmit={onSubmit} className={globalStyles.formContainer}>
    //   {isResolved && (
    //     <Notification color='purple' icon='check circle' header='Done!'>
    //       {props.resolveMessage || 'Thank you...'}
    //     </Notification>
    //   )}
    //   {isRejected && (
    //     <Notification color='red' icon='warning circle' header='Warning!'>
    //       {errorMessage}
    //     </Notification>
    //   )}
    //   {props.children?.call(null, {
    //     myInput,
    //     myButton,
    //   } as RenderProps)}
    // </Form>
  )
}

export default MyForm
