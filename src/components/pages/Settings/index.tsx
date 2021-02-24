import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import MyCard from 'components/common/MyCard'
import { useContext } from 'react'
import { GlobalContext } from 'providers/GlobalProvider'
import Button from '@material-ui/core/Button'

export interface SettingsProps {}

const Settings: React.SFC<SettingsProps> = () => {
  const [state, dispatch] = useContext(GlobalContext)!

  const onSave = () => {
    localStorage.setItem('theme', state.isDark ? 'dark' : 'light')
    dispatch({
      type: 'SET_ALERT',
      payload: { message: 'Saved', type: 'success' },
    })
  }

  return (
    <Grid xs={12} container>
      <MyCard title='General Settings'>
        <Grid style={{ padding: 20 }} direction='column' container xs={12}>
          <Typography variant='subtitle1'>Theme</Typography>
          <FormControlLabel
            control={
              <Switch
                checked={state.isDark}
                onChange={() => dispatch({ type: 'TOGGLE_THEME' })}
                name='checkedA'
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
            }
            label='Dark Mode'
          />
          <Button onClick={onSave} fullWidth variant='text' color='primary'>
            Save
          </Button>
        </Grid>
      </MyCard>
    </Grid>
  )
}

export default Settings
