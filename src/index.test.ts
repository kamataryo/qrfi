import test from 'ava'
import Qrfi from './'

test('constructor call success', t => {
  t.notThrows(
    () =>
      new Qrfi({
        networkSSID: 'hello',
        authenticationType: 'nopass'
      })
  )
})

test('constructor call fails with invalid authenticationType', t => {
  // @ts-ignore
  t.throws(() => new Qrfi({ authenticationType: 'foobar' }))
})

test('constructor call fails without ssid', t => {
  // @ts-ignore
  t.throws(() => new Qrfi({}))
})

test('constructor call fails without password', t => {
  t.throws(
    () =>
      new Qrfi({
        networkSSID: 'hello',
        authenticationType: 'WEP'
      })
  )
})

test('escape utility', t => t.is(Qrfi.escape(';:'), '\\;\\:'))

test('string output', t => {
  const qrString = new Qrfi({
    authenticationType: 'WPA',
    networkSSID: 'hello',
    password: 'wifi',
    hidden: true
  }).toString()
  t.is(qrString, 'WIFI:T:WPA;S:hello;P:wifi;true;')
})

test('string output with escape', t => {
  const qrString = new Qrfi({
    authenticationType: 'WPA',
    networkSSID: 'h\\e;l,l:o',
    password: 'wifi'
  }).toString()
  t.is(qrString, 'WIFI:T:WPA;S:h\\\\e\\;l\\,l\\:o;P:wifi;;')
})

test('qr output with terminal', async t => {
  const qrAscii = await new Qrfi({
    authenticationType: 'WPA',
    networkSSID: 'h\\e;l,l:o',
    password: 'wifi'
  }).toQR({ format: 'ascii' })
  t.snapshot(qrAscii)
})

test('qr output fails', async t => {
  await t.throwsAsync(() =>
    new Qrfi({
      authenticationType: 'WPA',
      networkSSID: 'h\\e;l,l:o',
      password: 'wifi'
      // @ts-ignore
    }).toQR({ format: 'unknown format' })
  )
})
