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
        empty-text="无"
        border
        fit
        highlight-current-row
        height="480"
        max-height="480"
      >
        <el-table-column align="center" label="ID" width="100">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column align="center" label="温度" min-width="100">
          <template slot-scope="scope" :class="scope.row.abnormal.temp">
            <span :class="scope.row.abnormal.temp|formatTypeStatus">{{scope.row.temp}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="湿度" min-width="100">
          <template slot-scope="scope">
            <span :class="scope.row.abnormal.humi|formatTypeStatus">{{scope.row.humi}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="裂隙" min-width="100" v-if="device.type_id == 4">
          <template slot-scope="scope">
            <span :class="scope.row.abnormal.perc|formatTypeStatus">{{scope.row.perc}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="前后倾角" min-width="100" v-if="device.type_id == 3">
          <template slot-scope="scope">
            <span :class="scope.row.abnormal.dire_0|formatTypeStatus">{{scope.row.dire_0}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="左右倾角" min-width="100" v-if="device.type_id == 3">
          <template slot-scope="scope">
            <span :class="scope.row.abnormal.dire_1|formatTypeStatus">{{scope.row.dire_1}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="上传时间" min-width="200">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span>{{scope.row.uplink_at}}</span>
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
        console.log(response);
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
  padding: 10px;
  /*
  flex-direction: column;
  */
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