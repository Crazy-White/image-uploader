const { sendPost } = require("./func");

async function getRemoteURL(path, target) {
    const response = await sendPost(
        "https://catbox.moe/user/api.php",
        "fileToUpload",
        path,
        {
            Referer: "https://catbox.moe/",
        },
        (form) => form.append("reqtype", "fileupload")
    );
    if (!response) throw new Error(response);
    target.push(response);
    return response;
}

module.exports = getRemoteURL;
