exports.main = async (event, context, cloud, db) => {
  console.log("member.get:", event);

  const defaultAvatarUrl =
    "https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0";

  // 获取用户 OpenId
  const openid = cloud.getWXContext().OPENID;
  console.log(openid);

  // 查询
  let res = await db.collection("user").doc(openid).get();
  let user = res.data;
  if (user) {
    // 校验是否有头像，没有头像的用户设置默认头像
    if (isEmpty(user.avatar)) {
      user.avatar = defaultAvatarUrl;
    }
    // 已有用户信息，终止执行并返回
    return user;
  }

  // 新用户，初始化用户信息
  let form = {
    _id: openid,
    openid,
    name: "",
    avatar: "",
    created: db.serverDate(),
    status: "enable",
    credit: 0,
    role: [],
    gender: "0",
  };

  // 创建用户信息
  await db.collection("user").add({
    data: form,
  });

  // 设置默认头像并返回
  form.avatar = defaultAvatarUrl;
  return form;
};

function isEmpty(str) {
  // 正则去除字符串空格
  let res = str.replace(/\s+/g, "");
  return (
    res === "" ||
    !res.length ||
    !res ||
    res === undefined ||
    res === "null" ||
    res === "undefined"
  );
}
