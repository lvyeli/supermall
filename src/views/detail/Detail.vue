<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" 
            :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo" ref="params"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommends" ref="recommend"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue"
import DetailParamInfo from "./childComps/DetailParamInfo.vue"
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue"
import DetailBottomBar from "./childComps/DetailBottomBar.vue"

import Scroll from "@/components/common/scroll/Scroll.vue";
import GoodsList from "@/components/content/goods/GoodsList.vue";

import { getDetail, Goods, Shop, GoodsParam, getRecommend } from "@/network/detail";
import { backTopMixin } from "@/common/mixin"
export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
  },
  mixins: [backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      currentIndex: 0,
    };
  },
  created() {
    //1.保存传入的iid
    this.iid = this.$route.params.iid;
    //2.根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      // console.log(res);
      const data = res.result;
      //1.获取顶部轮播图数据
      this.topImages = data.itemInfo.topImages;
      //2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      //3.获取店铺信息
      this.shop = new Shop(data.shopInfo);
      //4.保存商品的详情数据
      this.detailInfo = data.detailInfo;
      //5.获取参数的信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      //6.获取评论的信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
      // this.$nextTick(() => {
      //   //根据最新数据，对应DOM已经被渲染出来了
      //   //但是图片没有被加载完（offersetTop不包含图片）
      //   this.themeTopYs.push(0)
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      //   console.log(this.themeTopYs);
      // })
    })
    //3.请求推荐数据
    getRecommend().then(res => {
      console.log(res);
      this.recommends = res.data.list
    })
  },

  methods: {
    imgLoad() {
      this.$refs.scroll.refresh()
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop-44)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop-44)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop-44)
      //尾部push一个最大值方便做判断
      this.themeTopYs.push(Number.MAX_VALUE)
      console.log(this.themeTopYs);
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100)
    },
    contentScroll(position) {
      //1.获取Y值
      const positionY = -position.y
      //2.positionY和当前值对比
      //---------length-1解决越界
      for(let i = 0; i < this.themeTopYs.length-1; i++) {
        //-----error-----i越界，最后一个i+1拿不到
        // if (positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i+1]){
        //   console.log(i);
        // }
        //1.-----普通做法-----this.currentIndex解决调用过多问题
        // if (this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])
        //       || (i === length - 1 && positionY >= this.themeTopYs[i]))) {

        // }
        //2.-----简便做法------给尾部加一个最大值
            if (this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
                this.currentIndex = i
                //详情栏滚动显示标题
                this.$refs.nav.currentIndex = this.currentIndex
            }
      }
      //3.是否显示回到顶部（不能抽进mixin）
      this.isShowBackTop = (-position.y) > 1000

    },
    addToCart() {
      //1.获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid
      //2.将商品添加进购物车 vuex管理
      // this.$store.commit('addCart', product)
      this.$store.dispatch('addCart',product)
    }
  }
};
</script>

<style scoped>
#detail {

  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  height: calc(100% - 44px - 58px);
}
</style>