<template>
  <header class="topNavigation">
    <h3>shout</h3>
    <div v-if="loggIned">
      <div>
        <router-link to="logout">ログアウト</router-link>
        <a @click="updatePassword()">パスワードを変更する</a>
      </div>
    </div>
    <div v-else>
      <div>
        <router-link to="loginForm">ログインフォームへ</router-link>
        <router-link to="signUp">ユーザー登録へ</router-link>
      </div>
    </div>
    {{loggIned}}
  </header>
</template>

<script>
export default{
  data() {
    return { loggIned: this.$cognito.isAuthenticated()}
  },
  methods: {
    updatePassword (){
      const result = this.$cognito.resetPassword()
      if ( result ) {
        this.message = "パスワードを更新しました"
      } else {
        this.message = "エラーが発生しました"
      }
    }
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