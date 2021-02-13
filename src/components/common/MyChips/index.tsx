import { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Chip from '@material-ui/core/Chip'
import Badge from '@material-ui/core/Badge'

export interface MyChipsProps {
  chips: MyChip[]
  onChipSelected?: (chip: MyChip) => void
  active: MyChip
  count?: number
}

export interface MyChip {
  value: any
  name: string
}

const MyChips: React.SFC<MyChipsProps> = ({
  chips,
  active,
  onChipSelected,
  count,
}) => {
  const renderChips = (chip: MyChip) => {
    return (
      <Grid item>
        <Badge
          invisible={active.value !== chip.value}
          badgeContent={count! >= 100 ? '99+' : count}
          color='primary'
        >
          <Chip
            onClick={() => onChipSelected?.(chip)}
            color={active.value === chip.value ? 'secondary' : 'default'}
            variant={active.value === chip.value ? 'default' : 'outlined'}
            size='medium'
            label={chip.name}
          />
        </Badge>
      </Grid>
    )
  }
  return (
    <>
      <Grid
        style={{
          marginLeft: 0,
          padding: 0,
          marginBottom: 10,
          paddingBottom: 0,
          paddingTop: 10,
          WebkitOverflowScrolling: 'touch',
          overflowX: 'auto',
          flexWrap: 'nowrap',
        }}
        container
        xs={12}
        justify='flex-start'
        direction='row'
        spacing={1}
        alignItems='center'
      >
        {chips.map((chip) => (
          <>{renderChips(chip)}</>
        ))}
      </Grid>
    </>
  )
}

export default MyChips
