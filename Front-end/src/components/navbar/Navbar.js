import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import axios from "axios";

export default function Topbar() {
  const [showSearch, setShowSearch] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isArrow, setIsArrow] = useState(true);
  const [profile, setProfile] = useState('')
  const user = localStorage.getItem('token');

  const navigate = useNavigate();

  const logout = () => {
    if (window.confirm("Are you sure to logout")) {
      localStorage.setItem("token", "");
      navigate("/");
    }
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  useEffect(()=>{
    if(user){
      axios.post('http://localhost:8080/navProfile',{ID:user}).then((success)=>{
        // console.log(success);
        setProfile(success.data.profileImg)
      }).catch((error)=>{
        console.log(error)
      })
    }
  })

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setIsArrow(!isArrow);
  };

  return (
    <nav className="nav">
      <div className="container">
        <div className="top">
          <div className="topLeft">
            <a href="/" className="logo">BlogSphere</a>
          </div>
          <div className="topCenter">
            <ul className="topList m-0">
              <li className="topListItem">
                <Link className="link" to="/">
                  HOME
                </Link>
              </li>
              <li className="topListItem">
                <Link className="link" to="/">
                  ABOUT
                </Link>
              </li>
              <li className="topListItem">
                <Link className="link" to="/contact">
                  CONTACT US
                </Link>
              </li>
              <li className="topListItem">
                <Link className="link" to="/blogs">
                  BLOGS
                </Link>
              </li>
            </ul>
          </div>
          <div className="topRight">
            <div className="searchContainer d-flex align-items-center">
              {showSearch && (
                <input
                  type="text"
                  className="searchInput me-2"
                  placeholder="Search..."
                />
              )}
              <i
                className="topSearchIcon fas fa-search"
                onClick={toggleSearch}
              ></i>
            </div>
            {user ? (
              <div className="userMenu">
                <img
                  className="topImg"
                  src={profile ? profile : '/Images/illustration/men vector profile.jpg'}
                  alt="User"
                  onClick={toggleDropdown} // Toggle dropdown when clicking on the profile image
                />
                <span className="userName" onClick={toggleDropdown}>
                  John Doe  {isArrow ? <i class="fa-solid fa-caret-down ms-2"></i> : <i class="fa-solid fa-caret-up ms-2"></i>}
                </span>
                {isDropdownOpen && (
                  <ul className="dropdown">
                    <li className="list-unstyled">
                      <Link className="dropdownLink" to="/profile">
                        <i className="fa-solid fa-user me-1"></i> PROFILE
                      </Link>
                    </li>
                    <li className="list-unstyled">
                      <Link className="dropdownLink" to="/addPost">
                        <i className="fa-solid fa-circle-plus me-1"></i> ADD POST
                      </Link>
                    </li>
                    <li className="list-unstyled">
                      <Link className="dropdownLink" to="/addPost">
                        <i class="fa-solid fa-image me-1"></i> MY POST
                      </Link>
                    </li>
                    <li className="list-unstyled">
                      <span className="dropdownLink" onClick={logout}>
                        <i className="fa-solid fa-right-from-bracket me-1"></i> LOGOUT
                      </span>
                    </li>
                  </ul>
                )}
              </div>
            ) : (
              <ul className="topList gap-2 m-0 align-items-center">
                <li className="topListItem">
                  <Link className="link" to="/login">
                    LOGIN
                  </Link>
                </li>
                <li className="separator">|</li>
                <li className="topListItem">
                  <Link className="link" to="/register">
                    REGISTER
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
