import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
  CognitoUserAttribute
} from 'amazon-cognito-identity-js'
import {
  Config,
  CognitoIdentityCredentials
} from 'aws-sdk'


export default class Cognito {
  configure(config) {
    if (config.userPool) {
      this.userPool = config.userPool
    } else {
      this.userPool = new CognitoUserPool({
        UserPoolId: config.UserPoolId,
        ClientId: config.ClientId
      })
    }
    Config.region = config.region
    Config.credentials = new CognitoIdentityCredentials({
      IdentityPoolId: config.IdentityPoolId
    })
    this.options = config
  }

  static install = (Vue, options) => {
    Object.defineProperty(Vue.prototype, '$cognito', {
      get() {
        return this.$root._cognito
      }
    })

    Vue.mixin({
      beforeCreate() {
        if (this.$options.cognito) {
          this._cognito = this.$options.cognito
          this._cognito.configure(options)
        }
      }
    })
  }

  signUp(username, password) {
    const dataEmail = {
      Name: 'email',
      Value: username
    }
    const attributeList = []
    attributeList.push(new CognitoUserAttribute(dataEmail))
    return new Promise((resolve, reject) => {
      this.userPool.signUp(username, password, attributeList, null, (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }

  confirmation(username, confirmationCode) {
    const userData = {
      Username: username,
      Pool: this.userPool
    }
    const cognitoUser = new CognitoUser(userData)
    return new Promise((resolve, reject) => {
      cognitoUser.confirmRegistration(confirmationCode, true, (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }

  /**
   * username, passwordでログイン
   */
  login(username, password) {
    const userData = {
      Username: username,
      Pool: this.userPool
    }
    const cognitoUser = new CognitoUser(userData)
    const authenticationData = {
      Username: username,
      Password: password
    }
    const authenticationDetails = new AuthenticationDetails(authenticationData)
    return new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          console.log(result)
          resolve(result)
        },
        onFailure: (err) => {
          reject(err)
        }
      })
    })
  }

  logout() {
    this.userPool.getCurrentUser().signOut()
  }

  isAuthenticated() {
    const cognitoUser = this.userPool.getCurrentUser()
    if (cognitoUser === null) {
      return false
    } else {
      cognitoUser.getSession()
    }
  }

  getUserInfo (){
    const cognitoUser = this.userPool.getCurrentUser()
    cognitoUser.getUserAttributes(function (err, result) {
      if (err) {
        console.log(err)
      } else {
        console.log( result)
      }
    })
  }

  getJwtToken() {
    const user = this.userPool.getCurrentUser()
    const token = user.getSession((err, session) => {
      if (err) {
        console.log(err);
      } else {
        return session
      }
    });
    return token
  }

  resetPassword() {
    const user = this.userPool.getCurrentUser()
    user.forgotPassword({
      onSuccess: (data) => {
        console.log("this is succsess data")
        console.log(data);
      },
      onFailure: (err) => {
        console.log("this is error data")
        console.log(err);
      },
      inputVerificationCode: (data) => {
        console.log(data)
        const verificationCode = prompt('検証コードを入力してください ', '');
        const newPassword = prompt('新しいパスワードを入力してください ', '');
        user.confirmPassword(verificationCode, newPassword, {
          onSuccess: () => {
            console.log('Password confirmed!');
            
          },
          onFailure: (err) => {
            console.log(err);
          }
        });
      }
    })
  }
}