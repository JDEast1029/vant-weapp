/* eslint-disable */
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
        hasLoadData: Boolean,
        extra: {
            type: String,
            value: '请选择'
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
		visible: false,
		formatterValue: '',
	},
	
	observers: {
		'currentValue, dataSource': function(currentValue, dataSource) {
			const { label = [] } = getSelectedData(this.data.currentValue, this.data.dataSource);
			const val =  this.formatter(label) || this.data.extra;
			this.setData({
				formatterValue: val
			})
		}
	},

    methods: {
		formatter(v) {
			return !v ? v : v.join(',');
		},

        async handleClick() {
            try {
				if ((!this.data.dataSource || this.data.dataSource.length === 0) && this.hasLoadData) {
					// 数据加载完成后，用户需要绑定到dataScource
					await this.loadData();
					this.$emit('load', async (callback) => {
						await callback()
					});
                }
                this.setData({
                    visible: true
                });
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
