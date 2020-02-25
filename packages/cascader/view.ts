import { McComponent } from '../common/component';
import { getSelectedData } from '../common/utils';

McComponent({
    props: {
        value: {
			type: Array,
            value: [],
            observer(v) {
                // 数组情况下同值会重新set
				if ((v && v.length !== 0) && v === this.data.currentValue) {
					return;
				}
				this.setData({
                    currentValue: v,
                    rebuildData: this.makeRebuildData()
                });
				this.resetIndex();
            }
		},
		dataSource: {
			type: Array,
            value: [],
            observer() {
                this.setData({
                    rebuildData: this.makeRebuildData()
                });
                this.resetIndex();
            }
		},
		loadData: Function,
		changeOnSelect: {
			type: Boolean,
			value: false
		}
    },

    data: {
        currentIndex: 0,
        currentValue: [],
        rebuildData: [],
        hasChildren: true
    },

    methods: {
        // 计算属性 TODO:ybb  不能用observers, 怎么拿到colValue
        // colValue() {
		// 	return this.data.currentValue[this.data.currentIndex];
		// },
		// colData() {
		// 	return this.data.rebuildData[this.data.currentIndex];
		// },
		// /**
		//  * TODO: 初始化时，存在查找耗时
		//  */
		// label() {
		// 	const { label = [] } = this.getInfo(this.data.currentValue);
		// 	return label.filter(i => i);
        // },
        
        // 方法
        /**
		 * 重置index
		 */
		async resetIndex() {
			if (this.data.currentValue.length === 0 || this.data.rebuildData.length === 0) {
                this.setData({
                    currentIndex: 0
                });
				return;
			}
			// TODO: 异步场景
			// if (this.data.currentValue.length >= this.data.rebuildData.length) {
			// 	for (let i = this.data.rebuildData.length; i <= this.data.currentValue.length; i++) {
			// 		await
			// 	}
			// }
			let value = this.data.currentValue.slice(-1)[0];
			let colIndex = this.data.currentValue.length - 1;
			let rowIndex = this.data.rebuildData[colIndex].findIndex(i => i.value === value);
			this.handleChange({ value, rowIndex, colIndex, sync: false });
		},
		/**
		 * 单列数据
		 * @param  {Array} source 数据源
		 */
		makeData(source) {
			let data = source && source.map(i => ({
				value: i.value,
				label: i.label,
				hasChildren: !!(i.children && (i.children.length > 0 || this.data.loadData)),
				loading: false
			}));
			return data;
		},
		/**
		 * 调整数据
		 * @return {Array} 每列的数据
		 */
		makeRebuildData() {
			if (!this.data.dataSource.length) return [];
			let temp = this.data.dataSource;
			let data = this.data.currentValue.slice(0).reduce((pre, cur, index) => {
				pre[index] = this.makeData(temp);
				temp = ((temp && temp.find(i => i.value == cur)) || {}).children;
				return pre; 
			}, []);
			temp && data.push(this.makeData(temp));
			return data;
		},
		/**
		 * 改变后的回调
		 * @param  {String} value    改变后的值
		 * @param  {Number} rowIndex 索引
		 * @param  {Number} colIndex 列
		 * @param  {Number} isHover 是否是xx
		 */
		async handleChange({ value, rowIndex, colIndex, sync }) {
			try {
                const len = this.data.currentValue.slice(colIndex).length;
                let currentValue = [...this.data.currentValue];
                currentValue.splice(colIndex, len, value);
                this.setData({
                    currentValue
                });
				/**
				 * TODO: 提前缓存index
				 */
				let children = this.data.currentValue.reduce((pre, cur) => {
					let target = pre.find(i => i.value == cur) || {};
					return target.children ? target.children : undefined;
				}, this.data.dataSource);
				/**
				 * 异步加载数据
				 */
				if (this.data.loadData && children && children.length === 0) {
                    let rebuildData = `rebuildData[${colIndex}][${rowIndex}].loading`;
                    this.setData({
                        [rebuildData]: true
                    });
					let res = await this.data.loadData();
					/**
					 * TODO: 优化，dataSource -> cloneData?
					 */
					children.splice(0, 0, ...res);
				}
                
                if (children) {
                    let rebuildData = [...this.data.rebuildData];
                    rebuildData.splice(colIndex + 1, len, this.makeData(children));
                    this.setData({
                        rebuildData
                    });
                }
				
				if ((!children || children.length === 0) && colIndex < this.data.rebuildData.length) {
                    let currentValue = [...this.data.currentValue];
                    let rebuildData = [...this.data.rebuildData];
					currentValue.splice(colIndex + 1, len);
                    rebuildData.splice(colIndex + 1, len);
                    this.setData({
                        currentValue,
                        rebuildData,
                        hasChildren: false,
                        currentIndex: this.data.currentValue.length - 1
                    });
                    
				} else {
                    this.setData({
                        hasChildren: true,
                        currentIndex: this.data.currentValue.length
                    });
				}
				sync !== false && this.sync();
			} catch (e) {
				throw new Error(`vc-cascader: ${e}`);
			} finally {
                if (this.data.rebuildData[colIndex][rowIndex].loading) {
                    let rebuildData = `rebuildData[${colIndex}][${rowIndex}].loading`;
                    this.setData({
                        [rebuildData]: false
                    });
                }
			}
		},
		getInfo(v) {
			return getSelectedData(v, this.data.dataSource) || {};
		},
		/**
		 * v-model 同步, 外部的数据改变时不会触发
		 */
		sync() {
			(this.data.changeOnSelect) && this.$emit('change', this.data.currentValue, this.label);
			// 最后一项，自动关闭
			let lastData = this.data.rebuildData[this.data.currentValue.length];
			let isLast = !lastData || lastData.length === 0;
			// 该模式下，label会变为上一个值，这里重新获取一次
			if (isLast && !this.data.changeOnSelect) {
				const { label } = this.getInfo(this.data.currentValue);
				this.$emit('change', this.data.currentValue, label);
				this.$emit('complete', this.data.currentValue, label);
			}
		}
    }
});
