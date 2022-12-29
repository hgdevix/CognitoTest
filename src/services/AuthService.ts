import { Auth } from "aws-amplify";

export const login = async (username, password) => {
    try {
        const user = await Auth.signIn(username, password);
        return user
      } catch (error) {
        console.log('error logging in', error);
        return error
      }
}

export const getJWTToken = async () => {
  try {
    let currentSession = await Auth.currentSession()
    console.log(currentSession)
    return currentSession.getAccessToken().getJwtToken()
  } catch (err) {
    console.log(`Error getting JWT Token ${err}`)
    return undefined
  }
}

export const isLoggedIn = async () => {
  try {
    await Auth.currentAuthenticatedUser();
    return true;
  }  catch {
    return false;
  }
}

export const completeNewPass = async(user, newPass) => {
  try {
    return await Auth.completeNewPassword(user,newPass)
  } catch (err) {
    console.log(err)
    return undefined
  }
}

export const signOut = async() => {
  try {
    await Auth.signOut()
    return true
  } catch (err) {
    console.log(err)
    return false
  }
}

export const signUp = async(username, email, password) => {
  // eslint-disable-next-line no-lone-blocks
  {
      try {
          const { user } = await Auth.signUp({
              username,
              password,
              attributes: {
                  email,          // optional
              },
              autoSignIn: { // optional - enables auto sign in after user is confirmed
                  enabled: true,
              }
          });
          console.log(user);
      } catch (error) {
          console.log('error signing up:', error);
      }
  }
}