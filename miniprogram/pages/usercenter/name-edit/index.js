import { initUser, updateUser } from '../../../common/userManager';

Page({
  data: {
    nameValue: '',
    user: {}
  },
  onLoad() {
    initUser().then(() => {
      this.setData({
        nameValue: this.data.user.name || "微信用户",
      });
    })
    
  },
  onSubmit() {
    updateUser(
      {
        'user.name': this.data.nameValue,
      },
      () => {
        wx.navigateBack({ backRefresh: true });
      }
    );
  },
  clearContent() {
    this.setData({
      nameValue: '',
    });
  },
});

