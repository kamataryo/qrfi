import * as qrcode from 'qrcode-terminal'
import * as qrImage from 'qr-image'
import * as stream from 'stream'
import * as streamToPromise from 'stream-to-promise'

export type WiFiOption = {
  authenticationType?: 'WEP' | 'WPA' | 'nopass' | ''
  networkSSID: string
  password?: string
  hidden?: boolean
}

export type QROption = {
  format: 'ascii' | 'svg' | 'png'
}

const replaceMap = {
  '\\': '\\\\',
  ',': '\\,',
  ':': '\\:',
  ';': '\\;'
}

export default class Qrfi {
  static defaultWiFiOption: WiFiOption = {
    authenticationType: 'nopass',
    networkSSID: '',
    password: '',
    hidden: false
  }
  static defaultQROption: QROption = { format: 'ascii' }

  static escape = (str: string): string =>
    str
      .split('')
      .map((char: string) => replaceMap[char] || char)
      .join('')

  private authenticationType: 'WEP' | 'WPA' | 'nopass' | ''
  private networkSSID: string
  private password?: string
  private hidden: boolean

  constructor(wiFiOption: WiFiOption) {
    const { authenticationType, networkSSID, password, hidden } = {
      ...Qrfi.defaultWiFiOption,
      ...wiFiOption
    }

    if (!networkSSID) {
      throw new Error('no SSID specified.')
    }

    if (networkSSID.length > 32) {
      throw new Error('Too long SSID.')
    }

    if (
      authenticationType &&
      (authenticationType !== 'WEP' &&
        authenticationType !== 'WPA' &&
        authenticationType !== 'nopass')
    ) {
      throw new Error(
        `Invalid authentication type, ${authenticationType}. Authentication type should be one of WEP, WPA and nopass, or empty.`
      )
    }

    if (authenticationType && authenticationType !== 'nopass' && !password) {
      throw new Error(
        `no password specified against authentication type ${authenticationType}.`
      )
    }

    if (authenticationType === 'WEP' && password.length > 16) {
      throw new Error('Maximum length of password for WEP is 16.')
    }

    if (authenticationType === 'WPA' && password.length > 63) {
      throw new Error('Maximum length of password for WPA-PSK/WPA2-PSK is 63.')
    }

    this.authenticationType = authenticationType
    this.networkSSID = networkSSID
    this.password = password
    this.hidden = hidden
  }

  toString = () =>
    `WIFI:T:${this.authenticationType};S:${Qrfi.escape(
      this.networkSSID
    )};P:${Qrfi.escape(this.password)};${this.hidden ? 'true' : ''};`

  toQR = (option?: QROption): Promise<string | Buffer> => {
    const { format } = { ...Qrfi.defaultQROption, ...option }
    return new Promise((resolve, reject) => {
      const qrString = this.toString()
      if (format === 'ascii') {
        qrcode.generate(qrString, resolve)
      } else if (format === 'svg' || format === 'png') {
        resolve(qrImage.imageSync(qrString, { type: format }))
      } else {
        reject(new Error(`Invalid format ${format} specified.`))
      }
    })
  }
}
