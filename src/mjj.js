const { sendPost } = require("./func");

// https://mjj.today/

async function getRemoteURL(path, target) {
    const response = await sendPost(
        "https://mjj.today/functions/upload.php",
        "file",
        path,
        {
            Referer: "https://mjj.today/",
        }
    );
    if (!response.code) throw new Error(response);
    target.push(response.url);
    return response.url;
}

module.exports = getRemoteURL;
