const fetch = require("node-fetch");
const FormData = require("form-data");
const fs = require("fs");

// https://image.kieng.cn/
// type {jd,sg,c58,wy,hl,tt,qq,kequ,sh}

function uploadImage(path, type = "jd") {
    return new Promise(function (resolve, reject) {
        const formData = new FormData();
        formData.append("image", fs.createReadStream(path));
        fetch(`https://image.kieng.cn/upload.html?type=${type}`, {
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

async function getRemoteURL(path, target, type = "jd") {
    const response = await uploadImage(path, type);
    if (response.code !== 200) throw new Error(response.msg);
    target.push(response.data.url);
    return response.data.url;
}

module.exports = getRemoteURL;
