<template>
  <div id="app">
    <div id="app-header">
      <navbar></navbar>
    </div>
    <div class="container-fluid">
      <div class="card">
        <router-view></router-view>
      </div>
    </div>
    <el-dialog id="login-dialog" width="350px" :close-on-click-modal="false" :before-close="closeLoginDialog" :visible.sync="$store.getters.loginDialogVisible">
      <h4 slot="title" v-text="$t('login.title')">Login</h4>
      <login-form></login-form>
    </el-dialog>
  </div>
</template>

<script lang="ts" src="./app.component.ts">
</script>
