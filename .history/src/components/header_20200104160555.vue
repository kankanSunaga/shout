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
        ログインはこちら
      </div>
      <div>
        新規登録はこちら
      </div>
    </div>
  </header>
</template>

<script>
  export default{
    data () {
      return {loggIned: false}
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