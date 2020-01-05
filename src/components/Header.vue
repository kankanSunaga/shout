<template>
  <header class="topNavigation">
    <h3>shout</h3>
    <div v-if="loggIned">
      <div>
        ユーザー設定
      </div>
    </div>
    <div v-else>
      <div>
        <router-link to="loginForm">ログインフォームへ</router-link>
        <router-link to="signUp">ログインフォームへ</router-link>
      </div>
    </div>
  </header>
</template>

<script>
  export default{
    data () {
      return { loggIned: false}
    }
  }
</script>

<style>
  .topNavigation{
      height: 70px;
      text-align: center;
      background-color: #888;
      color: #fff;
  }
</style>