import { useAuth } from "@/contexts";
import { useState } from "react";

const Login = () => {
  const { handleGoogleSignIn, handleGithubSignIn, handleEmailSignUp } =
    useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    handleEmailSignUp(email, password);
  }

  return (
    <div className="flex justify-center items-center h-svh">
      <form
        className="flex flex-col gap-2 p-8 bg-gray-200"
        onSubmit={handleSubmit}
      >
        <label>Email:</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="bg-orange-400 mt-3">
          Login
        </button>
        <button onClick={handleGoogleSignIn} className="bg-blue-400">
          Sign in with Google
        </button>
        <button onClick={handleGithubSignIn} className="bg-gray-400">
          Sign in with Github
        </button>
      </form>
    </div>
  );
};

export default Login;
