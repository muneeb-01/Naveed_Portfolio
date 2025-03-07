import React, { useState } from "react";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
const FormDisplay = () => {
  const [isSignUp, setIsSignUp] = useState(true);

  return (
    <div className="flex justify-center items-center h-screen w-full">
      {isSignUp ? (
        <Login handleIsSignup={setIsSignUp} />
      ) : (
        <Signup handleIsSignup={setIsSignUp} />
      )}
    </div>
  );
};

export default FormDisplay;
