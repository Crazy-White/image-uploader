const fetch = require("node-fetch");
const FormData = require("form-data");
const fs = require("fs");

function die(title, ...msg) {
    console.log("\033[1m" + title + ":\033[0m"); // title
    console.log(msg.join("\n")); // body
    process.exit();
}

function checkPlatform() {
    const platform = require("os").type();
    if (platform === "Windows_NT") return 1;
    else return 0;
}

async function sendPost(url, formName, localPath, headers = {}) {
    // 模拟POST请求
    try {
        const formData = new FormData();
        formData.append(formName, fs.createReadStream(localPath));
        const resp = await fetch(url, {
            method: "POST",
            headers,
            body: formData,
        });
        return await resp.json();
    } catch (err) {
        return new Error(err);
    }
}

module.exports = {
    die,
    checkPlatform,
    sendPost,
};
