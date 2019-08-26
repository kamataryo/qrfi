# qrfi

[![Build Status](https://travis-ci.org/kamataryo/qrfi.svg?branch=master)](https://travis-ci.org/kamataryo/qrfi)
[![npm version](https://badge.fury.io/js/qrfi.svg)](https://badge.fury.io/js/qrfi)

CLI Wifi QRCode Generator.

## Prerequisites

Node.js > 8

## install

```shell
$ npm install qrfi --global
```

NOTE: Also you can use qrfi with `npx`command.

## Usage

```shell
$ qrfi your-ssid -p your-password
# or you can drain SSID from stdin
$ echo 'your-ssid' | qrfi -p your-password
```

With `npx`:

```shell
$ npx qrfi your-ssid -p your-password
# or you can drain SSID from stdin
$ echo 'your-ssid' | npx qrfi -p your-password
```

### options

```shell
$ qrfi -h
Usage: cli.ts [ssid] [options]

CLI Wifi QRCode Generator.

Options:
  -V, --version                      output the version number
  -t, --authentication-type <value>  Optional. One of WEP, WPA, nopass. Default value is WPA.
  -p, --password <value>             Optional.
  -H, --hidden                       Optional. The SSID is hidden or not. Default value is `false`.
  -h, --help                         output usage information

Examples:
  $ qrfi <yourSSID> -p <your password>
  $ echo yourSSID | qrfi -p <your password>
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
