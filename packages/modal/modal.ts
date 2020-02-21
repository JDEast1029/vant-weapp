let queue = [];

type ModalMode = 'confirm' | 'cancel';
type ModalOptions = {
  lang?: string;
  show?: boolean;
  title?: string;
  width?: string | number;
  zIndex?: number;
  context?: WechatMiniprogram.Page.TrivialInstance | WechatMiniprogram.Component.TrivialInstance;
  message?: string;
  mask?: boolean;
  selector?: string;
  ariaLabel?: string;
  className?: string;
  customStyle?: string;
  transition?: string;
  asyncClose?: boolean;
  businessId?: number;
  sessionFrom?: string;
  maskStyle?: string;
  appParameter?: string;
  messageAlign?: string;
  sendMessageImg?: string;
  showMessageCard?: boolean;
  sendMessagePath?: string;
  sendMessageTitle?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  showConfirmButton?: boolean;
  showCancelButton?: boolean;
  maskCloseable?: boolean;
  confirmButtonOpenType?: string;
}

interface Modal {
  (options: ModalOptions): Promise<ModalMode>;
  alert?: (options: ModalOptions) => Promise<ModalMode>;
  confirm?: (options: ModalOptions) => Promise<ModalMode>;
  close?: () => void;
  stopLoading?: () => void;
  install?: () => void;
  setDefaultOptions?: (options: ModalOptions) => void;
  resetDefaultOptions?: () => void;
  defaultOptions?: ModalOptions;
  currentOptions?: ModalOptions;
}

function getContext() {
  const pages = getCurrentPages();
  return pages[pages.length - 1];
}

const Modal: Modal = options => {
  options = {
    ...Modal.currentOptions,
    ...options
  };

  return new Promise((resolve, reject) => {
    const context = options.context || getContext();
    const modal = context.selectComponent(options.selector);

    delete options.context;
    delete options.selector;

    if (modal) {
      modal.setData({
        onCancel: reject,
        onConfirm: resolve,
        ...options
      });
      queue.push(modal);
    } else {
      console.warn('未找到 mc-modal 节点，请确认 selector 及 context 是否正确');
    }
  });
};

Modal.defaultOptions = {
  show: true,
  title: '',
  width: null,
  message: '',
  zIndex: 100,
  mask: true,
  selector: '#mc-modal',
  className: '',
  asyncClose: false,
  transition: 'scale',
  customStyle: '',
  messageAlign: '',
  maskStyle: '',
  confirmButtonText: '确认',
  cancelButtonText: '取消',
  showConfirmButton: true,
  showCancelButton: false,
  maskCloseable: false,
  confirmButtonOpenType: ''
};

Modal.alert = Modal;

Modal.confirm = options =>
  Modal({
    showCancelButton: true,
    ...options
  });

Modal.close = () => {
  queue.forEach(modal => {
    modal.close();
  });
  queue = [];
};

Modal.stopLoading = () => {
  queue.forEach(modal => {
    modal.stopLoading();
  });
};

Modal.setDefaultOptions = options => {
  Object.assign(Modal.currentOptions, options);
};

Modal.resetDefaultOptions = () => {
  Modal.currentOptions = { ...Modal.defaultOptions };
};

Modal.resetDefaultOptions();

export default Modal;
