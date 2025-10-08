import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import ScrollToTop from "./Components/ScrollToTop";
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
import WhyChoose from "./Components/WhyChoose/WhyChoose";
import SearchResultsPage from "./Components/SearchPost/SearchResultsPage";


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
        <Route path="/post/:id" element={<PostPage/>} />
        <Route path="/search" element={<SearchResultsPage/>} />

        {/* About Page */}
        <Route path="/about" element={<About/>} /> 
      </Routes>
    </Router>
  );
}

export default App;