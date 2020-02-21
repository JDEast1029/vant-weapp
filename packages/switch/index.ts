import { McComponent } from '../common/component';
import { BLUE, GRAY_DARK } from '../common/color';

McComponent({
  field: true,

  classes: ['node-class'],

  props: {
    value: {
      type: null,
      observer(value) {
        const loadingColor = this.getLoadingColor(value);
        this.setData({ checked: value, loadingColor });
      }
    },
    loading: Boolean,
    disabled: Boolean,
    activeColor: String,
    inactiveColor: String,
    size: {
      type: String,
      value: '30px'
    },
    activeValue: {
      type: null,
      value: true
    },
    inactiveValue: {
      type: null,
      value: false
    }
  },

  created() {
    const { value } = this.data;
    const loadingColor = this.getLoadingColor(value);

    this.setData({ value, loadingColor });
  },

  methods: {
    getLoadingColor(checked) {
      const { activeColor, inactiveColor } = this.data;
      return checked ? activeColor || BLUE : inactiveColor || GRAY_DARK;
    },

    onClick() {
      const { activeValue, inactiveValue } = this.data;
      if (!this.data.disabled && !this.data.loading) {
        const checked = this.data.value === activeValue;
        const value = checked ? inactiveValue : activeValue;
        this.$emit('input', value);
        this.$emit('change', value);
      }
    }
  }
});
