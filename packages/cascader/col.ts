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
        handleClick(value, rowIndex) {
			const { index: colIndex } = this.data;
			this.$emit('change', { value, rowIndex, colIndex });
		}
    }
});
