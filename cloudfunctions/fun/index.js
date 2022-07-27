const cloud = require("wx-server-sdk");

const getOpenId = require("./getOpenId/index");
const getUser = require("./user/get.js");
const updateUser = require("./user/update.js");


cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});

const db = cloud.database({ throwOnNotFound: false });

// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    // 工具函数
    case "getOpenId":
      return await getOpenId.main(event, context, cloud);
    // 用户信息
    case "getUser":
      return await getUser.main(event, context, cloud, db);
    case "updateUser":
      return await updateUser.main(event, context, cloud, db);
  }
};
