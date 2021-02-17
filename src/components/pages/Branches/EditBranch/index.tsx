import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import MyForm, { MyFormProps } from 'components/common/MyForm'
import Branch from 'models/branch'
import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import validator from 'validators/saveBranchValidator'
import { getBranch, saveBranch, updateBranch } from 'services/branchService'

export interface NewBranchProps {}

const EditBranch: React.SFC<NewBranchProps> = () => {
  const [branch, setBranch] = useState<Branch>({
    name: '',
    contact: '',
    address: '',
  })

  const history = useHistory()

  const params = useParams<{ id: string }>()

  useEffect(() => {
    getBranch(+params.id).then((branch) => setBranch(branch))
  }, [])

  const onSubmit = async (branch: Branch) => {
    updateBranch(branch).then((data) => console.log(data))
  }

  const formProps: MyFormProps<Branch> = {
    state: [branch, setBranch],
    onSubmit,
    validator,
  }

  return (
    <MyForm {...formProps}>
      {({ myButton, myControlledInput }) => (
        <>
          {myControlledInput({
            label: 'Branch Name',
            value: branch?.name,
            name: 'name',
          })}
          {myControlledInput({
            label: 'Contact',
            value: branch?.contact,
            name: 'contact',
          })}

          {myControlledInput({
            label: 'Address',
            value: branch?.address,
            name: 'address',
            isMultiline: true,
          })}

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

export default EditBranch
