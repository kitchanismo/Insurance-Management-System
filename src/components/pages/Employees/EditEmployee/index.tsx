import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { GlobalContext } from 'providers/GlobalProvider'
import validator from 'validators/saveEmployeeValidator'
import MyForm, { MyFormProps } from 'components/common/MyForm'
import Employee from 'models/employee'
import { EmployeeContext } from 'providers/EmployeeProvider'
import { getEmployee, updateEmployee } from 'services/employeeService'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import { postImage } from 'services/imageService'
import { getBranches } from 'services/branchService'
import { BranchContext } from 'providers/BranchProvider'

export interface EditUserProps {}

const EditEmployee: React.SFC<EditUserProps> = () => {
  const [_, globalDispatch] = useContext(GlobalContext)!

  const [employeeState, employeeDispatch] = useContext(EmployeeContext)!

  const [branchState, branchDispatch] = useContext(BranchContext)!

  const history = useHistory()

  const params = useParams<{ id: string }>()

  const [isLoading, setIsLoading] = useState(false)

  const [imageFile, setImageFile] = useState<HTMLImageElement | null>(null)

  const [employee, setEmployee] = useState<Employee>({
    address: '',
    firstname: '',
    middlename: '',
    lastname: '',
    contact: '',
  })

  useEffect(() => {
    globalDispatch({ type: 'SET_TITLE', payload: 'Edit Employee' })
    setIsLoading(true)
    getEmployee(params.id).then((employee) => {
      setEmployee(employee)
      setIsLoading(false)
    })
    getBranches().then((branches) =>
      branchDispatch({ type: 'ON_LOAD_BRANCHES', payload: branches })
    )
  }, [])

  const onSubmit = async (employee: Employee) => {
    return postImage(employee?.image!, (image_url: string) => {
      delete employee.image

      return updateEmployee({
        ...employee,
        image_url: !!image_url ? image_url : employee.image_url,
      })
        .then(() => {
          globalDispatch({
            type: 'SET_ALERT',
            payload: { message: 'Successfully saved', type: 'success' },
          })
          globalDispatch({ type: 'SET_IS_LOADING', payload: false })
        })
        .catch((error) => {
          if (error.response.status === 400) {
            globalDispatch({
              type: 'SET_ALERT',
              payload: { message: error.response.data.error, type: 'error' },
            })
          }
          globalDispatch({ type: 'SET_IS_LOADING', payload: false })
        })
    })
  }

  const formProps: MyFormProps<Employee> = {
    state: [employee, setEmployee],
    onSubmit,
    validator,
  }

  return (
    <MyForm {...formProps}>
      {({ mySelect, myDateTimePicker, myButton, myControlledInput }) => (
        <>
          {myControlledInput({
            label: 'Firstname',
            value: employee.firstname,
            name: 'firstname',
          })}
          {myControlledInput({
            label: 'Middlename',
            value: employee.middlename,
            name: 'middlename',
          })}
          {myControlledInput({
            label: 'Lastname',
            value: employee.lastname,
            name: 'lastname',
          })}
          {myControlledInput({
            label: 'Contact Number',
            value: employee.contact,
            name: 'contact',
          })}

          {myControlledInput({
            label: 'Address',
            value: employee.address,
            name: 'address',
            isMultiline: true,
          })}

          {myDateTimePicker({
            label: 'Birthdate',
            value: employee.birthdate,
            name: 'birthdate',
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
            options: employeeState.positions.map((position) => ({
              value: position.id,
              name: position.name,
            })),
          })}

          {mySelect({
            label: 'Branch',
            value: employee.branch + '',
            name: 'branch',
            labelWidth: 55,
            options: branchState.branches.map((branch) => ({
              value: branch.id,
              name: branch.name,
            })),
          })}

          {mySelect({
            label: 'Status',
            value: employee.status,
            name: 'status',
            labelWidth: 40,
            options: [
              { value: 'active', name: 'Active' },
              { value: 'deactive', name: 'Deactive' },
              { value: 'deceased', name: 'Deceased' },
            ],
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
export default EditEmployee
