import type { ErrorCorrectionLevel } from '@/types'

interface ErrorCorrectionLevels {
  [key: string]: ErrorCorrectionLevel
}

export const errorCorrectionLevels = {
  L: 'L',
  M: 'M',
  Q: 'Q',
  H: 'H',
} as ErrorCorrectionLevels
