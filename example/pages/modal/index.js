import Page from '../../common/page';
import Modal from '../../dist/modal/modal';

const message = '代码是写出来给人看的，附带能在机器上运行';

Page({
  data: {
    show: false
  },

  showCustomModal() {
    this.setData({ show: true });
  },

  onClickAlert() {
    Modal.alert({
      title: '标题',
      message
    });
  },

  getUserInfo(event) {
    console.log(event.detail);
  },

  onClickAlert2() {
    Modal.alert({
      message
    });
  },

  onClickConfirm() {
    Modal.confirm({
      title: '标题',
      message
    });
  },

  onClickAsyncClose() {
    Modal.confirm({
      title: '标题',
      message,
      asyncClose: true
    })
      .then(() => {
        setTimeout(() => {
          Modal.close();
        }, 1000);
      })
      .catch(() => {
        Modal.close();
      });
  },

  onClose(event) {
    this.setData({
      show: false
    });
  }
});
