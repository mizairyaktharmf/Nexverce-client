import { useState } from 'react'
import { Link } from 'react-router-dom';
import { Mail, Send, ExternalLink, Instagram, CheckCircle2, AlertCircle } from 'lucide-react';
import { FaLinkedin, FaFacebook } from 'react-icons/fa';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const socialLinks = [
  { name: "Instagram", url: "https://www.instagram.com/nexverce", icon: Instagram },
  { name: "LinkedIn", url: "https://www.linkedin.com/company/nexverce", icon: FaLinkedin },
  { name: "Facebook", url: "https://www.facebook.com/nexverce", icon: FaFacebook },
];

function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setError("");

    try {
      const API_BASE =
        import.meta.env.MODE === "development"
          ? "http://localhost:5000/api/newsletter"
          : "https://nexverce-backend.onrender.com/api/newsletter";

      const res = await fetch(`${API_BASE}/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, source: "footer" }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to subscribe");
      }

      setSubscribed(true);
      setEmail("");

      // Reset after 5 seconds
      setTimeout(() => {
        setSubscribed(false);
      }, 5000);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
      setTimeout(() => {
        setError("");
      }, 5000);
    } finally {
      setLoading(false);
    }
  }

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Categories", path: "/#categories" },
    { name: "Blogs", path: "/blogs" },
    { name: "About Us", path: "/about-us" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", path: "/privacy-policy" },
    { name: "Contact", path: "/contact" },
    { name: "Careers", path: "/careers" },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">

          {/* Brand Section */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent mb-4">
              Nexverce
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              Discover smarter, verified deals — trusted by thousands of users worldwide.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-lg hover:bg-gradient-to-br hover:from-[#667eea] hover:to-[#764ba2] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
                    title={link.name}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools & Features */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Tools & Features</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/deals" className="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all duration-200">
                  🔥 Hot Deals
                </Link>
              </li>
              <li>
                <Link to="/buying-guides" className="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all duration-200">
                  📚 Buying Guides
                </Link>
              </li>
              <li>
                <Link to="/compare" className="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all duration-200">
                  ⚖️ Compare Products
                </Link>
              </li>
              <li>
                <Link to="/product-finder" className="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all duration-200">
                  🎯 Product Finder
                </Link>
              </li>
              <li>
                <Link to="/calculator" className="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all duration-200">
                  🧮 Calculator
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all duration-200">
                  👤 Dashboard
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all duration-200">
                  💬 Community
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all duration-200">
                  ⭐ Reviews
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="mailto:contact@nexverce.com"
                  className="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                >
                  contact@nexverce.com
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Mail className="h-5 w-5 text-purple-400" />
              Newsletter
            </h4>
            <p className="text-gray-300 text-sm mb-4">
              Get exclusive deals and updates straight to your inbox.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/50 rounded-lg animate-fadeIn">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-green-400 font-semibold text-sm">Successfully Subscribed!</p>
                  <p className="text-green-300 text-xs">Check your inbox for confirmation.</p>
                </div>
              </div>
            ) : (
              <>
                <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                  <div className="relative">
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      required
                      disabled={loading}
                      className="bg-gray-800 border-gray-700 focus:border-purple-400 text-white placeholder:text-gray-400 pr-10"
                    />
                    <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  </div>

                  <Button
                    type="submit"
                    variant="premium"
                    disabled={loading}
                    className="w-full group bg-gradient-to-r from-purple-400 via-purple-500 to-indigo-500 hover:from-purple-500 hover:via-purple-600 hover:to-indigo-600"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                        Subscribing...
                      </>
                    ) : (
                      <>
                        Subscribe Now
                        <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </form>

                {error && (
                  <div className="flex items-center gap-2 p-3 mt-3 bg-red-500/20 border border-red-400/50 rounded-lg animate-fadeIn">
                    <AlertCircle className="h-4 w-4 text-red-400 flex-shrink-0" />
                    <p className="text-red-400 text-xs">{error}</p>
                  </div>
                )}
              </>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8 text-center space-y-3">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
              Nexverce
            </span>
            . All Rights Reserved.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-xs">
            <a
              href="https://www.nexcodenova.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white inline-flex items-center gap-1 transition-colors group"
            >
              Developed by{" "}
              <span className="font-semibold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                NexCode Nova
              </span>
              <ExternalLink className="h-3 w-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <span className="hidden sm:inline text-gray-600">•</span>

            <p className="text-gray-400">
              Part of{" "}
              <span className="font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Fairam Group Family
              </span>
            </p>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer