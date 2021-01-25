import React, { useRef, RefObject, MutableRefObject } from 'react'
import Joi from 'joi'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import DateFnsUtils from '@date-io/date-fns/build'
import FormHelperText from '@material-ui/core/FormHelperText'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputAdornment from '@material-ui/core/InputAdornment'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import Visibility from '@material-ui/icons/Visibility'
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers'
import { endOfYesterday } from 'date-fns'

export interface MyFormProps<T> {
  state: [T, React.Dispatch<React.SetStateAction<T>>]
  onSubmit: (data: T) => Promise<any>
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
  onTogglePassword?: React.Dispatch<React.SetStateAction<boolean>>
}

export interface SelectProps extends InputProps {
  options: string[]
}

export interface RenderProps {
  myInput: (input: InputProps) => JSX.Element
  myInputPassword: (input: InputProps) => JSX.Element
  myDateTimePicker: (input: InputProps) => JSX.Element
  myButton: (text?: string) => JSX.Element
  mySelect: (select: SelectProps) => JSX.Element
}

export function MyForm<T>(props: MyFormProps<T>) {
  const [data, setData] = props.state

  const [isDisable, setIsDisable] = React.useState<boolean>(false)

  const [errors, setErrors] = React.useState<any>(null)

  const onValidate = (_data: T) => {
    const schema = Joi.object(props.validator).options({
      abortEarly: false,
    })

    const { error } = schema.validate(_data)

    if (!error) return null

    const _errors: any = {}

    error.details.forEach((item) => (_errors[item.path[0]] = item.message))

    return _errors
  }

  const onSubmit = (e: any) => {
    e.preventDefault()

    const newData = { ...data } as any

    for (let [key, value] of new FormData(e.target).entries()) {
      newData[key] = value
    }
    const hasErrors = onValidate(newData)

    setIsDisable(true)

    if (hasErrors) {
      setErrors(hasErrors)
      setIsDisable(false)
      return
    }

    return props
      .onSubmit(newData)
      .then(() => {
        setErrors({})
        setIsDisable(false)
      })
      .catch((error) => {
        setIsDisable(false)
      })
  }

  const myInput = (input: InputProps) => {
    const error = errors && errors[input.name]

    return (
      <Grid item xs={12} key={input.name}>
        <TextField
          defaultValue={input.value}
          multiline={input.isMultiline}
          fullWidth
          name={input.name}
          variant='outlined'
          label={input.label}
          type={input.type}
          error={!!error}
          helperText={error}
        />
      </Grid>
    )
  }

  const myInputPassword = (input: InputProps) => {
    const error = errors && errors[input.name]

    return (
      <Grid item xs={12} key={input.name}>
        <FormControl fullWidth variant='outlined' error={!!error}>
          <InputLabel htmlFor={input.label}>{input.label}</InputLabel>
          <OutlinedInput
            defaultValue={input.value}
            id={input.name}
            name={input.name}
            type={input.type}
            labelWidth={70}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={() =>
                    input.onTogglePassword?.call(
                      null,
                      (isVisible) => !isVisible,
                    )
                  }
                >
                  {input.type !== 'password' ? (
                    <Visibility />
                  ) : (
                    <VisibilityOff />
                  )}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText>{error}</FormHelperText>
        </FormControl>
      </Grid>
    )
  }

  const myDateTimePicker = (input: InputProps) => {
    return (
      <Grid item xs={12} key={input.name}>
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
                [input.name]: date?.toLocaleDateString(),
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
    const error = errors && errors[select.name]
    return (
      <Grid item xs={12} key={select.name}>
        <FormControl fullWidth variant='outlined' error={!!error}>
          <InputLabel id={select.label}>{select.label}</InputLabel>
          <Select
            labelId={select.label}
            id={select.name}
            name={select.name}
            value={select.value === null ? '' : select.value}
            onChange={(e: any) => {
              const { value, name } = e.target
              setData({
                ...data,
                [name]: value,
              })
            }}
            labelWidth={60}
          >
            {select.options.map((option, index) => (
              <MenuItem value={option}>{option}</MenuItem>
            ))}
          </Select>
          <FormHelperText>{error}</FormHelperText>
        </FormControl>
      </Grid>
    )
  }

  const myButton = (text?: string) => {
    return (
      <Grid item xs={12}>
        <Button
          disabled={isDisable}
          style={{ paddingTop: 15, paddingBottom: 15 }}
          fullWidth
          type='submit'
          variant='contained'
          color='primary'
        >
          {text ?? 'SUBMIT'}
        </Button>
      </Grid>
    )
  }

  return (
    <form onSubmit={onSubmit}>
      <Grid container spacing={2} direction='column'>
        {props.children?.call(null, {
          myInput,
          myInputPassword,
          mySelect,
          myDateTimePicker,
          myButton,
        } as RenderProps)}
      </Grid>
    </form>
  )
}
