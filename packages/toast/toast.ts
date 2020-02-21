import { isObj } from '../common/utils';

type ToastContent = string | number;

interface ToastOptions {
  show?: boolean;
  mode?: string;
  maskCloseable?: boolean;
  zIndex?: number;
  context?: WechatMiniprogram.Component.TrivialInstance | WechatMiniprogram.Page.TrivialInstance;
  position?: string;
  duration?: number;
  selector?: string;
  loadingType?: string;
  content?: ToastContent;
  onClose?: () => void;
}

const defaultOptions = {
  mode: 'text',
  maskCloseable: false,
  content: '',
  show: true,
  zIndex: 1000,
  duration: 2,
  position: 'middle',
  loadingType: 'circular',
  selector: '#mc-toast'
};

let queue = [];
let currentOptions: ToastOptions = { ...defaultOptions };

function parseOptions(content): ToastOptions {
  return isObj(content) ? content : { content };
}

function getContext() {
  const pages = getCurrentPages();
  return pages[pages.length - 1];
}

function Toast(toastOptions: ToastOptions | ToastContent): WechatMiniprogram.Component.TrivialInstance {
  const options = {
    ...currentOptions,
    ...parseOptions(toastOptions)
  } as ToastOptions;

  const context = options.context || getContext();
  const toast = context.selectComponent(options.selector);

  if (!toast) {
    console.warn('未找到 mc-toast 节点，请确认 selector 及 context 是否正确');
    return;
  }

  delete options.context;
  delete options.selector;

  toast.clear = () => {
    toast.setData({ show: false });

    if (options.onClose) {
      options.onClose();
    }
  };

  queue.push(toast);
  toast.setData(options);
  clearTimeout(toast.timer);

  if (options.duration * 1000 > 0) {
    toast.timer = setTimeout(() => {
      toast.clear();
      queue = queue.filter(item => item !== toast);
    }, options.duration * 1000);
  }

  return toast;
}

const createMethod = (mode: string) => (options: ToastOptions | ToastContent) =>
  Toast({
    mode,
    ...parseOptions(options)
  });

Toast.loading = createMethod('loading');
Toast.success = createMethod('success');
Toast.error = createMethod('error');
Toast.error = createMethod('error');

Toast.clear = () => {
  queue.forEach(toast => {
    toast.clear();
  });
  queue = [];
};

Toast.setDefaultOptions = (options: ToastOptions) => {
  Object.assign(currentOptions, options);
};

Toast.resetDefaultOptions = () => {
  currentOptions = { ...defaultOptions };
};

export default Toast;
