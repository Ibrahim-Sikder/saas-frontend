/* eslint-disable no-unused-vars */
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [defaultEmail, setDefaultEmail] = useState("");
  const [defaultPassword, setDefaultPassword] = useState("");
  const navigate = useNavigate();
  const email = useRef();
  const password = useRef();

  const handleShowPassword = () => {
    setShowPassword((showPassword) => !showPassword);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    if (
      email.current.value === "trustautosolution@gmail.com" &&
      password.current.value === "trust@#Auto5033"
  ) {
      Cookies.set("tas-auth", "51RSM78du77QnlJy86LgWSEUpVM", { expires: 7 });
      navigate("/dashboard");
      toast.success("Login Successfully");
    } else {
      toast.error("Invalid Email &  Password");
    }
  };

  const handleRowClick = (emailValue, passwordValue) => {
    email.current.value = emailValue;
    password.current.value = passwordValue;
    handleLogin({
      preventDefault: () => {},
    });
  };

  return (
    <div className="loginWrap">
      <div
        className="py-5  min-h-screen flex items-center 
      "
      >
        <div className="loginFormWraps">
          <h2 className="text-lg sm:text-2xl md:text-4xl capitalize mb-8 font-bold text-white text-center">
            Welcome to T.A.S !
          </h2>
          <div className="signUnWrap">
            <form onSubmit={handleLogin}>
              <div className="signupFormWrap">
                <div className="singleSignupForm">
                  <label>Email </label>
                  <input
                    ref={email}
                    name="email"
                    placeholder="Email"
                    type="email"
                    className="inputFiel"
                    autoComplete="off"
                  />
                </div>
                <div className="singleSignupForm passwordWrap">
                  <label>Password</label>
                  <input
                    ref={password}
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="inputFiel"
                    autoComplete="off"
                  />
                  <div onClick={handleShowPassword} className="showIconWrap">
                    {showPassword ? (
                      <FaEye className="showPassIcon" />
                    ) : (
                      <FaEyeSlash className="showPassIcon" />
                    )}
                  </div>
                </div>
                <div className="singleSignupForm">
                  <button type="submit">Login</button>
                </div>
              </div>
            </form>
            <table className="loginTable mt-3 hidden ">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  onClick={() => handleRowClick("trust@gmail.com", "trust123")}
                >
                  <td>
                    <span>trustautosolution@gmail.com</span>
                  </td>
                  <td>
                    <span>trust@#Auto33</span>
                  </td>
                  <td>
                    <span>Admin</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
