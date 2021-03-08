import React, { useContext, memo } from 'react'
import Joi from 'joi'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Radio from '@material-ui/core/Radio'
import DateFnsUtils from '@date-io/date-fns/build'
import FormHelperText from '@material-ui/core/FormHelperText'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputAdornment from '@material-ui/core/InputAdornment'
import Divider from '@material-ui/core/Divider'
import CircularProgress from '@material-ui/core/CircularProgress'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import Visibility from '@material-ui/icons/Visibility'
import HeadShake from 'react-reveal/HeadShake'

import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers'
import { GlobalContext } from 'providers/GlobalProvider'

export interface MyFormProps<T> {
  state: [T, React.Dispatch<React.SetStateAction<T>>]
  onSubmit: (data: T) => Promise<any>
  validator?: {}
  radioButtonDefaultValue?: string
  children?: (props: RenderProps) => JSX.Element
}

export interface InputProps {
  value?: any
  name: string
  placeholder?: string
  type?: string | 'text'
  label?: string
  isMultiline?: boolean
  onChange?: (e: any) => void
  onTogglePassword?: React.Dispatch<React.SetStateAction<boolean>>
}

export interface OptionProps {
  name?: string
  value: any
}

export interface SelectProps extends InputProps {
  options: OptionProps[]
  subLabel?: string
  labelWidth?: number
}

export interface RenderProps {
  myInput: (input: InputProps) => JSX.Element
  myInputPassword: (input: InputProps) => JSX.Element
  myDateTimePicker: (input: InputProps) => JSX.Element
  myButton: (text?: string) => JSX.Element
  mySelect: (select: SelectProps) => JSX.Element
  myRadio: (input: InputProps) => JSX.Element
  myControlledInput: (input: InputProps) => JSX.Element
  MyButtonMemo: React.MemoExoticComponent<
    (props: { text?: string }) => JSX.Element
  >
}

const MyButtonMemo = (isDisable: boolean) =>
  memo((props: { text?: string }) => {
    console.log('hit memo')
    return (
      <Grid item xs={12}>
        <Button
          disabled={isDisable}
          style={{ paddingTop: 15, paddingBottom: 15 }}
          fullWidth
          type='submit'
          variant='contained'
          color='primary'
          startIcon={
            isDisable && (
              <CircularProgress
                color='primary'
                size={24}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: -12,
                  marginLeft: -12,
                }}
              />
            )
          }
        >
          {props.text ?? 'SUBMIT'}
        </Button>
      </Grid>
    )
  })

function MyForm<T>(props: MyFormProps<T>) {
  const [state, dispatch] = useContext(GlobalContext)!

  const [data, setData] = props.state

  const [isDisable, setIsDisable] = React.useState<boolean>(false)

  const [selectedValue, setSelectedValue] = React.useState(
    props.radioButtonDefaultValue ?? ''
  )

  const [errors, setErrors] = React.useState<any>(null)

  const onValidate = (_data: T) => {
    const schema = Joi.object(props.validator).options({
      abortEarly: false,
      allowUnknown: true,
    })

    const { error } = schema.validate(_data)

    if (!error) return null

    console.log(error)

    const _errors: any = {}

    error.details.forEach((item) => (_errors[item.path[0]] = item.message))

    return _errors
  }

  const onChangeRadio = (e: any) => {
    setSelectedValue(e.target.value)
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
      dispatch({
        type: 'SET_ALERT',
        payload: {
          message: 'Fill out all the fields.',
          type: 'error',
        },
      })
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

  const myControlledInput = (input: InputProps) => {
    const error = errors && errors[input.name]

    return (
      <Grid item xs={12} key={input.name}>
        <TextField
          value={input.value}
          multiline={input.isMultiline}
          fullWidth
          name={input.name}
          variant='outlined'
          label={input.label}
          type={input.type}
          error={!!error}
          helperText={error}
          onChange={(e) =>
            input.onChange
              ? input.onChange(e)
              : setData((data) => ({ ...data, [input.name]: e.target.value }))
          }
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
                      (isVisible) => !isVisible
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
    const error = errors && errors[input.name]

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
            error={!!error}
            helperText={error}
            label={input.label}
            value={input.value ?? null}
            onChange={(date) => {
              setData({
                ...data,
                [input.name]: date?.toLocaleDateString(),
              })
            }}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>
      </Grid>
    )
  }

  const myRadio = (input: InputProps) => {
    return (
      <Radio
        checked={selectedValue === input.value}
        onChange={onChangeRadio}
        value={input.value}
        name={input.name}
      />
    )
  }

  const mySelect = (select: SelectProps) => {
    const error = errors && errors[select.name ?? select.value]
    return (
      <Grid item xs={12} key={select.name ?? select.value}>
        <FormControl fullWidth variant='outlined' error={!!error}>
          <InputLabel id={select.label}>{select.label}</InputLabel>
          <Select
            labelId={select.label}
            id={select.name ?? select.value}
            name={select.name ?? select.value}
            value={select.value || ''}
            onChange={
              select.onChange
                ? select.onChange
                : (e: any) => {
                    const { value } = e.target
                    if (error && value !== 'clear') {
                      const _errors = { ...errors }
                      delete _errors[select.name]
                      setErrors(_errors)
                    }
                    setData({
                      ...data,
                      [select.name]: value !== 'clear' ? value : '',
                    })
                  }
            }
            labelWidth={select.labelWidth ?? 60}
          >
            {select.options.map((option) => (
              <MenuItem value={option.value}>
                {option.name
                  ? select.subLabel
                    ? option.name + '-' + select.subLabel
                    : option.name
                  : option.value}
              </MenuItem>
            ))}
            <Divider style={{ marginLeft: 15, marginRight: 15 }}></Divider>
            <MenuItem value='clear'>Clear</MenuItem>
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
          fullWidth
          type='submit'
          variant='contained'
          color='primary'
          startIcon={
            isDisable && (
              <CircularProgress
                color='primary'
                size={24}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: -12,
                  marginLeft: -12,
                }}
              />
            )
          }
        >
          {text ?? 'SUBMIT'}
        </Button>
      </Grid>
    )
  }

  return (
    <form onSubmit={onSubmit}>
      <Grid
        style={{ pointerEvents: isDisable ? 'none' : 'all' }}
        container
        spacing={2}
        direction='column'
      >
        {props.children?.({
          myInput,
          myControlledInput,
          myInputPassword,
          mySelect,
          myDateTimePicker,
          myButton,
          myRadio,
          MyButtonMemo: MyButtonMemo(isDisable),
        } as RenderProps)}
      </Grid>
    </form>
  )
}

export default MyForm
