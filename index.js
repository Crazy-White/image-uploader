const fs = require("fs");
const fetch = require("node-fetch");
const FormData = require("form-data");
const args = process.argv.slice(2);

function die(msg) {
    console.log(msg);
    process.exit();
}

function checkPlatform() {
    const platform = require("os").type();
    if (platform === "Windows_NT") return 1;
    else return 0;
}

function uploadImage(url, path) {
    return new Promise(function (resolve, reject) {
        const formData = new FormData();
        formData.append("image", fs.createReadStream(path));
        fetch(url, {
            method: "POST",
            headers: {
                // "Content-Type": "multipart/form-data", 不要加这个！！！加了报错
            },
            body: formData,
        })
            .then((response) => response.json())
            .then((responseData) => {
                resolve(responseData);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

if (args.length === 0) {
    die(`Upload Fail:
Arguments are required`);
}

if (!args.every((path) => fs.existsSync(path)))
    die(`Upload Fail:
Files are not exists
${path}`);

const remoteURLs = [];

async function getRemoteURL(url, path) {
    const response = await uploadImage(url, path);
    if (response.code !== 200) throw new Error(response.msg);
    remoteURLs.push(response.data.url);
    return response.data.url;
}

Promise.all(
    args.map((path) =>
        getRemoteURL("https://image.kieng.cn/upload.html?type=jd", path)
    )
)
    .then(() => {
        die(
            `Upload Success:
` +
                remoteURLs.join(`
`)
        );
    })
    .catch((err) => {
        die(`Upload Fail:
${err}`);
    });

// die(`Upload Success:
// http://remote-image-1.png
// http://remote-image-2.png`);

// How To Use
// node index.js C:\Users\Admin\Pictures\wallpaper.jpg
