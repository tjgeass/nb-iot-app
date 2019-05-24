<template>
  <div class="main-container">
    <el-card class="box-card" :body-style="{ padding: '10px' }" shadow="hover">
      <div slot="header" class="clearfix">
        <span>设备属性</span>
      </div>
      <el-form
        label-position="left"
        :model="device"
        size="mini"
        label-width="100px"
        class="demo-table-expand"
      >
        <el-form-item label="设备名称">
          <span>{{ device.name }}</span>
        </el-form-item>
        <el-form-item label="设备简介">
          <span>{{ device.desc }}</span>
        </el-form-item>
        <el-form-item label="设备状态">
          <span>{{ device.status }}</span>
        </el-form-item>
        <el-form-item label="设备类型">
          <span>{{ device.type_id }}</span>
        </el-form-item>
      </el-form>
    </el-card>
    {{device.name}}
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Vue from "vue";

export default {
  name: "deviceView",
  data() {
    return {
      padding: {
        padding: "10px"
      },
      dev_id: this.$route.query.dev_id
    };
  },
  watch: {},
  created() {
    var item = {
      title: "首页",
      path: "/home"
    };
    this.$store.commit("SET_TOPBAR", item);
    this.fetchData();
  },
  mounted() {},
  computed: {
    device: function() {
      return this.$store.getters.getDeviceById(this.dev_id);
    }
  },
  methods: {
    fetchData() {}
  }
};
</script>



<style rel="stylesheet/scss" lang="scss" scoped>
.main-container {
  margin: 10px;
  .box-card {
  }
}
@keyframes breath-danger {
  0% {
    box-shadow: 0 2px 12px 0 rgba(245, 108, 108, 0.2);
  }
  70% {
    box-shadow: 0 2px 12px 0 rgba(245, 108, 108, 0.9);
  }
  to {
    box-shadow: 0 2px 12px 0 rgba(245, 108, 108, 0.2);
  }
}
@keyframes breath-warning {
  0% {
    box-shadow: 0 2px 12px 0 rgba(230, 162, 60, 0.2);
  }
  70% {
    box-shadow: 0 2px 12px 0 rgba(230, 162, 60, 0.9);
  }
  to {
    box-shadow: 0 2px 12px 0 rgba(230, 162, 60, 0.2);
  }
}
</style>
