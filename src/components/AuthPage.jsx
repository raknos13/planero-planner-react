import { useState } from "react";
import { useAuth, useTheme } from "@/contexts";
import { FcGoogle } from "react-icons/fc";
import { ToastContainer } from "react-toastify";

const AuthPage = ({ login = true }) => {
  const [isLogin, setIsLogin] = useState(login);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleEmailSignUp, handleGoogleSignIn } = useAuth();
  const { theme } = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEmailSignUp(email, password);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    // Reset form fields when switching modes
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-primary px-4 py-12 sm:px-6 lg:px-8">
      <ToastContainer position="top-right" theme={theme} />
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-text-primary">
            {isLogin ? "Log in to your account" : "Create your account"}
          </h2>
          <p className="mt-2 text-center text-sm text-text-primary">
            {isLogin ? "Or " : "Already have an account? "}
            <button
              type="button"
              className="font-medium text-accent hover:text-accent-hover"
              onClick={toggleMode}
            >
              {isLogin ? "create a new account" : "Log in"}
            </button>
          </p>
        </div>

        <div className="mt-8 bg-bg-card p-6 shadow sm:rounded-lg">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-text-primary">
                  Full name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-2 block w-full cursor-not-allowed rounded-md bg-secondary p-2 text-text-primary"
                  required={!isLogin}
                  disabled
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-text-primary">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 block w-full cursor-not-allowed rounded-md bg-secondary p-2 text-text-primary"
                required
                disabled
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-text-primary">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete={isLogin ? "current-password" : "new-password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 block w-full cursor-not-allowed rounded-md bg-secondary p-2 text-text-primary"
                required
                disabled
              />
            </div>

            {isLogin && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-border text-accent focus:ring-accent"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-text-primary"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a
                    href="/forgot-password"
                    className="font-medium text-accent hover:text-accent-hover"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-accent px-4 py-2 text-primary hover:bg-accent-hover"
              >
                {isLogin ? "Sign in" : "Create account"}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-bg-card px-2 text-text-primary">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-4 flex gap-3">
              <button
                type="button"
                className="flex w-full items-center justify-center rounded-lg border border-border bg-primary px-4 py-2 text-text-primary hover:bg-secondary"
                onClick={handleGoogleSignIn}
              >
                <FcGoogle className="mr-2" />
                {isLogin ? "Log in " : "Sign in "}
                with Google
              </button>
              {/* <button
            type="button"
            className="flex w-full items-center justify-center rounded-md border border-border bg-bg-card py-2 px-4 text-text-primary hover:bg-bg-card-hover"
            onClick={handleGithubSignIn}
          >
            GitHub
          </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
