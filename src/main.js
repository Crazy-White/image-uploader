const fs = require("fs");

/* 解析命令行参数 */
const commandArgs = process.argv.slice(2);
const commandFlags = commandArgs.filter((str) => str.startsWith("-"));
const commandPaths = commandArgs.filter((str) => !str.startsWith("-"));

const { die } = require("./func");

function showHelp(help) {
    die(
        "Usage: uploadimg [options...] <path>",
        ...[
            "    --list    show servers avaliable",
            "    --server=<server>    select server",
            help
                ? "" +
                  "\ne.g. uploadimg test.png --server=smms" +
                  "\ne.g. uploadimg --server=smms ./test.png" +
                  "\ne.g. uploadimg 1.jpg 2.jpg [3.jpg] [4.jpg] [...]" +
                  "\n execute 'uploadimg --list' to check servers avaliable"
                : "    --help   show help",
        ]
    );
}
if (commandArgs.length === 0) {
    showHelp();
}

if (commandFlags.find((str) => str === "--help")) {
    showHelp(1);
}

if (commandFlags.find((str) => str === "--list")) {
    die(
        "Servers",
        ...[
            "    add --server=<name> to select the server",
            "    e.g. uploadimg test.png --server=smms",
            "",
            "kieng    equal to kieng.jd",
            "smms",
            "imgkr",
            "kieng.jd",
            "kieng.sg",
            "kieng.c58",
            "kieng.wy",
            "kieng.hl",
            "kieng.tt",
            "kieng.qq",
            "kieng.kefu",
            "kieng.sh",
        ]
    );
}

if (commandPaths.length === 0) {
    showHelp();
}

commandPaths.forEach((path) => {
    if (!fs.existsSync(path)) {
        die("Upload Fail", "File above does not exist", path);
    }
});

/* 选择目标服务器 */
let server = "kieng.jd"; //default value

(() => {
    let flag = commandFlags.find((str) => str.startsWith("--server="));
    if (flag) server = flag.replace("--server=", "");
})();

let getRemoteURL = require("./kieng");

if (server.startsWith("kieng.")) {
    getRemoteURL = async function (path, target) {
        try {
            return await require("./kieng")(
                path,
                target,
                server.replace("kieng.", "")
            );
        } catch (err) {
            throw err;
        }
    };
} else if (["main", "func"].includes(server)) {
    //exclude files
    die("Server does not exists", server);
} else if (fs.existsSync(__dirname + `/${server}.js`)) {
    getRemoteURL = require(`./${server}`);
} else {
    //default
    die("Server does not exists", server);
}

/* 发送请求 */
const remoteURLs = [];
Promise.all(commandPaths.map((path) => getRemoteURL(path, remoteURLs)))
    .then(() => {
        die("Upload Success", ...remoteURLs);
    })
    .catch((err) => {
        die("Upload Fail", err);
    });
