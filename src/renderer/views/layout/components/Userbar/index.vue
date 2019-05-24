<template>
  <div class="userinfo" :class="{'active':showUserInfo === true}" id="userInfo">1111</div>
</template>

<script>
import { mapGetters } from "vuex";
import Vue from "vue";

export default {
  name: "userInfo",
  data() {
    return {
      showUserInfo: true
    };
  },
  watch: {},
  created() {},
  mounted() {},
  computed: {
    ...mapGetters(["sidebar", "avatar", "username"])
  },
  methods: {
    fetchData() {}
  }
};
</script>



<style rel="stylesheet/scss" lang="scss" scoped>
.userinfo {
  height: 650px;
  width: 300px;
  background-color: transparent;
  z-index: 10;
  display: flex;
  justify-content: flex-end;
  .playlist-view {
    background-color: #fff;
    width: 300px;
    display: flex;
    flex-direction: column;
    //box-shadow: -5px -5px 15px rgba(0,0,0,0.2);
  }
}
.userinfo.active {
  right: 0;
  animation: 0.3s showup;
}
</style>
