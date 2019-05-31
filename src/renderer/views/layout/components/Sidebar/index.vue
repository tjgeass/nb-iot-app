<template>
  <div class="menu-sidebar" :class="placement">
    <div class="sidebar-content-wrapper" :class="fadeClass">
      <div class="toggle-button" @click="toggleSideBar">
        <div class="triangle" :class="iconClass"></div>
      </div>
      <div class="content-wrapper" :style="{width: width}" :show-timeout="200">
        <div class="content">
          <el-menu
            mode="vertical"
            :show-timeout="200"
            :default-active="$route.path"
            :collapse="true"
            text-color="#bfcbd9"
            active-text-color="#409EFF"
            :router="true"
          >
            <sidebar-item :routes="routes"></sidebar-item>
          </el-menu>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SidebarItem from "./SidebarItem";

export default {
  components: { SidebarItem },
  props: {
    placement: {
      type: String,
      default: "left"
    }
  },
  data() {
    return {
      width: "0px"
    };
  },
  watch: {
    sidebarVisible(v) {
      if (v) {
        this.width = "64px";
      } else {
        this.width = "0px";
      }
    }
  },

  computed: {
    ...mapGetters(["sidebar"]),
    sidebarVisible() {
      return this.sidebar.opened;
    },

    iconClass() {
      return this.sidebarVisible ? `triangle-left` : `triangle-right`;
    },
    routes() {
      return this.$router.options.routes;
    },
    isCollapse() {
      return !this.sidebar.opened;
    },
    fadeClass() {
      return this.sidebarVisible ? "show" : "hide";
    }
  },
  methods: {
    toggleSideBar() {
      if (this.sidebarVisible) {
        this.$store.dispatch("CloseSideBar");
      } else {
        this.$store.dispatch("ToggleSideBar");
      }
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #22bb6a;
.menu-sidebar {
  position: absolute;
  display: flex;
  height: 100%;
  .sidebar-content-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    background: $bg;
    .content-wrapper {
      overflow: hidden;
      transition: width 0.5s;
      flex: 1;
      display: flex;
      .el-menu {
        height: 100%;
      }
    }
    .toggle-button {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 50%;
      width: 20px;
      height: 50px;
      cursor: pointer;
      margin-top: -25px;
      line-height: 50px;
      &::before {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        content: "";
        background: rgba(255, 255, 255, 0.8);
        transform: scaleY(1.5) perspective(5px) rotateY(5deg);
      }
      .triangle {
        width: 0;
        height: 0;
        border-style: solid;
        border-color: transparent #000 transparent transparent;
      }
      .triangle-left {
        border-width: 10px 10px 10px 0;
        border-color: transparent #000 transparent transparent;
      }
      .triangle-right {
        border-width: 10px 0 10px 10px;
        border-color: transparent transparent transparent #000;
      }
    }
  }

  &.left {
    left: 0;
    .sidebar-content-wrapper {
      .toggle-button {
        right: -22px;
      }
    }
  }
  &.right {
    right: 0;
    .sidebar-content-wrapper {
      .toggle-button {
        left: -22px;
        transform: rotate(180deg);
      }
    }
  }
}
</style>

    
