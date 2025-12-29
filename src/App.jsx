import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import ScrollToTop from "./Components/ScrollToTop";
import Navbar from "./Components/Navbar/Navbar";
import { initGA, trackPageView } from "./utils/analytics";
import HeroSection from "./Components/HeroSection/HeroSection";
import LandingPage from "./Components/LandingPage/LandingPage";
import NexCodeNova from "./Components/NexCodeNova/NexCodeNova";
import Categories from "./Components/Categories/Categories";
import FeaturedProducts from "./Components/FeaturedProducts/FeaturedProducts";
import Footer from "./Components/Footer/Footer";
import CategoryPage from "./Components/Categories/CategoryPage";
import WhyChoose from "./Components/WhyChoose/WhyChoose";
import SearchResultsPage from "./Components/SearchPost/SearchResultsPage";
import PrivacyPolicy from "./Components/PrivacyPolicy/PrivacyPolicy";
import AboutUs from "./Components/AboutUs/AboutUs";
import ContactUs from "./Components/ContactUs/ContactUs";
import BlogsPage from "./Components/Blogs/BlogsPage";
import Newsletter from "./Components/Newsletter/Newsletter";
import NewsletterThankYou from "./Components/Newsletter/NewsletterThankYou";
import NewsletterPopup from "./Components/Newsletter/NewsletterPopup";
import PostPage from "./Components/PostPage/PostPage";
import Career from "./Components/Career/Career";
import JobDetail from "./Components/Career/JobDetail";
import HealthLandingPage from "./Components/CategoryLandingPages/HealthLandingPage";
import FinanceLandingPage from "./Components/CategoryLandingPages/FinanceLandingPage";
import TechnologyLandingPage from "./Components/CategoryLandingPages/TechnologyLandingPage";
import MarketingLandingPage from "./Components/CategoryLandingPages/MarketingLandingPage";
import EducationLandingPage from "./Components/CategoryLandingPages/EducationLandingPage";
import LifestyleLandingPage from "./Components/CategoryLandingPages/LifestyleLandingPage";

// Component to track page views
function PageTracker() {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);

  return null;
}

function App() {
  useEffect(() => {
    // Initialize Google Analytics on app mount
    initGA();
  }, []);

  return (
    <Router>
      <PageTracker />
      <NewsletterPopup />
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
         
              <NexCodeNova/>
              <Footer/>
            </>
          }
        />

        <Route path="/category/:slug" element={<CategoryPage/>} />

        {/* Category Landing Pages */}
        <Route path="/health" element={<><HealthLandingPage/><Footer/></>} />
        <Route path="/finance" element={<><FinanceLandingPage/><Footer/></>} />
        <Route path="/technology" element={<><TechnologyLandingPage/><Footer/></>} />
        <Route path="/marketing" element={<><MarketingLandingPage/><Footer/></>} />
        <Route path="/education" element={<><EducationLandingPage/><Footer/></>} />
        <Route path="/lifestyle" element={<><LifestyleLandingPage/><Footer/></>} />

        <Route path="/search" element={<SearchResultsPage/>} />
        <Route path="/blogs" element={<BlogsPage/>} />
        <Route path="/post/:id" element={<PostPage/>} />

        {/* Landing Page Route */}
        <Route path="/lp/:slug" element={<LandingPage/>} />

        {/* Legal & Info Pages */}
        <Route path="/about" element={<AboutUs/>} />
        <Route path="/about-us" element={<AboutUs/>} />
        <Route path="/privacy-policy" element={<PrivacyPolicy/>} />
        <Route path="/contact" element={<ContactUs/>} />
        <Route path="/newsletter" element={<Newsletter/>} />
        <Route path="/newsletter/thank-you" element={<NewsletterThankYou/>} />

        {/* Career Pages */}
        <Route path="/careers" element={<Career/>} />
        <Route path="/career/:id" element={<JobDetail/>} />
      </Routes>
    </Router>
  );
}

export default App;