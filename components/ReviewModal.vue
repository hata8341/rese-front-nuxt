<template>
  <div>
    <button
    class="review-btn"
    @click="show"
    >
    レビューする
    </button>
    <modal
    name="review-content"
    height="480"
    :draggable="true"
    :resizable="true"
    >
    <validation-observer ref="obs" v-slot="ObserverProps">
    <div class="review-item">
      <div class="review-header">
        <h2>{{store.store_name}}をレビュー</h2>
      </div>
      <div class="review-title-wrap">
        <div class="review-required-wrap">
          <h3 class="review-title">
            レビュータイトル
          </h3>
          <span class="required">必須</span>
        </div>
        <validation-provider v-slot="ProviderProps" rules="required">
          <input class="review-title-input"
          type="text"
          v-model.trim="reviewTitle"
          name="タイトル"
          placeholder="タイトルを入れてください">
          <div class="error">{{ ProviderProps.errors[0] }}</div>
        </validation-provider>
      </div>
      <div class="reviwew-content-wrap">
        <div class="review-required-wrap">
          <h3 class="review-content">
            レビューを追加
          </h3>
          <span class="required">必須</span>
        </div>
        <validation-provider v-slot="ProviderProps" name="コメント" rules="required|max:10000">
          <textarea class="review-content-input"
          name="review-content"
          v-model.trim="comment"
          placeholder="レビューを入れてください（１０，０００文字以下）"
          cols="30"
          rows="10" />
          <p v-if="comment" class="maxcomment-count">{{comment.length}}/10,000</p>
          <p class="maxcomment-count">最大文字数10,000文字</p>
          <div class="error">{{ ProviderProps.errors[0] }}</div>
        </validation-provider>
      </div>
      <div class="review-stars-wrap">
        <div class="review-required-wrap">
          <h3 class="review-stars">
            総合評価
          </h3>
          <span>(5段階評価)</span>
          <span class="required">必須</span>
        </div>
        <star-rating
          class="review-stars-input"
          v-model.number="rating"
          :increment="1"
          :max-rating="5"
          inactive-color="#000"
          active-color="#e64c30"
          :star-size="35">
        </star-rating>
      </div>
      <div class="review-btn-wrap">
        <button class="post-review-btn"
        :disabled="ObserverProps.invalid || !ObserverProps.validated"
        @click="postReview()">
        投稿
        </button>
        <button class="close-review-btn" @click="hide">戻る
        </button>
      </div>
        <p v-show="ObserverProps.invalid || !ObserverProps.validated" class="invalid">
          全ての項目を入力すると投稿できます
          </p>
    </div>
    </validation-observer>
    </modal>
  </div>
</template>


<script>
export default {
  props:[
    'store',
  ],
  data() {
    return {
      reviewTitle:null,
      comment:null,
      rating:0,
    }
  },
  methods: {
    async show() {
      const toReview = await this.toReview();
      if (!toReview) {
        this.$modal.show('review-content');
      } else {
        alert("申し訳ございません。一つの店舗に１件のまでのレビューが投稿できます。");
      }
    },
    hide(){
      this.$modal.hide('review-content');
    },
    async toReview() {
      const resData = await this.$axios.$get('/postedReview',
      {
        params: {
          user_id: this.$auth.user.id,
          store_id: this.$route.params.id,
        }
      });
      const toReview = resData.state;
      return toReview;
    },
    async postReview() {
      if (confirm("レビュー内容に間違いはございませんか？")) {
        try {
          const title = this.reviewTitle.replace(/\s+/g, "");
          const reviewComment = this.comment.replace(/\s+/g, "");
          await this.$axios.post('/review',
        {
          user_id: this.$auth.user.id,
          store_id: this.store.id,
          review_title: title,
          comment: reviewComment,
          stars: this.rating,
        });
        alert('レビューを投稿しました！');
        this.reviewTitle = '';
        this.comment = '';
        this.rating = 0;
        this.getReviews();
        this.hide();
        } catch {
          alert('投稿に失敗しました。');
        }
      } else {
        return
      }

    },
    getReviews() {
      this.$store.dispatch('getReviews',
      {
      id: this.store.id,
      });
    }
  },
  // mounted() {
  //   console.log(this.getReviews());
  // }
}
</script>


<style scoped>
.review-btn {
  width: 100px;
  text-align: center;
  padding: 1px 0 2px;
  color: white;
  font-weight: bold;
  background-color: #ff9600;
  border-radius: 5px;
  cursor: pointer;
}
.review-item {
  padding: 15px;
}
.review-header {
  padding: 10px 0px;
  text-align: center;
  border-bottom: 1px solid #ddd;
}
.review-title-wrap {
  padding: 10px 0px;
}
.review-title {
  padding-bottom: 10px;
}
.review-title-input {
  width: 97%;
  height: 42px;
  border: 1px solid rgba(0,0,0,.2);
  border-radius: 4px;
  padding-left: 10px;
  cursor: pointer;
}
.review-content-wrap {
  padding: 10px 0px;
}
.review-content {
  padding-bottom: 10px;
}
.review-content-input {
  width: 97%;
  height: 100px;
  border: 1px solid rgba(0,0,0,.2);
  border-radius: 4px;
  padding-left: 10px;
  cursor: pointer;
}
.review-stars-wrap {
  padding: 10px 0px;
}
.review-stars {
  padding-bottom: 10px;
}
.post-review-btn {
  height: 42px;
  width: 20%;
  margin: 20px;
  background-color: #ff9600;
  padding: 1px;
  color: #fff;
  border: 2px solid #fff;
  font-size: 18px;
  border-radius: 5px;
  cursor: pointer;
}
.close-review-btn {
  height: 42px;
  width: 20%;
  margin: 20px;
  background-color: #fff;
  padding: 1px;
  color: #000;
  border: 2px solid #ff9600;
  font-size: 18px;
  border-radius: 5px;
  cursor: pointer;
}
.review-btn-wrap {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.review-required-wrap {
  display: flex;
}
.required {
  display: inline-block;
  margin-top: 2px;
  margin-left: 10px;
  font-size: 12px;
  color: red;
}
.error {
  color: #ff0000;
}
.maxcomment-count {
  font-size: 14px;
}
.invalid {
  margin-left: 15px;
  color: #fe9696;
}
</style>
