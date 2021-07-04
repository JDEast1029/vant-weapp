import { McComponent } from '../common/component';
import { Weapp } from 'definitions/weapp';

McComponent({
  props: {
    dataSource: {
      type: Array,
      value: []
    },
    value: {
      type: String,
      optionalTypes: [Number]
    },
    loading: {
      type: Boolean,
      value: false
    },
    index: {
      type: Number,
      observer(newVal, oldVal) {
        // 滚动到初始位置
        this.setData({
          contentActive: 'top'
        });
        // let instance = this.data.dataSource.findIndex(i => this.data.value == i.value);
        // $(this.$el).scrollIntoView({ to: instance * 40 });
      }
    }
  },
  data: {
    contentActive: ''
  },
  methods: {
    onClick(event: Weapp.Event) {
      const { value, rowIndex } = event.currentTarget.dataset;
      const { index: colIndex } = this.data;
      this.$emit('change', { value, rowIndex, colIndex });
    }
  }
});
