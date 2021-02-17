import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import MyForm, { MyFormProps } from 'components/common/MyForm'
import Branch from 'models/branch'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import validator from 'validators/saveBranchValidator'
import { saveBranch } from 'services/branchService'

export interface NewBranchProps {}

const NewBranch: React.SFC<NewBranchProps> = () => {
  const [branch, setBranch] = useState<Branch>({})

  const history = useHistory()

  const onSubmit = async (branch: Branch) => {
    saveBranch(branch).then((data) => console.log(data))
  }

  const formProps: MyFormProps<Branch> = {
    state: [branch, setBranch],
    onSubmit,
    validator,
  }

  return (
    <MyForm {...formProps}>
      {({ myInput, myButton }) => (
        <>
          {myInput({
            label: 'Branch Name',
            value: branch?.name,
            name: 'name',
          })}
          {myInput({
            label: 'Contact',
            value: branch?.contact,
            name: 'contact',
          })}

          {myInput({
            label: 'Address',
            value: branch?.contact,
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

export default NewBranch
