<template>
  <div class="login-container" v-loading.fullscreen="downing" :element-loading-text="downText">
    <div class="header-view" :style="{height: '50px'}">
      <div class="right">
        <el-button @click="minimize" class="no-drag" size="mini" type="text">
          <i class="btn el-icon-minus"></i>
        </el-button>
        <el-button @click="close" class="no-drag hover-color" size="mini" type="text">
          <i class="btn el-icon-close"></i>
        </el-button>
      </div>
    </div>

    <el-form
      class="login-form"
      autocomplete="on"
      :model="loginForm"
      :rules="loginRules"
      ref="loginForm"
      label-position="left"
    >
      <h3 class="title">
        <img class="logo" :src="logo">
      </h3>
      <el-form-item prop="username">
        <el-input
          name="username"
          type="text"
          v-model="loginForm.username"
          autocomplete="on"
          placeholder="username"
          prefix-icon="el-icon-user-solid"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          name="password"
          :type="pwdType"
          @keyup.enter.native="handleLogin"
          v-model="loginForm.password"
          autocomplete="on"
          placeholder="password"
          prefix-icon="el-icon-lock"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          class="login-btn"
          size="medium"
          style="width:100%;"
          :loading="loading"
          @click.native.prevent="handleLogin"
        >登录</el-button>
      </el-form-item>
      <div class="tips">
        <span style="margin-right:10px;">DEMO</span>
        <span style="margin-right:20px;">username: demo</span>
        <span>password: 123456</span>
      </div>
    </el-form>
  </div>
</template>

<script>
//  import { isvalidUsername } from '@/utils/validate'
import logo from "@/assets/images/logo.png";
import { ipcRenderer } from "electron";

export default {
  name: "login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.length < 4) {
        callback(new Error("请输入正确的用户名"));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error("密码不能小于5位"));
      } else {
        callback();
      }
    };
    return {
      downing: false,
      downText: null,
      logo,
      activeName: "first",
      loginForm: {
        username: "demo",
        password: "123456"
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [{ required: true, trigger: "blur", validator: validatePass }]
      },
      loading: false,
      pwdType: "password"
    };
  },
  methods: {
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
    minimize() {
      this.$electron.ipcRenderer.send("minimize");
    },
    showPwd() {
      if (this.pwdType === "password") {
        this.pwdType = "";
      } else {
        this.pwdType = "password";
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("Login", this.loginForm)
            .then(() => {
              this.loading = false;
              this.$router.push({ path: "/" });
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    checkForUpdate() {
      ipcRenderer.send("checkForUpdate");
      ipcRenderer.on("message", (event, text) => {
        //console.log(arguments);
        this.tips = text;
        this.$message(text);
      });
      ipcRenderer.on("downloadProgress", (event, progressObj) => {
        //console.log(progressObj);
        this.downing = true;
        this.downText =
          "下载更新包中" + Number(progressObj.percent.toFixed(1)) + "%";
        this.downloadPercent = progressObj.percent || 0;
      });
      ipcRenderer.on("isUpdateNow", () => {
        ipcRenderer.send("isUpdateNow");
      });
    }
  },
  mounted() {
    this.checkForUpdate();
  },
  beforeDestroy() {
    this.$electron.ipcRenderer.removeAll([
      "message",
      "downloadProgress",
      "isUpdateNow"
    ]);
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
$bg: #c0c9d4;
$light_gray: #eee;
$dark_gray: #889aa4;

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background: url("../../assets/images/login-bg.jpg");
  .el-input {
    display: inline-block;
    height: 47px;
    width: 100%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
  .login-btn {
    background: #f5b147;
    padding: 17px 0px;
    border: none;
  }
  .header-view {
    -webkit-app-region: drag;
    display: flex;
    justify-content: flex-end;
    .right {
      display: flex;
      padding: 0 10px;
      .btn {
        font-size: 18px;
        color: #fff;
      }
      .btn:hover {
        color: #31c27c;
      }
    }
  }

  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: #fff;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: normal;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: #fff;
    cursor: pointer;
    user-select: none;
  }
}
</style>
