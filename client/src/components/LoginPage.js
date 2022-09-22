import { useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

function LoginPage({ onLogin }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div>
      {showLogin ? (
        <>
          <LoginForm onLogin={onLogin} />
          <br />
          <p>
            Don't have an account? &nbsp;
            <button onClick={() => setShowLogin(false)}>Sign Up</button>
          </p>
        </>
      ) : (
        <>
          <SignUpForm onLogin={onLogin} />
          <p>
            Already have an account? &nbsp;
            <button onClick={() => setShowLogin(true)}>Log In</button>
          </p>
        </>
      )}
    </div>
  );
}

export default LoginPage;
