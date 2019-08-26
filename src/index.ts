import * as qrcode from 'qrcode-terminal'

type WiFiOption = {
  authenticationType?: 'WEP' | 'WPA' | 'nopass' | ''
  networkSSID: string
  password?: string
  hidden?: boolean
}

type QROption = {
  format: 'ascii'
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

    if (authenticationType && authenticationType !== 'nopass' && !password) {
      throw new Error(
        `no password specified against authentication type ${authenticationType}.`
      )
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

  toQR = (option?: QROption) => {
    const qrString = this.toString()
    const { format } = { ...Qrfi.defaultQROption, ...option }

    return new Promise((resolve, reject) => {
      if (format === 'ascii') {
        qrcode.generate(qrString, resolve)
      } else {
        reject(new Error(`Invalid format ${format} specified.`))
      }
    })
  }
}
