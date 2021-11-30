<template>
  <div v-if="Object.keys(commentInfo).length !== 0" class="comment-info">
    <div class="info-header">
      <div class="header-title">用户评价</div>
      <div class="header-more">更多</div>
    </div>

    <div class="info-user">
      <img :src="commentInfo.user.avatar" alt="">
      <span>{{commentInfo.user.uname}}</span>
    </div>

    <div class="info-detail">
      <p>{{commentInfo.content}}</p>
      <div class="info-other">
        <span class="date">{{showDate(commentInfo.created)}}</span>
        <span>{{commentInfo.style}}</span>
      </div>
      <div class="info-imgs">
        <img :src="item" v-for="(item,index) in commentInfo.images" :key="index" alt="">
      </div>
    </div>

  </div>
</template>

<script>
  import { formatDate } from '@/common/util'
  export default {
    name: "DetailCommentInfo",
    props: {
      commentInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      showDate(value) {
        //1.将时间戳转成Date对象
        const date = new Date(value * 1000)
        //2.将date进行格式化
        return formatDate(date, 'yyyy-MM-dd')
      }
    }
}
</script>

<style scoped>
.comment-info {
  padding: 6px 12px;
  color: #333;
  border-bottom: 5px solid #f2f5f8;
}
.info-header {
  height: 50px;
  line-height: 50px;
  border-bottom: 2px solid rgba(0,0,0,.1);
}
.header-title {
  float: left;
  font-size: 15px;
}
.header-more {
  float: right;
  font-size: 13px;
  margin-right: 10px;
}
.info-user {
  padding: 10px 0 5px;
  display: flex;
  align-items: center;
}
.info-user img {
  width: 42px;
  height: 42px;
  border-radius: 50%;
}
.info-user span {
  margin-left: 10px;
}
.info-detail {
  padding: 0 5px 15px;
}
.info-detail p {
  font-size: 14px;
  color: #777;
  line-height: 1.5;
}
.info-detail .info-other {
  font-size: 12px;
  color: #999;
  margin-top: 10px;
}
.info-other .date {
  margin-right: 8px;
}
.info-imgs {
  margin-top: 10px;
}
.info-imgs img {
  width: 70px;
  height: 70px;
  margin-right: 5px;
} 
</style>
