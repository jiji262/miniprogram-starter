import Toast from 'tdesign-miniprogram/toast/index';
import { initUser, updateUser } from '../../common/userManager';

const menuData = [
  [
    {
      title: '收货地址',
      tit: '',
      url: '',
      type: 'address',
    },
    {
      title: '优惠券',
      tit: '',
      url: '',
      type: 'coupon',
    },
    {
      title: '积分',
      tit: '',
      url: '',
      type: 'point',
    },
  ],
  [
    {
      title: '帮助中心',
      tit: '',
      url: '',
      type: 'help-center',
    },
    {
      title: '客服热线',
      tit: '',
      url: '',
      type: 'service',
      icon: 'service',
    },
  ],
];

const getDefaultData = () => ({
  showMakePhone: false,
  user: {},
  menuData,
  customerServiceInfo: {
    servicePhone: '4006336868',
    serviceTimeDuration: '每周三至周五 9:00-12:00  13:00-15:00',
  },
  showKefu: true,
  versionNo: '',
});

Page({
  data: getDefaultData(),

  onLoad() {
    this.getVersionInfo();
  },

  onShow() {
    this.getTabBar().init();
    initUser();
  },
  onPullDownRefresh() {

  },

  onClickCell({ currentTarget }) {
    const { type } = currentTarget.dataset;

    switch (type) {
      case 'address': {
        Toast({
          context: this,
          selector: '#t-toast',
          message: '你点击了收货地址菜单',
          icon: '',
          duration: 1000,
        });
        break;
      }
      case 'service': {
        this.openMakePhone();
        break;
      }
      case 'help-center': {
        Toast({
          context: this,
          selector: '#t-toast',
          message: '你点击了帮助中心菜单',
          icon: '',
          duration: 1000,
        });
        break;
      }
      case 'point': {
        Toast({
          context: this,
          selector: '#t-toast',
          message: '你点击了积分菜单',
          icon: '',
          duration: 1000,
        });
        break;
      }
      case 'coupon': {
        Toast({
          context: this,
          selector: '#t-toast',
          message: '你点击了优惠券菜单',
          icon: '',
          duration: 1000,
        });
        break;
      }
      default: {
        Toast({
          context: this,
          selector: '#t-toast',
          message: '未知跳转',
          icon: '',
          duration: 1000,
        });
        break;
      }
    }
  },

  openMakePhone() {
    this.setData({ showMakePhone: true });
  },

  closeMakePhone() {
    this.setData({ showMakePhone: false });
  },

  call() {
    wx.makePhoneCall({
      phoneNumber: this.data.customerServiceInfo.servicePhone,
    });
  },

  gotoUserEditPage() {
    wx.navigateTo({ url: '/pages/usercenter/person-info/index' });
  },

  gotoChooseAvatar(e) {
    let that = this;
    if (!that.data.user.openid) {
      return;
    }
    const { avatarUrl } = e.detail;

    //update server
    wx.cloud.uploadFile({
      cloudPath: that.data.user.openid + Date.now() + '.png',
      filePath: avatarUrl,
    }).then(res => {
      // get resource ID
      console.log(res.fileID)

      updateUser(
        {
          "user.avatar": res.fileID,
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
    }).catch(error => {
      // handle error
      console.error(error)
    })
  },

  getVersionInfo() {
    const versionInfo = wx.getAccountInfoSync();
    const { version, envVersion = __wxConfig } = versionInfo.miniProgram;
    this.setData({
      versionNo: envVersion === 'release' ? version : envVersion,
    });
  },
});
