import Grid, { GridProps } from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import { useState, useContext } from 'react'
import Fade from 'react-reveal/Fade'

import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import { GlobalContext } from 'providers/GlobalProvider'
import { image_provider } from 'configs/index.json'

interface RenderProps<T> {
  renderCards: (props: RenderCardsProps<T>) => JSX.Element
  item: T
}

interface RenderCardsProps<T> {
  title: string
  subtitle: string
  src?: string
  item?: T
}

export interface MyMiniCardsProps<T> extends GridProps {
  items: T[]
  onSelected?: (item: T) => void
  children?: (props: RenderProps<T>) => JSX.Element
}

function MyMiniCards<T>({
  items,
  onSelected,
  children,
  ...props
}: MyMiniCardsProps<T>) {
  const [state, _] = useContext(GlobalContext)!

  const styles = useStyles(state.isDark)()

  const [selectedItem, setSelectedItem] = useState<T>()

  const renderCards = ({ src, title, subtitle, item }: RenderCardsProps<T>) => {
    return (
      <CardHeader
        avatar={
          <Avatar
            className={styles.avatar}
            src={!!src ? image_provider + src : ''}
            aria-label='item'
          ></Avatar>
        }
        title={title}
        subheader={subtitle}
      />
    )
  }

  return (
    <Grid
      {...props}
      container
      xs={12}
      justify='flex-start'
      direction='row'
      spacing={1}
      alignItems='center'
      className={styles.container}
    >
      {items.map((item, index) => (
        <Grid item xs={12} key={index}>
          <Fade>
            <Card
              style={{ minHeight: 92, display: 'flex', alignItems: 'center' }}
              className={
                selectedItem === item ? styles.headerSelected : styles.header
              }
              onClick={() => {
                onSelected?.(item)
                setSelectedItem(item)
              }}
            >
              {children?.({ renderCards, item } as RenderProps<T>)}
            </Card>
          </Fade>
        </Grid>
      ))}
    </Grid>
  )
}

const useStyles = (isDark: boolean) =>
  makeStyles((theme: Theme) =>
    createStyles({
      avatar: {
        backgroundColor: theme.palette.secondary.main,
      },
      headerSelected: {
        width: 230,
        backgroundColor: !isDark
          ? theme.palette.grey[300]
          : theme.palette.grey[700],
      },
      header: {
        width: 230,
      },
      container: {
        marginLeft: 0,
        padding: 0,
        paddingBottom: 5,

        WebkitOverflowScrolling: 'touch',
        overflowX: 'auto',
        flexWrap: 'nowrap',
      },
    })
  )

export default MyMiniCards
