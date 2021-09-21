<template>
  <div class="container">
    <div class="header-wrap">
      <Header />
      <!-- <Search /> -->
    </div>
    <Nuxt />
  </div>
</template>
<style>
html {
  background-color: snow;
}
.container{
  max-width: 1200px;
  height: auto;
  /* border: 1px solid red; */
  padding: 20px;
  margin: 0 auto;
}
.header-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
