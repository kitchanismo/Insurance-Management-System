import { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Chip from '@material-ui/core/Chip'

export interface MyChipsProps {
  chips: string[]
  onChipSelected?: (chip: string) => void
  active?: string
}

const MyChips: React.SFC<MyChipsProps> = ({
  chips,
  active,
  onChipSelected,
}) => {
  const [activeChip, setActiveChip] = useState<string>(active || '')

  const handleSelectedChip = (chip: string) => {
    setActiveChip(chip)
    onChipSelected?.(chip)
  }
  const renderChips = (chip: string) => {
    return (
      <Grid item>
        <Chip
          onClick={() => handleSelectedChip(chip)}
          color={activeChip === chip ? 'secondary' : 'default'}
          variant={activeChip === chip ? 'default' : 'outlined'}
          size='medium'
          label={chip}
        />
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
          paddingBottom: 5,
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
