import { type ReactNode } from 'react'

import { type Dispatch, type PayloadAction } from '@reduxjs/toolkit'

export interface GameSocketProviderProps {
  dispatch: Dispatch<PayloadAction<any>>
  children: ReactNode
}
