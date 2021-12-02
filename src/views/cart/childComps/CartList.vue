<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item,index) in cartList" :key="index"
                      :product="item"></cart-list-item>
    </scroll>
  </div>
</template>

<script>
  import CartListItem from './CartListItem.vue'
  import Scroll from "@/components/common/scroll/Scroll.vue";
  import { mapGetters } from 'vuex'
  export default {
    name: "CartList",
    components: {
      CartListItem,
      Scroll,
    },
    computed: {
      ...mapGetters(['cartList'])
    },
    activated() {
      this.$refs.scroll.refresh()
    }
}
</script>

<style scoped>
.cart-list {
  height: 100vh;
}
.content {
  height: calc(100% - 44px - 49px - 40px);
  overflow: hidden;
}
</style>