const { sendPost } = require("./func");

async function getRemoteURL(path, target) {
    const response = await sendPost(
        "https://img.kuibu.net/upload/backblaze",
        "file",
        path,
        {
            Referer: "https://img.kuibu.net/",
        }
    );
    if (!response.url) throw new Error(response.code);
    target.push(response.url);
    return response.url;
}

module.exports = getRemoteURL;
