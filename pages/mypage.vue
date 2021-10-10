<template>
  <div class="mypage-wrap">
    <div class="left">
      <div
      class="reserve-status">
        <div class="reserve-title">
          <h2 class="reserve-ttl-dt">予約状況</h2>
        </div>
        <div
        class="reserve-content"
        v-for="(reserve, index) in reserves"
        :key="index"
        >
        <div class="reserve-number">
        <font-awesome-icon icon="clock" class="icon clock" />
        <h3 class="reserve-num-ttl">
          予約{{index + 1}}
        </h3>
        </div>
        <div class="reserve-content-wrap">
          <div class="reserve-content-left">
            <div class="reserve-table">
              <tr class="reserve-list">
                <th class="reserve-ttl">店名</th>
                <td class="reserve-data">
                  {{reserve.store.store_name}}
                </td>
              </tr>
              <tr class="reserve-list">
                <th class="reserve-ttl">日付</th>
                <td class="reserve-data">
                  {{ date(reserve.datetime)}}
                </td>
              </tr>
              <tr class="reserve-list">
                <th class="reserve-ttl">時間</th>
                <td class="reserve-data">
                  {{time(reserve.datetime)}}
                </td>
              </tr>
              <tr class="reserve-list">
                <th class="reserve-ttl">人数</th>
                <td class="reserve-data">
                  {{reserve.number}}名
                </td>
              </tr>
            </div>
          </div>
          <div class="reserve-content-right">
            <button
            class="reserve-change"
            @click="show(index)"
            >予約変更
            </button>
            <modal
            :name="index.toString()"
            :width="'90%'"
            :height="'90%'"
            :draggable="true"
            :resizable="true"
            >
              <div class="change-reserve">
                <h2>{{reserve.store.store_name}}</h2>
              </div>
              <div class="change-content">
                <div class="reserve-input">
                  <div class="reserve-input">
                      <VueCtkDateTimePicker
                      label="日付を選択"
                      v-model="dateSelected"
                      @input="getReservedDatetime(reserve.store_id)"
                      format="YYYY-MM-DD"
                      formatted="YYYY-MM-DD"
                      :min-date="startDate"
                      :max-date="endDate"
                      :overlay="true"
                      only-date
                      />
                  </div>
                  <div class="reserve-input">
                      <VueCtkDateTimePicker
                      v-if="dateSelected"
                      label="時間を選択"
                      v-model="timeSelected"
                      format="HH:mm"
                      formatted="HH:mm"
                      minute-interval="30"
                      :disabled-hours="disableHours"
                      :overlay="true"
                      only-time
                      />
                  </div>
                </div>
                  <div class="reserve-input"
                  v-if="dateSelected && timeSelected"
                  >
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
                  </div>
                  <div v-if="dateSelected||timeSelected||numberSelected" class="change-content-ttl">
                    <h2>予約変更内容</h2>
                  </div>
                  <div v-else class="modal-content-ttl">
                    <h2>予約内容</h2>
                  </div>
                  <div :class="changeContent">
                    <div class="modal-reserve-table">
                      <tr v-show="dateSelected" class="modal-change-item">
                        <th class="modal-change-ttl">変更日付</th>
                        <td class="modal-change-data">{{dateSelected}}</td>
                      </tr>
                      <tr v-show="!dateSelected" class="modal-reserve-item">
                        <th class="modal-reserve-ttl">日付</th>
                        <td class="modal-reserve-data">{{date(reserve.datetime)}}</td>
                      </tr>
                      <tr v-show="timeSelected" class="modal-change-item">
                        <th class="modal-change-ttl">変更時間</th>
                        <td class="modal-change-data">{{timeSelected
                          }}</td>
                      </tr>
                      <tr v-show="!timeSelected" class="modal-reserve-item">
                        <th class="modal-reserve-ttl">時間</th>
                        <td class="modal-reserve-data">{{time(reserve.datetime)
                          }}</td>
                      </tr>
                      <tr v-show="numberSelected" class="modal-change-item">
                        <th class="modal-change-ttl">変更人数</th>
                        <td class="change-data">{{numberSelected}}名</td>
                      </tr>
                      <tr v-show="!numberSelected" class="modal-reserve-item">
                        <th class="modal-reserve-ttl">人数</th>
                        <td class="modal-reserve-data">{{reserve.number}}名</td>
                      </tr>
                    </div>
                </div>
                <button class="change-btn" @click="updateReserve(reserve.id,index)">変更</button>
                <button class="back-btn" @click="hide(index)">戻る</button>
              </div>
            </modal>
            <button class="reserve-delete" @click="checkDelete(index)">予約取消</button>
            <modal
            :name="'reserve-delete'+index.toString()"
            :draggable="true"
            :resizable="true"
            >
              <div class="delete-check-ttl">
                <h2>確認</h2>
              </div>
              <div class="delete-check-content">
                <p>本当にご予約内容を取消してもよろしいでしょうか？</p>
                <button class="delete-btn" @click="deleteReserve(reserve.id,index)">取消</button>
                <button  class="delete-back-btn" @click="checkDeleteHide(index)">戻る</button>
              </div>
            </modal>
          </div>
        </div>
        </div>
      </div>
    </div>
    <div class="rigth">
      <div class="user-name-wrap">
        <h2 class="user_name">
          {{$auth.user.user_name}}さん
        </h2>
      </div>
      <div class="user_like-stores">
        <div class="like-store-title">
          <h2 class="like-store-ttl">お気に入り店舗</h2>
        </div>
        <div class="like-store-card">
          <Card
          :myStores="myStores"
          :userId="userId"
          :routeName="$route.name"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return{
      reserves:[],
      myStores:[],
      userId:null,
      // dateSelected:null,
      // timeSelected:null,
      // numberSelected:'',
      // numberOptions: [
      // ],
      // disableHours:[]
    }
  },
  methods: {
    show(index) {
      this.$modal.show(index.toString());
    },
    hide(index) {
      this.$modal.hide(index.toString());
    },
    checkDelete(index){
      this.$modal.show('reserve-delete'+index.toString());
    },
    checkDeleteHide(index){
      this.$modal.hide('reserve-delete'+index.toString());
    },
    date(date) {
      return this.$moment(date).format('YYYY-MM-DD')
    },
    time(time) {
      return this.$moment(time).format('HH:ss')
    },
    getNumber() {
      let number = 1
      for (let i = 0; i < 98; i++) {
        this.numberOptions.push(number + i);
      }
    },
    async getReserves() {
      const resData = await this.$axios.$get(
        "/reserve/"+this.$auth.user.id
      );
      const reserves = resData.data;
      console.log(reserves);
      this.reserves = reserves;
    },
    async updateReserve(id,index) {
      if (this.dateSelected||this.timeSelected||this.numberSelected) {
        try {
                const date = this.dateSelected;
                const time = this.timeSelected;
                const updateDatetime = this.$moment(`${date} ${time}`, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm');
                console.log(updateDatetime);
                await this.$axios.put("/reserve/" + id,
              {
                datetime: updateDatetime,
                number: this.numberSelected
              });
                alert('ご予約が変更されました。');
                this.dateSelected = null;
                this.timeSelected = null;
                this.numberSelected = '';
                this.getReserves();
                this.hide(index);
              } catch {
                alert('この日程にはすでに予約があります。');
              }
      } else {
        alert('予約項目の入力をお願いします。');
      }

    },
    async deleteReserve(id,index) {
      await this.$axios.delete("/reserve/" + id);
      this.getReserves();
      this.checkDeleteHide(index);
    },
    async getMyStore() {
      const resData = await this.$axios.$get("/myLike",
          {
            params: {
              user_id: this.userId,
            },
          }
      );
      const stores = resData.data;
      return stores;
    },
    async getHasLike(stores) {
      for (let i = 0; i < stores.length; i++) {
        console.log(stores[i]);
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
      this.myStores = stores;
    },
    async getReservedDatetime(storeId) {
      const sendDate = this.dateSelected;
      console.log(sendDate);
      this.$store.dispatch('getReservedDatetime',
      {
        store_id: storeId,
        sendDate: sendDate,
      });
    },
    getUser() {
      this.userId = this.$auth.user.id;
    }
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
    changeContent: function() {
      if (this.dateSelected||this.timeSelected||this.numberSelected) {
        return 'modal-change-content';
      } else {
        return 'modal-reserve-content';
      }
    },
    disableHours() {
      return this.$store.getters.gettersReservedDatetime;
    }
  },
  async created() {
    await this.getUser();
    await this.getReserves();
    await this.getNumber();
    let stores = await this.getMyStore();
    await this.getHasLike(stores);
  },
}
</script>

<style scoped>
.mypage-wrap {
  width: 100%;
  /* border: 1px solid green; */
  display: flex;
  justify-content: space-between;
}
.left {
  margin-top: 50px;
  width: 47%;
  height: auto;
  /* border: magenta solid 1px; */
}
.reserve-status {
  width: 100%;
  padding: 10px;
}
.reserve-title {
  width: 100%;
  padding: 20px 0;
}
.reserve-content {
  width: 87%;
  margin-top: 20px;
  background-color: mediumblue;
  border-radius: 5px;
  box-shadow: 0 2px 5px #ccc;
  color: #fff;
  padding: 25px;
}
.reserve-number {
  width: 100%;
  display: flex;
}
.icon {
  width: 22px;
  height: 20px;
}
.circle {
  margin: 0px 0px 0px auto;
  cursor: pointer;
}
.reserve-num-ttl {
  margin-left: 25px;
}
.reserve-content-wrap {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.reserve-content-left {
  width: 50%;
}
.reserve-table {
  border-collapse: separate;
  border-spacing: 0px 20px;
}
.reserve-list {
  width: 100%;
}
.reserve-ttl {
  width: 37%;
  padding-right: 25px;
  font-weight: normal;
}
.reserve-data {
  width: 75%;
}
.reserve-content-right {
  width: 50%;
}
.reserve-change {
  width: 5.5rem;
  text-align: center;
  padding: 8px 0 10px;
  color: #000;
  font-weight: bold;
  background-color: lawngreen;
  border-radius: 10px;
  cursor: pointer;
  margin: 20px 0px 0px 41px;
}
.reserve-delete {
  width: 5.5rem;
  text-align: center;
  padding: 8px 0 10px;
  color: #000;
  font-weight: bold;
  background-color: #FA81C0;
  border-radius: 10px;
  cursor: pointer;
  margin: 20px 0px 0px 41px;
}
.rigth {
  width: 47%;
  /* border: mediumslateblue solid 1px; */
  margin-top: 15px;
}
.like-store-ttl {
  margin-top: 15px;
}
.user_name {
  font-size: 26px;
  padding: 10px 0;
}
.like-store-card {
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

/* モーダル */
.change-reserve, .change-content,.delete-check-ttl,.delete-check-content {
  padding: 15px 25px;
  color: #000;
  text-align: center;
}
.change-reserve, .delete-check-ttl {
  border-bottom: 1px solid #ddd;
}
.reserve-input {
  width: 100%;
  margin-top: 10px;
}
.reserve-number:invalid {
  color: #757575;
}
.reserve-number {
  width: 100%;
  height: 42px;
  border: 1px solid rgba(0,0,0,.2);
  border-radius: 4px;
  padding-left: 10px;
  cursor: pointer;
}
.change-btn {
  height: 30px;
  width: 12%;
  margin: 20px;
  background-color: #626DC9;
  padding: 1px;
  color: #fff;
  border: 2px solid #fff;
  font-size: 18px;
  border-radius: 5px;
  cursor: pointer;
}
.back-btn {
  height: 30px;
  width: 12%;
  margin: 20px;
  background-color: #c0c5e9;
  padding: 1px;
  color: #000;
  border: 2px solid #fff;
  font-size: 18px;
  border-radius: 5px;
  cursor: pointer;
}
.modal-content-ttl {
  margin-top: 20px;
  color: #000;
}
.change-content-ttl {
  margin-top: 20px;
  color: red;
}
.modal-reserve-content {
  width: 100%;
  color: #000;
  background-color: #c0c5e9;
  border-radius: 4px;
}
.modal-change-content {
  width: 100%;
  color: #fff;
  background-color: #626DC9;
  border-radius: 4px;
}
.modal-reserve-table {
  margin-top: 10px;
  padding: 10px;
  border-collapse: separate;
  border-spacing: 0px 20px;
}
.modal-reserve-ttl {
  font-weight: normal;
  width: 25%;
  padding-right: 25px;
}
.modal-change-ttl {
  /* font-weight: normal; */
  color: #fff;
  width: 25%;
  padding-right: 25px;
}
.modal-reserve-data {
  width: 75%;
}
.delete-btn {
  height: 30px;
  width: 12%;
  margin: 20px;
  background-color: #FA81C0;
  padding: 1px;
  color: #fff;
  border: 2px solid #fff;
  font-size: 18px;
  border-radius: 5px;
  cursor: pointer;
}
.delete-back-btn {
  height: 30px;
  width: 12%;
  margin: 20px;
  background-color: #FDCBE5;
  padding: 1px;
  color: #000;
  border: 2px solid #fff;
  font-size: 18px;
  border-radius: 5px;
  cursor: pointer;
}
</style>
