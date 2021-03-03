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
import Typography from '@material-ui/core/Typography'
import ExpandMore from '@material-ui/icons/ExpandMore'

export interface DataProps {
  name: string
  count: number
}

export interface ClientsGraphProps {
  branches: string[]
  data: DataProps[]
  title: string
}

const MyGraph: React.SFC<ClientsGraphProps> = ({ branches, data, title }) => {
  const theme = useTheme()

  const [anchorElRange, setAnchorElRange] = useState(null)

  const [anchorElBranch, setAnchorElBranch] = useState(null)

  const [textRange, setTextRange] = useState('THIS YEAR')

  const [textBranch, setTextBranch] = useState('ALL BRANCHES')

  const [titleRange, setTitleRange] = useState(
    new Date(Date.now()).getFullYear().toString()
  )

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const handleClickRange = (event: any) => {
    setAnchorElRange(event.currentTarget)
  }

  const handleClickBranch = (event: any) => {
    setAnchorElBranch(event.currentTarget)
  }

  const handleSelectRange = (event: any) => {
    const text = event.currentTarget?.textContent
    setAnchorElRange(null)
    if (!text) {
      return
    }

    setTextRange(text)
    if (text === 'THIS YEAR') {
      setTitleRange(new Date(Date.now()).getFullYear().toString())
    }
    if (text === 'THIS MONTH') {
      setTitleRange(months[new Date(Date.now()).getMonth()])
    }
  }

  const handleSelectBranch = (event: any) => {
    const text = event.currentTarget?.textContent
    setAnchorElBranch(null)
    if (!text) {
      return
    }

    setTextBranch(text)
  }

  const renderMenuItemBranch = (value: string) => {
    return (
      <MenuItem value={value} onClick={handleSelectBranch}>
        {value}
      </MenuItem>
    )
  }

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
            <MenuItem value='THIS YEAR' onClick={handleSelectRange}>
              THIS YEAR
            </MenuItem>
            <MenuItem value='THIS MONTH' onClick={handleSelectRange}>
              THIS MONTH
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
            stroke={theme.palette.primary.main}
            fillOpacity={1}
            fill='url(#colorCount)'
          />
        </AreaChart>
      </ResponsiveContainer>
      <Grid xs={12} item container alignItems='center' justify='center'>
        <Typography component='h5' variant='subtitle1' color='textPrimary'>
          {`A total of 3000 ${title} from ` + titleRange}
        </Typography>
      </Grid>
    </>
  )
}

export default MyGraph
