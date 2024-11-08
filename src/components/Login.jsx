import { auth } from "../services/firebase.config.js";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Login = () => {
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user;
        console.log("signin successful");
        console.log(user.displayName, user.email);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.error(
          "Error signing in with Google",
          errorCode,
          errorMessage,
          email,
          credential,
        );
      });
  };
  return (
    <>
      <button onClick={handleGoogleSignIn}>Sign in with Google</button>
    </>
  );
};

export default Login;
