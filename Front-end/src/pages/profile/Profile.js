import { useEffect, useState } from "react";
import "./Profile.css";
import Login from "../login/Login";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import axios from "axios";

export default function Profile() {
  const [profileUpdate, setProfileUpdate] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [profileUrl, setProfileUrl] = useState(null);

  const user = localStorage.getItem("token");

  useEffect(() => {
    axios
      .post("http://localhost:8080/profileLoader", { ID: user })
      .then((response) => {
        setProfileData(response.data);
        setId(response.data?.profile?.refID || "");
        setName(response.data?.profile?.Name || "");
        setGender(response.data?.profile?.Gender || "");
      })
      .catch((error) => {
        console.error(error);
      });
  }, [profileUpdate]);

  const handleProfilData = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("profileImg", profileUrl);
    formData.append("name", name);
    formData.append("id", id);
    formData.append("gender", gender);

    axios
      .post("http://localhost:8080/profileDataSave", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((success) => {
        alert(success.data.msg);
        setProfileUpdate(!profileUpdate);
      })
      .catch((error) => {
        console.error(error.response?.data?.msg || error.message);
      });
  };

  return (
    <>
      <Navbar />
      {user ? (
        <div className="settings container">
          <div className="settingsWrapper">
            <div className="settingsTitle">
              <span className="settingsTitleUpdate">Update Your Account</span>
              <span className="settingsTitleDelete">Delete Account</span>
            </div>
            <form className="settingsForm" onSubmit={handleProfilData}>
              <label>Profile Picture</label>
              <div className="settingsPP">
                <img
                  src={
                    profileData?.profile?.profileImg ||
                    "/Images/illustration/men vector profile.jpg"
                  }
                  alt="profile"
                />
                <label htmlFor="fileInput">
                  <i className="settingsPPIcon far fa-user-circle"></i>{" "}
                </label>
                <input
                  id="fileInput"
                  type="file"
                  style={{ display: "none" }}
                  onChange={(e) => setProfileUrl(e.target.files[0])}
                />
              </div>
              <label>Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label>Email</label>
              <input
                type="email"
                placeholder="Email"
                value={profileData?.email || ""}
                readOnly
              />
              <label>Gender</label>
              <input
                type="text"
                placeholder="Enter your gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />
              <button className="settingsSubmitButton" type="submit">
                Update
              </button>
            </form>
          </div>
        </div>
      ) : (
        <Login />
      )}
      <Footer />
    </>
  );
}
