import { McComponent } from '../common/component';
import { getSelectedData } from '../common/utils';

McComponent({
    props: {
        value: {
            type: String,
            optionalTypes: [String, Number, Array],
            observer(val) {
                if (val === this.data.currentValue) return;
                this.setData({
                    currentValue: val
                })
            }
        },
        label: String,
        loadData: Function,
        extra: {
            type: String,
            value: '请选择'
        },
        formatter: {
            type: Function,
            value: (v: any) => (!v ? v : v.join(','))
        },
        title: {
			type: String,
			value: ''
		},
		cancelText: {
			type: String,
			value: '取消'
		},
		okText: {
			type: String,
			value: '确定'
		},
		showToolbar: {
			type: Boolean,
			value: true
        },
		dataSource: {
			type: Array,
            value: [],
		},
		changeOnSelect: {
			type: Boolean,
			value: false
		}
    },

    data: {
        currentValue: [],
        visible: false
    },

    methods: {
        formatterValue() {
            const { label = [] } = getSelectedData(this.data.currentValue, this.data.dataSource);
			return this.formatter(label) || this.data.extra;
        },

        async handleClick() {
            try {
				if ((!this.data.dataSource || this.data.dataSource.length === 0) && this.loadData) {
					// 数据加载完成后，用户需要绑定到dataScource
					await this.loadData();
                }
                this.setData({
                    visible: true
                });
				/**
				 * 有待优化，dataSource源数据异步
				 */
				// let { dataSource, loadData, title, cancelText, okText, showToolbar, value, show } = this.data;
				// Func.popup({
				// 	dataSource,
				// 	title,
				// 	cancelText,
				// 	showToolbar,
				// 	show,
				// 	okText,
				// 	value,
				// 	loadData,
				// 	onOk: (v, label, data) => {
				// 		this.data.currentValue = v;
				// 		this.$emit('ok', v, label, data);
				// 		this.sync(label);
				// 	},
				// 	onCancel: res => {
				// 		this.$emit('cancel');
				// 	},
				// 	getInstance: vm => this.pickerInstance = vm
				// });
			} catch (e) {
				throw new Error(`m-cascader: ${e}`);
			}
        },
        handleClose() {
            this.setData({
                visible: false
            })
        }
    }
});
