import { useState } from 'react'
import { Link } from 'react-router-dom';
import { Mail, Send, Heart, ExternalLink, Instagram } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const socialLinks = [
  { name: "Instagram", url: "https://www.instagram.com/nexverce", icon: Instagram },
];

function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if(email) {
      console.log("Subscribed Email:", email);
      setSubscribed(true);
      setTimeout(() => {
        setEmail("");
        setSubscribed(false);
      }, 3000);
    }
  }

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Categories", path: "/#categories" },
    { name: "Blogs", path: "/blogs" },
    { name: "About Us", path: "/about-us" },
    { name: "Careers", path: "/careers" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", path: "/privacy-policy" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">

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
              <Mail className="h-5 w-5 text-[#667eea]" />
              Newsletter
            </h4>
            <p className="text-gray-300 text-sm mb-4">
              Stay updated with the latest deals.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
                <Heart className="h-5 w-5 text-green-400 animate-pulse" />
                <span className="text-green-400 font-medium text-sm">Thank you for subscribing!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="bg-gray-800 border-gray-700 focus:border-[#667eea] text-white placeholder:text-gray-400"
                />
                <Button
                  type="submit"
                  variant="premium"
                  className="w-full group"
                >
                  Subscribe
                  <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-400 text-sm mb-2">
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
              Nexverce
            </span>
            . All Rights Reserved.
          </p>
          <a
            href="https://www.nexcodenova.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white text-xs inline-flex items-center gap-1 transition-colors group"
          >
            Powered by NexCode Nova
            <ExternalLink className="h-3 w-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

      </div>
    </footer>
  )
}

export default Footer