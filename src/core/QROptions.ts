import type { RequiredOptions } from '@/types'
import { errorCorrectionLevels, qrTypes } from '@/constants'

export const QROptions: RequiredOptions = {
  width: 300,
  height: 300,
  data: '',
  margin: 0,
  qrOptions: {
    typeNumber: qrTypes[0] ?? 0,
    mode: undefined,
    errorCorrectionLevel: errorCorrectionLevels.Q ?? 'L',
  },
  imageOptions: {
    hideBackgroundDots: true,
    imageSize: 0.4,
    crossOrigin: undefined,
    margin: 0,
  },
  dotsOptions: {
    type: 'square',
    color: '#000',
  },
  backgroundOptions: {
    color: '#fff',
  },
}
