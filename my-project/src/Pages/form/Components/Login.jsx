import React, { useState } from "react";
import { toast } from "react-toastify";
import { apiClient } from "../../../lib/api-client";
import { LOGIN_ROUTE } from "../../../utils/constants";
import { useAppStore } from "../../../Store/index";
const Login = ({ handleIsSignup }) => {
  const { userInfo, setUserInfo } = useAppStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isValid = () => {
    if (email.length == 0) {
      toast.error("Enter email to proceed.");
      return false;
    }
    if (password.length == 0) {
      toast.error("Enter password to proceed.");
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (isValid()) {
      try {
        const responce = await apiClient.post(
          LOGIN_ROUTE,
          { email, password },
          { withCredentials: true }
        );
        if (responce.status === 202) {
          toast.error(responce.data);
        } else if (responce.status === 200) {
          setUserInfo(responce.data.user);
          toast.success("Login successfully.");
        }
      } catch (error) {
        toast.info("somthing went wrong.");
      }
    }
  };

  return (
    <div className="overflow-hidden bg-white rounded-md shadow-lg lg:w-[30%]">
      <div className="p-5 bg-white md:flex-1">
        <h3 className="my-4 text-2xl font-semibold text-gray-700 text-center font-Gilgan">
          Log In
        </h3>
        <form
          onSubmit={handleLogin}
          className="flex flex-col space-y-4 font-poppins text-sm"
        >
          <div className="flex flex-col space-y-1">
            <label
              htmlFor="email"
              className="text-sm font-semibold text-gray-500"
            >
              Email address
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              autoFocus
              className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-sm font-semibold text-gray-500"
              >
                Password
              </label>
            </div>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
            >
              Log In
            </button>
          </div>
          <a
            onClick={() => handleIsSignup(false)}
            className="py-2 cursor-pointer text-sm text-gray-500"
          >
            Dont have an accout?
            <span className="text-blue-500 underline pl-1">Sign up</span>?
          </a>
        </form>
      </div>
    </div>
  );
};

export default Login;
