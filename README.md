# upload-my-image

[![](https://badgen.net/packagephobia/install/upload-my-image)](https://packagephobia.com/result?p=upload-my-image)
[![](https://img.shields.io/npm/v/upload-my-image)](https://www.npmjs.com/package/upload-my-image)

A cli tool which could run with `Typora`

## Installation

```sh
$ npm install upload-my-image -g
```

## Usage

```
uploadimg [options...] <path>
    --list             -L  show all avaliable servers
    --server=<server>  -S  select server
    --sen=<true|false>     whether enables a case-sensitive mode for matching files, default true
    --help             -H  show help
```

examples

```
uploadimg ./wallpaper.png
uploadimg wallpaper.png --server=smms    # use selected server
uploadimg a.png b.png c.png              # upload multiple images
uploadimg ./*.jpg ./*.png                # use system glob, windows cmd is not supported
uploadimg "./*.jpg"                      # use fast-glob, support all system
```

## Use it with `Typora`

after installation, input `uploadimg` or `uploadimg --server=<serverName>` in Typora to use it

## Use it with `Node.js`

```sh
$ npm install upload-my-image --save
```

_glob is not supported here_

```js
import getRemoteURL from "upload-my-image/beds/smms.js";
(async () => {
    console.log(await getRemoteURL("./wallpaper.jpg"));
})();
```

## Other

[costomize](./src/beds/CUSTOMIZE.md)
