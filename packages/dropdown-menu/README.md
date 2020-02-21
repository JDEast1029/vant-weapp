# DropdownMenu 下拉菜单

### 引入

在`app.json`或`index.json`中引入组件，默认为`ES6`版本，`ES5`引入方式参见[快速上手](#/quickstart)

```json
"usingComponents": {
  "mc-dropdown-menu": "path/to/@vant/weapp/dist/dropdown-menu/index",
  "mc-dropdown-item": "path/to/@vant/weapp/dist/dropdown-item/index"
}
```

## 代码演示

### 基础用法

```html
<mc-dropdown-menu>
  <mc-dropdown-item value="{{ value1 }}" options="{{ option1 }}" />
  <mc-dropdown-item value="{{ value2 }}" options="{{ option2 }}" />
</mc-dropdown-menu>
```

```js
Page({
  data: {
    option1: [
      { text: '全部商品', value: 0 },
      { text: '新款商品', value: 1 },
      { text: '活动商品', value: 2 }
    ],
    option2: [
      { text: '默认排序', value: 'a' },
      { text: '好评排序', value: 'b' },
      { text: '销量排序', value: 'c' }
    ],
    value1: 0,
    value2: 'a'
  }
});
```

### 自定义菜单内容

```html
<mc-dropdown-menu>
  <mc-dropdown-item value="{{ value1 }}" options="{{ option1 }}" />
  <mc-dropdown-item id="item" title="{{ itemTitle }}">
    <mc-cell title="{{ switchTitle1 }}">
      <mc-switch
        slot="right-icon"
        size="24px"
        style="height: 26px"
        checked="{{ switch1 }}"
        bind:change="onSwitch1Change"
      />
    </mc-cell>
    <mc-cell title="{{ switchTitle2 }}">
      <mc-switch
        slot="right-icon"
        size="24px"
        style="height: 26px"
        checked="{{ switch2 }}"
        bind:change="onSwitch2Change"
      />
    </mc-cell>
    <mc-button type="info" block bind:click="onConfirm">
      确定
    </mc-button>
  </mc-dropdown-item>
</mc-dropdown-menu>
```

```js
Page({
  data: {
    switchTitle1: '包邮',
    switchTitle2: '团购',
    itemTitle: '筛选',
    option1: [
      { text: '全部商品', value: 0 },
      { text: '新款商品', value: 1 },
      { text: '活动商品', value: 2 }
    ],
    value1: 0,
  },

  onConfirm () {
    this.selectComponent('#item').toggle();
  },

  onSwitch1Change ({ detail }) {
    this.setData({ switch1: detail });
  },

  onSwitch2Change ({ detail }) {
    this.setData({ switch2: detail });
  }
});
```

### 自定义选中状态颜色

```html
<mc-dropdown-menu active-color="#ee0a24">
  <mc-dropdown-item value="{{ value1 }}" options="{{ option1 }}" />
  <mc-dropdown-item value="{{ value2 }}" options="{{ option2 }}" />
</mc-dropdown-menu>
```

### 向上展开

```html
<mc-dropdown-menu direction="up">
  <mc-dropdown-item value="{{ value1 }}" options="{{ option1 }}" />
  <mc-dropdown-item value="{{ value2 }}" options="{{ option2 }}" />
</mc-dropdown-menu>
```

### 禁用菜单

```html
<mc-dropdown-menu>
  <mc-dropdown-item value="{{ value1 }}" disabled options="{{ option1 }}" />
  <mc-dropdown-item value="{{ value2 }}" disabled options="{{ option2 }}" />
</mc-dropdown-menu>
```

## API

### DropdownMenu Props

| Attribute              | Description                    | Type      | Default   | Version |
| ---------------------- | ------------------------------ | --------- | --------- | ------- |
| active-color           | 菜单标题和选项的选中态颜色     | *string*  | `#1989fa` | -       |
| z-index                | 菜单栏 z-index 层级            | *number*  | `10`      | -       |
| duration               | 动画时长，单位毫秒             | *number*  | `200`     | -       |
| direction              | 菜单展开方向，可选值为up       | *string*  | `down`    | -       |
| mask                | 是否显示遮罩层                 | *boolean* | `true`    | -       |
| mask-closeable | 是否在点击遮罩层后关闭菜单     | *boolean* | `true`    | -       |
| close-on-click-outside | 是否在点击外部 menu 后关闭菜单 | *boolean* | `true`    | -       |

### DropdownItem Props

| Attribute   | Description            | Type               | Default                 | Version |
| ----------- | ---------------------- | ------------------ | ----------------------- | ------- |
| value       | 当前选中项对应的 value | *string \| number* | -                       | -       |
| title       | 菜单项标题             | *string*           | Text of selected option | -       |
| options     | 选项数组               | *Option[]*         | `[]`                    | -       |
| disabled    | 是否禁用菜单           | *boolean*          | `false`                 | -       |
| title-class | 标题额外类名           | *string*           | -                       | -       |

### DropdownItem Events

| Event  | Description                   | Arguments |
| ------ | ----------------------------- | --------- |
| change | 点击选项导致 value 变化时触发 | value     |
| close  | 关闭菜单栏时触发              | -         |

### DropdownItem Methods

通过 selectComponent(id) 可访问

| Name   | Attribute     | Return value | Description      |
| ------ | ------------- | ------------ | ---------------- |
| toggle | show: boolean | -            | 切换菜单是否展示 |

### Data Structure of Option

| Key   | Description                                | Type               |
| ----- | ------------------------------------------ | ------------------ |
| text  | 文字                                       | *string*           |
| value | 标识符                                     | *string \| number* |
| icon  | 左侧图标名称或图片链接，可选值见 Icon 组件 | *string*           |
