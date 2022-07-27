exports.main = async (event, context, cloud, db) => {
  console.log("user.upadte:", event);

  // 获取用户 openid
  const openid = cloud.getWXContext().OPENID;
  console.log(openid);

  // 更新用户信息
  let form = event.data;

  db.collection("user")
    .doc(openid)
    .update({
      data: {
        avatar: form.avatar,
        name: form.name,
        gender: form.gender,
      },
    })
    .then((res) => {
      console.log("user.update.res", res);
      return res;
    });
};
