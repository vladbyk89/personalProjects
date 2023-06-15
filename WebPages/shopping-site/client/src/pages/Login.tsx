import { FormEvent, useState } from "react";
import "../styles/Login.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type UserInfo = {
  email: string;
  password: string;
};

const initUserInfo: UserInfo = { email: "", password: "" };
const Login = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>(initUserInfo);

  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    const { data } = await axios.post("api/v1/users/confirmUser", userInfo);

    if (data) navigate(`/profile`);
  };

  return (
    <div className="loginPage">
      <form onSubmit={handleLogin}>
        <h1>Welcome back</h1>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            id="email"
            placeholder="Your email address"
            onChange={(e) =>
              setUserInfo((prev) => {
                prev.email = e.target.value;
                return prev;
              })
            }
          />
        </label>
        <label htmlFor="password">
          password:
          <input
            type="text"
            id="password"
            placeholder="Password"
            onChange={(e) =>
              setUserInfo((prev) => {
                prev.password = e.target.value;
                return prev;
              })
            }
          />
        </label>
        <button type="submit" className="button-5">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
