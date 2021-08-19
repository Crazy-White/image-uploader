const fs = require("fs");

async function main(path, server) {
    if (["main", "func"].includes(server)) {
        //exclude files
        throw new Error(`Server '${server}' does not exists`);
    } else if (server.includes(".")) {
        let query = "";
        [server, query] = server.split(".");
        if (!fs.existsSync(__dirname + `/src/${server}.js`))
            throw new Error(`Server '${server}' does not exists`);
        getRemoteURL = async function (path, target) {
            try {
                return await require(`./src/${server}`)(path, target, query);
            } catch (err) {
                throw err;
            }
        };
    } else if (fs.existsSync(__dirname + `/src/${server}.js`)) {
        getRemoteURL = require(`./src/${server}`);
    } else {
        //default
        throw new Error(`Server '${server}' does not exists`);
    }

    const target = [];
    try {
        const result = await getRemoteURL(path, target);
        return result;
    } catch (e) {
        throw e;
    }
}
module.exports = main;
