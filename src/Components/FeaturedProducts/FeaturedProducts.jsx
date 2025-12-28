import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Flame, ShoppingCart, Sparkles } from "lucide-react";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import DealOfTheDay from "./DealOfTheDay";
import TelegramHit from "./TelegramHit";
import OurServices from "../OurServices/OurServices";
import WhoWeAre from "../WhoWeAre/WhoWeAre";
import Reviews from "../Reviews/Reviews";

function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // ✅ Fetch published products AND blogs from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const baseUrl = import.meta.env.MODE === "development"
          ? "http://localhost:5000/api"
          : "https://nexverce-backend.onrender.com/api";

        // Fetch both posts and blogs in parallel
        const [postsResponse, blogsResponse] = await Promise.all([
          fetch(`${baseUrl}/posts`),
          fetch(`${baseUrl}/blogs`)
        ]);

        if (!postsResponse.ok || !blogsResponse.ok) {
          throw new Error("Failed to fetch content");
        }

        const postsData = await postsResponse.json();
        const blogsData = await blogsResponse.json();

        // Combine posts and blogs, filter only published
        const allContent = [...postsData, ...blogsData];
        const published = allContent.filter((p) => p.status === "published");

        setProducts(published);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ✅ Filters - Support both posts (tag string) and blogs (tags array)
  const topPicks = products.filter(
    (p) => p.type?.toLowerCase() === "toppick" ||
           p.tag?.toLowerCase().includes("top") ||
           p.tags?.[0]?.toLowerCase().includes("top")
  );
  const deals = products.filter((p) =>
    p.tag?.toLowerCase() === "deal" ||
    p.tags?.[0]?.toLowerCase() === "deal"
  );
  const telegramPosts = products.filter((p) =>
    p.tag?.toLowerCase() === "telegram" ||
    p.tags?.[0]?.toLowerCase() === "telegram"
  );
  const marketplace = products.filter(
    (p) => p.type?.toLowerCase() === "marketplace"
  );

  // Filter only blogs (type === "blog") for Reviews section
  const blogs = products.filter((p) => p.type === "blog");

  // ✅ Loading state
  if (loading) {
    return (
      <div className="text-center py-16">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
        <h3 className="mt-4 text-lg font-medium text-gray-600">Loading featured products...</h3>
      </div>
    );
  }

  // ✅ Error state
  if (error) {
    return (
      <div className="text-center py-16 text-red-600">
        <h3 className="text-lg font-medium">Error: {error}</h3>
      </div>
    );
  }

  // ✅ Render Sections
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Explore trending picks, deals, and tools curated for you.</p>
        </div>

        {/* 🔥 Top Picks */}
        {topPicks.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <Flame className="h-6 w-6 text-orange-500" />
              <h3 className="text-2xl font-bold text-gray-900">Top Picks of the Week</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {topPicks.map((item) => (
                <Card key={item._id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                  <div className="relative overflow-hidden">
                    <img
                      src={item.image || "https://via.placeholder.com/250x150"}
                      alt={item.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {(item.tag || item.tags?.[0]) && (
                      <Badge variant="premium" className="absolute top-3 right-3">
                        {item.tag || item.tags?.[0]}
                      </Badge>
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg line-clamp-2">{item.title}</CardTitle>
                  </CardHeader>
                  <CardFooter>
                    <Button
                      variant="premium"
                      className="w-full"
                      onClick={() => navigate(`/post/${item._id}`)}
                    >
                      Explore Now
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* 📌 Category Highlights - 2 Latest Posts per Category (12 cards total) */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-gradient-to-r from-primary to-purple-600 p-2 rounded-lg">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Category Highlights
              </h3>
              <p className="text-sm text-gray-500 mt-1">Discover our most popular picks across categories</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {(() => {
              // Define 6 categories (matching admin dashboard categories)
              const categories = ["education", "marketing", "finance", "technology", "health", "lifestyle"];
              const categoryCards = [];

              categories.forEach((category) => {
                // Get latest 2 published posts for this category (regardless of type)
                const categoryPosts = products
                  .filter((p) => p.category?.toLowerCase() === category)
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .slice(0, 2);

                // Always push exactly 2 cards per category
                for (let i = 0; i < 2; i++) {
                  const product = categoryPosts[i];

                  if (product) {
                    // If post exists, show it
                    categoryCards.push(
                      <Card
                        key={product._id}
                        className="overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group cursor-pointer border-2 border-gray-100 hover:border-primary/30 bg-white"
                        onClick={() => navigate(`/post/${product._id}`)}
                      >
                        <div className="relative h-32 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                          <img
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            src={product.image || "https://via.placeholder.com/300x200"}
                            alt={product.title}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          {(product.tag || product.tags?.[0]) && (
                            <Badge
                              variant="secondary"
                              className="absolute top-2 right-2 text-xs font-semibold bg-primary text-white border-0 shadow-lg"
                            >
                              {product.tag || product.tags?.[0]}
                            </Badge>
                          )}
                        </div>
                        <CardHeader className="p-4 space-y-1.5 bg-gradient-to-b from-white to-gray-50">
                          <CardTitle className="text-base font-bold line-clamp-1 text-gray-900 group-hover:text-primary transition-colors duration-300">
                            {product.category?.charAt(0).toUpperCase() + product.category?.slice(1)} Pick
                          </CardTitle>
                          <CardDescription className="text-xs line-clamp-2 text-gray-600 leading-relaxed">
                            {product.description || product.title}
                          </CardDescription>
                        </CardHeader>
                        <CardFooter className="p-4 pt-0 bg-gradient-to-b from-gray-50 to-white">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full h-8 text-xs font-semibold text-primary bg-white border-2 border-primary/20 hover:border-primary hover:!bg-gradient-to-r hover:!from-primary hover:!to-purple-600 hover:!text-white transition-all duration-300 shadow-sm hover:shadow-lg group/btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/post/${product._id}`);
                            }}
                          >
                            <span className="group-hover/btn:scale-105 transition-transform duration-300">Explore Now</span>
                          </Button>
                        </CardFooter>
                      </Card>
                    );
                  } else {
                    // If post doesn't exist, show empty placeholder
                    categoryCards.push(
                      <Card
                        key={`${category}-empty-${i}`}
                        className="overflow-hidden border-2 border-dashed border-gray-200 bg-gray-50"
                      >
                        <div className="relative h-32 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                          <Sparkles className="h-8 w-8 text-gray-300" />
                        </div>
                        <CardHeader className="p-4 space-y-1.5">
                          <CardTitle className="text-base font-bold text-gray-400">
                            {category.charAt(0).toUpperCase() + category.slice(1)} Pick
                          </CardTitle>
                          <CardDescription className="text-xs text-gray-400">
                            No posts available yet
                          </CardDescription>
                        </CardHeader>
                        <CardFooter className="p-4 pt-0">
                          <Button
                            variant="outline"
                            size="sm"
                            disabled
                            className="w-full h-8 text-xs font-semibold text-gray-400 border-2 border-gray-200"
                          >
                            Coming Soon
                          </Button>
                        </CardFooter>
                      </Card>
                    );
                  }
                }
              });

              return categoryCards;
            })()}
          </div>
        </div>

      </div>

      {/* 🎯 Our Services - How We Curate Products */}
      <OurServices />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 📱 Telegram Hit - Exclusive Community Content */}
        <TelegramHit telegramPosts={telegramPosts} />
      </div>

      {/* 👥 Who We Are - Meet the Team */}
      <WhoWeAre />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ⏳ Deal of the Day - New Clean Component */}
        <DealOfTheDay deals={deals} />
      </div>

      {/* ⭐ Reviews - Expert Blog Reviews */}
      <Reviews blogs={blogs} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* 🛒 Mini Marketplace */}
        {marketplace.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <ShoppingCart className="h-6 w-6 text-green-600" />
              <h3 className="text-2xl font-bold text-gray-900">Mini Marketplace</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {marketplace.map((item) => (
                <Card key={item._id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                  <div className="relative overflow-hidden">
                    <img
                      src={item.image || "https://via.placeholder.com/250x150"}
                      alt={item.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg line-clamp-2">{item.title}</CardTitle>
                    <CardDescription className="text-xl font-bold text-primary">
                      {item.price ? `$${item.price}` : "Price not available"}
                    </CardDescription>
                    <div className="text-yellow-500 text-sm">★★★★☆</div>
                  </CardHeader>
                  <CardFooter>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => navigate(`/post/${item._id}`)}
                    >
                      Shop Now
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

export default FeaturedProducts;
