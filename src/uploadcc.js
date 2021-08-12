const { sendPost } = require("./func");

async function getRemoteURL(path, target) {
    const response = await sendPost(
        "https://upload.cc/image_upload",
        "uploaded_file[]",
        path,
        {
            Referer: "https://upload.cc/",
        }
    );
    if (response.total_success !== 1) throw new Error(response.code);
    target.push("https://upload.cc/" + response.success_image[0].url);
    return "https://upload.cc/" + response.success_image[0].url;
}

module.exports = getRemoteURL;
