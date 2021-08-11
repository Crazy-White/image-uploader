const { sendPost } = require("./func");

// https://imgkr.com/

async function getRemoteURL(path, target) {
    const response = await sendPost(
        "https://imgkr.com/api/v2/files/upload",
        "file",
        path,
        {
            Referer: "https://imgkr.com/",
        }
    );
    if (!response.success) throw new Error(response.message);
    target.push(response.data);
    return response.data;
}

module.exports = getRemoteURL;
