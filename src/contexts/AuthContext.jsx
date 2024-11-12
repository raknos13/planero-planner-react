import { createContext, useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../services/firebase.config.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Add listener for the onAuthStateChanged event
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsLoggedIn(!!user);
      setIsLoading(false);
    });
    return unsubscribe;
  }, []);

  const handleEmailSignUp = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      setCurrentUser(userCredential.user);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Error signing up with email and password", error);
      console.error("code:", error.code);
      console.error("message:", error.message);
      if (error.code === "auth/email-already-in-use") {
        handleEmailSignIn(email, password);
      }
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
    } catch (error) {
      console.error("Error signing up with email and password", error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const googleProvider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, googleProvider);
      setCurrentUser(result.user);
      setIsLoggedIn(true);
    } catch (error) {
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
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
