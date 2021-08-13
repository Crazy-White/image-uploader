const fs = require("fs");
const fg = require("fast-glob");

/* 解析命令行参数 */
const commandArgs = process.argv.slice(2);
const commandFlags = commandArgs.filter((str) => str.startsWith("-"));
const commandPaths = commandArgs.filter((str) => !str.startsWith("-"));
//console.debug(commandArgs, commandFlags, commandPaths);

const { die } = require("./func");

function showHelp(help) {
    if (commandPaths.length === 0) {
        die(
            "Usage: uploadimg [options...] <path>",
            ...[
                "    --list               show servers avaliable",
                "    --server=<server>    select server",
                "    --sen=[true|false]   whether enables a case-sensitive mode for matching files",
                help
                    ? "" +
                      "\ne.g. uploadimg test.png --server=smms" +
                      "\ne.g. uploadimg --server=smms ./test.png" +
                      "\ne.g. uploadimg 1.jpg 2.jpg [3.jpg] [4.jpg] [...]" +
                      "\ne.g. uploadimg id-*.jpg --sen=false" +
                      "\n execute 'uploadimg --list' to check servers avaliable"
                    : "    --help               show help",
            ]
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
        ...[
            "    add --server=<name> to select the server",
            "    e.g. uploadimg test.png --server=smms",
            "",
            "smms",
            "vgy",
            "uploadcc",
            "imgkr",
            "kuibu",
            "yujian",
            "kieng.[jd|sg|c58|wy|hl|tt|qq|kequ|sh]",
        ]
    );
}

let caseSensitiveMatch = true; // defaultValue

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
    if (commandPaths.every((path) => fs.existsSync(path))) {
        filePaths = commandPaths;
    } else {
        die("Upload Fail", "No matched File");
    }
}

//console.debug(filePaths);

/* 选择目标服务器 */
let server = "smms"; // default value
let getRemoteURL = require("./smms");

(() => {
    let flag;
    flag = commandFlags.find((str) => str.startsWith("--server="));
    if (flag) server = flag.replace("--server=", "");
    flag = commandFlags.find((str) => str.startsWith("--S="));
    if (flag) server = flag.replace("--S=", "");
})();

if (["main", "func"].includes(server)) {
    //exclude files
    die("Server does not exists", server);
} else if (server.includes(".")) {
    let query = "";
    [server, query] = server.split(".");
    if (!fs.existsSync(__dirname + `/${server}.js`))
        die("Server does not exists", server);
    getRemoteURL = async function (path, target) {
        try {
            return await require(`./${server}`)(path, target, query);
        } catch (err) {
            throw err;
        }
    };
} else if (fs.existsSync(__dirname + `/${server}.js`)) {
    getRemoteURL = require(`./${server}`);
} else {
    //default
    die("Server does not exists", server);
}

/* 发送请求 */
const remoteURLs = [];
Promise.all(filePaths.map((path) => getRemoteURL(path, remoteURLs)))
    .then(() => {
        die("Upload Success", ...remoteURLs);
    })
    .catch((err) => {
        die("Upload Fail", err);
    });
