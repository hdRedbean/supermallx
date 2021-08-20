<template>
  <div class="wrapper" ref="wrapeer">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  data() {
    return {
      scroll: null
    }
  },
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    // 创建 scroll 对象
    this.scroll = new BScroll(this.$refs.wrapeer, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    })
    // 监听滚动的位置
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on('scroll', position => {
        this.$emit('scroll', position)
      })
    }
    // 监听scroll是否到底部
    if (this.pullUpLoad) {
      this.scroll.on('pullingUp',()=>{
        // 如果到了底部，则发射一个事件
        this.$emit('pullingUp')
      })
    }
  },
  methods: {
    scrollTo(x, y, time = 300) {
      // this.scroll && 先判断 this.scroll 有没有内容，有了才进行下一步
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    // 多次下拉更新
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp()
    },
    getScrollY(){
     return this.scroll ? this.scroll.y : 0
    }
  }
}
</script>

<style scoped>
</style>