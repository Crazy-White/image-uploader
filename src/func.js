function die(title, ...msg) {
    console.log("\033[1m" + title + ":\033[0m");
    console.log(msg.join("\n"));
    process.exit();
}

function checkPlatform() {
    const platform = require("os").type();
    if (platform === "Windows_NT") return 1;
    else return 0;
}

module.exports = {
    die,
    checkPlatform,
};
