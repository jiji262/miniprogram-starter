import Toast from 'tdesign-miniprogram/toast/index';
import { initUser, updateUser } from '../../../common/userManager';

Page({
  data: {
    user: {},
    showUnbindConfirm: false,
    pickerOptions: [
      {
        name: '男',
        code: '1',
      },
      {
        name: '女',
        code: '2',
      },
    ],
    typeVisible: false,
    genderMap: ['', '男', '女'],
  },
  onShow() {
    initUser();
  },

  onClickCell({ currentTarget }) {
    const { dataset } = currentTarget;
    const { name } = this.data.user;

    switch (dataset.type) {
      case 'gender':
        this.setData({
          typeVisible: true,
        });
        break;
      case 'name':
        wx.navigateTo({
          url: `/pages/usercenter/name-edit/index`,
        });
        break;
      default: {
        break;
      }
    }
  },
  onClose() {
    this.setData({
      typeVisible: false,
    });
  },
  onConfirm(e) {
    let that = this;
    const { value } = e.detail;
    
    updateUser(
      {
        typeVisible: false,
        'user.gender': value,
      },
      () => {
        Toast({
          context: this,
          selector: '#t-toast',
          message: '设置成功',
          theme: 'success',
        });
      }
    );
    //TODO: update to server 
    //TODO: phone number
  },
});
