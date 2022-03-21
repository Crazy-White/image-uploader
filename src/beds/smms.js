import { sendPost } from "../utils.js";

const TOKEN = "qk0WHwBx9NOcUWyMgqMo7o6YoMRAGHTX";

// https://sm.ms

export default async function (path) {
    const response = await sendPost("https://sm.ms/api/v2/upload/", "smfile", path, {
        Authorization: TOKEN,
    });
    if (!response.success) throw new Error(response.message);
    return response.data.url;
}
