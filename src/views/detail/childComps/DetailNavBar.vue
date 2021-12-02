<template>
  <div>
    <nav-bar>
      <div slot="left" class="backItem" @click="backClick">
        <img src="@/assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item, index) in titles" :key="index"
             class="detail-item" 
             :class="{actived: index === currentIndex}"
             @click="titleClick(index)">
        {{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from '@/components/common/navbar/NavBar.vue'
  export default {
    name: "DetailNavBar",
    components: {
      NavBar,
    },
    data() {
      return {
        titles: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0,
      }
    },
    methods: {
      titleClick(index) {
        this.currentIndex = index
        this.$emit('titleClick', index)
      },
      backClick() {
        this.$router.back()
      }
    },
}
</script>

<style scoped>
  .title{
    display: flex;
    justify-content: space-around;
    font-size: 13px;
  }
  .actived {
    color: var(--color-high-text);
  }
  .backItem img{
    vertical-align: middle;
  }
</style>