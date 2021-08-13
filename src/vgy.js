const { sendPost } = require("./func");
const token = "a5dT4k2QVgWxaT7UCM1TgI16OpBv37mk";
// Get userkey from https://vgy.me/account/details

async function getRemoteURL(path, target) {
    const response = await sendPost(
        "https://vgy.me/upload",
        "file",
        path,
        {},
        (form) => form.append("userkey", token)
    );
    if (response.error) throw new Error(JSON.stringify(response));
    target.push(response.image);
    return response.image;
}

module.exports = getRemoteURL;
