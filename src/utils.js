import fetch, { FormData, fileFromSync } from "node-fetch";
import { stat } from "fs/promises";
import { type as getOSType } from "os";

function die(title, ...msg) {
    console.log(" " + title); // title
    console.log(msg.join("\n")); // body
    process.exit();
}

function isWindows() {
    const platform = getOSType();
    if (platform === "Windows_NT") return true;
    else return false;
}

const isFileExists = async (filePath) =>
    await stat(filePath)
        .then((stat) => stat.isFile())
        .catch((_) => false);
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
        body.append(formName, fileFromSync(localPath));
        if (typeof cb === "function") cb(body);
        const resp = await fetch(url, {
            method: "POST",
            headers,
            body,
        });
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

export { die, isWindows, sendPost, isFileExists };
