<template>
  <div class="search">
    <div class="search-content">
        <select name="area"
        v-bind:value="area"
        @input="$emit('update:area', $event.target.value)"
        >
          <option disabled value="">全てのエリア</option>
          <option value="東京都">東京都</option>
          <option value="大阪府">大阪府</option>
          <option value="福岡県">福岡県</option>
        </select>
    </div>
    <div class="search-content">
        <select name="genre"
        v-bind:value="genre"
        @input="$emit('update:genre', $event.target.value)">
          <option disabled value="">全てのジャンル</option>
          <option value="寿司">寿司</option>
          <option value="焼肉">焼肉</option>
          <option value="居酒屋">居酒屋</option>
          <option value="イタリアン">イタリアン</option>
          <option value="ラーメン">ラーメン</option>
        </select>
    </div>
    <div class="search-keyword">
        <font-awesome-icon icon="search" class="icon" />
        <input
        name="keyword"
        placeholder="キーワード"
        v-bind:value="keyword"
        @input="$emit('update:keyword', $event.target.value)"
        />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    area: {
      type: String,
      default: '',
      require: true,
    },
    genre: {
      type: String,
      default: '',
      require: true,
    },
    keyword: {
      type: String,
      default:'',
      require: true,
    },
  },
}
</script>

<style scoped>
.search {
  display: flex;
  justify-content: flex-end;
  width: 95%;
  height: 42px;
}
.search-content {
  border: 1px solid #ccc;
  border-radius: 5px;
}
.search-content select{
	display: inline-block;
	margin-right: 0;
	padding: 10px;
	width: 100%;
	height: 40px;
	font-size: 100%;
	box-sizing: border-box;
	border-right: 1px solid #ccc;
	border-top: none;
	border-left: none;
	border-bottom: none;
}
.search-keyword {
  display: flex;
}
.search-img {
	display: inline-block;
	padding: 0 10px;
	color: #fff;
	width: 50px;
	height: 40px;
	vertical-align: top;
	border: none;
	background: #fff;
}
.search-keyword {
  border: 1px solid #ccc;
  border-radius: 5px;
}
.search-keyword input {
  -webkit-appearance: none;
	display: inline-block;
	margin-right: 0;
	padding: 10px;
	width: 100%;
	height: 40px;
	font-size: 100%;
	box-sizing: border-box;
	border: none;
}
.icon {
  font-size: 2.5rem;
  background-color: white;
}
</style>
