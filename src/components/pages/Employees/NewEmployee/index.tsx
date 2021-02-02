import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import Grid from '@material-ui/core/Grid'
import { GlobalContext } from 'hooks/useGlobalState'
import validator from '../../../../validators/saveEmployeeValidator'
import MyForm, { MyFormProps, InputProps } from 'components/common/MyForm'
import Employee from 'models/employee'
import { postImage } from 'api/employeeService'

export interface NewUserProps {}

const NewEmployee: React.SFC<NewUserProps> = () => {
  const [_, dispatch] = useContext(GlobalContext)!

  const [imageFile, setImageFile] = React.useState<HTMLImageElement | null>(
    null,
  )

  const history = useHistory()

  const [employee, setEmployee] = React.useState<Employee>({
    firstname: 'dfdf',
    middlename: '',
    lastname: '',
    address: '',
    contact: '',
  })

  const onSubmit = async (data: Employee) => {
    //console.log(data)
    const formData = new FormData()
    formData.append('file', data?.image as any)
    formData.append('upload_preset', 'wlttlc0c')
    formData.append('cloud_name', 'kitchanismo')

    postImage(formData)
      .then((res) => {
        dispatch({
          type: 'SET_ALERT',
          payload: { message: 'Successfully added', type: 'success' },
        })
        console.log(res.data)
      })
      .catch((error) =>
        dispatch({
          type: 'SET_ALERT',
          payload: { message: 'Error', type: error.message },
        }),
      )

    return Promise.resolve()
  }

  const formProps: MyFormProps<Employee> = {
    state: [employee, setEmployee],
    onSubmit,
    validator,
  }

  return (
    <MyForm {...formProps}>
      {({ myInput, mySelect, myDateTimePicker, myButton }) => (
        <>
          {myInput({
            label: 'Firstname',
            value: employee.firstname,
            name: 'firstname',
          })}
          {myInput({
            label: 'Middlename',
            value: employee.middlename,
            name: 'middlename',
          })}
          {myInput({
            label: 'Lastname',
            value: employee.lastname,
            name: 'lastname',
          })}
          {myInput({
            label: 'Contact Number',
            value: employee.contact,
            name: 'contact',
          })}

          {myInput({
            label: 'Address',
            value: employee.address,
            name: 'address',
            isMultiline: true,
          })}
          {mySelect({
            label: 'Gender',
            value: employee.gender,
            name: 'gender',
            options: [
              { value: 'Male' },
              { value: 'Female' },
              { value: 'Other' },
            ],
          })}
          {mySelect({
            label: 'Civil Status',
            value: employee.civil,
            name: 'civil',
            labelWidth: 80,
            options: [
              { value: 'Single' },
              { value: 'Married' },
              { value: 'Widowed' },
            ],
          })}

          {mySelect({
            label: 'Position',
            value: employee.position,
            name: 'position',
            labelWidth: 55,
            options: [
              { value: 'Sales Agent' },
              { value: 'Branch Manager' },
              { value: 'Agency Manager' },
              { value: 'Supervisor' },
            ],
          })}

          {mySelect({
            label: 'Branch',
            value: employee.branch,
            name: 'branch',
            labelWidth: 55,
            options: [{ value: 'Cebu' }, { value: 'Manila' }],
          })}

          {mySelect({
            label: 'Team',
            value: employee.team,
            name: 'team',
            labelWidth: 40,
            options: [{ value: 'ABC' }],
          })}

          {myDateTimePicker({
            label: 'Birthdate',
            value: employee.birthdate,
            name: 'birthdate',
          })}

          <Grid
            container
            style={{
              paddingLeft: 15,
              paddingRight: 15,
              marginBottom: 10,
            }}
            alignItems='center'
            justify='space-between'
            xs={12}
          >
            <Typography variant='subtitle1'>
              {imageFile?.name || 'Select Photo'}
            </Typography>
            <>
              <input
                accept='image/*'
                style={{
                  display: 'none',
                }}
                name='image'
                id='icon-button-file'
                type='file'
                onChange={(e: any) => {
                  setImageFile(e.target.files[0])
                }}
              />
              <label htmlFor='icon-button-file'>
                <IconButton
                  color='primary'
                  aria-label='upload picture'
                  component='span'
                >
                  <PhotoCamera />
                </IconButton>
              </label>
            </>
          </Grid>

          <Grid
            style={{ paddingLeft: 18, paddingTop: 10, paddingBottom: 5 }}
            container
            xs={12}
            justify='center'
            spacing={2}
          >
            <Grid item xs={6}>
              <Button
                onClick={() => history.goBack()}
                style={{ paddingTop: 15, paddingBottom: 15 }}
                fullWidth
                variant='contained'
                color='default'
              >
                BACK
              </Button>
            </Grid>
            <Grid item xs={6}>
              {myButton()}
            </Grid>
          </Grid>
        </>
      )}
    </MyForm>
  )
}
export default NewEmployee
