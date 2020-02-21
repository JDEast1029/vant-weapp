# Slider 滑块

### 引入

在`app.json`或`index.json`中引入组件，详细介绍见[快速上手](#/quickstart#yin-ru-zu-jian)

```json
"usingComponents": {
  "mc-slider": "path/to/@vant/weapp/dist/slider/index"
}
```

### 基本用法

```html
<mc-slider value="50" bind:change="onChange" />
```

```js
Page({
  onChange(event) {
    wx.showToast({
      icon: 'none',
      title: `当前值：${event.detail}`
    });
  }
});
```

### 指定选择范围

```html
<mc-slider min="-50" max="50" />
```

### 禁用

```html
<mc-slider value="50" disabled />
```

### 指定步长

```html
<mc-slider value="50" step="10" />
```

### 自定义样式

```html
<mc-slider
  value="50"
  bar-height="4px"
  active-color="#ee0a24"
/>
```

### 自定义按钮

```html
<mc-slider
  value="{{ currentValue }}"
  use-button-slot
  bind:drag="onDrag"
>
  <view class="custom-button" slot="button">
    {{ currentValue }}/100
  </view>
</mc-slider>
```

```js
Page({
  data: {
    currentValue: 50
  },

  onDrag(event) {
    this.setData({
      currentValue: event.detail.value
    });
  }
});
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|-----------|-----------|-----------|-------------|-------------|
| value | 当前进度百分比，取值范围为 0-100 | *number* | `0` | - |
| disabled | 是否禁用滑块 | *boolean* | `false` | - |
| max | 最大值 | *number* | `100` | - |
| min | 最小值 | *number* | `0` | - |
| step | 步长 | *number* | `1` | - |
| bar-height | 进度条高度，默认单位为 `px` | *string \| number* | `2px` | - |
| active-color | 进度条激活态颜色 | *string* | `#1989fa` | - |
| inactive-color | 进度条默认颜色 | *string* | `#e5e5e5` | - |

### Events

| 事件名 | 说明 | 参数 |
|-----------|-----------|-----------|
| bind:change | 拖动进度条时触发 | event.detail.value: 当前进度 |
| bind:after-change | 进度值改变后触发 | event.detail: 当前进度 |
| bind:drag-start | 开始拖动时触发 | - |
| bind:drag-end | 结束拖动时触发 | - |

### 外部样式类

| 类名 | 说明 |
|-----------|-----------|
| custom-class | 根节点样式类 |
