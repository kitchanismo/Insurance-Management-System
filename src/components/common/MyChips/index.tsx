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
      {chips.map((chip) => (
        <>{renderChips(chip)}</>
      ))}
    </>
  )
}

export default MyChips
