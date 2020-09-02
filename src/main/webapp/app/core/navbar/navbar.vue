<template>
  <div id="navigation-bar">
    <nav>
      <div></div>
      <div class="top-bar">
        <div>
          <a @click="toHome()" class="logo">
            <span class="logo-img"></span>
          </a>
        </div>
        <ul>
          <li class="space"></li>
          <li v-if="!authenticated" class="space"></li>
          <li v-if="!authenticated" class="space"></li>
          <li><span @click="toChinese()">中文</span></li>
          <li><span v-text="$t('global.menu.home')" :class="{ 'is-active': actived === 0 }" @click="toHome()">Home</span></li>
          <li v-if="!authenticated"><span string v-text="$t('global.menu.account.login')" @click="openLogin()">Login</span></li>
          <li class="user-settings" v-else>
            <el-dropdown>
              <span class="el-dropdown-link">
                <span>{{ account.name }}</span>
                <em class="el-icon-arrow-down el-icon--right"></em>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-setting"><span @click="toSettings()">用户设置</span></el-dropdown-item>
                <el-dropdown-item icon="el-icon-switch-button"><span @click="logout()">退出</span></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li>
        </ul>
      </div>
      <div></div>
    </nav>
  </div>
</template>

<script lang="ts" src="./navbar.component.ts"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" lang="scss" scoped></style>
