export const state = () => ({
  stores: [],
});

export const getters = {
  gettersStores: state => {
    return state.stores
  },
}

export const mutations =
{
  setStores : function (state,stores) {
    state.stores = stores
  }
}
export const actions =
{
  getStores: async function ({ commit }) {
    const {data} = await this.$axios.$get('/store')
    console.log(data);
        commit('setStores', data);
    }
}



