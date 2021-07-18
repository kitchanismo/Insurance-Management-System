import { useEffect, useState, useContext } from 'react'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'
import useTheme from '@material-ui/core/styles/useTheme'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import ExpandMore from '@material-ui/icons/ExpandMore'
import Branch from 'models/branch'

export interface DataProps {
  name: string
  count: number
  year?: number
}

export interface ClientsGraphProps {
  branches: Branch[]
  data: DataProps[]
  range: { start: string; end: string }
  title: string
  onSelectedRange: (range: string) => void
  onSelectedBranch: (branch: string) => void
}

const MyGraph: React.SFC<ClientsGraphProps> = ({
  branches,
  data,
  title,
  range,
  onSelectedRange,
  onSelectedBranch,
}) => {
  const theme = useTheme()

  const [anchorElRange, setAnchorElRange] = useState(null)

  const [anchorElBranch, setAnchorElBranch] = useState(null)

  const [textRange, setTextRange] = useState('ALL RECORDS')

  const [textBranch, setTextBranch] = useState('ALL BRANCHES')

  const handleClickRange = (event: any) => {
    setAnchorElRange(event.currentTarget)
  }

  const handleClickBranch = (event: any) => {
    setAnchorElBranch(event.currentTarget)
  }

  const handleSelectRange = (event: any) => {
    const value = event.currentTarget?.id
    const text = event.currentTarget?.title

    setAnchorElRange(null)

    if (!text) {
      return
    }

    onSelectedRange(value)
    setTextRange(text)
  }

  const handleSelectBranch = (event: any) => {
    const value = event.currentTarget?.id
    const text = event.currentTarget?.title
    setAnchorElBranch(null)

    if (!text) {
      return
    }

    onSelectedBranch(value)
    setTextBranch(text)
  }

  const renderMenuItemBranch = (branch: Branch) => {
    return (
      <MenuItem
        key={branch?.id!}
        id={'' + branch?.id!}
        title={branch?.name}
        onClick={handleSelectBranch}
      >
        {branch?.name}
      </MenuItem>
    )
  }

  const total = data?.reduce((acc, stat) => acc + +stat.count, 0)

  return (
    <>
      <Grid container xs={12} justify='space-between'>
        <Grid container xs={6} item>
          <Button
            aria-controls='simple-menu'
            aria-haspopup='true'
            color='default'
            onClick={handleClickRange}
            endIcon={<ExpandMore />}
          >
            {textRange}
          </Button>
          <Menu
            id='simple-menu'
            anchorEl={anchorElRange}
            keepMounted
            open={Boolean(anchorElRange)}
            onClose={handleSelectRange}
          >
            <MenuItem title='PAST 7 DAYS' id='week' onClick={handleSelectRange}>
              PAST 7 DAYS
            </MenuItem>
            <MenuItem
              title='PAST 30 DAYS'
              id='month'
              onClick={handleSelectRange}
            >
              PAST 30 DAYS
            </MenuItem>
            <MenuItem
              title='PAST 12 MONTHS'
              id='year'
              onClick={handleSelectRange}
            >
              PAST 12 MONTHS
            </MenuItem>
            <MenuItem title='ALL RECORDS' id='' onClick={handleSelectRange}>
              ALL RECORDS
            </MenuItem>
          </Menu>
        </Grid>
        <Grid container xs={6} item justify='flex-end'>
          <Button
            aria-controls='simple-menu-branch'
            aria-haspopup='true'
            color='default'
            onClick={handleClickBranch}
            endIcon={<ExpandMore />}
          >
            {textBranch}
          </Button>
          <Menu
            id='simple-menu-branch'
            anchorEl={anchorElBranch}
            keepMounted
            open={Boolean(anchorElBranch)}
            onClose={handleSelectBranch}
          >
            {branches.map((branch) => renderMenuItemBranch(branch || ''))}
          </Menu>
        </Grid>
      </Grid>

      <ResponsiveContainer width='100%' height={200}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 20, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id='colorCount' x1='0' y1='0' x2='0' y2='1'>
              <stop
                offset='20%'
                stopColor={theme.palette.secondary.main}
                stopOpacity={0.8}
              />
              <stop
                offset='95%'
                stopColor={theme.palette.secondary.main}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>

          <XAxis dataKey='name' />
          <YAxis />
          <CartesianGrid strokeDasharray='3 3' />
          <Tooltip
            contentStyle={{
              borderRadius: 10,
              backgroundColor: theme.palette.background.paper,
              border: 0,
            }}
            // labelStyle={{ color: '#333' }}
          />
          {/* <Legend verticalAlign='bottom' height={40} /> */}

          <Area
            name='total'
            type='monotone'
            dataKey='count'
            stroke={theme.palette.secondary.main}
            fillOpacity={2}
            fill='url(#colorCount)'
          />
        </AreaChart>
      </ResponsiveContainer>

      <Grid xs={12} item container alignItems='center' justify='center'>
        <Typography component='h5' variant='subtitle1' color='textSecondary'>
          {`${total?.toLocaleString()} ${title} from ${
            range?.start
              ? new Date(range?.start!).toLocaleDateString('en-GB', {
                  month: '2-digit',
                  day: '2-digit',
                  year: 'numeric',
                })
              : ''
          } to ${
            range?.end
              ? new Date(range?.end!).toLocaleDateString('en-GB', {
                  month: '2-digit',
                  day: '2-digit',
                  year: 'numeric',
                })
              : ''
          }`}
        </Typography>
      </Grid>
    </>
  )
}

export default MyGraph
