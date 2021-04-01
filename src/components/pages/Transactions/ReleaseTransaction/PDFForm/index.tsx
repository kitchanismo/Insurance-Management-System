import Commission from 'models/commission'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

export interface PDFFormProps {
  commissions: Commission[]
  range: { from: Date; to: Date }
}

const PDFForm: React.SFC<PDFFormProps> = ({ commissions, range }) => {
  const style = {
    backgroundColor: 'black',
    color: 'white',
  }
  return (
    <Grid container direction='column' alignItems='center'>
      <Typography style={{ marginTop: 50 }} variant='subtitle1'>
        PSY Casket Trading
      </Typography>
      <Typography style={{ marginBottom: 20 }} variant='subtitle2'>
        {`Release Commissions from ${range.from.toDateString()} to ${range.to.toDateString()}`}
      </Typography>
      <Table style={{ width: 685 }} size='small' aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell style={style}>Employee Name</TableCell>
            <TableCell style={style}>Position</TableCell>
            <TableCell style={style} align='right'>
              Amount
            </TableCell>
          </TableRow>
        </TableHead>
        {!!commissions.length && (
          <TableBody>
            {commissions?.map((com, i) => (
              <TableRow key={i}>
                <TableCell component='th' scope='row'>
                  {`${com?.employee?.profile?.lastname}, ${com.employee?.profile?.firstname} ${com.employee?.profile?.middlename}`}
                </TableCell>
                <TableCell>{com?.employee?.position?.name}</TableCell>
                <TableCell align='right'>{com?.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </Grid>
  )
}

export default PDFForm
