import fg from "fast-glob";
import { die, isFileExists } from "./utils.js";

/* 解析命令行参数 */
const commandArgs = process.argv.slice(2);
const commandFlags = commandArgs.filter((str) => str.startsWith("-"));
const commandPaths = commandArgs.filter((str) => !str.startsWith("-"));
//console.debug(commandArgs, commandFlags, commandPaths);

function showHelp(help) {
    const helpInfo = `
uploadimg ./wallpaper.png
uploadimg wallpaper.png --server=smms    # use selected server
uploadimg wallpaper.png -S=vgy
uploadimg a.png b.png c.png              # upload multiple images
uploadimg ./*.jpg ./*.png                # use system glob, windows cmd is not supported
uploadimg "./*.jpg"                      # use fast-glob, support all system
`;
    if (commandPaths.length === 0) {
        die(
            "Usage: uploadimg [options...] <path>",
            "    --list             -L  show all avaliable servers",
            "    --server=<server>  -S  select server",
            "    --sen=[true|false]     whether enables a case-sensitive mode for matching files, default true",
            help
                ? helpInfo + "\nexecute 'uploadimg --list' to check servers avaliable"
                : "    --help             -H  show help"
        );
    } else {
        die("Upload fail", "Please check your command");
    }
}

if (commandArgs.length === 0) {
    showHelp();
}

if (commandFlags.find((str) => str === "--help" || str === "-H")) {
    showHelp(1);
}

if (commandFlags.find((str) => str === "--list" || str === "-L")) {
    die(
        "Servers",
        "    add --server=<name> to select the server",
        "    e.g. uploadimg test.png --server=smms",
        "    e.g. uploadimg test.png -S=vgy",
        "    e.g. uploadimg test.png -S=yujian.bilibili",
        "\nServers avaliable:",
        "smms",
        "vgy",
        "uploadcc",
        "imgkr",
        "kuibu",
        "yujian"
    );
}

let caseSensitiveMatch = true; // 大小写敏感

(() => {
    let flag = commandFlags.find((str) => str.startsWith("--sen="));
    if (flag) {
        let parameter = "true";
        parameter = flag.replace("--sen=", "");
        if (parameter === "1" || parameter === "true") {
            caseSensitiveMatch = true;
            return;
        }
        if (parameter === "0" || parameter === "false") {
            caseSensitiveMatch = false;
            return;
        }
        die("Wrong parameter", parameter);
    }
})();

if (commandPaths.length === 0) {
    showHelp();
}

let filePaths = fg.sync(commandPaths, {
    onlyFiles: true,
    unique: true,
    absolute: true,
    dot: true,
    caseSensitiveMatch,
});

if (filePaths.length === 0) {
    die("Upload Fail", "No matched File");
}

/* 选择目标服务器 */
let server = "smms",
    query = undefined;
if (server.includes(".")) {
    [server, query] = server.split(".");
    if (typeof query === "string" && query.length === 0) query = undefined;
}

(() => {
    let flag;
    flag = commandFlags.find((str) => str.startsWith("--server="));
    if (flag) server = flag.replace("--server=", "");
    flag = commandFlags.find((str) => str.startsWith("-S="));
    if (flag) server = flag.replace("-S=", "");
})();

const modulePath = new URL(`./beds/${server}.js`, import.meta.url);

if (!(await isFileExists(modulePath))) {
    die("Server does not exists", server);
}
const { default: getResponseURL } = await import(modulePath);

/* 发送请求 */

try {
    const responseURLs = [];
    for (let filePath of filePaths) {
        const responseURL = await getResponseURL(filePath, query);
        responseURLs.push(responseURL);
    }
    die("Upload Success", ...responseURLs);
} catch (err) {
    die("Upload Fail", err);
}

// --server=bed.query filename
