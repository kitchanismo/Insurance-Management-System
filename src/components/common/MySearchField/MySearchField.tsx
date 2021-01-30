import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import OutlinedInput, {
  OutlinedInputProps,
} from '@material-ui/core/OutlinedInput'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import { useState } from 'react'

export interface MySearchFieldProps extends OutlinedInputProps {
  label?: string
  onSearch?: (value: string) => void
}

export const MySearchField: React.SFC<MySearchFieldProps> = ({
  label,
  onSearch,
  ...props
}) => {
  const [value, setValue] = useState('')
  return (
    <FormControl fullWidth variant='outlined'>
      <InputLabel htmlFor='outlined-adornment-password'>
        {label || 'Search...'}
      </InputLabel>
      <OutlinedInput
        {...props}
        id='outlined-adornment-password'
        name='search'
        type='text'
        labelWidth={props.labelWidth ? props.labelWidth : 65}
        value={value}
        onChange={({ target }) => setValue(target.value)}
        endAdornment={
          <InputAdornment position='end'>
            <IconButton
              onClick={() => onSearch?.call(null, value)}
              aria-label='toggle password visibility'
            >
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  )
}
