import { McComponent } from '../common/component';

McComponent({
  props: {
    dot: Boolean,
    info: null,
    size: null,
    color: String,
    customStyle: String,
    classPrefix: {
      type: String,
      value: 'mc-icon'
    },
    name: {
      type: String,
      observer(val) {
        this.setData({
          isImageName: val.indexOf('/') !== -1
        });
      }
    }
  },

  methods: {
    onClick() {
      this.$emit('click');
    }
  }
});
