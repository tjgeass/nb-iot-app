<template>
  <div class="main-container" v-loading="listLoading" element-loading-text="拼命加载中....">
    <div class="header-box">
      <el-row type="flex" class="top">
        <el-col :span="9" class="title">
          <el-page-header @back="handleDevice">
            <span slot="content">
              <i class="el-icon-date"></i>
              设备名称:{{device.name}}
            </span>
          </el-page-header>
        </el-col>
      </el-row>
    </div>
    <div class="table-box">
      <el-table
        :data="list"
        border
        fit
        highlight-current-row
        @selection-change="handleSelectionChange"
        max-height="480"
      >
        <el-table-column type="selection" align="center" width="35"></el-table-column>
        <el-table-column align="center" label="ID" width="100">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column align="center" label="温度" min-width="100">
          <template slot-scope="scope">{{scope.row.temp}}</template>
        </el-table-column>
        <el-table-column align="center" label="湿度">
          <template slot-scope="scope">{{scope.row.humi}}</template>
        </el-table-column>
        <el-table-column align="center" label="裂隙" v-if="device.type_id == 4">
          <template slot-scope="scope">{{scope.row.perc}}</template>
        </el-table-column>
        <el-table-column align="center" label="前后倾角" v-if="device.type_id == 3">
          <template slot-scope="scope">{{scope.row.dire_0}}</template>
        </el-table-column>
        <el-table-column align="center" label="左右倾角" v-if="device.type_id == 3">
          <template slot-scope="scope">{{scope.row.dire_1}}</template>
        </el-table-column>
        <el-table-column align="center" label="上传时间" width="200">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span>{{scope.row.uplink}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page-box">
      <el-pagination
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
        :page-size="20"
        :current-page="currentPage"
        @next-click="currentChange"
        @prev-click="currentChange"
        @current-change="currentChange"
        @size-change="sizeChange"
        :page-sizes="[20, 50, 100]"
        :hide-on-single-page="true"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "DeviceTable",
  data() {
    return {
      already: 0,
      currentPage: 1,
      totalCount: null,
      pageSize: 20,
      multipleSelection: [],
      list: null,
      listLoading: true
    };
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: "success",
        2: "warning",
        3: "danger"
      };
      return statusMap[status];
    }
  },
  computed: {
    device: function() {
      return this.$store.getters.getDeviceById(this.$route.query.dev_id);
    }
  },
  created() {
    this.$store.commit("SET_TOPBAR_BG", true);
    this.fetchData();
  },
  methods: {
    /**
     *切换消息状态
     */
    alreadyChange(val) {
      this.fetchData();
    },
    /**
     * 修改每页条数
     */
    sizeChange(val) {
      this.pageSize = val;
      this.fetchData();
    },
    /**
     * 切换页码
     */
    currentChange(val) {
      this.currentPage = val;
      this.fetchData();
    },

    /**
     * 跳转设备详情页
     */
    handleDevice() {
      this.$router.push({
        path: "/device/view",
        query: {
          dev_id: this.$route.query.dev_id
        }
      });
    },
    /**
     * 获取数据
     */
    fetchData() {
      this.listLoading = true;
      var query = {
        dev_id: this.$route.query.dev_id,
        num: this.pageSize,
        page: this.currentPage
      };
      this.$store.dispatch("GetDeviceDataTable", query).then(response => {
        this.list = response.items;
        this.currentPage = response._meta.currentPage;
        this.totalCount = response._meta.totalCount;
        this.listLoading = false;
      });
    },
    /**
     * 多选
     */
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.main-container {
  flex: 1;
  display: flex;
  padding: 10px;
  flex-direction: column;
  width: 100%;
  .header-box {
    flex: 1;
    margin: 10px;
  }
  .table-box {
    height: 480px;
    width: 100%;
  }
  .page-box {
    flex: 1;
    margin: 10px;
  }
}
</style>