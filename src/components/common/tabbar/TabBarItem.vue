<template>
  <div class="tab-bar-item" @click="itemClick">
<!-- 第一个插槽为非活跃图片 -->
<!-- 第二个插槽是活跃图片 -->
<!-- 第三个则是文字 -->
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
     <div :style="activeStyle"><slot name="item-text"></slot></div>
     
    </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props: {
      path: String,
      // 默认字体颜色 红色
      activeColor: {
        type: String,
        default: 'red'
      }
    },
    data() {
      return {
        // isActive: true
      }
    },
    computed: {
      isActive() {
        // 当前的/home -> item1里面的(/home) = true
        // $route 哪一个路由处于活跃就是哪一个对象
        return this.$route.path.indexOf(this.path) !== -1
      },
      activeStyle() {
        return this.isActive ? {
          color: this.activeColor
        } : {}
      }
    },
    methods: {
      itemClick() {
        this.$router.replace(this.path)
      }
    }
  }
</script>
<style scoped>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }
  
  .tab-bar-item img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
</style>