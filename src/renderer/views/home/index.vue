<template>
  <div class="home-container">
    <div class="dashboard-text">name:{{name}}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'home1',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
