import { McComponent } from '../common/component';
import { button } from '../mixins/button';
import { openType } from '../mixins/open-type';
import { GRAY, BLUE } from '../common/color';

type Mode = 'confirm' | 'cancel' | 'mask';

McComponent({
  mixins: [button, openType],

  props: {
    show: {
      type: Boolean,
      observer(show: boolean) {
        !show && this.stopLoading();
      }
    },
    title: String,
    message: String,
    useSlot: Boolean,
    className: String,
    customStyle: String,
    asyncClose: Boolean,
    messageAlign: String,
    maskStyle: String,
    useTitleSlot: Boolean,
    showCancelButton: Boolean,
    maskCloseable: Boolean,
    confirmButtonOpenType: String,
    width: null,
    zIndex: {
      type: Number,
      value: 2000
    },
    confirmButtonText: {
      type: String,
      value: '确认'
    },
    cancelButtonText: {
      type: String,
      value: '取消'
    },
    confirmButtonColor: {
      type: String,
      value: BLUE
    },
    cancelButtonColor: {
      type: String,
      value: GRAY
    },
    showConfirmButton: {
      type: Boolean,
      value: true
    },
    mask: {
      type: Boolean,
      value: true
    },
    transition: {
      type: String,
      value: 'scale'
    }
  },

  data: {
    loading: {
      confirm: false,
      cancel: false
    }
  },

  methods: {
    onConfirm() {
      this.handleMode('confirm');
    },

    onCancel() {
      this.handleMode('cancel');
    },

    onClickMask() {
      this.onClose('mask');
    },

    handleMode(mode: Mode) {
      if (this.data.asyncClose) {
        this.setData({
          [`loading.${mode}`]: true
        });
      }

      this.onClose(mode);
    },

    close() {
      this.setData({
        show: false
      });
    },

    stopLoading() {
      this.setData({
        loading: {
          confirm: false,
          cancel: false
        }
      });
    },

    onClose(mode: Mode) {
      if (!this.data.asyncClose) {
        this.close();
      }
      this.$emit('close', mode);

      // 把 modal 实例传递出去，可以通过 stopLoading() 在外部关闭按钮的 loading
      this.$emit(mode, { modal: this });

      const callback = this.data[mode === 'confirm' ? 'onConfirm' : 'onCancel'];
      if (callback) {
        callback(this);
      }
    }
  }
});
