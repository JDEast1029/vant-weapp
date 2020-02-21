import { McComponent } from '../common/component';

McComponent({
  props: {
    show: Boolean,
    maskClosable: {
      type: Boolean,
      value: true
    },
    content: String,
    zIndex: {
      type: Number,
      value: 1000
    },
    type: {
      type: String,
      value: 'text'
    },
    loadingType: {
      type: String,
      value: 'circular'
    },
    position: {
      type: String,
      value: 'middle'
    }
  },

  methods: {
    // for prevent touchmove
    noop() {},
    handleClickMask() {
      if (this.data.mode !== 'loading' && this.data.maskClosable) {
        this.setData({
          show: false
        });
      }
    }
  }
});
