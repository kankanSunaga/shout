<template>
  <div>
    <router-link to="index">一覧へ</router-link>
    {{message}}
    <div v-show="!isResetedPassword">
      検証コードを送信する
      <button @click="resetPass()">送信</button>
    </div>
    <div v-show="isResetedPassword">
      <h2>確認コード入力</h2>
      <div>
        <input type="text" placeholder="確認コード" v-model="confirmationCode" required>
      </div>
      <h2>新規パスワード入力</h2>
        <input type="password" placeholder="新規パスワード" v-model="newPasssword" required>
        <button @click="updatePassword()">更新する</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isResetedPassword: false,
      confirmationCode: '',
      newPasssword: '',
      message: ''
    }
  },
  methods: {
    resetPass() {
      const result = this.$cognito.resetPassword()
      if ( result ) {
        this.isResetedPassword = true
        this.message = "登録されたメールアドレスに、確認コードを送信しました。"
      } else {
        this.message = "エラーが発生しました"
      }
    },
    updatePassword (){
      const result = this.$cognito.updatePassword(this.newPassword, this.confirmationCode)
      if ( result ) {
        this.message = "パスワードを更新しました"
      } else {
        this.message = "エラーが発生しました"
      }
    }
  }
}
</script>