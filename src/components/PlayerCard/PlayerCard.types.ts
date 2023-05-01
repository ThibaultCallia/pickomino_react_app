import { type PlainPlayer } from '../../store/Players/Player.types'

export interface PlayerCardProps {
  closeDrawer?: () => void
  player: PlainPlayer
}
