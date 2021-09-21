<template>
  <div class="card-wrap">
    <div
      :class="cardState(routeName)"
      v-for="(store, index) in storeData()"
      :key="index"
      >
      <div class="img-wrap">
        <img :src="store.image" alt="店舗の画像" class="img-content">
      </div>
      <div class="card-content">
        <h2>{{store.store_name}}</h2>
        <p>#{{store.area.area_name}}</p>
        <p>#{{store.genre.genre_name}}</p>
        <div class="card-content2">
          <button @click="toDetail(store)">詳しく見る</button>
          <div
          class="hearts">
            <font-awesome-icon icon="heart"
            v-if="!store.hasLike"
            class="icon"
            @click="addLikes(store,index)"
            />
            <font-awesome-icon icon="heart"
            v-else
            class="heart"
            @click="addLikes(store,index)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:[
    'userId',
    'setStores',
    'myStores',
    'routeName',
    ],
    data() {
      return {
        area: '',
        genre: '',
        keyword:'',
        hasLike:null,
        card: 'card',
        myCard: 'my-card'
      }
  },
  methods: {
    storeData(){
      if (this.routeName === undefined) {
        return this.setStores;
      } else {
        return this.myStores;
      }
    },
    cardState: function(routeName){
      if (routeName === undefined) {
        return this.card;
      } else {
        return this.myCard;
      }
    },
    toDetail(store) {
      this.$router.push({
        path: '/detail/' + store.id,
        params: {id:store.id},
      });
    },
    async addLikes(store,index) {
      const data = {
        store_id: store.id,
        user_id: this.userId,
      };
      if (!store.hasLike) {
        const resData = await this.$axios.post(
          "/like/",data
        );
        this.storeData()[index].hasLike = resData.data.state;
      } else {
        const resData = await this.$axios.delete(
          "/like/",{ data:data}
        );
        this.storeData()[index].hasLike = resData.data.state;
      }
    },
  },
}
</script>

<style scoped>
.card-wrap {
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.card {
  width: 27%;
  margin: 30px 0;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 5px #ccc;
}
.my-card {
  width: 47%;
  margin: 30px 0;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 5px #ccc;
}
.img-content {
  border-radius: 5px 5px 0 0;
  max-width: 100%;
  height: auto;
}
.card-content {
  padding: 20px;
}
.card-content p {
  display: inline-block;
}
.card-content2 {
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
}
.card-content h2 {
  font-size: 20px;
  margin-bottom: 20px;
  text-align: left;
  color: #333;
}
.card-content2 button {
  width: 100px;
  text-align: center;
  padding: 8px 0 10px;
  color: #fff;
  background-color: blue;
  border-radius: 10px;
  cursor: pointer;
}
.haerts {
  position: relative;
}
.icon {
  width: 50px;
  height: 50px;
  cursor: pointer;
}

@keyframes heartAnimation {
    0% {
    transform: scale(0.5);
  }
    10% {
    transform: scale(0.7);
  }
    30% {
    transform: scale(0.9);
  }
    50% {
    transform: scale(1.2);
  }
    80% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1.0);
  }
}
.heart {
  width: 50px;
  height: 50px;
  cursor: pointer;
  animation: heartAnimation .2s;
  color: #e2264d;
}
</style>
