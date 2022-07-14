<template>
  <div class="container">
    <div class="search-wrap">
      <Search
      :area="area"
      @update:area="area = $event"
      :genre="genre"
      @update:genre="genre = $event"
      :keyword="keyword"
      @update:keyword="keyword = $event"
      />
      <font-awesome-icon icon="times-circle" class="clear"
      @click="clearSearch()"
      />
    </div>
    <div class="all-card-wrap">
      <Card
        :setStores="setStores"
        :userId="userId"
        />
    </div>
  </div>
</template>

<script>
export default {
  middleware:"auth",
  name:"home",
  data() {
    return {
      stores:[],
      userId:null,
      area: '',
      genre: '',
      keyword:'',
    }
  },
  computed: {
    setStores: function(){
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
        return data;
    },
  },
  methods: {
    clearSearch() {
      this.area = '';
      this.genre = '';
      this.keyword = '';
    },
    async getStore() {
      const resData = await this.$axios.get(
          "/store"
      );
      const stores = resData.data.data;
      return stores;
    },
    async getHasLike(stores) {
      for (let i = 0; i < stores.length; i++) {
        const resData = await this.$axios.get( "/like",
          {
            params: {
              store_id: stores[i].id,
              user_id: this.userId,
            },
          }
        );
        stores[i].hasLike = resData.data.state;
      }
      this.stores = stores;
    },
    getUser() {
      this.userId = this.$auth.user.id;
    }
  },
  async created() {
    await this.getUser();
    let stores = await this.getStore();
    await this.getHasLike(stores);
  },
}
</script>

<style>
.container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.search-wrap {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
svg.clear {
  font-size: 2.5rem;
  cursor: pointer;
}
.all-card-wrap {
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>
