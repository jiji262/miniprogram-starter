import { fetchHome } from '../../services/home/home';
import { initUser } from '../../common/userManager';

Page({
  data: {
    user: null,
    imgSrcs: [],
    pageLoading: false,
    current: 1,
    autoplay: true,
    duration: 500,
    interval: 5000,
    navigation: { type: 'dots' },
  },

  init: async function (e) {
    wx.showLoading();

    this.loadHomePage();

    wx.hideLoading();

    initUser();
  },

  onLoad() {
    this.init();
  },

  onPullDownRefresh() {
    this.init();
  },

  loadHomePage() {
    wx.stopPullDownRefresh();

    this.setData({
      pageLoading: true,
    });
    fetchHome().then(({ swiper }) => {
      this.setData({
        imgSrcs: swiper,
        pageLoading: false,
      });
    });
  },

  navToSearchPage() {
    wx.navigateTo({ url: '/pages/goods/search/index' });
  },

});
