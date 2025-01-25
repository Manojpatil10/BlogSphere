import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar"
import Footer from "../../components/footer/Footer";
import "./login.css";
import { useRef } from "react";
import axios from "axios";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    axios.post("http://localhost:8080/login", {
      email: email.current.value,
      password: password.current.value,

    }).then((success) => {
      console.log('this is success', success);
      if (success) {
        localStorage.setItem("token", success.data.token);
        navigate('/')
      }
    }).catch((error) => {
      alert('User not found, please register!');
    })
  }

  return (
    <>
      <Navbar/>
      <div className="login">
        <span className="loginTitle">Login</span>
        <form className="loginForm" onSubmit={handleLogin}>
          <label>Email</label>
          <input
            className="loginInput"
            type="email"
            ref={email}
            placeholder="Enter your email..."
          />
          <label>Password</label>
          <input
            className="loginInput"
            type="password"
            ref={password}
            placeholder="Enter your password..."
          />
          <button className="loginButton" type="submit">
            Login
          </button>
        </form>
        <Link to='/register' className="loginRegisterButton">
          Register
        </Link>
      </div>
      <Footer/>
    </>
  );
}
