<template>
  <div>
    <div class="review-card" v-for="(review,index) in reviews" :key="index">
      <div class="review-user-wrap">
        <h3 class="review-user">{{review.user.user_name}}さん</h3>
        <div class="icon-wrap">
          <font-awesome-icon icon="times-circle" class="times-circle" v-if="$auth.user.id === review.user_id"
          @click="deleteReview(review.id,index)"></font-awesome-icon>
        </div>
      </div>
      <div class="review-stars-wrap">
        <star-rating class="review-stars-input" :max-rating="5" :rating="review.stars" inactive-color="#000"
          active-color="#e64c30" :star-size="25" :read-only="true">
        </star-rating>
      </div>
      <div class="review-title-wrap">
        <h3 class="review-title">{{review.review_title}}</h3>
      </div>
      <div class="review-comment-wrap">
        <p class="review-comment">
          {{review.comment}}
        </p>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props:
    [
    'storeId',
  ],
  methods: {
    async deleteReview(id) {
      confirm("本当にレビューを削除してよろしいでしょうか？")
      const resData = await this.$axios.request({
        method: 'delete',
        url: '/review/'+ id,
      });
      alert("レビューを取り消しました");
      this.getReview();
    },
    getReview() {
      this.$store.dispatch('getReviews',
      {
      id: this.storeId,
      });
    }
  },
  computed: {
    reviews: function() {
      return this.$store.state.reviews;
    }
  },
  mounted() {
    this.getReview();
  }
}
</script>

<style scoped>
.review-card {
  padding: 15px;
  margin-top: 20px;
  background-color: #feeacc;
  border-radius: 5px;
  box-shadow: 0 2px 5px #ccc;
}
.review-user-wrap {
  padding: 10px 0px;
}
.review-stars-wrap {
  padding: 10px 0px;
}
.review-title-wrap {
  padding: 10px 0px;
}
.review-comment-wrap {
  padding: 10px 0px;
}
.review-user-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.icon-wrap {
  width: 22px;
  height: 22px;
  text-align: center;
}
.times-circle {
  font-size: 22px;
  cursor: pointer;
  color: #FA81C0;
}
</style>
