<template>
  <div>
    <div>
      <input type="text" placeholder="ログインID" v-model="userId">
    </div>
    <div>
      <input type="password" placeholder="パスワード" v-model="password">
    </div>
    <div>
      <button @click="AuthLogin()">ログイン</button>
    </div>
    {{message}}
  </div>
</template>

<script>
  export default{
    data () {
      return { 
        userId: '',
        password: '',
        message: ''
      }
    },
    methods: {
      AuthLogin () {
        this.$cognito.login(this.userId, this.password).then( result =>{
          console.log(result)
          this.$router.push('/shouts')
        })
        .catch( err =>{
          console.log(err)
          this.message = "パスワードもしくはIDが正しくありません。"
        })
      }
    }
  }
</script>

<style>
</style>