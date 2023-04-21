import { useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

function LoginPage({ onLogin }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="login-signup">
      {showLogin ? (
        <>
          <LoginForm onLogin={onLogin} />
          <br />
          <p className="login-page">
            Don't have an account? &nbsp;
            <button onClick={() => setShowLogin(false)}>Sign Up</button>
          </p>
        </>
      ) : (
        <>
          <SignUpForm onLogin={onLogin} />
          <p className="login-page">
            Already have an account? &nbsp;
            <button onClick={() => setShowLogin(true)}>Log In</button>
          </p>
        </>
      )}
    </div>
  );
}

export default LoginPage;
