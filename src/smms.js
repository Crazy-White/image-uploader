const fetch = require("node-fetch");
const FormData = require("form-data");
const fs = require("fs");

// https://sm.ms

function uploadImage(path) {
    return new Promise(function (resolve, reject) {
        const formData = new FormData();
        formData.append("smfile", fs.createReadStream(path));
        fetch("https://sm.ms/api/v2/upload/", {
            method: "POST",
            headers: {
                Authorization: "qk0WHwBx9NOcUWyMgqMo7o6YoMRAGHTX", // Get token form https://sm.ms/home/apitoken
            },
            body: formData,
        })
            .then((response) => response.json())
            .then((responseData) => {
                resolve(responseData);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

async function getRemoteURL(path, target) {
    const response = await uploadImage(path);
    if (!response.success) throw new Error(response.message);
    target.push(response.data.url);
    return response.data.url;
}

module.exports = getRemoteURL;
