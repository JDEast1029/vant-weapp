
import { McComponent } from '../common/component';

McComponent({
  props: {
    show: Boolean,
    customStyle: String,
    duration: {
      type: null,
      value: 300
    },
    zIndex: {
      type: Number,
      value: 1
    }
  },

  methods: {
    onClick() {
      this.$emit('click');
    },

    // for prevent touchmove
    noop() {}
  }
});
