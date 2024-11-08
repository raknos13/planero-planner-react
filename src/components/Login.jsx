import { auth } from "../services/firebase.config.js";
import {
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth/web-extension";

const Login = () => {
  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };
  return (
    <>
      <button onClick={handleGoogleSignIn}>Sign in with Google</button>
    </>
  );
};
