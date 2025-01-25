import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar"
import Footer from "../../components/footer/Footer";
import "./register.css";
import { useRef } from "react";
import axios from "axios";


function Register() {
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate()

  const handleRegistration = (e) => {
    e.preventDefault();

    axios.post('http://localhost:8080/register', {
      email: email.current.value,
      password: password.current.value,

    }).then((success) => {
      // console.log(success)
      alert(success.data.msg);
      navigate('/login');
    }).catch((error) => {
      console.log(error)
      alert(error.response.data.msg);
    })
  }

  return (
    <>
      <Navbar />
      <div className="register">
        <span className="registerTitle">Register</span>
        <form onSubmit={handleRegistration} className="registerForm">
          <label>Email</label>
          <input
            className="registerInput"
            type="email"
            ref={email}
            placeholder="Enter your email..."
          />
          <label>Password</label>
          <input
            className="registerInput"
            type="password"
            ref={password}
            placeholder="Enter your password..."
          />
          <button type="submit" className="registerButton">
            Register
          </button>
        </form>
        <Link to='/login' className="registerLoginButton">Login</Link>
      </div>
      <Footer />
    </>
  );
}

export default Register;
