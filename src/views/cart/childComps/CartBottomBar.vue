<template>
  <div class="bottom-bar">
    <div class="check-all">
      <check-button class="check-button" :is-checked="isSelectAll" @click.native="checkAll"></check-button>
      <span>全选</span>
    </div>
    <div class="total-price">
      合计: {{totalPrice}}
    </div>
    <div class="calculate">去计算:{{checkedLength}}</div>
  </div>
</template>

<script>
  import CheckButton from '@/components/content/checkButton/CheckButton.vue'
  export default {
    name: "CartBottomBar",
    components: {
      CheckButton,
    },
    computed: {
      totalPrice() {
        return '￥' + this.$store.state.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.price * item.count
        }, 0).toFixed(2)
      },
      checkedLength() {
        return this.$store.state.cartList.filter(item => item.checked).length
      },
      isSelectAll() {
        if (this.$store.state.cartList.count) return false
        return this.$store.state.cartList.every(item => item.checked)
        
      }
    },
    methods: {
      checkAll() {
        if (this.isSelectAll) {
          this.$store.state.cartList.forEach(item => item.checked=false)
        } else {
          this.$store.state.cartList.forEach(item => item.checked=true)
        }
      }
  }
}
</script>

<style scoped>
  .bottom-bar {
    background-color: #eee;
    position: relative;
    bottom: 133px;
    width: 100%;
    height: 40px;
    line-height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .check-all {
    width: 60px;
    height: 40px;
    display: flex;
    align-items: center;
    margin-left: 10px;
  }
  .check-button {
    line-height: 0;

  }
  .total-price {
    height: 40px;
    flex: 1;
    text-align: center;
  }
  .calculate {
    width: 90px;
    height: 40px;
    background-color: orange;
    text-align: center;
  }
  
</style>