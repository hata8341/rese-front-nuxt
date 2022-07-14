import Vue from "vue";

Vue.mixin({
  data() {
    return {
      dateSelected: null,
      timeSelected: null,
      numberSelected: "",
      numberOptions: [],
    };
  },
});
