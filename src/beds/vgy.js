import { sendPost } from "../utils.js";

const USERKEY = "a5dT4k2QVgWxaT7UCM1TgI16OpBv37mk";

// Get userkey from https://vgy.me/account/details

export default async function (path) {
    const response = await sendPost("https://vgy.me/upload", "file", path, {}, (form) => form.append("userkey", USERKEY));
    if (response.error) throw new Error(JSON.stringify(response));
    return response.image;
}
