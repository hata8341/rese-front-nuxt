<template>
  <div>
    <div class="container-2">
      <div class="left">
        <Header />
        <div class="store-content">
          <div class="store-name">
            <font-awesome-icon
            icon="angle-left"
            class="angle-left"
            @click="home"
            />
            <h2>{{store.store_name}}</h2>
          </div>
          <div class="img-wrap">
            <img :src="store.image" alt="店舗画像です" class="store-img">
          </div>
          <div class="area-genre">
            <p v-if="store.area">#{{store.area.area_name}}</p>
            <p v-if="store.genre">#{{store.genre.genre_name}}</p>
          </div>
          <div>
            <p>{{store.detail}}</p>
          </div>
          <div class="review-btn-wrap">
            <ReviewModal
            :store="store"
            :userId="$route.params.id"
            />
          </div>
        </div>
      </div>

      <div class="right">
        <validation-observer ref="obs" v-slot="ObserverProps">
            <div class="reserve-input">
              <h2 class="reserve-title">予約</h2>
            </div>
            <div class="reserve-input">
              <div class="reserve-input">
                <validation-provider name="日付" v-slot="{ errors }" rules="required">
                  <VueCtkDateTimePicker
                  label="日付を選択"
                  v-model="dateSelected"
                  @input="getReservedDatetime()"
                  format="YYYY-MM-DD"
                  formatted="YYYY-MM-DD"
                  :min-date="startDate"
                  :max-date="endDate"
                  :overlay="true"
                  only-date
                  />
                  <div class="error">{{ errors[0] }}</div>
                </validation-provider>
              </div>
              <div class="reserve-input">
                <validation-provider name="時間" v-slot="{ errors }" rules="required">
                  <VueCtkDateTimePicker
                  label="時間を選択"
                  v-model="timeSelected"
                  format="HH:mm"
                  formatted="HH:mm"
                  minute-interval="30"
                  :disabled-hours="disableHours"
                  :overlay="true"
                  only-time
                  />
                  <div class="error">{{ errors[0] }}</div>
                </validation-provider>
              </div>
            </div>
            <div class="reserve-input">
              <validation-provider name="人数" v-slot="{ errors }" rules="required">
                <select
                  name="number"
                  class="reserve-number"
                  v-model.number="numberSelected"
                  required
                >
                  <option
                    value=""
                    class="number-select">人数を選択</option>
                  <option
                    v-for="(option, index) in numberOptions"
                    :key="index"
                    :value="option"
                  >
                  {{option}}名
                  </option>
                </select>
                <div class="error">{{ errors[0] }}</div>
              </validation-provider>
            </div>
            <div class="reserve-content">
                <div class="reserve-table">
                  <tr class="reserve-item">
                    <th class="reserve-ttl">店名</th>
                    <td class="reserve-data">{{store.store_name}}</td>
                  </tr>
                  <tr v-show="dateSelected" class="reserve-item">
                    <th class="reserve-ttl">日付</th>
                    <td class="reserve-data">{{dateSelected}}</td>
                  </tr>
                  <tr v-show="timeSelected" class="reserve-item">
                    <th class="reserve-ttl">時間</th>
                    <td class="reserve-data">{{timeSelected
                      }}</td>
                  </tr>
                  <tr v-show="numberSelected" class="reserve-item">
                    <th class="reserve-ttl">人数</th>
                    <td class="reserve-data">{{numberSelected}}名</td>
                  </tr>
                </div>
            </div>
            <div class="reserve-button">
              <button class="reserve-btn"
                      @click="postReserve()"
                      :disabled="ObserverProps.invalid || !ObserverProps.validated"
              >予約する
              </button>
            </div>
            <p v-show="ObserverProps.invalid || !ObserverProps.validated" class="invalid">
            全ての項目を入力すると予約できます
            </p>
          </validation-observer>
        </div>
    </div>
    <div class="container-3">
      <div class="review-info-wrap">
        <h2 class="review-info-title">レビュー情報</h2>
      </div>
      <ReviewCard
      :storeId= $route.params.id
      />
    </div>
  </div>
</template>

