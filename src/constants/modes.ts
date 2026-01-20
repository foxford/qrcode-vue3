import type { Mode } from '@/types'

interface Modes {
  [key: string]: Mode
}

export const modes = {
  numeric: 'Numeric',
  alphanumeric: 'Alphanumeric',
  byte: 'Byte',
  kanji: 'Kanji',
} as Modes
