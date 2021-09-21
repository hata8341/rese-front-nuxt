<template>
<div>
  <transition name="left">
    <nav class="nav" v-show="nav">
      <ul>
      <li>
        <NuxtLink to="/">ホームへ</NuxtLink>
        </li>
      <li v-if="!$auth.loggedIn">
        <NuxtLink to="/register">新規登録へ</NuxtLink>
        </li>
      <li v-else>
        <a @click="logout">ログアウト</a>
        </li>
      <li v-if="!$auth.loggedIn">
        <NuxtLink to="/login">ログイン画面へ</NuxtLink>
        </li>
      <li v-else>
        <NuxtLink to="/mypage">マイページへ</NuxtLink>
        </li>
      </ul>
    </nav>
  </transition>
  <header>
    <div class="menu" @click="navOpen" :class="{'open':active}">
      <span class="menu_bar-top"></span>
      <span class="menu_bar-middle"></span>
      <span class="menu_bar-bottom"></span>
    </div>
    <div class="title">
      <h2>Rese</h2>
    </div>
  </header>
</div>
</template>
<script>
export default {
  data() {
    return {
      active: false,
      nav: false,
    }
  },
  methods: {
    navOpen() {
      this.active = !this.active;
      this.nav = !this.nav;
    },
    async logout() {
      try {
        await this.$auth.logout();
        this.$router.push("/login");
      } catch (error) {
          console.log(error);
      }
    }
  }
}
</script>
<style scoped>
a{
  text-decoration: none;
  color: blue
}
.nav{
  position: absolute;
  height: 100vh;
  width: 100%;
  left: 0%;
  background: #eee;
  text-align: center;
  z-index: 1;
}
.nav ul{
  padding-top: 80px;
}
.nav ul li{
  list-style-type: none;
  margin-top: 50px;
}
.menu {
  display: inline-block;
  width: 36px;
  height: 32px;
  cursor: pointer;
  position: relative;
  left: 20px;
  top: 20px;
  z-index: 1;
}
.menu_bar-top,
.menu_bar-middle,
.menu_bar-bottom {
  display: inline-block;
  width: 100%;
  height: 4px;
  background-color: #000;
  position: absolute;
  transition: 0.5s;
}
.menu_bar-top {
  top: 0;
}
.menu_bar-middle {
  top: 14px;
}
.menu_bar-bottom {
  bottom: 0;
}
.menu.open span:nth-of-type(1) {
  top: 14px;
  transform: rotate(45deg);
}
.menu.open span:nth-of-type(2) {
  opacity: 0;
}
.menu.open span:nth-of-type(3) {
  top: 14px;
  transform: rotate(-45deg);
}
.left-enter-active,
.left-leave-active {
  transform: translate(0px, 0px);
  transition: transform .7s cubic-bezier(0, 0, 0.2, 1) 0s;
}
.left-enter,
.left-leave-to {
  transform: translateX(-100vw) translateX(0px);
}
header {
  height: 70px;
}
.title {
  width: 50%;
  height: auto;
  margin-left: 100px;
}
.title h2 {
  font-size: 32px;
}
</style>
