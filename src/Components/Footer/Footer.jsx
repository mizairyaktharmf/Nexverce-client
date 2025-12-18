import { useState } from 'react'
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import tiktokicon from '../../../src/assets/tiktok.png'
import instagramicon from '../../../src/assets/instagram.png'
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';

const socialLinks = [
  { name: "Tiktok", url: "https://www.tiktok.com/@nexverce", icon: tiktokicon },
  { name: "Instagram", url: "https://www.instagram.com/nexverce", icon: instagramicon },
];

function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if(email) {
      console.log("Subscribed Email:", email);
      setEmail("");
    }
  }

  return (
    <footer className="bg-gradient-to-br from-gray-50 to-gray-100 border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">

          {/* Newsletter Section */}
          <div className="bg-white rounded-xl shadow-md p-6 md:p-8 border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <Mail className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-bold text-gray-900">Get the Latest Updates</h3>
            </div>
            <p className="text-gray-600 mb-4 text-sm">Subscribe to our newsletter for exclusive content and updates.</p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
                required
              />
              <Button type="submit" variant="premium" size="default">
                Subscribe
              </Button>
            </form>
          </div>

          {/* Social & Quick Links */}
          <div className="flex flex-col justify-center">
            {/* Social Icons */}
            <div className="flex justify-center md:justify-start gap-4 mb-6">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white rounded-full shadow-md hover:shadow-lg transition-all hover:scale-110 flex items-center justify-center border border-gray-200"
                >
                  <img src={link.icon} alt={link.name} className="w-6 h-6 object-contain" />
                </a>
              ))}
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
              <Link to="/about-us" className="text-gray-700 hover:text-primary font-medium transition-colors">
                About Us
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-primary font-medium transition-colors">
                Contact
              </Link>
              <Link to="/privacy-policy" className="text-gray-700 hover:text-primary font-medium transition-colors">
                Privacy Policy
              </Link>
              <a href="mailto:contact@nexverce.com" className="text-gray-700 hover:text-primary font-medium transition-colors">
                contact@nexverce.com
              </a>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 pt-6 text-center">
          <p className="text-sm text-gray-600">
            &copy; 2025 <a href="https://www.nexcodenova.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">NexCodeNova</a>. All Rights Reserved.
          </p>
        </div>

      </div>
    </footer>
  )
}

export default Footer