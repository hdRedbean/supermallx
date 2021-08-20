<template>
  <div id="home">
    <NavBar class="home-nav">
      <div slot="center">购物街</div>
    </NavBar>

    <TabControl :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl1" class="tab-control" v-show="isTabFixed"/>

    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true" @pullingUp="loadMore">
      <HomeSwiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <HomeRecommendView :recommends="recommends" />
      <HomeFeatrueView />
      <TabControl :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl2"/>
      <GoodsList :goods="showGoods" />
    </scroll>

    <BackTop @click.native="backClick" v-show="isShowBackTop"/>

  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper.vue'
import HomeRecommendView from './childComps/HomerecommendView.vue'
import HomeFeatrueView from './childComps/HomeFeatrueView.vue'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'

import { getHomeMultidata, getHomeGoods } from 'network/home'
import { debounce } from 'common/utils'
import { itemListenerMixin } from 'common/mixin'

export default {
  name: 'Home',
  components: {
    HomeSwiper,
    HomeRecommendView,
    HomeFeatrueView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  mixins: [itemListenerMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: 'pop',
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY:0
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  created() {
    this.getHomeMultidata()

    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted(){
    // 通过 GoodsListItem 发来监听图片的方法，实时更新滚动时候最大的高度
    // 原理，每次加载一张图片，就更新一次，这样就能渲染所有的图片，不会出现滚动的bug了
    // const refresh = debounce(this.$refs.scroll && this.$refs.scroll.refresh,200) 
    // this.itemImgListener = ()=>{ refresh() }
    // this.$bus.$on('itemImageLoad',this.itemImgListener)
  },
  activated(){
    this.$refs.scroll.scrollTo(0,this.saveY)
    this.$refs.scroll.refresh()
  },
  deactivated(){
    this.saveY = this.$refs.scroll.getScrollY()
    this.$bus.$off('itemImageLoad',this.itemImgListener)
  },
  methods: {
    // 监听点击哪个展示不同的数据
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    // 返回顶部
    backClick(){
      this.$refs.scroll.scrollTo(0,0)
    },
    // 返回顶部按钮的显示与隐藏
    contentScroll(position){
      this.isShowBackTop = (-position.y) > 1000
      // 是否吸顶
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    // 下拉加载更多
    loadMore(){
      // 加载当前选中对应的类型，new、pop、sell
      // 重新调用了这个方法
      this.getHomeGoods(this.currentType)
    },
    swiperImageLoad(){
      // $el是拿到组件的标签元素，如果是直接获取 offsettop 则是 undefined
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
    // 网络请求相关
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    getHomeGoods(type) {
      // 让 goods 里面的 page + 1
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
        // 完成下拉加载更多
        this.$refs.scroll.finishPullUp()
      })
    }
  }
}
</script>
<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  font-size: 18px;

  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}
/* .content{
  height: calc(100% - 93px);
  overflow: hidden;
  margin-top: 44px;
} */
.content{
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.tab-control{
  position: relative;
  z-index: 99;
  margin-top: -1px;
}
</style>