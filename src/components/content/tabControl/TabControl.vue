<template>
  <div class="tab-control">
    <div class="tab-control-item" 
        v-for="(item, index) in titles" :key="index"
        :class="{active: index === currentIndex}"
        @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabControl',
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index
      this.$emit('tabClick', index)
    }
  }

}
</script>

<style>
  .tab-control {
    display: flex;
    justify-content: space-around;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
  }
  .active span {
    color: var(--color-high-text);
    border-bottom: 2px solid red;
    padding-bottom: 5px;
  }
</style>