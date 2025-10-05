import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import ScrollToTop from "react-scroll-to-top";
import About from "./Components/About/About";
import Navbar from "./Components/Navbar/Navbar";
import HeroSection from "./Components/HeroSection/HeroSection";
import NexCodeNova from "./Components/NexCodeNova/NexCodeNova";
import Categories from "./Components/Categories/Categories";
import FeaturedProducts from "./Components/FeaturedProducts/FeaturedProducts";
import Footer from "./Components/Footer/Footer";
import PageImage from "./Components/NexCodeNova/PageImage";
import CategoryPage from "./Components/Categories/CategoryPage";
import PostPage from "./Components/Categories/PostPage";


function App() {
  return (
    <Router>
      <Navbar/>
      <ScrollToTop/>
      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <>
              <HeroSection/>
              <NexCodeNova/>
              <Categories/>
              <FeaturedProducts/>
              <PageImage/>
              <NexCodeNova/>
              <Footer/>
            </>
          }
        />
         
        <Route path="/category/:slug" element={<CategoryPage/>} />
        <Route path="/post/:id" element={<PostPage/>} />
        {/* About Page */}
        <Route path="/about" element={<About/>} /> 
      </Routes>
    </Router>
  );
}

export default App;