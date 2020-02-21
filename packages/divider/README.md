# Divider 分割线

### 介绍

分割线

### 引入

在`app.json`或`index.json`中引入组件，默认为`ES6`版本，`ES5`引入方式参见[快速上手](#/quickstart)

```json
"usingComponents": {
  "mc-divider": "path/to/@vant/weapp/dist/divider/index"
}
```

> Mc Weapp 1.0 版本开始支持此组件，升级方式参见[快速上手](#/quickstart)

## 代码演示

### 基础用法

```html
<mc-divider />
```

### 使用hairline

```html
<mc-divider hairline />
```

### 虚线

```html
<mc-divider dashed />
```

### 文本位置

```html
<mc-divider contentPosition="center">文本</mc-divider>
  <mc-divider contentPosition="left">文本</mc-divider>
  <mc-divider contentPosition="right">文本</mc-divider>
```

### 自定义属性

```html
<mc-divider contentPosition="center" textColor="#1989fa">文本颜色</mc-divider>
<mc-divider contentPosition="center" borderColor="#1989fa">border颜色</mc-divider>
<mc-divider contentPosition="center" fontSize="18">字体大小</mc-divider>
```

### 自定义样式

```html
<mc-divider contentPosition="center" customStyle="color: #1989fa;border-color: #1989fa;font-size: 18px;">文本</mc-divider>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|-----------|-----------|-----------|-------------|-------------|
| dashed | 虚线 | *boolean* | false | - |
| hairline | 细线 | *boolean* | false | - |
| content-position | 文本位置，`left` `center` `right` | *string* | - | - |
| custom-style | 自定义样式 | *string* | - | - |

### Slot

| 名称 | 说明 |
|-----------|-----------|
| 默认 | 自定义文本内容 |
