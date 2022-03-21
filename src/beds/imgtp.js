import { sendPost } from "../utils.js";

const TOKEN = "2a9613644272b0bf2b6eacaeed68e838";

// Get token from https://imgtp.com/user/settings.html

export default async function (path) {
    const response = await sendPost("https://imgtp.com/api/upload", "image", path, { TOKEN });
    if (response.code !== 200) throw new Error(response.msg);
    return response.data.url;
}
