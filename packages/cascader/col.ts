import { McComponent } from '../common/component';

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
            observer: function(newVal, oldVal) {
                // 滚动到初始位置
                let instance = this.data.dataSource.findIndex(i => this.data.value == i.value);
                // TODO: ybb
                // $(this.$el).scrollIntoView({ to: instance * 40 });
            }
		}
    },
    methods: {
        handleClick(value, rowIndex) {
			const { index: colIndex } = this.data;
			this.$emit('change', { value, rowIndex, colIndex });
		}
    }
});
