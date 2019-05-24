<template>
  <div class="main-container">
    <div class="main-left"></div>

    <div class="main-right">
      <div class="info">
        <el-form ref="form" :model="userInfo" label-width="80px">
          <el-form-item label="账号">
            <el-input v-model="userInfo.username" readonly></el-input>
          </el-form-item>
          <el-form-item label="项目名称">
            <el-input v-model="organization.name" readonly></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="userInfo.phone"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="userInfo.email"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="avatar-info">
        <el-upload
          class="avatar-uploader"
          name="User[avatar]"
          :http-request="upSelf"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="avatar" :src="avatar" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-tag type="info">点击图片修改图片</el-tag>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Vue from "vue";

export default {
  name: "userInfo",
  data() {
    return {
      readonly: true,
      userInfo: {}
    };
  },
  watch: {},
  created() {
    this.fetchData();
  },
  mounted() {},
  computed: {
    ...mapGetters(["topbar", "sidebar", "avatar", "username", "organization"])
  },
  methods: {
    upSelf(item) {
      let formData = new FormData();
      console.log(item);
      formData.append(item.filename, item.file);
      this.$store.dispatch("UpSelf", formData).then(response => {
        this.userInfo = response.user;
      });
    },
    fetchData() {
      this.$store.dispatch("GetInfo").then(response => {
        this.userInfo = response.user;
      });
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 1;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 1MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>



<style rel="stylesheet/scss" lang="scss" scoped>
.main-container {
  flex: 1;
  display: flex;
  flex-direction: row;
  margin: 10px;
  .info {
    width: 50%;
    float: left;
  }
  .avatar-info {
    width: 50%;
    float: right;
    text-align: center;
  }
}
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>