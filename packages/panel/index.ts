import { McComponent } from '../common/component';

McComponent({
  classes: ['header-class', 'footer-class'],

  props: {
    desc: String,
    title: String,
    status: String,
    useFooterSlot: Boolean
  }
});
