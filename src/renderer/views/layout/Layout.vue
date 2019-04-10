<template>
  <div>
    <el-container class="container" id="main" style="position: relative;">
          <el-header class="header" height="70px" style="-webkit-app-region: drag">
            <header-view height="70px"/>
          </el-header>
          <el-main class="main">
            <keep-alive>
              <router-view></router-view>
             </keep-alive>
          </el-main>
    </el-container>
  </div>
</template>

<script>
import AppMain from "./components/AppMain";
import HeaderView from "./components/Header/";

export default {
  name: "layout",
  components: {
    HeaderView,
    AppMain
  }
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
