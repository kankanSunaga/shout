<template>
  <header class="topNavigation">
    <h3>shout</h3>
    <div v-if="loggIned">
      <div>
        <router-link to="logout">ログアウト</router-link>
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
    data () {
      return { loggIned: this.$cognito.isAuthenticated().then(session => {
        this.loggIned = true
        session
      }).catch( err =>{
        this.loggIned = false
        err
      })
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