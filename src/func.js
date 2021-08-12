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

async function sendPost(url, formName, localPath, headers = {}, cb) {
    // 模拟POST请求
    try {
        const body = new FormData();
        body.append(formName, fs.createReadStream(localPath));
        if (typeof cb === "function") cb(body);
        const resp = await fetch(url, {
            method: "POST",
            headers,
            body,
        }).catch((err) => console.error(err));
        if (resp.ok) {
            let data = await resp.text();
            try {
                data = JSON.parse(data);
            } catch {}
            return data;
        } else {
            return new Error("Network response was not ok.");
        }
    } catch (err) {
        return new Error(err);
    }
}

module.exports = {
    die,
    checkPlatform,
    sendPost,
};
