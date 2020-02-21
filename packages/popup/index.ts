import { McComponent } from '../common/component';
import { transition } from '../mixins/transition';

McComponent({
  classes: [
    'enter-class',
    'enter-active-class',
    'enter-to-class',
    'leave-class',
    'leave-active-class',
    'leave-to-class'
  ],

  mixins: [transition(false)],

  props: {
    round: Boolean,
    closeable: Boolean,
    customStyle: String,
    maskStyle: String,
    transition: {
      type: String,
      observer: 'observeClass'
    },
    zIndex: {
      type: Number,
      value: 100
    },
    mask: {
      type: Boolean,
      value: true
    },
    closeIcon: {
      type: String,
      value: 'cross'
    },
    closeIconPosition: {
      type: String,
      value: 'top-right'
    },
    maskClosable: {
      type: Boolean,
      value: true
    },
    position: {
      type: String,
      value: 'center',
      observer: 'observeClass'
    },
    safeAreaInsetBottom: {
      type: Boolean,
      value: true
    },
    safeAreaInsetTop: {
      type: Boolean,
      value: false
    }
  },

  created() {
    this.observeClass();
  },

  methods: {
    onClickCloseIcon() {
      this.$emit('close');
    },

    onClickMask() {
      this.$emit('click-mask');

      if (this.data.maskClosable) {
        this.$emit('close');
      }
    },

    observeClass() {
      const { transition, position } = this.data;

      const updateData: { [key: string]: any } = {
        name: transition || position
      };

      if (transition === 'none') {
        updateData.duration = 0;
      }

      this.setData(updateData);
    }
  }
});
