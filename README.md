# qrfi

[![Build Status](https://travis-ci.org/kamataryo/qrfi.svg?branch=master)](https://travis-ci.org/kamataryo/qrfi)
[![npm version](https://badge.fury.io/js/qrfi.svg)](https://badge.fury.io/js/qrfi)

`qrfi` is a CLI Wi-Fi QR Code Generator. You can scan and configure Wi-Fi connection with QR Code.

![](./social.png)

## Prerequisites

### CLI

Node.js > 8

### Scanning device

- Android
- iOS 11+

## install

```shell
$ npm install qrfi --global
```

NOTE: Also you can use qrfi with `npx`command.

## Usage

```shell
$ qrfi YOUR-SSID -p YOUR-PASSWORD
# or you can drain SSID from stdin
$ echo YOUR-SSID | qrfi -p YOUR-PASSWORD
# export png as stdout
$ qrfi YOUR-SSID -p YOUR-PASSWORD --format png > qr.png
```

With `npx`:

```shell
$ npx qrfi YOUR-SSID -p YOUR-PASSWORD
# or you can drain SSID from stdin
$ echo YOUR-SSID | npx qrfi -p YOUR-PASSWORD
```

![screenshot](screenshot.png)

### options

```shell
$ qrfi -h
Usage: qrfi [ssid] [options]

A CLI Wi-Fi QR Code Generator.

Options:
  -V, --version                      output the version number
  -t, --authentication-type <value>  Optional. One of WEP, WPA, nopass. Default value is WPA.
  -p, --password <value>             Optional.
  -H, --hidden                       Optional. The SSID is hidden or not. Default value is `false`.
  -f, --format <value>               Optional. ascii as default, png or svg.
  -h, --help                         output usage information

Examples:
  $ qrfi YOUR-SSID -p YOUR-PASSWORD
  $ qrfi YOUR-SSID -p YOUR-PASSWORD -f png > qr.png
  $ echo YOUR-SSID | qrfi -p YOUR-PASSWORD
```

## development

```shell
$ git clone git@github.com:kamataryo/qrfi.git
$ cd qrfi
$ yarn
$ npm test
```

## contributions

Issues and pull requests are welcome.
