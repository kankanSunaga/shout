<template>
  <div>
    <div>
      <input type="text" placeholder="ニックネーム" v-model="userName" @blur="notBlankName()" >
    </div>
    <div>
      <input type="text" placeholder="メールアドレス" v-model="userId" @blur="validEmailformat()">
    </div>
    <div>
      <input type="password" placeholder="パスワード" v-model="password" @blur="validPasswordformat()">
    </div>
    <div>
      <input type="password" placeholder="パスワード確認" v-model="conformPassword" @blur="samePassword()">
    </div>
    <div>{{nameMessage}}</div>
    <div>{{emailMessage}}</div>
    <div>{{passwordMessage}}</div>
    <div>{{conformPasswordMessage}}</div>
    <div>{{AlertMessage}}</div>
    <div>
      <button v-bind:disabled="disabledButton" @click="CreateUser()">ログイン</button>
    </div>
  </div>
</template>

<script>
  export default{
    data () {
      return { 
        userName: '',
        email: '',
        password: '',
        conformPassword: '',
        nameMessage: '',
        emailMessage: '',
        passwordMessage: '',
        conformPasswordMessage: '',
        // alertMessage: '',
        nameStatus: false,
        emailStatus: false,
        passwordStats: false,
        conformPasswordStats: false,
        disabledButton: false //正規表現でメールアドレスがいい感じになったらなおす
      }
    },
    methods: {
      CreateUser () {
        alert(this)
      },
      checkValidStatus() {
        if (this.nameStatus && this.emailStatus && this.passwordStats && this.conformPasswordStats){
          self.disabledButton = false
        }
      },
      notBlankName() {
        if (this.userName === '' || this.userName === null ){
          this.nameMessage = 'ニックネームを入力してください'
        }else{
          this.nameMessage = 'ニックネームOK!'
          this.nameStatus = true
          this.checkValidStatus()
        }
      },
      validEmailformat() {
        const emailPatarn =  /^\w+([-+.]\w+)*@\.\w+([-.]\w+)*$/
        if (this.email.match(emailPatarn) === null) {
          this.emailMessage = '正しいメールアドレスを入力してください' 
        }else{
          this.emailMessage = 'メールアドレスOK!'
          this.emailStatus = true
          this.checkValidStatus()
        }
      },
      validPasswordformat() {
        const passwordPatarn = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d]{8,100}$/
        if ( this.password.match(passwordPatarn) === null) {
          this.passwordMessage = '半角英小文字大文字数字をそれぞれ1種類以上含む8文字以上100文字以下のパスワードにしてください'
        } else {
          this.passwordMessage = 'パスワードOK!'
          this.passwordStatus = true
          this.checkValidStatus()
        }
        this.samePassword
      },
      samePassword() {
        if (this.password === this.conformPassword){
          this.conformPasswordStats = true
          this.conformPasswordMessage = 'パスワード、パスワード確認OK!'
          this.checkValidStatus()
        } else {
          this.conformPasswordMessage = 'パスワードと確認パスワードが違います'
        }
      }
    }
  }
</script>

<style>
</style>