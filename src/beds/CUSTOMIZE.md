## How To Add Another Server

create a file named `[serverName].js` in this folder  
e.g `myOwnServer.js`  
then write an async function(or Promise), the function receives 2 arguments  
the first one is the local path of an image (String)  
the second one is an array which needs you to push the remote path  
Your `myOwnServer.js` should like this

```js
export default async function (localImagePath, query = "") {
    // fetch remote URL here
    // if catch error you can throw the detail message
    return remoteURL;
}
```

after you save your file you can command `npx uploadimg ./test.jpg -S=myOwnServer` to use it!

if you command `npx uploadimg ./test.jpg -S=myOwnServer.query`
you can get the String 'query' here

```js
export default async function (localPath, receiver, query) {
    // here query === 'query'
}
```
