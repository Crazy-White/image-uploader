# upload-my-image

[![](https://badgen.net/packagephobia/install/upload-my-image)](https://packagephobia.com/result?p=upload-my-image)
[![](https://img.shields.io/npm/v/upload-my-image)](https://www.npmjs.com/package/upload-my-image)

A cli tool which could run with `Typora`

## Installation

```sh
npm install upload-my-image -g
```

## Usage

```
uploadimg [options...] <path>
    --list             -L  show servers avaliable
    --server=<server>  -S  select server
    --sen=[true|false]     whether enables a case-sensitive mode for matching files
    --help             -H  show help
```

examples

```
uploadimg ./wallpaper.png
uploadimg wallpaper.png --server=smms
uploadimg a.png b.png c.png
uploadimg ./*.jpg ./*.png
```

## Use it with `Typora`

after installation, input `uploadimg` or `uploadimg --server=<serverName>` in Typora to use it

## Use it with `Node.js`

```sh
npm install upload-my-image --save
```

_glob is not supported_

```js
const getRemoteURL = require("upload-my-image/module");
(async () => {
    let url = await getRemoteURL("./wallpaper.jpg", "smms");
    console.log(url);
})();
```

## Other

[costomize](./CUSTOMIZE.md)
