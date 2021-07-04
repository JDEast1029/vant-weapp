export function isDef(value: any): boolean {
  return value !== undefined && value !== null;
}

export function isObj(x: any): boolean {
  const type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

export function isNumber(value) {
  return /^\d+(\.\d+)?$/.test(value);
}

export function range(num: number, min: number, max: number) {
  return Math.min(Math.max(num, min), max);
}

export function nextTick(fn: Function) {
  setTimeout(() => {
    fn();
  }, 1000 / 30);
}

let systemInfo: WechatMiniprogram.GetSystemInfoSuccessCallbackResult = null;
export function getSystemInfoSync() {
  if (systemInfo == null) {
    systemInfo = wx.getSystemInfoSync();
  }

  return systemInfo;
}

export function addUnit(value?: string | number): string | undefined {
  if (!isDef(value)) {
    return undefined;
  }

  value = String(value);
  return isNumber(value) ? `${value}px` : value;
}

/**
* 获取源数据
* [value, label, children]
* value: Number or String -> '11' == 11
*/
export function getSelectedData(value = [], source = []) {
  let label = [];
  let data = [];

  if (source.length !== 0) {
    if (source.some(i => !!i.children) || !(source[0] instanceof Array)) { // 联动
      value.reduce((pre, cur) => {
        let target = pre.find(it => it.value == cur) || {};
        data.push(target);
        label.push(target.label);
        return target.children || [];
      }, source);
    } else {
      value.forEach((item, index) => {
        let target = source[index].find(it => it.value == item);
        data.push(target);
        label.push(target.label);
      });
    }

  }
  return JSON.parse(JSON.stringify({
    value,
    label,
    data
  }));
};
