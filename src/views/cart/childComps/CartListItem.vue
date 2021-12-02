<template>
  <div class="cart-item">
    <div class="item-selector">
      <check-button :is-checked="product.checked" @click.native="checkClick"></check-button>
    </div>
    <div class="item-img">
      <img :src="product.image" alt="">
    </div>
    <div class="item-info">
      <div class="item-title">{{product.title}}</div>
      <div class="item-desc">{{product.desc}}</div>
      <div class="item-bottom">
        <div class="item-price">￥{{product.price}}</div>
        <div class="item-count">x{{product.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import CheckButton from '@/components/content/checkButton/CheckButton.vue'
  export default {
    name: "CartListItem",
    components: {
      CheckButton,
    },
    props: {
      product: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      checkClick() {
        this.product.checked = !this.product.checked
      }
    }

}
</script>

<style scoped>
.cart-item {
  display: flex;
  margin: 10px 10px;
  border-bottom: 1px solid #ccc;
  
}
.item-selector .check-button {
  position: relative;
  top: 50%;
  transform: translate(0, -50%);
  margin-right: 5px;
}
.item-img img {
  width: 70px;
  height: 90px;
  margin-bottom: 3px;
  border-radius: 5px;
}
.item-info {
  margin: 0 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.item-title, .item-desc {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.item-title {
  font-size: 15px;
}
.item-desc {
  font-size: 12px;
  margin: 10px 0;
  color: #666;
}
.item-bottom {
  padding-top: 10px;
  display: flex;
  justify-content: space-between;
}
.item-price {
  color: orangered;
}
</style>