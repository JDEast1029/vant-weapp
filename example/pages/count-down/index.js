import Page from '../../common/page';
import Toast from '../../dist/toast/toast';

Page({
  data: {
    time: 30 * 60 * 60 * 1000,
    targetTime: '2020-02-21 12:40:00',
    timeData: {}
  },

  onChange(e) {
    this.setData({
      timeData: e.detail
    });
  },

  start() {
    const countDown = this.selectComponent('.control-count-down');
    countDown.start();
  },

  pause() {
    const countDown = this.selectComponent('.control-count-down');
    countDown.pause();
  },

  reset() {
    const countDown = this.selectComponent('.control-count-down');
    countDown.reset();
  },

  finished() {
    Toast('倒计时结束');
  }
});
