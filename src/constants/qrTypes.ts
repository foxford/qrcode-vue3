import type { TypeNumber } from '@/types'

interface TypesMap {
  [key: number]: TypeNumber
}

export const qrTypes: TypesMap = Array
  .from({ length: 41 }, (_, i) => i)
  .reduce((acc, value) => {
    acc[value] = value as TypeNumber
    return acc
  }, {} as TypesMap)
