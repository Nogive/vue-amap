<template>
  <div id="app">
    <h1>Vue-amap</h1>
    <router-link to="/">主页</router-link> |
    <router-link to="/nativeSdk">原生&UI</router-link> |
    <router-link to="/position">定位</router-link> |
    <hr>
    <router-link to="/search">搜索(vue-amap)</router-link> |
    <router-link to="/searchBySdk">search sdk</router-link> |
    <router-link to="/searchBypois">输入提示+搜索服务</router-link> |
    <hr>
    <router-link to="/drag">拖拽选点</router-link> |
    <router-link to="/ui">其他</router-link>
    <hr>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
hr{
  margin: 10px 0;
}
</style>
