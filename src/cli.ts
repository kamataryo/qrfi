#!/usr/bin/env node

import * as program from 'commander'
import * as fs from 'fs'
import { isatty } from 'tty'
import * as outdent from '@kamataryo/outdent'
import Qrfi from '.'

const { version, description } = JSON.parse(
  fs.readFileSync(__dirname + '/../package.json').toString('utf-8')
)

program
  .version(version)
  .description(description)
  .usage('[ssid] [options]')
  .option(
    '-t, --authentication-type <value>',
    'Optional. One of WEP, WPA, nopass. Default value is WPA.'
  )
  .option('-p, --password <value>', 'Optional.')
  .option(
    '-H, --hidden',
    'Optional. The SSID is hidden or not. Default value is `false`.'
  )
  .option('-f, --format <value>', 'Optional. ascii as default, png or svg.')

program.on('--help', () => {
  process.stdout.write(
    `

      Examples:
        $ qrfi <yourSSID> -p <your password>
        $ qrfi <yourSSID> -p <your password> -f png > qr.png
        $ echo <yourSSID> | qrfi -p <your password>
  `[outdent as string]
  )
})

program.parse(process.argv)

const args = [...program.args]

// options
const authenticationType = program.authenticationType || 'WPA'
const password = program.password || ''
const hidden = !!program.hidden
const format = program.format || 'ascii'

// stdin
process.stdin.resume()
process.stdin.setEncoding('utf8')
let stdinData = ''
const onEnd = () => {
  const networkSSID = args[0] || stdinData
  let qrfi: Qrfi
  try {
    qrfi = new Qrfi({ authenticationType, networkSSID, password, hidden })
  } catch (e) {
    process.stdout.write(e.message)
    process.exit(1)
  }

  qrfi
    .toQR({ format })
    .then(qrcode => {
      process.stdout.write(qrcode)
      process.exit(0)
    })
    .catch(e => {
      process.stderr.write(e.message)
      process.exit(2)
    })
}

if (isatty(0)) {
  onEnd()
} else {
  process.stdin.on('data', chunk => (stdinData += chunk))
  process.stdin.on('end', onEnd)
}
