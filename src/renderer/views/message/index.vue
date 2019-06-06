<template>
  <div class="main-container" v-loading="listLoading" element-loading-text="拼命加载中....">
    <div class="header-box">
      <el-radio-group v-model="already" @change="alreadyChange" size="mini">
        <el-radio-button :label="0">未读</el-radio-button>
        <el-radio-button :label="1">已读</el-radio-button>
      </el-radio-group>
      <el-button @click="clickReadOnlys" size="mini" type="primary" round>标为已读</el-button>
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
        <el-table-column label="内容" min-width="300" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.content}}</span>
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="状态" width="80" align="center">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.status | formatTypeStatus"
            >{{scope.row.status|formatNameStatus}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" label="时间" width="200">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span>{{scope.row.time}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" v-if="!already">
          <template slot-scope="scope">
            <el-button size="mini" @click="clickReadOnly(scope.row)">标为已读</el-button>
            <el-button size="mini" type="danger" @click="clickStatus(scope.row)">查看情况</el-button>
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
import { getList } from "@/api/table";

export default {
  name: "MessageIndex",
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
  created() {
    this.fetchData();
  },
  methods: {
    /**
     * 修改为已读
     */
    clickReadOnly(row) {
      let IDs = [row.id];
      this.handleReadOnly(IDs);
    },
    clickReadOnlys() {
      if (this.multipleSelection.length == 0) {
        this.$message.error("没有勾选消息!");
        return;
      }
      let IDs = [];
      this.multipleSelection.forEach(element => {
        IDs.push(element.id);
      });
      this.handleReadOnly(IDs);
    },

    handleReadOnly(IDs) {
      this.$store.dispatch("UpdateOrgMessage", IDs).then(response => {
        this.$message.success("标记成功!");
        this.fetchData();
        this.$store.dispatch("GetOrgMessageRead");
      });
    },
    clickStatus(row) {
      let IDs = [row.id];
      this.handleReadOnly(IDs);
      this.$router.push({
        path: "/device/view",
        query: {
          dev_id: row.dev_id
        }
      });
    },
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
     * 获取数据
     */
    fetchData() {
      this.listLoading = true;
      var query = {
        num: this.pageSize,
        already: this.already,
        page: this.currentPage
      };
      this.$store.dispatch("GetOrgMessage", query).then(response => {
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