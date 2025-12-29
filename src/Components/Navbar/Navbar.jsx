import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Search,
  ChevronDown,
  Menu,
  X,
  GraduationCap,
  DollarSign,
  Laptop,
  Heart,
  TrendingUp,
  Film
} from "lucide-react";
import homeLogo from "../../assets/nexvercelogo.png";
import { cn } from "../../lib/utils";

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);

  const navigate = useNavigate();

  // Static categories matching homepage Categories.jsx
  const categories = [
    { name: "Education", slug: "education", icon: GraduationCap },
    { name: "Finance", slug: "finance", icon: DollarSign },
    { name: "Technology", slug: "technology", icon: Laptop },
    { name: "Health", slug: "health", icon: Heart },
    { name: "Marketing", slug: "marketing", icon: TrendingUp },
    { name: "Entertainment", slug: "lifestyle", icon: Film },
  ];

  // Get category URL - all categories now have dedicated landing pages
  const getCategoryUrl = (slug) => {
    return `/${slug}`;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${searchTerm}`);
      setSearchTerm("");
      setShowMenu(false);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/98 backdrop-blur-xl border-b border-gray-200/50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <img src={homeLogo} alt="Nexverce" className="h-12 w-auto transition-transform group-hover:scale-105" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <Link to="/" className="px-4 py-2 text-gray-700 hover:text-primary font-semibold transition-all rounded-lg hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50">
              Home
            </Link>

            {/* Categories Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
                className="flex items-center space-x-1 px-4 py-2 text-gray-700 hover:text-primary font-semibold transition-all rounded-lg hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50"
              >
                <span>Categories</span>
                <ChevronDown className={cn("h-4 w-4 transition-transform", isDropdownOpen && "rotate-180")} />
              </button>

              {isDropdownOpen && (
                <div
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                  className="absolute top-full left-0 mt-3 w-72 bg-white/98 backdrop-blur-xl rounded-2xl shadow-2xl border-2 border-purple-100/50 py-4 animate-fade-in"
                >
                  <div className="px-5 py-3 border-b border-gradient-to-r from-purple-100 to-blue-100 mb-3">
                    <h3 className="text-xs font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent uppercase tracking-wider">Browse Categories</h3>
                  </div>
                  {categories.map((cat) => {
                    const IconComponent = cat.icon;
                    return (
                      <Link
                        key={cat.slug}
                        to={getCategoryUrl(cat.slug)}
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-4 px-5 py-3 mx-2 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:text-primary transition-all group rounded-xl"
                      >
                        <div className="p-2 rounded-lg bg-gradient-to-br from-purple-50 to-blue-50 group-hover:from-purple-100 group-hover:to-blue-100 transition-all">
                          <IconComponent className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                        </div>
                        <span className="font-semibold">{cat.name}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            <Link to="/blog" className="px-4 py-2 text-gray-700 hover:text-primary font-semibold transition-all rounded-lg hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50">
              Blog
            </Link>

            <Link to="/about-us" className="px-4 py-2 text-gray-700 hover:text-primary font-semibold transition-all rounded-lg hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50">
              About
            </Link>

            <Link to="/contact" className="px-4 py-2 text-gray-700 hover:text-primary font-semibold transition-all rounded-lg hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50">
              Contact
            </Link>

            <Link to="/newsletter" className="px-4 py-2.5 ml-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold transition-all rounded-lg shadow-md hover:shadow-xl">
              Newsletter
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:block">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search products, blogs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-72 px-5 py-2.5 pl-12 text-sm border-2 border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all bg-gray-50/50 focus:bg-white"
              />
              <Search className="absolute left-4 top-3 h-5 w-5 text-gray-400" />
            </form>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="lg:hidden p-2.5 rounded-lg hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 transition-all border-2 border-transparent hover:border-purple-200"
          >
            {showMenu ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMenu && (
        <div className="lg:hidden border-t border-gray-200/50 bg-white/98 backdrop-blur-xl animate-slide-up shadow-lg">
          <div className="px-4 py-6 space-y-2">

            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="relative mb-4">
              <input
                type="text"
                placeholder="Search products, blogs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-5 py-3 pl-12 text-sm border-2 border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-gray-50/50 focus:bg-white transition-all"
              />
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
            </form>

            <Link
              to="/"
              onClick={() => setShowMenu(false)}
              className="block py-3 px-4 text-gray-700 hover:text-primary font-semibold transition-all rounded-lg hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50"
            >
              Home
            </Link>

            {/* Mobile Categories */}
            <div>
              <button
                onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
                className="flex items-center justify-between w-full py-3 px-4 text-gray-700 hover:text-primary font-semibold transition-all rounded-lg hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50"
              >
                <span>Categories</span>
                <ChevronDown className={cn("h-4 w-4 transition-transform", isMobileDropdownOpen && "rotate-180")} />
              </button>

              {isMobileDropdownOpen && (
                <div className="mt-2 space-y-2 bg-gradient-to-r from-purple-50/80 to-blue-50/80 rounded-xl p-4 border-2 border-purple-100/50">
                  {categories.map((cat) => {
                    const IconComponent = cat.icon;
                    return (
                      <Link
                        key={cat.slug}
                        to={getCategoryUrl(cat.slug)}
                        onClick={() => {
                          setShowMenu(false);
                          setIsMobileDropdownOpen(false);
                        }}
                        className="flex items-center gap-3 py-2.5 px-4 text-sm text-gray-700 hover:text-primary hover:bg-white rounded-lg transition-all font-medium"
                      >
                        <div className="p-1.5 rounded-md bg-white">
                          <IconComponent className="h-4 w-4 text-primary" />
                        </div>
                        <span className="font-semibold">{cat.name}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            <Link
              to="/blog"
              onClick={() => setShowMenu(false)}
              className="block py-3 px-4 text-gray-700 hover:text-primary font-semibold transition-all rounded-lg hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50"
            >
              Blog
            </Link>

            <Link
              to="/about-us"
              onClick={() => setShowMenu(false)}
              className="block py-3 px-4 text-gray-700 hover:text-primary font-semibold transition-all rounded-lg hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50"
            >
              About
            </Link>

            <Link
              to="/contact"
              onClick={() => setShowMenu(false)}
              className="block py-3 px-4 text-gray-700 hover:text-primary font-semibold transition-all rounded-lg hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50"
            >
              Contact
            </Link>

            <Link
              to="/newsletter"
              onClick={() => setShowMenu(false)}
              className="block py-3 px-4 mt-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold transition-all rounded-lg shadow-md text-center"
            >
              Newsletter
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
