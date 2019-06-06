<template>
  <div class="header-view" :style="{height: height}">
    <div class="left flex-c-l">
      <img class="logo" :src="logo" style="-webkit-app-region: drag">
    </div>
    <div class="flex-c-l">
      <router-link to="/">{{topbar.title}}</router-link>
    </div>
    <div class="right flex-c-l">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img class="user-avatar" :src="avatar">
          <span>{{username}}</span>
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu class="user-dropdown" slot="dropdown">
          <el-dropdown-item>
            <p @click="userInfo">
              <img class="user-avatar" :src="avatar">
              {{username}}
            </p>
          </el-dropdown-item>
          <el-dropdown-item class="item-device" :divided="true">
            <el-row>
              <el-col :span="8">
                <span class="num">{{c_num}}</span>
                <span class="tit">建筑数量</span>
              </el-col>
              <el-col :span="8">
                <span class="num">{{d_num}}</span>
                <span class="tit">设备数量</span>
              </el-col>
            </el-row>
          </el-dropdown-item>
          <el-dropdown-item :divided="true" icon="el-icon-setting">
            <span @click="userInfo">个人信息设置</span>
          </el-dropdown-item>
          <el-dropdown-item :divided="true" icon="el-icon-switch-button">
            <span @click="logout">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown class="notice-container" trigger="click">
        <el-badge :value="message_count" :max="99" class="notice">
          <el-button
            class="notice-btn no-drag"
            icon="el-icon-message-solid"
            size="medium"
            type="text"
          ></el-button>
        </el-badge>
        <el-dropdown-menu class="notice-dropdown" slot="dropdown">
          <el-dropdown-item v-for="(message, index) in messages" :key="index" :divided="true">
            <span>{{message.time}}</span>
            <p class="message-text">{{message.content}}</p>
          </el-dropdown-item>
          <el-dropdown-item>
            <p @click="messageIndex">查看更多...</p>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button @click="minimize" class="no-drag" size="mini" type="text">
        <i class="btn el-icon-minus"></i>
      </el-button>
      <el-button @click="close" class="no-drag hover-color" size="mini" type="text">
        <i class="btn el-icon-close"></i>
      </el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import logo from "@/assets/images/logo.png";
const { BrowserWindow } = require("electron");

export default {
  data() {
    return {
      tiemr: null,
      logo,
      query: {
        num: 5,
        already: 0
      }
    };
  },
  props: {
    height: {
      type: String,
      default: "40px"
    }
  },
  watch: {
    $route(to, from) {
      if (to.name === "deviceView") {
      } else if (to.name === "detail") {
        // something
      }
    }
  },
  created() {
    this.fetchData();
    this.timer = setInterval(this.fetchData, 60000);
  },
  computed: {
    ...mapGetters([
      "topbar",
      "sidebar",
      "avatar",
      "username",
      "organization",
      "messages",
      "message_count"
    ]),
    c_num() {
      return this.organization ? this.organization.c_num : 0;
    },
    d_num() {
      return this.organization ? this.organization.d_num : 0;
    }
  },
  methods: {
    fetchData() {
      this.$store.dispatch("GetOrgMessageRead").then(response => {
        console.log("获取未读消息");
      });
    },
    close() {
      this.$confirm("此操作将退出监测平台, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$electron.ipcRenderer.send("close");
        })
        .catch(() => {});
    },
    userInfo() {
      this.$router.push({
        path: "/user/index"
      });
    },
    messageIndex() {
      console.log(111);
      this.$router.push({
        path: "/message/index"
      });
    },
    minimize() {
      this.$electron.ipcRenderer.send("minimize");
    },
    back() {
      this.$router.go(-1);
    },
    refresh() {
      this.$bus.$emit("page-refresh", this.$route.name);
    },
    logout() {
      this.$store.dispatch("LogOut").then(() => {
        location.reload(); // 为了重新实例化vue-router对象 避免bug
      });
    }
  },
  destroyed() {
    if (this.timer) {
      //如果定时器在运行则关闭
      clearInterval(this.timer);
    }
  }
};
</script>

<style lang="scss" scoped>
.header-view {
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  .left {
    .btn {
      font-size: 17px;
      color: #999;
    }
    .btn:hover {
      color: #31c27c;
    }
    .el-icon-refresh {
      color: #333;
    }
    .search {
      margin-left: 15px;
      width: 200px;
      .el-input__inner {
        border: none;
        border-radius: 30px;
        background: #e9e9e9;
        color: #8c8c8c;
      }
    }
  }
  .right {
    .btn {
      font-size: 17px;
      color: #333;
    }
    .btn:hover {
      color: #31c27c;
    }
    .avatar-wrapper {
      padding: 0 10px;
      color: #eee;
      span {
        padding: 0 3px;
      }
      &:hover {
        color: #fff;
        cursor: pointer;
      }
    }
  }
}
.user-dropdown {
  width: 280px;
  .item-device {
    .el-col {
      border-left: 1px solid #ebeef5;
      &:first-child {
        border-left: none;
      }
      span {
        text-align: center;
        line-height: 20px;
      }
      .tit {
        display: block;
      }
      .num {
        display: block;
      }
    }
  }
}

.user-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.user-dropdown .user-avatar {
  width: 40px;
  height: 40px;
}
.notice-container {
  .notice {
    margin-right: 30px;
  }
  .notice-btn {
    color: #fff;
  }
}
.message-text {
  width: 250px;
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
