
Component({
  options: {
    multipleSlots: true,
  },
  properties: {
    user: {
      type: Object,
      value: {},
    },
    isNeedGetUserInfo: {
      type: Boolean,
      value: false,
    },
  },
  data: {
    defaultAvatarUrl:
    'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
  },
  methods: {
    gotoChooseAvatar(e) {
      this.triggerEvent('gotoChooseAvatar', e.detail);
    },

    gotoUserEditPage() {
      this.triggerEvent('gotoUserEditPage');
    },
  },
});
