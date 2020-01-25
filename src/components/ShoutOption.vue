<template>
  <div>
    <div v-if="!editFlag"> 
      <button v-on:click="reverseEditFlag()">編集</button>
      <button v-on:click="DeleteShout()">削除</button>
    </div>
    <div v-if="editFlag">
      <textarea v-model="shout"></textarea>
      <button v-on:click="updateMessage()">変更</button>
      <button v-on:click="reverseEditFlag()">中止</button>
    </div>
  </div>
</template>
<script>
import cognito from '../cognito'
import axios from "axios"
export default {

  props: ['message', 'time'],
  data() {
    return {
      editFlag: false,
      shout: this.message,
      createTime: this.time
    }
  },
  methods: {
    reverseEditFlag(){
      this.editFlag = !this.editFlag
    },
    updateMessage() {
      const shoutCreateUrl = "https://jwhulxr6g0.execute-api.ap-northeast-1.amazonaws.com/dev/shout/edit"
      const user = cognito.userPool.getCurrentUser()
      const jwtToken = user.getSession(function(err, session) {
        if (err) {
          console.log(err);
        } else {
          return session["idToken"]["jwtToken"]
          }
      });
      const data = { "textMessage": this.shout, "user_name": user["username"], "createTime": this.createTime }

      axios.post(shoutCreateUrl, 
        data,
        {
          headers: {'Authorization': jwtToken }
        }
      ).then(response => {
        console.log(response)
        // console.log(dynamoHash)
        return response["body"]
      }).catch(error => {
        console.log(error);
        return error
      });

    },
    DeleteShout (){
      const shoutCreateUrl = "https://jwhulxr6g0.execute-api.ap-northeast-1.amazonaws.com/dev/shout/delete "
      const user = cognito.userPool.getCurrentUser()
      const jwtToken = user.getSession(function(err, session) {
        if (err) {
          console.log(err);
        } else {
          return session["idToken"]["jwtToken"]
          }
      });
      const data = {"user_id": user["username"], "create_time": this.createTime }

      axios.post(shoutCreateUrl, 
        data,
        {
          headers: {'Authorization': jwtToken }
        },
      ).then(response => {
        console.log(response)
        // console.log(dynamoHash)
        return response["body"]
      }).catch(error => {
        console.log(error);
        return error
      });
    }
  }

}
</script>