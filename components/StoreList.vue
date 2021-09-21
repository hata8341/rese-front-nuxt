<template>
  <div>
    <div class="search">
      <div class="search-content">
          <select name="area" v-model="area">
            <option selected value="">全てのエリア</option>
            <option value="東京都">東京都</option>
            <option value="大阪府">大阪府</option>
            <option value="福岡県">福岡県</option>
          </select>
      </div>
      <div class="search-content">
          <select name="genre" v-model="genre">
            <option value="">全てのジャンル</option>
            <option value="寿司">寿司</option>
            <option value="焼肉">焼肉</option>
            <option value="居酒屋">居酒屋</option>
            <option value="イタリアン">イタリアン</option>
            <option value="ラーメン">ラーメン</option>
          </select>
      </div>
      <div class="search-keyword">
          <img src="../assets/img/虫眼鏡の無料アイコン8.png" alt="検索アイコンです" class="search-img">
          <input name="keyword" v-model="keyword" placeholder="キーワード" />
      </div>
    </div>
    <ul>
      <li
        v-for="(store, index) in searchStores"
        :key="index"
      >
        id: {{ store.id }}<br>
        title: {{ store.store_name }}<br>
        body: {{ store.detail }}<br>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props:[
    'stores',
    ],
  data() {
    return {
      area: '',
      genre: '',
      keyword:'',
      // stores:[],
    }
  },
  computed: {
    searchStores: function(){
        let data = this.stores;

        if (this.keyword === "" || this.keyword !== "") {
          data = data.filter((store)=> {
            return store.detail.indexOf(this.keyword) > -1
          });
        }
        if (this.area === "" || this.area !== "") {
          data = data.filter((store)=> {
            return store.area.area_name.indexOf(this.area) > -1
          });
        }
        if (this.genre === "" || this.genre !== "") {
          data = data.filter((store)=> {
            return store.genre.genre_name.indexOf(this.genre) > -1
          });
        }
        console.log(data);
        return data;
    }
}
}
</script>
