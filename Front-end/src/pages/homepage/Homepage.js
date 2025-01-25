import { useLocation } from "react-router";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Navbar from "../../components/navbar/Navbar"
import Footer from "../../components/footer/Footer";
import "./homepage.css";
import Category from "../../components/categories/Categories";

export default function Homepage() {
  const location = useLocation();
  console.log(location);
  return (
    <>
      <div>
        <Navbar/>
        <Header />
        <div className="container">
          <Category/>
          <Posts />
        </div>
        <Footer />
      </div>
    </>
  );
}
