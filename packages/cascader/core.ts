import { McComponent } from '../common/component';
import { getSelectedData } from '../common/utils';

McComponent({
    props: {
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
        value: {
			type: Array,
            value: [],
		},
		dataSource: {
			type: Array,
            value: [],
		},
		loadData: Function,
		changeOnSelect: {
			type: Boolean,
			value: false
        },
        visible: {
            type: Boolean,
            value: false,
            observer: function(val) {
                this.setData({
                    isActive: val
                })
            }
        }
    },

    data: {
        isActive: false
    },

    methods: {
        handleOk() {
            let { label, data } = getSelectedData(this.data.currentValue, this.data.dataSource);

            this.$emit('ok', this.data.currentValue, label, data);
            this.setData({ isActive: false });
        },
        handleClose() {
            this.$emit('close');
            this.setData({ isActive: false });
        },
        handleCancel() {
            this.$emit('cancel');
            this.setData({ isActive: false });
        }
    }
});
