import { McComponent } from '../common/component';
import { isImageFile, isVideo, getUid } from './utils';

interface HTTPResult {
  data: string;
}
McComponent({
  props: {
    disabled: Boolean,
    multiple: Boolean,
    uploadText: String,
    useFileBefore: Boolean,
    usePostBefore: Boolean,
    usePostAfter: Boolean,
    previewSize: {
      type: null,
      value: 76
    },
    name: {
      type: [Number, String],
      value: ''
    },
    accept: {
      type: String,
      value: 'image'
    },
    mode: {
      type: String,
      value: 'image',
    },
    url: String,
    headers: Object,
    extra: {
      type: Object,
      value: {}
    },
    uploadName: {
      type: String,
      value: 'file'
    },
    sizeType: {
      type: Array,
      value: ['original', 'compressed']
    },
    capture: {
      type: Array,
      value: ['album', 'camera']
    },
    dataSource: {
      type: Array,
      value: [],
      observer: 'formatDataSource'
    },
    maxSize: {
      type: Number,
      value: Number.MAX_VALUE
    },
    max: {
      type: Number,
      value: 100
    },
    deletable: {
      type: Boolean,
      value: true
    },
    previewImage: {
      type: Boolean,
      value: true
    },
    previewFullImage: {
      type: Boolean,
      value: true
    },
    imageFit: {
      type: String,
      value: 'aspectFit'
    },
    camera: {
      type: String,
      value: 'back'
    },
    compressed: {
      type: Boolean,
      value: true
    },
    maxDuration: {
      type: Number,
      value: 60
    }
  },

  data: {
    lists: [],
    computedPreviewSize: '',
    isInCount: true,
    uploadTask: {}
  },
  methods: {
    formatDataSource() {
      const { dataSource = [], max } = this.data;
      this.setData({ dataSource, isInCount: dataSource.length < max });
    },

    startUpload() {
      if (this.data.disabled) return;
      const {
        name = '',
        capture,
        max,
        multiple,
        maxSize,
        accept,
        sizeType,
        dataSource,
        camera,
        compressed,
        maxDuration,
        useFileBefore = false // 是否定义了 beforeRead
      } = this.data;

      let chooseFile = null;
      const newMaxCount = max - dataSource.length;
      // 设置为只选择图片的时候使用 chooseImage 来实现
      if (accept === 'image') {
        chooseFile = new Promise((resolve, reject) => {
          wx.chooseImage({
            count: multiple ? (newMaxCount > 9 ? 9 : newMaxCount) : 1, // 最多可以选择的数量，如果不支持多选则数量为1
            sourceType: capture, // 选择图片的来源，相册还是相机
            sizeType,
            success: resolve,
            fail: reject
          });
        });
      } else if (accept === 'video') {
        chooseFile = new Promise((resolve, reject) => {
          wx.chooseVideo({
            sourceType: capture,
            compressed,
            maxDuration,
            camera,
            success: resolve,
            fail: reject
          });
        });
      } else {
        chooseFile = new Promise((resolve, reject) => {
          wx.chooseMessageFile({
            count: multiple ? newMaxCount : 1, // 最多可以选择的数量，如果不支持多选则数量为1
            type: 'file',
            success: resolve,
            fail: reject
          });
        });
      }

      chooseFile
        .then(
          (
            res:
              | WechatMiniprogram.ChooseImageSuccessCallbackResult
              | WechatMiniprogram.ChooseMessageFileSuccessCallbackResult
              | WechatMiniprogram.ChooseVideoSuccessCallbackResult
          ) => {
            let file = null;

            if (isVideo(res, accept)) {
              file = {
                path: res.tempFilePath,
                uuid: getUid(),
                ...res
              };
            } else {
              file = (res.tempFiles || []).map((it) => ({
                ...it,
                uuid: getUid()
              }));
            }

            // 检查文件大小
            if (file instanceof Array) {
              const sizeEnable = file.every(item => item.size <= maxSize);
              if (!sizeEnable) {
                this.$emit('oversize', { name });
                return;
              }
            } else if (file.size > maxSize) {
              this.$emit('oversize', { name });
              return;
            }

            // 触发上传之前的钩子函数
            if (useFileBefore) {
              this.$emit('file-before', {
                file,
                name,
                callback: (result: boolean) => {
                  if (result) {
                    // 开始上传
                    this.postBefore(file, name);
                  }
                }
              });
            } else {
              this.postBefore(file, name);
            }
          }
        )
        .catch(error => {
          this.$emit('error', error);
        });
    },

    postBefore(files, name) {
      const { usePostBefore } = this.data;
      if (usePostBefore) {
        this.$emit('post-before', { files,
          name,
          callback: (result: boolean) => {
            if (result) {
              files.forEach((file) => {
                this.upload(file, name);
              });
            }
          }
        });
      } else {
        files.forEach((file) => {
          this.upload(file, name);
        });
      }
    },

    upload(file, name) {
      return new Promise((resolve, reject) => {
        this.setData({
          dataSource: [...this.data.dataSource, {
            uuid: file.uuid
          }]
        });
        const task = wx.uploadFile({
          url: this.data.url,
          header: {
            ...this.data.headers
          },
          filePath: file.path,
          formData: this.data.exrta,
          name: this.data.uploadName,
          success: resolve,
          fail: reject,
          complete: () => {
            delete this.data.uploadTask[file.uuid];
            let arr = [...this.data.dataSource];
            arr = arr.filter((it) => !it.uuid);
            this.setData({
              dataSource: arr
            });
          }
        });
        this.setData({
          uploadTask: {
            ...this.data.uploadTask,
            [file.uuid]: task
          }
        });
        task.onProgressUpdate((res) => {
          this.$emit('progress', res);
        });
      }).then((res: HTTPResult) => {
        const { usePostAfter } = this.data;
        const { data, status, msg } = JSON.parse(res.data);
        if (status === 1) {
          if (usePostAfter) {
            this.$emit('post-after', {
              data,
              name,
              callback: (result: any) => {
                this.$emit('change', { ...result, name });
              }
            });
          } else {
            this.$emit('change', { ...data, name });
          }
        } else {
          wx.showToast({
            title: msg,
            duration: 2000,
            icon: 'none'
          });
          this.$emit('error', { msg });
        }
      }).catch((error) => {
        this.$emit('error', error);
      });
    },

    deleteItem(event) {
      const { index } = event.currentTarget.dataset;
      this.$emit('delete', { index, name: this.data.name });
    },

    doPreviewImage(event) {
      if (!this.data.previewFullImage) return;
      const curUrl = event.currentTarget.dataset.url;
      const images = this.data.dataSource;

      this.$emit('preview', { url: curUrl, name: this.data.name });

      wx.previewImage({
        urls: images,
        current: curUrl,
        fail() {
          wx.showToast({ title: '预览图片失败', icon: 'none' });
        }
      });
    }
  }
});
