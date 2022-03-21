import { sendPost } from "../utils.js";

// https://upload.cc/

export default async function (path) {
    const response = await sendPost("https://upload.cc/image_upload", "uploaded_file[]", path, {
        Referer: "https://upload.cc/",
    });
    if (response.total_success !== 1) throw new Error(response.code);
    return "https://upload.cc/" + response.success_image[0].url;
}
