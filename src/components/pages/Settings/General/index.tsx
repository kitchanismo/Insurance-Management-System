import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import MyCard from 'components/common/MyCard'
import { useContext, useEffect, useState } from 'react'
import { GlobalContext } from 'providers/GlobalProvider'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import { getApiKeys, setApiKeys } from 'services/settingService'
import MyForm, { MyFormProps } from 'components/common/MyForm'
import validator from 'validators/settingValidator'
import { getCurrentUser } from 'utils/helper'

export interface SettingsProps {}

const Settings: React.SFC<SettingsProps> = () => {
  const [state, dispatch] = useContext(GlobalContext)!

  const [keys, setKeys] = useState<{ apiCode: string; apiPassword: string }>({
    apiCode: '',
    apiPassword: '',
  })

  useEffect(() => {
    if (getCurrentUser()?.role === 'admin') {
      getApiKeys().then((keys) => setKeys(keys))
    }
  }, [])

  const onSave = () => {
    localStorage.setItem('theme', state.isDark ? 'dark' : 'light')
    dispatch({
      type: 'SET_ALERT',
      payload: { message: 'Saved', type: 'success' },
    })
  }

  const onSubmit = async () => {
    setApiKeys(keys).then(() => {
      dispatch({
        type: 'SET_ALERT',
        payload: { message: 'Saved', type: 'success' },
      })
    })
  }

  const formProps: MyFormProps<{ apiCode: string; apiPassword: string }> = {
    state: [keys, setKeys],
    onSubmit,
    validator,
  }

  return (
    <>
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
          <Button
            style={{ marginTop: 20 }}
            onClick={onSave}
            fullWidth
            variant='contained'
            color='primary'
          >
            Save
          </Button>
        </Grid>
      </MyCard>

      {state?.currentUser?.role === 'admin' && (
        <MyCard style={{ marginTop: 20 }} title='SMS Settings'>
          <Grid style={{ padding: 20 }} direction='column' container xs={12}>
            <MyForm {...formProps}>
              {({ myControlledInput, myButton }) => (
                <>
                  {myControlledInput({
                    label: 'API CODE',
                    value: keys.apiCode,
                    name: 'apiCode',
                  })}
                  {myControlledInput({
                    label: 'API PASSWORD',
                    value: keys.apiPassword,
                    name: 'apiPassword',
                  })}
                  {myButton('Save')}
                </>
              )}
            </MyForm>
          </Grid>
        </MyCard>
      )}
    </>
  )
}

export default Settings
