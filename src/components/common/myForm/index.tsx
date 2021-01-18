import React, { useContext } from 'react'
import Joi from 'joi'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns/build'

export interface MyFormProps<T> {
  state: [T, React.Dispatch<React.SetStateAction<T>>]
  onSubmit: () => Promise<any>
  validator?: {}
  children?: (props: RenderProps) => JSX.Element
}

export interface InputProps {
  value?: any
  name: string
  placeholder?: string
  type?: string | 'text'
  label: string
  isMultiline?: boolean
}

export interface SelectProps extends InputProps {
  options: string[]
}

export interface RenderProps {
  myInput: (input: InputProps) => JSX.Element
  myDateTimePicker: (input: InputProps) => JSX.Element
  myButton: () => JSX.Element
  mySelect: (select: SelectProps) => JSX.Element
}

function MyForm<T>(props: MyFormProps<T>) {
  const [data, setData] = props.state

  const [isDisable, setIsDisable] = React.useState<boolean>(false)

  const [errors, setErrors] = React.useState<any>()

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

  const onChange = (e: React.ChangeEvent<any>) => {
    const { value, name } = e.target
    setData({
      ...data,
      [name]: value,
    })
  }

  const myInput = (input: InputProps) => {
    return (
      <Grid item xs={12}>
        <TextField
          multiline={input.isMultiline}
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

  const myDateTimePicker = (input: InputProps) => {
    return (
      <Grid item xs={12}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            fullWidth
            inputVariant='outlined'
            disableToolbar
            variant='dialog'
            format='MM/dd/yyyy'
            margin='none'
            label={input.label}
            value={input.value}
            onChange={(date) =>
              setData({
                ...data,
                [input.name]: date,
              })
            }
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>
      </Grid>
    )
  }

  const mySelect = (select: SelectProps) => {
    return (
      <Grid item xs={12}>
        <FormControl fullWidth variant='outlined'>
          <InputLabel id={select.label}>{select.label}</InputLabel>
          <Select
            labelId={select.label}
            id={select.name}
            name={select.name}
            value={select.value}
            onChange={onChange}
          >
            {select.options.map((option) => (
              <MenuItem value={option}>{option}</MenuItem>
            ))}
          </Select>
        </FormControl>
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
    <form onSubmit={onSubmit}>
      <Grid container spacing={2} direction='column'>
        {props.children?.call(null, {
          myInput,
          mySelect,
          myDateTimePicker,
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
