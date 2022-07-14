<template>
  <div class="wrap">
    <div class="content">
        <p>ご予約ありがとうございます！</p>
        <button
        @click="toDetail()"
        >戻る</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    toDetail() {
      this.$router.back();
    }
  }
}
</script>

<style scoped>
.wrap {
  width: 50%;
  margin: 30px auto 0;
  padding: 30px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 2px 5px #ccc;
}
.content{
  text-align: center;
}
.content p{
  margin-top: 30px;
}
.content button {
  margin-top: 30px;
  width: 100px;
  text-align: center;
  padding: 8px 0 10px;
  color: #fff;
  background-color: blue;
  border-radius: 10px;
  cursor: pointer;
}
</style>
