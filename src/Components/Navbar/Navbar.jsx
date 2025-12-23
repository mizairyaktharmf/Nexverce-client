import { useState, useEffect } from "react";
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
  Sparkles,
  Briefcase,
  Building2,
  Film
} from "lucide-react";
import homeLogo from "../../assets/nexvercelogo.png";
import { cn } from "../../lib/utils";
import API_BASE from "../../Config/Api";

// Icon mapping for categories
const getCategoryIcon = (categoryName) => {
  const iconMap = {
    'education': GraduationCap,
    'finance': DollarSign,
    'technology': Laptop,
    'health': Heart,
    'marketing': TrendingUp,
    'lifestyle': Sparkles,
    'career': Briefcase,
    'business': Building2,
    'entertainment': Film,
  };

  return iconMap[categoryName.toLowerCase()] || Briefcase;
};

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const [categories, setCategories] = useState([
    { name: "Education", slug: "education", icon: GraduationCap },
    { name: "Finance", slug: "finance", icon: DollarSign },
    { name: "Technology", slug: "technology", icon: Laptop },
    { name: "Health", slug: "health", icon: Heart },
    { name: "Marketing", slug: "marketing", icon: TrendingUp },
    { name: "Lifestyle", slug: "lifestyle", icon: Sparkles },
    { name: "Career", slug: "career", icon: Briefcase },
  ]);

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${searchTerm}`);
      setSearchTerm("");
      setShowMenu(false);
    }
  };

  // Fetch unique categories from posts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(API_BASE);
        if (response.ok) {
          const posts = await response.json();

          // Extract unique categories (case-insensitive)
          const categoryMap = new Map();
          posts
            .filter(post => post.category && post.status === 'published')
            .forEach(post => {
              const catLower = post.category.trim().toLowerCase();
              if (!categoryMap.has(catLower)) {
                // Capitalize first letter
                const catName = post.category.trim();
                const displayName = catName.charAt(0).toUpperCase() + catName.slice(1).toLowerCase();
                categoryMap.set(catLower, displayName);
              }
            });

          // Convert to array and sort
          const uniqueCategories = Array.from(categoryMap.values()).sort();

          const categoriesData = uniqueCategories.map(cat => ({
            name: cat,
            slug: cat.toLowerCase(),
            icon: getCategoryIcon(cat)
          }));

          if (categoriesData.length > 0) {
            setCategories(categoriesData);
          }
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src={homeLogo} alt="Nexverce" className="h-10 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary font-medium transition-colors">
              Home
            </Link>

            {/* Categories Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
                className="flex items-center space-x-1 text-gray-700 hover:text-primary font-medium transition-colors"
              >
                <span>Categories</span>
                <ChevronDown className={cn("h-4 w-4 transition-transform", isDropdownOpen && "rotate-180")} />
              </button>

              {isDropdownOpen && (
                <div
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                  className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border-2 border-gray-100 py-3 animate-fade-in"
                >
                  <div className="px-4 py-2 border-b border-gray-100 mb-2">
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide">Browse Categories</h3>
                  </div>
                  {categories.map((cat) => (
                    <Link
                      key={cat.slug}
                      to={`/category/${cat.slug}`}
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:text-primary transition-all group"
                    >
                      <span className="text-xl group-hover:scale-110 transition-transform">{cat.icon}</span>
                      <span className="font-medium">{cat.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/blogs" className="text-gray-700 hover:text-primary font-medium transition-colors">
              Blogs
            </Link>

            <Link to="/about-us" className="text-gray-700 hover:text-primary font-medium transition-colors">
              About
            </Link>

            <Link to="/contact" className="text-gray-700 hover:text-primary font-medium transition-colors">
              Contact
            </Link>

            <Link to="/newsletter" className="text-gray-700 hover:text-primary font-medium transition-colors">
              Newsletter
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:block">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64 px-4 py-2 pl-10 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </form>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {showMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMenu && (
        <div className="lg:hidden border-t border-gray-200 bg-white animate-slide-up">
          <div className="px-4 py-4 space-y-4">

            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pl-10 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </form>

            <Link
              to="/"
              onClick={() => setShowMenu(false)}
              className="block py-2 text-gray-700 hover:text-primary font-medium transition-colors"
            >
              Home
            </Link>

            {/* Mobile Categories */}
            <div>
              <button
                onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
                className="flex items-center justify-between w-full py-2 text-gray-700 hover:text-primary font-medium transition-colors"
              >
                <span>Categories</span>
                <ChevronDown className={cn("h-4 w-4 transition-transform", isMobileDropdownOpen && "rotate-180")} />
              </button>

              {isMobileDropdownOpen && (
                <div className="pl-2 mt-2 space-y-1 bg-gradient-to-r from-purple-50/50 to-blue-50/50 rounded-lg p-3">
                  {categories.map((cat) => (
                    <Link
                      key={cat.slug}
                      to={`/category/${cat.slug}`}
                      onClick={() => {
                        setShowMenu(false);
                        setIsMobileDropdownOpen(false);
                      }}
                      className="flex items-center gap-3 py-2 px-3 text-sm text-gray-700 hover:text-primary hover:bg-white rounded-lg transition-all"
                    >
                      <span className="text-lg">{cat.icon}</span>
                      <span className="font-medium">{cat.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/blogs"
              onClick={() => setShowMenu(false)}
              className="block py-2 text-gray-700 hover:text-primary font-medium transition-colors"
            >
              Blogs
            </Link>

            <Link
              to="/about-us"
              onClick={() => setShowMenu(false)}
              className="block py-2 text-gray-700 hover:text-primary font-medium transition-colors"
            >
              About
            </Link>

            <Link
              to="/contact"
              onClick={() => setShowMenu(false)}
              className="block py-2 text-gray-700 hover:text-primary font-medium transition-colors"
            >
              Contact
            </Link>

            <Link
              to="/newsletter"
              onClick={() => setShowMenu(false)}
              className="block py-2 text-gray-700 hover:text-primary font-medium transition-colors"
            >
              Newsletter
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
