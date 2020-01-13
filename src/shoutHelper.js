import axios from 'axios'
import cognito from './cognito'

const shoutCreateUrl = "https://jwhulxr6g0.execute-api.ap-northeast-1.amazonaws.com/dev/shout/create"

export default class shoutHelper {
  syncCreateShout(text) {
    const user = cognito.getUserInfo()
    const data = { "textMessage": text }
    axios.post(shoutCreateUrl, data, {
      headers: {
        Authorization: user["AccessToken"]
    }}
    ).then( response => {
      response
    });
  }
}
