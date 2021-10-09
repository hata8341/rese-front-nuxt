<template>
  <div class="wrap">
    <div class="content">
      <div class="content-title blue">
        <h2>ログイン</h2>
      </div>
      <validation-observer ref="obs" v-slot="ObserverProps">
      <validation-provider v-slot="{errors}" rules="required">
        <div class="list">
          <font-awesome-icon icon="envelope" class="icon" />
          <input type="email" v-model="email" name="メールアドレス" placeholder="メールアドレス">
        </div>
        <div class="error">{{errors[0]}}</div>
      </validation-provider>

      <validation-provider v-slot="{errors}" rules="required|min:8">
        <div class="list">
          <font-awesome-icon icon="lock" class="icon" />
          <input type="password" v-model="password" name="パスワード" placeholder="パスワード">
        </div>
        <div class="error">{{errors[0]}}</div>
      </validation-provider>
      <div class="button-wrap">
        <button @click="login"
                :disabled="ObserverProps.invalid||!ObserverProps.validated"
                >ログイン</button>
      </div>
      <p v-show="ObserverProps.invalid || !ObserverProps.validated" class="invalid">
          全ての項目を入力するとログインできます
        </p>
      </validation-observer>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: null,
      password:null,
    };
  },
  methods: {
    async login() {
      try {
        await this.$auth.loginWith("laravelJWT",{
          data: {
            email: this.email,
            password: this.password,
          },
        });
        this.$router.push("/");
      } catch {
        alert("メールアドレスまたはパスワードが間違っております");
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
    border-radius: 5px;
    box-shadow: 0 2px 5px #ccc;
  }
  .content-title{
    padding: 20px;
    background-color: blue;
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
  .icon {
    font-size: 50px;
    margin-top: 6px;
  }
</style>
