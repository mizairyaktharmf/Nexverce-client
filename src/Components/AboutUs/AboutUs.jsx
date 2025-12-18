import React from 'react';
import { ShoppingBag, BookOpen, TrendingUp, Users, Sparkles, Shield, Lightbulb, Globe, Mail, Linkedin, Instagram, Facebook } from 'lucide-react';
import Footer from '../Footer/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';

function AboutUs() {
  const whatWeDoItems = [
    {
      icon: ShoppingBag,
      title: "Explore Products",
      description: "Discover the latest products across categories like technology, health, beauty, finance, and more."
    },
    {
      icon: BookOpen,
      title: "Read & Learn",
      description: "Access in-depth articles, blogs, and guides written by industry experts to stay informed and inspired."
    },
    {
      icon: TrendingUp,
      title: "Grow Your Business",
      description: "Leverage our platform to showcase your offerings, connect with your audience, and expand your reach."
    },
    {
      icon: Users,
      title: "Connect & Collaborate",
      description: "Join a vibrant community of entrepreneurs, creators, and innovators shaping the future."
    }
  ];

  const values = [
    {
      icon: Sparkles,
      title: "Innovation",
      description: "We embrace new ideas and technologies to stay ahead of the curve."
    },
    {
      icon: Shield,
      title: "Trust",
      description: "We prioritize transparency, security, and user privacy in everything we do."
    },
    {
      icon: Lightbulb,
      title: "Excellence",
      description: "We strive for quality in every product, service, and piece of content we deliver."
    },
    {
      icon: Globe,
      title: "Community",
      description: "We believe in building meaningful connections and fostering collaboration."
    }
  ];

  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: "contact@nexverce.com",
      link: "mailto:contact@nexverce.com"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/company/nexverce",
      link: "https://www.linkedin.com/company/nexverce"
    },
    {
      icon: Instagram,
      label: "Instagram",
      value: "@nexverce",
      link: "https://www.instagram.com/nexverce"
    },
    {
      icon: Facebook,
      label: "Facebook",
      value: "facebook.com/nexverce",
      link: "https://www.facebook.com/nexverce"
    }
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-purple-50 via-white to-blue-50 py-20 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge variant="premium" className="mb-4">About Nexverce</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">About Nexverce</h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              Empowering Businesses with Innovative Digital Solutions
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">

          {/* Who We Are */}
          <section>
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-3xl">Who We Are</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Welcome to <strong className="text-primary">Nexverce</strong> – your trusted partner in digital innovation and e-commerce solutions. We are a forward-thinking platform dedicated to helping businesses and individuals discover, explore, and leverage cutting-edge products, services, and content across various industries.
                </p>
                <p>
                  Founded with a vision to bridge the gap between technology and accessibility, Nexverce provides a comprehensive ecosystem where innovation meets practicality. Whether you're looking for the latest tech gadgets, marketing tools, health solutions, or business services, we curate and showcase the best offerings to help you make informed decisions.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Our Mission */}
          <section>
            <Card className="shadow-lg border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="text-3xl">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-6">
                  Our mission is to <strong className="text-primary">empower businesses and consumers</strong> by providing a centralized platform that offers:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex gap-3 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-gray-200">
                    <div className="flex-shrink-0 w-2 h-2 mt-2 bg-primary rounded-full"></div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Curated Content</h3>
                      <p className="text-sm text-gray-700">High-quality articles, reviews, and insights across diverse categories</p>
                    </div>
                  </div>
                  <div className="flex gap-3 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-gray-200">
                    <div className="flex-shrink-0 w-2 h-2 mt-2 bg-primary rounded-full"></div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Product Discovery</h3>
                      <p className="text-sm text-gray-700">Innovative products and services tailored to your needs</p>
                    </div>
                  </div>
                  <div className="flex gap-3 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-gray-200">
                    <div className="flex-shrink-0 w-2 h-2 mt-2 bg-primary rounded-full"></div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Business Solutions</h3>
                      <p className="text-sm text-gray-700">Tools and resources to help businesses grow and thrive</p>
                    </div>
                  </div>
                  <div className="flex gap-3 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-gray-200">
                    <div className="flex-shrink-0 w-2 h-2 mt-2 bg-primary rounded-full"></div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Community Engagement</h3>
                      <p className="text-sm text-gray-700">A space for learning, sharing, and connecting with like-minded individuals</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* What We Do */}
          <section>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What We Do</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Nexverce is more than just a marketplace – it's an <strong className="text-primary">innovation hub</strong> where you can:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {whatWeDoItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Card key={index} className="shadow-lg hover:shadow-xl transition-all group hover:scale-105">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-50 to-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-700 text-sm">{item.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Our Values */}
          <section>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <Card key={index} className="shadow-lg border-2 border-primary/10 hover:border-primary/30 transition-all">
                    <CardContent className="p-6">
                      <Icon className="h-10 w-10 text-primary mb-3" />
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                      <p className="text-gray-700 text-sm">{value.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Why Choose Nexverce */}
          <section>
            <Card className="shadow-xl bg-gradient-to-br from-purple-50 via-white to-blue-50">
              <CardHeader>
                <CardTitle className="text-3xl">Why Choose Nexverce?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { title: "Diverse Categories", desc: "From tech and marketing to health and lifestyle, we cover it all." },
                    { title: "Curated Quality", desc: "Every product and article is carefully selected to ensure relevance and value." },
                    { title: "User-Centric Design", desc: "Our platform is built with you in mind – easy to navigate, visually appealing, and highly functional." },
                    { title: "Seamless Integration", desc: "Connect with social media, automate workflows, and streamline your digital presence." },
                    { title: "Expert Insights", desc: "Learn from industry leaders and stay updated with the latest trends and best practices." }
                  ].map((item, index) => (
                    <div key={index} className="flex gap-3 p-4 bg-white rounded-lg border border-gray-200">
                      <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                        <p className="text-sm text-gray-700">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Our Story & Team */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-3xl">Our Story</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Nexverce was born out of a passion for <strong className="text-primary">innovation and accessibility</strong>. Recognizing the overwhelming amount of information and choices available online, we set out to create a platform that simplifies decision-making by curating the best products, services, and content in one place.
                </p>
                <p>
                  What started as a small idea has grown into a thriving ecosystem that serves businesses, creators, and consumers worldwide. Today, Nexverce is proud to be a trusted destination for those seeking quality, innovation, and inspiration.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-3xl">Our Team</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Behind Nexverce is a dedicated team of <strong className="text-primary">developers, designers, marketers, and strategists</strong> who are passionate about creating exceptional digital experiences. We work tirelessly to ensure that Nexverce remains a cutting-edge platform that meets the evolving needs of our users.
                </p>
                <p>
                  We are powered by <a href="https://www.nexcodenova.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">NexCodeNova</a>, a leading technology solutions provider committed to building innovative software and platforms.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Join Community */}
          <section>
            <Card className="shadow-xl border-2 border-primary/20">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl">Join the Nexverce Community</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-gray-700 text-lg max-w-3xl mx-auto">
                  Whether you're a business looking to expand your reach, a content creator seeking a platform to showcase your work, or a consumer searching for the best products and services, <strong className="text-primary">Nexverce is here for you</strong>.
                </p>
                <p className="text-gray-700 max-w-3xl mx-auto">
                  Join thousands of users who trust Nexverce to deliver quality, innovation, and value. Together, let's shape the future of digital commerce and content.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Get in Touch */}
          <section>
            <Card className="shadow-xl bg-gradient-to-br from-purple-50 via-white to-blue-50">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl">Get in Touch</CardTitle>
                <p className="text-gray-600 mt-2">Have questions, feedback, or partnership inquiries? We'd love to hear from you!</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                  {contactMethods.map((method, index) => {
                    const Icon = method.icon;
                    return (
                      <a
                        key={index}
                        href={method.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all group"
                      >
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-50 to-blue-50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="text-left">
                          <p className="text-xs text-gray-600 font-medium">{method.label}</p>
                          <p className="text-sm text-gray-900 font-semibold">{method.value}</p>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </section>

        </div>
      </div>
      <Footer />
    </>
  );
}

export default AboutUs;
