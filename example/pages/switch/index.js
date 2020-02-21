import Page from '../../common/page';
import Modal from '../../dist/modal/modal';

Page({
  data: {
    checked: true,
    checked2: true
  },

  onChange({ detail }) {
    this.setData({ checked: detail });
  },

  onChange2({ detail }) {
    Modal.confirm({
      title: '提示',
      message: '是否切换开关？'
    }).then((res) => {
      this.setData({ checked2: detail });
    });
  }
});