<script>
export default {
  layout: 'detail',
  data() {
    return {
      userId: null,
      storeId:null,
      store:'',
      // dateSelected:null,
      // timeSelected: null,
      // timeOptions: [],
      // numberSelected:'',
      // numberOptions: [
      // ],
    }
  },
  methods: {
    getNumber() {
      let number = 1
      for (let i = 0; i < 98; i++) {
        this.numberOptions.push(number + i);
      }
    },
    async getDetailStore() {
      const resData = await this.$axios.$get(
        "/store" + this.$route.params.id
        );
        this.store = resData.data[0];
    },
    async postReserve() {
      const date = this.dateSelected;
      const time = this.timeSelected;
      const dateTime = this.$moment(`${date} ${time}`, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm');
      const resData = await this.$axios.$get('/checkReserve',
      {
        params: {
          store_id: this.$route.params.id,
          datetime: dateTime,
        },
      });
      const checkReserve = resData.result;
      if (!checkReserve) {
        await this.$axios.post("/reserve",
        {
          user_id: this.$auth.user.id,
          store_id: this.$route.params.id,
          datetime: dateTime,
          number: this.numberSelected
        });
        alert("ご予約ありがとうございます！")
        this.$router.push("/done");
      } else {
        alert("この日程は、すでに予約があります")
      }
    },
    async getReservedDatetime() {
      const sendDate = this.dateSelected;
      console.log(sendDate);
      this.$store.dispatch('getReservedDatetime',
      {
        store_id: this.$route.params.id,
        sendDate: sendDate,
      });
    },
    home() {
      this.$router.push({path:'/'})
    },
  },
  computed: {
    startDate() {
      const startDate = this.$moment().format('YYYY-MM-DD');
      return startDate;
    },
    endDate() {
      const endDate = this.$moment().add(3, 'M');
      return endDate.format('YYYY-MM-DD');
    },
    disableHours() {
      return this.$store.getters.gettersReservedDatetime;
    }
  },
  created() {
    this.getDetailStore();
    this.getNumber();
  },
}
</script>

<style scoped>
.container-2 {
  width: 100%;
  /* border: 1px solid red; */
  display: flex;
  justify-content: space-between;
}
.left {
  width: 47%;
}
.store-content {
  width: 100%;
  margin: 30px 0;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 5px #ccc;
}
.store-name {
  display: flex;
}
.angle-left {
  width: 25px;
  height: 25px;
  margin-right: 15px;
}
.img-wrap {
  /* border: 1px solid red; */
}
.img-wrap img {
  border-radius: 5px 5px 0 0;
  max-width: 100%;
  height: auto;
}
.store-content {
  padding: 20px;
}
.area-genre {
  margin: 15px 0;
}
.store-content p {
  display: inline-block;
}
.icon.heart {
  width: 50px;
  height: 50px;
}
.right {
  margin: 25px 0;
  /* border: solid 1px blue; */
  width: 47%;
  background: blue;
  border-radius: 5px;
  box-shadow: 0 2px 5px #ccc;
  color: #fff;
  padding: 10px;
}
.reserve-input {
  width: 100%;
  margin-top: 10px;
}
.reserve-title {
  margin-bottom: 10px;
}
.reserve-date {
  margin-top: 10px;
  width: 50%;
}
.reserve-time {
  margin-top: 10px;
  width: 100%;
}
.reserve-number:invalid {
  color: #757575;
}
.reserve-number {
  width: 100%;
  height: 42px;
  border: 1px solid white;
  border-radius: 4px;
  border-right-width: 16px;
  padding-left: 10px;
  cursor: pointer;
}
.reserve-content {
  width: 100%;
  background-color: rgba(30, 144, 255, .7);
}
.reserve-table {
  margin-top: 10px;
  padding: 10px;
  border-collapse: separate;
  border-spacing: 0px 20px;
}
.reserve-ttl {
  font-weight: normal;
  width: 25%;
  padding-right: 25px;
}
.reserve-data {
  width: 75%;
}
.reserve-button {
  margin-top:20px;
  padding: 10px;
  text-align: center;
  /* background-color: darkblue; */
  cursor: pointer;
}
.reserve-button:hover {
  opacity: .9;
}
.reserve-btn {
  width: 100%;
  display: inline-block;
  font-size: 18pt;
  text-align: center;
  cursor: pointer;
  padding: 12px 12px;
  background: #007fff;
  color: #ffffff;
  line-height: 1em;
  transition: .3s;
  border: 2px solid #007fff;
}
.angle-left {
  cursor: pointer;
}
.error {
  color: red;
}
.review-btn-wrap {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding-top: 10px;
}
.container-3 {
  width: 100%;
  padding-bottom: 20px;
}
.review-info-wrap {
  text-align: center;
  padding: 15px 0px;
  font-size: 18px;
  background-color: #ff9600;
  border-radius: 4px;
  box-shadow: 0 2px 5px #ccc;
}
</style>
