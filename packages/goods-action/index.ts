import { McComponent } from '../common/component';

McComponent({
  relation: {
    type: 'descendant',
    name: 'goods-action-button',
    current: 'goods-action',
  },
  props: {
    safeAreaInsetBottom: {
      type: Boolean,
      value: true
    }
  }
});
