import { createContext, useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  fetchSignInMethodsForEmail,
  linkWithCredential,
} from "firebase/auth";
import { auth } from "../services/firebase.config.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [pendingCred, setPendingCred] = useState(null);
  const [pendingEmail, setPendingEmail] = useState(null);

  // Add listener for the onAuthStateChanged event
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsLoggedIn(!!user);
      setIsLoading(false);
    });
    return unsubscribe;
  }, []);

  const handleAccountLinking = async (user) => {
    if (pendingCred && user.email === pendingEmail) {
      try {
        await linkWithCredential(user, pendingCred);
        console.log("Successfully linked accounts");

        // clear pending credentials after successful linking
        setPendingCred(null);
        setPendingEmail(null);
      } catch (error) {
        console.error("Error linking accounts:", error);
        throw error;
      }
    }
    return false;
  };

  const handleEmailSignUp = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      setCurrentUser(userCredential.user);
      setIsLoggedIn(true);
      await handleAccountLinking(userCredential.user);
    } catch (error) {
      console.error("Error signing up with email and password", error);
      console.error("code:", error.code);
      console.error("message:", error.message);
      if (error.code === "auth/email-already-in-use") {
        handleEmailSignIn(email, password);
      }
      throw error;
    }
  };

  const handleEmailSignIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      setCurrentUser(userCredential.user);
      setIsLoggedIn(true);
      await handleAccountLinking(userCredential.user);
    } catch (error) {
      console.error("Error signing up with email and password", error);
      throw error;
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const googleProvider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, googleProvider);
      setCurrentUser(result.user);
      console.log(result.user);
      console.log(Object.keys(result.user));
      console.log(result.user.photoURL);
      setIsLoggedIn(true);

      async function storeProfilePhoto(user) {
        const photoUrl = user.photoURL;
        const response = await fetch(photoUrl);
        const photoDataUrl = await response.blob().then((blob) => {
          return URL.createObjectURL(blob);
        });
        localStorage.setItem(`profile-photo-${user.email}`, photoDataUrl);
      }
      await storeProfilePhoto(result.user);

      await handleAccountLinking(result.user);
    } catch (error) {
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.error(
        "Error signing in with Google",
        errorCode,
        errorMessage,
        email,
        credential,
      );
    }
  };

  const handleGithubSignIn = async () => {
    const provider = new GithubAuthProvider();
    try {
      let result = await signInWithPopup(auth, provider);
      setCurrentUser(result.user);
      setIsLoggedIn(true);
      console.log(result.user);

      // Clear pending cred on successful signin
      setPendingCred(null);
      setPendingEmail(null);
    } catch (error) {
      if (error.code === "auth/account-exists-with-different-credential") {
        // save pending credential
        const pendingCred = error.credential;
        const email = error.customData.email;

        // get existing providers
        const providers = await fetchSignInMethodsForEmail(auth, email);

        setPendingCred(pendingCred);
        setPendingEmail(email);

        throw {
          code: "auth/account-exists-with-different-credential",
          email,
          providers,
          message: `An account already exists with this email. Please sign in with ${providers[0]}.`,
        };
      }
      console.error(
        "Error signing in with Github",
        error.code,
        error.message,
        error.customData?.email,
        GithubAuthProvider.credentialFromError(error),
      );
      throw error;
    }
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setIsLoggedIn(false);
        setCurrentUser(null);
      })
      .catch((error) => {
        // An error happened.
        console.error("Error in signing out", error);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isLoggedIn,
        isLoading,
        handleEmailSignUp,
        handleEmailSignIn,
        handleGoogleSignIn,
        handleGithubSignIn,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
