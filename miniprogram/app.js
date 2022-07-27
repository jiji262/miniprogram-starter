import updateManager from './common/updateManager';

App({
  onLaunch: function () {
    this.initCloud();
    updateManager();
  },

  initCloud: function () {
    if (!wx.cloud) {
      console.error("请使用 2.2.3 或以上的基础库以使用云能力");
    } else {
      wx.cloud.init({
        traceUser: true,
      });
    }
  },

  getUser: async function () {
    // 从缓存中获取上次查询用户信息的时间，校验是否超过10小时
    let user = wx.getStorageSync("user");
    let last = wx.getStorageSync("getUserTime");
    let now = Date.now();

    if (last && now - last < 1000 * 60 * 60 * 10 && user) {
      return user; // 终止执行函数
    }

    // 从数据库中查询用户信息
    try {
      let res = await wx.cloud.callFunction({
        name: "fun",
        data: {
          type: "getUser",
        },
      });
      // 设置/更新本地缓存
      wx.setStorageSync("user", res.result);
      wx.setStorageSync("getUserTime", now);
      return res.result; // 返回
    } catch (error) {
      console.log("getUser.error", error);
    }
  },
});
