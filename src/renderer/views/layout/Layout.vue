<template>
  <div>
    <el-container class="container" id="main" style="position: relative;">
      <el-header class="header" :class="{color:isColor}" height="70px">
        <header-view height="70px"></header-view>
      </el-header>
      <el-main class="main">
        <transition name="fade" mode="out-in">
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
          </keep-alive>
        </transition>
        <transition name="fade" mode="out-in">
          <router-view v-if="!$route.meta.keepAlive"></router-view>
        </transition>
        <side-bar class="sidebar-container"></side-bar>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import HeaderView from "./components/Header/";
import SideBar from "./components/Sidebar";
export default {
  name: "layout",
  components: {
    HeaderView,
    SideBar
  },
  data() {
    return {
      isColor: false
    };
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar;
    }
  },
  watch: {
    $route(to, from) {
      if (
        to.name === "HomeIndex" ||
        to.name === "ReportIndex" ||
        to.name === "DeviceIndex"
      ) {
        this.isColor = false;
      } else {
        this.isColor = true;
      }
    }
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
  position: relative;
}
.el-header.color {
  background: #22bb6a;
}
</style>
