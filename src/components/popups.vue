<template>
<div id="model">
  <div class="header">
    <img
      :src="status=='success'?'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANYAAACACAYAAAB3NJfEAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjBFRERBNjMzN0FFNTExRTlBQ0RGRDZDRjNCNTM2RkEyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjBFRERBNjM0N0FFNTExRTlBQ0RGRDZDRjNCNTM2RkEyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MEVEREE2MzE3QUU1MTFFOUFDREZENkNGM0I1MzZGQTIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MEVEREE2MzI3QUU1MTFFOUFDREZENkNGM0I1MzZGQTIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7eL9cyAAAVtUlEQVR42uyd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' : '/static/img/error.bfd745a.png'"
      :class="status=='success'?'bg-success':'bg-error'">
  </div>
  <div class="model-main">
    <p class="model-title">{{modelTitle}}</p>
    <p class="model-tips">{{modelTips}}</p>
  </div>
  <div class="footer">
    <div class="model-btn">
      <div class="cancel" @click="cancel()">
        <p>{{cancelMsg}}</p>
      </div>
      <div class="confirm" @click="confirm()">
        <p>{{confirmMsg}}</p>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: {
    modelTitle: {
      type: String,
      default: "录入成功"
    },
    modelTips: {
      type: String,
      default: '戴安娜已成功录入定段一组'
    },
    cancelMsg: {
      type: String,
      default: '选手列表',
    },
    confirmMsg: {
      type: String,
      default: '继续扫码'
    },
    img_src: String,
    status: String
  },
  data() {
    return {}
  },
  methods: {
    cancel() {
      let _this = this;
      _this.$emit("sfCancel", false)
    },
    confirm() {
      let _this = this;
      _this.$emit('sfConfirm', false)
    }
  }
}
</script>

<style lang='less'>
#model {
    width: 65%;
    height: 45%;
    display: flex;
    flex-direction: column;
    background: #ffffff;
}
.header {
    height: 40%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 35px;
    .bg-success {
        width: 45%;
    }
    .bg-error {
        width: 30%;
    }
}
.model-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 0.8rem;
    .model-title {
        font-size: 16px;
        font-weight: bold;
    }
    .model-tips {
        font-size: 14px;
        margin-top: 15px;
        color: #666666;
    }
}
.footer {
    height: 15%;
    border-top: 1px solid #cccccc;
    .model-btn {
        display: flex;
        flex-direction: row;
        font-size: 14px;
        height: 100%;
        color: #666666;
        > div {
            width: 50%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            p {
                width: 100%;
                text-align: center;
                padding: 10px 0;
            }
        };
        div:first-child p {
            border-right: 1px solid #cccccc;
        }
        div:last-child p {
            color: #0066CC;
        }
    }
}
</style>
