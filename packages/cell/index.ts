import { link } from '../mixins/link';
import { McComponent } from '../common/component';
import { Weapp } from 'definitions/weapp';

McComponent({
  classes: [
    'title-class',
    'label-class',
    'value-class',
    'right-icon-class',
    'hover-class'
  ],

  mixins: [link],

  props: {
    title: null,
    value: null,
    icon: String,
    size: String,
    label: String,
    center: Boolean,
    isLink: Boolean,
    required: Boolean,
    clickable: Boolean,
    titleWidth: String,
    customStyle: String,
    arrowDirection: String,
    useLabelSlot: Boolean,
    border: {
      type: Boolean,
      value: true
    }
  },

  methods: {
    onClick(event: Weapp.Event) {
      this.$emit('click', event.detail);
      this.jumpLink();
    }
  }
});
