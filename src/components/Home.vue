<template>
  <div>
    {{msg}}
    <button @click="test">作成する</button>
  </div>
</template>

<script>
  export default{
    data () {
      return { 
        msg: '嫌なことがあったらここで叫んでね' 
      }
    },
    methods: {
      test () {
        this.$cognito.isAuthenticated () 
      }
    }
  }
</script>
