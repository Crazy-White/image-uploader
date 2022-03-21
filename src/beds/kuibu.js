import { sendPost } from "../utils.js";

// https://img.kuibu.net/

export default async function (path) {
    const response = await sendPost("https://img.kuibu.net/upload/backblaze", "file", path, {
        Referer: "https://img.kuibu.net/",
    });
    if (!response.url) throw new Error(response.code);
    return response.url;
}
