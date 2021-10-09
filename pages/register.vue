<template>
  <div class="wrap">
    <div class="content">
      <div class="content-title blue">
        <h2>新規登録</h2>
      </div>

      <validation-observer ref="obs" v-slot="ObserverProps">
        <validation-provider v-slot="{errors}" rules="required">
          <div class="list">
            <img src="../assets/img/社会人の男性の無料アイコン素材 1.png" alt="ユーザーのアイコンです">
            <input type="text" v-model="
            user_name" name="名前" placeholder="ユーザーネーム">
            </div>
            <div class="error">{{errors[0]}}</div>
        </validation-provider>
        <validation-provider v-slot="{errors}" rules="required|email">
          <div class="list">
            <img src="../assets/img/シンプルなメールのアイコン素材 2.png" alt="メールアドレスのアイコンです">
            <input type="email" v-model="email" name="メールアドレス" placeholder="メールアドレス">
          </div>
          <div class="error">{{errors[0]}}</div>
        </validation-provider>
        <validation-provider v-slot="{errors}" rules="required|min:8">
          <div class="list">
            <img src="../assets/img/鍵・錠の無料アイコン素材 1.png" alt="パスワードのアイコンです">
            <input type="password" v-model="password" name="パスワード" placeholder="パスワード">
          </div>
          <div class="error">{{errors[0]}}</div>
        </validation-provider>
      <div class="button-wrap">
        <button @click="register"
                :disabled="ObserverProps.invalid || !ObserverProps.validated"
                >登録</button>
      </div>
        <p v-show="ObserverProps.invalid || !ObserverProps.validated" class="invalid">
          全ての項目を入力すると登録できます
          </p>
      </validation-observer>
    </div>
  </div>
</template>

<script>
export default {
  auth: false,
  data() {
    return {
      user_name:null,
      email:null,
      password:null,
    };
  },
  methods: {
    async register() {
        try {
          await this.$axios.post("http://localhost:8000/api/v1/auth/register",{
            user_name: this.user_name,
            email: this.email,
            password: this.password,
          });
          this.$router.push("/thanks");
        } catch {
          alert("このメールアドレスはすでに登録されています");
        }
      },
    },
  };
</script>

<style scoped>
  .wrap {
    width: 100%;
    height: auto;
    margin-top: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .content {
    width: 50%;
    background-color: #fff;
    box-shadow: 0 2px 5px #ccc;

  }
  .content-title{
    padding: 20px;
    background-color: blue;
    border-radius: 5px 5px 0 0;
    box-shadow: 0 2px 5px #ccc;

  }
  .content-title h2{
    color: white;
  }
  .list {
    display: flex;
    width: 90%;
    justify-content: space-around;
  }
  .list img {
    margin-top: 15px;
  }
  .list input {
    margin-top: 15px;
    width: 80%;
    border-radius: 5px;
    padding: 10px;
  }
  .button-wrap {
    display: flex;
    width: 95%;
    justify-content: flex-end;
    margin: 15px 0;
    text-align: end;
  }
  button {
    width: 100px;
    text-align: center;
    padding: 8px 0 10px;
    color: #fff;
    background-color: blue;
    border-radius: 25px;
    cursor: pointer;
  }
  .error {
    color: red;
  }
  .invalid {
    color: black;
    text-align: center;
    margin-bottom: 15px;
    border-radius: 0 0 5px 5px;
  }
</style>
