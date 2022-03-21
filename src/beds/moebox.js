import { sendPost } from "../utils.js";

// https://catbox.moe/

export default async function (path) {
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
    return response;
}
