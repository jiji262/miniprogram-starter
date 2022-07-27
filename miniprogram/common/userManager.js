
export async function initUser() {

  let pages = getCurrentPages();

  let currPage = pages[pages.length - 1];
  let user = await getApp().getUser();
  currPage.setData({
    user: user
  });
}

export function updateUser(params, callback) {

  let pages = getCurrentPages();

  let that = pages[pages.length - 1];

  that.setData(
    params,
    () => {
      console.log("RESULT", that.data.user);
  
      wx.setStorageSync("user", that.data.user);
      wx.setStorageSync("getUserTime", Date.now());
  
      wx.cloud
      .callFunction({
        name: "fun",
        data: {
          type: "updateUser",
          data: that.data.user,
        },
      })
      .then(console.log);
      if (callback) {
        callback();
      }
      
    },
  );
}
