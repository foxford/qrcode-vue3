import type { Mode } from '@/types'
import { modes } from '@/constants'

export function getMode(data: string): Mode {
  switch (true) {
    case /^\d*$/.test(data):
      return modes.numeric ?? 'Numeric'
    case /^[0-9A-Z $%*+\-./:]*$/.test(data):
      return modes.alphanumeric ?? 'Alphanumeric'
    default:
      return modes.byte ?? 'Byte'
  }
}
