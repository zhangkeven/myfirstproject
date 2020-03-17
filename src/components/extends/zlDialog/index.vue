<template>
  <div id="zl-dialog" class="" v-show="show" @click="closeModal">
    <transition name="zlDialog">
      <div class="modal" @click.stop v-show="show">
        <div class="top-title" v-if="topTitle!=''">
          <p class="btn-icon">
            <i class="icon"></i>
          </p>
          <p class="tishi">{{topTitle}}</p>
          <p class="btn-icon" @click="closeModal">
            <i class="icon  iconfont iconguanbi"></i>
            </p>
        </div>
        <p class="title" v-if="type!='input'">{{ contentText }}</p>
        <div class="tag-input-list-only" v-if="type=='input'">
          <zl-theme-tag-input  :title="inputTitle" :placeholder="inputPlaceholder"  id="updatePrice1" v-model="inputValue" ref="tagInput" />
        </div>
        <div class="btn" v-if="!onlybtn">
          <div class="cancel">
            <zl-button :btnName="cancelText" type="info" size="custom" :disabled="disabled" @handleClick="cancel"  />
          </div>
          <div class="confirm">
            <zl-button :btnName="confirmText" type="theme_border" size="custom" :loading="loading" :loading_text="loadingText" @handleClick="confirm"  />
          </div>
        </div>
        <div class="onlybtn" v-if="onlybtn">
          <div class="confirm">
            <zl-button :btnName="confirmText" type="theme_border" size="custom" :loading="loading" :loading_text="loadingText" @handleClick="confirm"  />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
// import zlDialog from '@/common/plugins/zlDialog';
export default {
  data() {
    return {
      topTitle:'头部标题',
      title: '提示框',
      confirmText: '确定',//右侧按钮名称
      cancelText: '取消',//左侧按钮名称
      contentText: '确定关闭吗?',//主体提示内容
      loadingText: '加载中..',//按钮加载提示文字
      show: false,
      isModalClose: false,
      confirmCallBack: null,//右侧按钮点击触发回调函数
      cancelCallBack: null,//左侧按钮点击触发回调函数
      getValueCallBack:null,
      loading: false,
      disabled: false,
      type:'text',
      inputValue:'',
      inputTitle:'标题',//input左侧title
      inputPlaceholder:'请输入内容',//input占位符
      onlybtn:false
    };
  },
  watch: {
    show(newValue) {
      if (newValue == false) {
        this.loading = false;
        this.disabled = false;
      }
    },

  },
  mounted() {
    this.inputValue='';
  },
  methods: {
    closeModal() {
      if (this.isModalClose && !this.loading) {
        this.show = false;
        // this.cancelCallBack();
      }
    },
    confirm() {
      if (typeof this.confirmCallBack === 'function') {
        this.confirmCallBack(this.inputValue);
        if(this.type=='input')return
        this.loading = true;
        this.disabled = true;
      }
    },
    cancel() {
      if (typeof this.cancelCallBack === 'function') {
        this.cancelCallBack();
        this.show = false;
      }
    },
    // getValue(e){
    //   this.inputValue=e
    // }
  }
};
</script>

<style lang="scss" scoped>
@import '../../../assets/style/variable';
@import '../../../assets/style/mixin';
#zl-dialog {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  .zlDialog-enter-active {
    transition: all 0.3s;
  }
  .zlDialog-leave-active {
    display: none;
  }
  .zlDialog-enter,
  .zlDialog-leave-to {
    transform: translate3d(0, 100%, 0);
  }
  .modal {
    width: 320px;
    background: #fff;
    // border-radius: 8px;
    padding: 46px 36px 32px 36px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    .top-title{
      width: 100%;
      height: 40px;
      line-height: 40px;
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      border-bottom: 1px solid #D6D7D8;
      box-sizing: border-box;
      .btn-icon{
        width: 40px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        cursor: pointer;
       i{
         font-size: 14px;
         color: #999999;
       }
      }
      .tishi{
        font-size: 16px;
        color: #333333;
      }
    }
    .title {
      width: 100%;
      line-height: 130%;
      text-align: center;
      font-size: 18px;
      color: #333;
      min-height: 39px;
      margin-bottom: 15px;
      word-wrap: break-word;
    }
    .tag-input-list-only {
      width: 100%;
      margin-bottom: 16px;
      div:first-child {
        border-radius: 8px;
      }
    }
    .btn {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .cancel {
        min-width: 96px;
        height: 40px;
        font-size: 16px;
        margin-right: 16px;
      }
      .confirm {
        min-width: 96px;
        height: 40px;
        font-size: 16px;
      }
    }
    .onlybtn {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      .confirm {
        min-width: 130px;
        height: 40px;
        font-size: 16px;
      }
    }
  }
}
</style>
