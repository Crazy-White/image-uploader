import { sendPost } from "../utils.js";

// https://imgkr.com/

export default async function (path) {
    const response = await sendPost("https://imgkr.com/api/v2/files/upload", "file", path, {
        Referer: "https://imgkr.com/",
        Cookie: "antn=53af7d0925dc0b65f16e34618352750b",
    });
    if (!response.success) throw new Error(response.message);
    return response.data;
}
