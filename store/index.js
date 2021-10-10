export const state = {
  reviews: [],
  reservedDatetime: [],
}

export const getters = {
  gettersReviews: state => {
    return state.reviews
  },
  gettersReservedDatetime: state => {
    return state.reservedDatetime
  },
}

export const mutations =
{
  setReviews : function (state,reviews) {
    state.reviews = reviews
  },
  setReservedDatetime: function (state, {reservedDatetime,sendDate} ) {
    let reserveHours = [];
      for (let i = 0; i < reservedDatetime.length; i++) {
        reserveHours[i] = this.$moment(reservedDatetime[i].datetime).format('HH');
      }
    if (this.$moment().format('YYYY-MM-DD') === sendDate) {
      console.log(11);
      const startHour = this.$moment().startOf('date');
      const endHour = this.$moment();
      let beforeSalesTimes = [];
      for (let hour = startHour; hour <= endHour; hour=hour.add(1,'hour')) {
        beforeSalesTimes.push(hour.format('HH'));
      }
      const setDisableHours = beforeSalesTimes.concat(reserveHours);
      state.reservedDatetime = setDisableHours;
    } else {
      const beforeSalesTimes = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10'];
      const setDisableHours = beforeSalesTimes.concat(reserveHours);
      state.reservedDatetime = setDisableHours;
    }
  }
}
export const actions =
{
  getReviews: async function ({ commit }, { id }) {
    const resData = await this.$axios.$get('/review/' + id);
    commit('setReviews', resData.data);
  },

  getReservedDatetime: async function ({ commit }, { store_id, sendDate }) {
    const resData = await this.$axios.$get("/reservedDatetime",
      {
        params: {
          store_id: store_id,
          date: sendDate
        }
      });
    commit('setReservedDatetime',{reservedDatetime: resData.data, sendDate: sendDate});
  }
}



