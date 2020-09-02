<template>
  <div id="login-form">
    <div v-show="authenticationError" style="color: #f56c6c; font-size: 12px; line-height: 12px;" slot="title" v-html="$t('login.messages.error.authentication')"></div>
    <el-tabs v-model="activeName">
      <el-tab-pane name="mobile">
        <span slot="label" v-text="$t('login.tab[\'mobile.label\']')">Mobiel Login</span>
        <el-form status-icon label-width="1px" id="mobileLoginForm" :model="mobileLogin" :rules="mobileLoginRule" ref="mobileLoginForm">
          <el-form-item prop="mobile">
            <el-input type="text" ref="mobile" v-model="mobileLogin.mobile" autocomplete="off" :placeholder="$t('global.form[\'mobile.placeholder\']')">
              <em slot="prefix" class="el-input__icon el-icon-mobile"></em>
            </el-input>
          </el-form-item>
          <el-form-item prop="vcode">
            <el-input
              type="text"
              ref="vcode"
              v-model="mobileLogin.vcode"
              autocomplete="off"
              :placeholder="$t('global.form[\'mobile.validate.code\']')"
              @keyup.enter.native="doLogin()"
            >
              <em slot="prefix" class="el-input__icon el-icon-tickets"></em>
              <el-button :disabled="!sendAgin" type="primary" slot="append" icon="el-icon-mobile" @click="postVCode()">{{ vcodeText }}</el-button>
            </el-input>
          </el-form-item>
          <el-form-item style="margin-bottom: 0px;">
            <el-button style="width: 100%;" type="primary" @click.prevent="doLogin()" v-text="$t('login.form.button')">Sign in</el-button>
          </el-form-item>
          <el-form-item style="min-height: 42px; margin-bottom: 0px; text-align: center;">
            <el-link type="danger" href="/register" v-text="$t('global.menu.account.register')">Register a new account</el-link>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane name="userName">
        <span slot="label" v-text="$t('login.tab[\'username.label\']')">Mobiel Login</span>
        <el-form status-icon label-width="1px" :model="userLogin" :rules="userLoginRule" id="userLoginForm" ref="userLoginForm">
          <el-form-item prop="login" class="">
            <el-input type="text" ref="login" v-model="userLogin.login" autocomplete="on" :placeholder="$t('login.form[\'login.placeholder\']')">
              <em slot="prefix" class="el-input__icon el-icon-user"></em>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              ref="password"
              v-model="userLogin.password"
              autocomplete="off"
              :placeholder="$t('login.form[\'password.placeholder\']')"
              @keyup.enter.native="doLogin()"
            >
              <em slot="prefix" class="el-input__icon el-icon-lock"></em>
            </el-input>
          </el-form-item>
          <el-form-item style="margin-bottom: 0px;">
            <el-button style="width: 100%;" type="primary" @click.prevent="doLogin()" v-text="$t('login.form.button')">Sign in</el-button>
          </el-form-item>

          <el-form-item style="min-height: 42px; margin-bottom: 0px;">
            <el-checkbox v-model="rememberMe" checked><span v-text="$t('login.form.rememberme')">Remember me</span></el-checkbox>
            <el-link type="warning" href="account/reset/request" v-text="$t('login.password.forgot')">Did you forget your password?</el-link>
            <el-link type="danger" href="/register" v-text="$t('global.menu.account.register')">Register a new account</el-link>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang="ts" src="./login-form.component.ts">
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
#login-form {
  .el-alert--warning.is-light {
    background-color: #fff;
  }
}
</style>
