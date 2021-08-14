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

    /**
     * @function sendPost - 发送POST请求
     * @param {String} url - fetch(url)
     * @param {String} formName - 要发送的文件的formName
     * @param {String} localPath - 本地路径
     * @param {Object} headers - 额外的headers，按需求添加
     * @param {Function} cb - 回调函数，回调的参数是FormData对象，按需求修改
     * @return {String|Object} -如果返回值是json就解析，否则原样返回string
     */
async function sendPost(url, formName, localPath, headers = {}, cb) {
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
            //console.debug(url,data);
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
