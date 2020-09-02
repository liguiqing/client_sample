/*
 * 前端笔试要求
 * 1.请使用原生h5+css3完成此题
 * 2.使用卡片形式显示 /webpack/mock/data/account.json 的数据，卡片垂直居中对齐，屏幕适配规则：
 * 大于1200px屏幕时为一行三个卡片，大于796px一行显示两个卡片，大于480px显示一个；
 * 3.请给卡片添加hover状态背景: hover状态卡片背景色为#dc3545，非hover状态的卡片背景色为#ffc107
 * 4.请给卡片添加click事件: 使用Elementui Dialog 显示卡片的内容
 * 5.请使用scss书写样式，并将3中的颜色值定义为变量使用
 */
<template>
  <div id="home">
    <!--sample-->
    <div v-for="account in accounts" :key="account.id">{{ account.name }}</div>
  </div>
</template>
<script lang="ts" src="./home.component.ts">
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
</style>
