<template>
  <div class="shop-info">
    <div class="shop-top">
      <img :src="shop.logo" alt="" />
      <span class="info-name">{{ shop.name }}</span>
    </div>
    <div class="shop-info-footer">
      <div class="shop-middle-item shop-info-footer-left">
        <div class="info-sells">
          <div class="sell-count">{{ shop.sells }}</div>
          <div class="sell-text">总销量</div>
        </div>
        <div class="info-goods">
          <div class="goods-count">{{ shop.goodsCount }}</div>
          <div class="goods-text">全部宝贝</div>
        </div>
      </div>
      <div class="shop-middle-item shop-middle-right">
        <div class="item" v-for="(item, index) in shop.score" :key="index">
          <span class="name">{{ item.name }}</span>
          <span class="score" :class="{ 'score-better-more': item.isBetter }">{{
            item.score
          }}</span>
          <span class="better" :class="{ 'better-more': item.isBetter }">{{
            item.isBetter ? "高" : "低"
          }}</span>
        </div>
      </div>
    </div>
    <div class="shop-bottom">
      <div class="enter-shop">进店逛逛</div>
    </div>
    <div class="nav">
      11
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailShopInfo",
  props: {
    shop: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style scoped>
.shop-info {
  margin: 25px 8px;
  border-bottom: 5px solid #f2f5f8;
}
.shop-top {
  line-height: 45px;
  display: flex;
  align-items: center;
}
.shop-top img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.1);
}
.shop-top .info-name {
  margin-left: 10px;
  vertical-align: center;
}
.shop-info-footer {
  display: flex;
  margin-top: 15px;
  align-items: center;
}
.shop-middle-item {
  flex: 1;
}
.shop-info-footer-left {
  display: flex;
  justify-content: space-evenly;
  text-align: center;
  color: #333;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  
}
.sell-count,
.goods-count {
  font-size: 18px;
}
.sell-text,
.goods-text {
  font-size: 12px;
  margin-top: 5px;
}
.shop-middle-right {
  font-size: 13px;
  margin-left: 30px;
  color: #333;
}
.shop-middle-right .item {
  margin-bottom: 8px;
}
.shop-middle-right .name,
.score,
.better {
  padding-right: 5px;
}
.score {
  color: green;
}
.better {
  background-color: green;
  color: #fff;
}
.better-more {
  background-color: red;
  color: #fff;
}
.score-better-more {
  color: red;
}
.shop-bottom {
  text-align: center;
  font-size: 13px;
  margin-top: 10px;
}
.enter-shop {
  display: inline-block;
  width: 150px;
  height: 30px;
  background: #f2f5f8;
  text-align: center;
  border-radius: 10px;
  line-height: 30px;
}
.nav {
  width: 1000px;
}
</style>