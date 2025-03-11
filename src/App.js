import React, { useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";

function App() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div>
      {isLogin ? <Login toggleForm={() => setIsLogin(false)} /> : <SignUp toggleForm={() => setIsLogin(true)} />}
    </div>
  );
}

export default App;
