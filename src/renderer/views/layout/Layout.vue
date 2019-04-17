<template>
  <div>
    <el-container class="container" id="main" style="position: relative;">
      <el-header class="header" height="70px" style="-webkit-app-region: drag">
        <header-view height="70px"/>
      </el-header>
      <el-main class="main">
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import HeaderView from "./components/Header/";

export default {
  name: "layout",
  components: {
    HeaderView
  },
  props: {}
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.container {
  height: 100vh;
}

.main {
  padding: 0;
  margin: 0;
  overflow: hidden;
  display: flex;
  flex: 1;
  flex-shrink: 0;
}
</style>
