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
  </div>
</template>

<script>
  export default{
    data () {
      return { 
        userId: '',
        password: ''
      }
    },
    methods: {
      AuthLogin () {
        alert(this)
      }
    }
  }
</script>

<style>
</style>