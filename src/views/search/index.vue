<template>
  <div class="search">
    <!-- header -->
    <van-nav-bar title="商品搜索" left-arrow @click-left="$router.go(-1)" />

    <!-- 搜索框 -->
    <van-search v-model="inpValue" show-action placeholder="请输入搜索关键词" clearable>
      <template #action>
        <div @click="goList(inpValue)">搜索</div>
      </template>
    </van-search>

    <!-- 搜索历史 -->
    <div class="search-history">
      <div class="title">
        <span>最近搜索</span>
        <van-icon name="delete-o" size="16" @click="clear" />
      </div>
      <div class="list">
        <div class="list-item" v-for="item in history" :key="item" @click="goList(item)">{{ item }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getHistory, setHistory } from '@/api/storage'
export default {
  name: 'SearchIndex',
  data() {
    return {
      history:getHistory(),//历史记录
      inpValue: '',//搜索框value
   
    }
  },
  methods: {
    //点击搜索或者历史记录可以跳转
    goList(value) {
      //判断输入框内容
      if (!value) {
        alert('请输入您要搜索的商品')
        return
      }
      //点击搜索按钮 如果搜索历史中没有则添加
      const index = this.history.indexOf(value)
      if (index === -1) {
        this.history.unshift(value)
      } else {
        //如果有则移除原有的，将它添加到队头
        this.history.splice(index, 1)
        this.history.unshift(value)
      }
      //将搜索历史保存在本地
      setHistory(this.history)
      //跳转到list
      this.$router.push(`/list?goodsName=${value}`)
    },
    //clear清除历史记录
    clear() {
      this.history = []
      setHistory([])
    }
  },
  // async created(){
  //   const res = await getListData({
  //     goodsName:
  //   })
  //   console.log(res);
  // }
}
</script>

<style lang="less" scoped>
.search {
  .searchBtn {
    background-color: #fa2209;
    color: #fff;
  }

  ::v-deep .van-search__action {
    background-color: #c21401;
    color: #fff;
    padding: 0 20px;
    border-radius: 0 5px 5px 0;
    margin-right: 10px;
  }

  ::v-deep .van-icon-arrow-left {
    color: #333;
  }

  .title {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
  }

  .list {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 10px;
    gap: 5%;
  }

  .list-item {
    width: 30%;
    text-align: center;
    padding: 7px;
    line-height: 15px;
    border-radius: 50px;
    background: #fff;
    font-size: 13px;
    border: 1px solid #efefef;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 10px;
  }
}
</style>