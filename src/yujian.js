const { sendPost } = require("./func");
const token = "562cbd50f59dcc06751de6863ce7adc5";

// https://www.hualigs.cn/api/upload
// type {bilibili,toutiao,sougou,huluxia,sina,catbox,qihoo,suning,netease,niupic,baidu,postimages,chaoxing,ai58,imgbox,imgur,gtimg,vxichina,bkimg,muke,vimcn,ali,smms}

async function getRemoteURL(path, target, type = "bilibili") {
    const response = await sendPost(
        `https://www.hualigs.cn/api/upload?apiType=${type}&token=${token}`,
        "image",
        path
    );
    if (response.code !== 200) throw new Error(response);
    target.push(response.data.url[type]);
    return response.data.url[type];
}

module.exports = getRemoteURL;
