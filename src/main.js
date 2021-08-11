const fs = require("fs");

const commandArgs = process.argv.slice(2);
const commandFlags = commandArgs.filter((str) => str.startsWith("-"));
const commandPaths = commandArgs.filter((str) => !str.startsWith("-"));

const { die } = require("./func");

if (commandPaths.length === 0) {
    die("Upload Fail", "Arguments are required");
}

commandPaths.forEach((path) => {
    if (!fs.existsSync(path)) {
        die("Upload Fail", "File above does not exist", path);
    }
});

const remoteURLs = [];
let server = "kieng.jd"; //default value

(() => {
    let flag = commandFlags.find((str) => str.startsWith("--server="));
    if (flag) server = flag.replace("--server=", "");
})();

let getRemoteURL = require("./kieng");

if (server.startsWith("kieng.")) {
    getRemoteURL = async function (path, target) {
        try {
            return await require("./kieng")(
                path,
                target,
                server.replace("kieng.", "")
            );
        } catch (err) {
            throw err;
        }
    };
} else if (server === "kieng") {
    getRemoteURL = require("./kieng");
} else if (server === "smms") {
    getRemoteURL = require("./smms");
} else {
    //default
    die("Server does not exists", server);
}

Promise.all(commandPaths.map((path) => getRemoteURL(path, remoteURLs)))
    .then(() => {
        die("Upload Success", ...remoteURLs);
    })
    .catch((err) => {
        die("Upload Fail", err);
    });

// die(`Upload Success:
// http://remote-image-1.png
// http://remote-image-2.png`);

/* How To Use */
// node index.js C:\Users\Admin\Pictures\wallpaper.jpg
// node index.js C:\Users\Admin\Pictures\wallpaper.jpg --server=smms
// node index.js C:\Users\Admin\Pictures\wallpaper.jpg --server=kieng
// node index.js C:\Users\Admin\Pictures\wallpaper.jpg --server=kieng.[jd,sg,c58,wy,hl,tt,qq,kequ,sh]

/* multi-files are supported */
// node index.js C:\Users\Admin\Pictures\wallpaper.jpg C:\Users\Admin\Pictures\wallpaper2.jpg  --server=kieng.qq

/* flags starts with '--' can be anywhere */
// node index.js C:\Users\Admin\Pictures\wallpaper.jpg --server=kieng C:\Users\Admin\Pictures\wallpaper2.jpg
