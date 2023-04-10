export interface PlainTile {
    value: number
    points: number
    selected?: boolean
    disabled?: boolean
    onTileClick?: () => void
}
