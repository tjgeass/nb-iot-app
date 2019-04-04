<template>
  <div>
    <el-container class="container" id="main" style="">
      <el-container style="position: relative;">
        <el-container>
          <el-header class="header" height="50px" style="-webkit-app-region: drag">
            <header-view height="80px"/>
          </el-header>
          <el-main class="main">
            <keep-alive>
              <router-view></router-view>
             </keep-alive>
          </el-main>
        </el-container>
      </el-container>
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

.header {
    background: #fafafa;
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
