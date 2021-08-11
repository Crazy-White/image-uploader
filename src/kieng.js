const { sendPost } = require("./func");

// https://image.kieng.cn/
// type {jd,sg,c58,wy,hl,tt,qq,kequ,sh}

async function getRemoteURL(path, target, type = "jd") {
    const response = await sendPost(
        `https://image.kieng.cn/upload.html?type=${type}`,
        "image",
        path
    );
    if (response.code !== 200) throw new Error(response.msg);
    target.push(response.data.url);
    return response.data.url;
}

module.exports = getRemoteURL;
