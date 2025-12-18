import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./Components/ScrollToTop";
import About from "./Components/About/About";
import Navbar from "./Components/Navbar/Navbar";
import HeroSection from "./Components/HeroSection/HeroSection";
import LandingPage from "./Components/LandingPage/LandingPage";
import NexCodeNova from "./Components/NexCodeNova/NexCodeNova";
import Categories from "./Components/Categories/Categories";
import FeaturedProducts from "./Components/FeaturedProducts/FeaturedProducts";
import Footer from "./Components/Footer/Footer";
import PageImage from "./Components/NexCodeNova/PageImage";
import CategoryPage from "./Components/Categories/CategoryPage";
import WhyChoose from "./Components/WhyChoose/WhyChoose";
import SearchResultsPage from "./Components/SearchPost/SearchResultsPage";
import PrivacyPolicy from "./Components/PrivacyPolicy/PrivacyPolicy";
import AboutUs from "./Components/AboutUs/AboutUs";
import ContactUs from "./Components/ContactUs/ContactUs";
import BlogsPage from "./Components/Blogs/BlogsPage";
import Newsletter from "./Components/Newsletter/Newsletter";
import PostPage from "./Components/PostPage/PostPage";


function App() {
  return (
    <Router>
      <Navbar/>
      <ScrollToTop/>
      <Routes>
        {/*  Home Page */}
        <Route
          path="/"
          element={
            <>
              <HeroSection/>
              <WhyChoose/>
              <Categories/>
              <FeaturedProducts/>
              <PageImage/>
              <NexCodeNova/>
              <Footer/>
            </>
          }
        />

        <Route path="/category/:slug" element={<CategoryPage/>} />
        
        <Route path="/search" element={<SearchResultsPage/>} />
        <Route path="/blogs" element={<BlogsPage/>} />
        <Route path="/post/:id" element={<PostPage/>} />

        {/* Landing Page Route */}
        <Route path="/lp/:slug" element={<LandingPage/>} />

        {/* About Page page  */}
        <Route path="/about" element={<About/>} />

        {/* Legal & Info Pages */}
        <Route path="/privacy-policy" element={<PrivacyPolicy/>} />
        <Route path="/about-us" element={<AboutUs/>} />
        <Route path="/contact" element={<ContactUs/>} />
        <Route path="/newsletter" element={<Newsletter/>} />
      </Routes>
    </Router>
  );
}

export default App;