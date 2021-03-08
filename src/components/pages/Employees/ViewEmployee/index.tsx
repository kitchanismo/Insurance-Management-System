import React, { useState, useEffect, useContext } from 'react'
import Link from '@material-ui/core/Link'
import { useHistory, useParams } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import CardContent from '@material-ui/core/CardContent'
import Chip from '@material-ui/core/Chip'
import Badge from '@material-ui/core/Badge'
import Divider from '@material-ui/core/Divider'
import { calculateAge, capitalize } from 'utils/helper'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import MyCard from 'components/common/MyCard'
import Employee from 'models/employee'
import { GlobalContext } from 'providers/GlobalProvider'
import Client from 'models/client'
import MyAvatar from 'components/common/MyAvatar'
import { getEmployee } from 'services/employeeService'
import MySkeletonCard from 'components/common/MySkeletonCard'
import MyMiniCards from 'components/common/MyMiniCards'
import MySkeletonMiniCards from 'components/common/MySkeletonMiniCards'
import { EmployeeContext } from 'providers/EmployeeProvider'

export interface ViewUserProps {
  title: string
}

const ViewEmployee: React.SFC<ViewUserProps> = (props) => {
  const history = useHistory()
  const styles = useStyles()
  const params = useParams<{ id: string }>()
  const [_, dispatch] = useContext(GlobalContext)!
  const [employeeState] = useContext(EmployeeContext)!

  const [employee, setEmployee] = useState<Employee>()

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    dispatch({ type: 'SET_TITLE', payload: 'View Employee' })
    setIsLoading(true)
    getEmployee(params.id).then((employee) => {
      setEmployee(employee)
      setIsLoading(false)
    })
  }, [])

  const detail = (title: string, subtitle: any) => (
    <Grid container alignItems='center' direction='column' item xs={6}>
      <Typography component='h6' variant='h6'>
        {title}
      </Typography>
      <Typography variant='subtitle1' color='textSecondary'>
        {subtitle}
      </Typography>
    </Grid>
  )

  const handleSelected = (client: Client) => {
    history.push('/clients/' + client.id)
  }

  const branch = employeeState.branches.filter(
    (branch) => branch.id === employee?.branch
  )[0]

  const position = employeeState.positions.filter(
    (position) => position.id === employee?.position
  )[0]

  const renderClients = (clients: Client[]) => {
    return (
      <>
        <Grid
          container
          style={{ marginTop: 20, marginBottom: 10 }}
          xs={12}
          justify='space-between'
        >
          {!!count && (
            <Badge badgeContent={count! >= 100 ? '99+' : count} color='primary'>
              <Typography variant='subtitle1'>Clients</Typography>
            </Badge>
          )}
          {/* <Link
            component='button'
            variant='body1'
            onClick={() => history.push('/clients')}
          >
            View All({clients.length})
          </Link> */}
        </Grid>
        <MyMiniCards onSelected={handleSelected} items={clients}>
          {({ renderCards, item }) => (
            <>
              {renderCards({
                item,
                title: `${item.lastname}, ${item.firstname}`,
                subtitle: item.code!,
                src: item.image_url,
              })}
            </>
          )}
        </MyMiniCards>
      </>
    )
  }

  const count = employee?.clients?.length || 0

  return (
    <>
      {isLoading && (
        <>
          <MySkeletonCard />
          <Grid container style={{ marginBottom: 10 }} xs={12}>
            <Badge badgeContent={count! >= 100 ? '99+' : count} color='primary'>
              <Typography variant='subtitle1'>Clients</Typography>
            </Badge>
            {/* <Link component='button' variant='body1'>
                View All({employee?.clients?.length})
              </Link> */}
            <MySkeletonMiniCards />
          </Grid>
        </>
      )}
      {!isLoading && employee && (
        <>
          <MyCard title={'Employee#' + employee.id}>
            <CardContent>
              <Grid container xs={12} justify='space-between'>
                <Grid
                  style={{ paddingLeft: 10 }}
                  container
                  direction='column'
                  item
                  xs={7}
                  justify='flex-start'
                >
                  <Typography component='h6' variant='h6'>
                    {`${employee.lastname}, ${employee.firstname} ${employee.middlename}`}
                  </Typography>
                  <Typography variant='subtitle1' color='textSecondary'>
                    {position?.name}
                  </Typography>
                  <Typography variant='subtitle1' color='textSecondary'>
                    {branch?.name}
                  </Typography>
                  <Grid item xs={1}>
                    <Chip
                      style={{ marginTop: 5 }}
                      size='small'
                      label={employee.status}
                      variant='default'
                      color={
                        employee.status !== 'active' ? 'secondary' : 'primary'
                      }
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  item
                  xs={5}
                  justify='center'
                  alignItems='center'
                >
                  <MyAvatar src={employee.image_url} />
                </Grid>
              </Grid>
            </CardContent>
            <Divider style={{ marginLeft: 20, marginRight: 20 }}></Divider>
            <CardContent>
              <Grid spacing={1} container xs={12} style={{ paddingLeft: 10 }}>
                {detail('Gender', employee.gender)}
                {detail('Civil Status', employee.civil)}
                {detail('Contact', employee.contact)}
                {detail(
                  'Age',
                  employee.birthdate ? calculateAge(employee.birthdate) : 'N/A'
                )}
                {
                  <Grid
                    container
                    alignItems='center'
                    direction='column'
                    item
                    xs={12}
                  >
                    <Typography component='h6' variant='h6'>
                      Address
                    </Typography>
                    <Typography variant='subtitle1' color='textSecondary'>
                      {employee.address}
                    </Typography>
                  </Grid>
                }
              </Grid>
            </CardContent>
          </MyCard>
          {renderClients(employee.clients!)}
          <Grid
            style={{
              paddingLeft: 18,
              paddingTop: 10,
              paddingBottom: 5,
            }}
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
              <Button
                onClick={() => history.push('/employees/edit/' + employee.id)}
                style={{ paddingTop: 15, paddingBottom: 15 }}
                fullWidth
                variant='contained'
                color='primary'
              >
                EDIT
              </Button>
            </Grid>
          </Grid>
        </>
      )}
    </>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      backgroundColor: theme.palette.secondary.main,
    },
  })
)

export default ViewEmployee
