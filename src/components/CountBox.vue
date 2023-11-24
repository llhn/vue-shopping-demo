<template>
    <div class="count-box">
        <button @click="minusNum" class="minus">-</button>
        <input  class="inp" @change="change" type="text" :value="value">
        <button @click="addNum" class="add">+</button>
    </div>
</template>
  
      
<script>
export default {
    name:'CountBox',
    props: {
        value: {
            type: Number,
            default: 1
        }
    },
  methods:{
    addNum(){
       this.$emit('input',this.value + 1)
    },
    minusNum(){
        if(this.value <= 1){
            return
        }
        this.$emit('input',this.value - 1)
    },
    change(e){
        let num = +e.target.value//转数字
        if(isNaN(num) || num < 1){
            e.target.value = this.value
            return
        }else{
            num = Math.floor(e.target.value)
        }
        this.$emit('input',num)
    }
  }
}
</script>
      
  
<style lang="less" scoped>
.count-box {
    width: 110px;
    display: flex;

    .add,
    .minus {
        width: 30px;
        height: 30px;
        outline: none;
        border: none;
        background-color: #efefef;
    }

    .inp {
        width: 40px;
        height: 30px;
        outline: none;
        border: none;
        margin: 0 5px;
        background-color: #efefef;
        text-align: center;
    }
}</style>