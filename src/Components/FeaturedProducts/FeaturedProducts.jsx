import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Flame, Clock, ShoppingCart, Sparkles } from "lucide-react";
import API_BASE from "../../Config/Api";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [countdowns, setCountdowns] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // ✅ Fetch published products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(API_BASE);
        if (!response.ok) throw new Error("Failed to fetch products");

        const data = await response.json();
        // ✅ Only include published posts
        const published = data.filter((p) => p.status === "published");
        setProducts(published);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ✅ Filters
  const topPicks = products.filter(
    (p) => p.type?.toLowerCase() === "toppick" || p.tag?.toLowerCase().includes("top")
  );
  const deals = products.filter((p) => p.type?.toLowerCase() === "deal");
  const marketplace = products.filter(
    (p) => p.type?.toLowerCase() === "marketplace"
  );
  const highlights = ["education", "health", "technology"];

  // ✅ Countdown Timer for Deals
  useEffect(() => {
    const timer = setInterval(() => {
      const newCountdowns = {};
      deals.forEach((deal) => {
        if (!deal.endTime) return;
        const endTime = new Date(deal.endTime).getTime();
        const now = new Date().getTime();
        const distance = endTime - now;

        if (distance > 0) {
          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor(
            (distance % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);

          newCountdowns[deal._id] = `${days}d ${hours
            .toString()
            .padStart(2, "0")}h:${minutes
            .toString()
            .padStart(2, "0")}m:${seconds.toString().padStart(2, "0")}s`;
        } else {
          newCountdowns[deal._id] = "Expired";
        }
      });
      setCountdowns(newCountdowns);
    }, 1000);

    return () => clearInterval(timer);
  }, [deals]);

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
                    {item.tag && (
                      <Badge variant="premium" className="absolute top-3 right-3">
                        {item.tag}
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
              // Define 6 categories
              const categories = ["health", "technology", "finance", "education", "lifestyle", "business"];
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
                          {product.tag && (
                            <Badge
                              variant="secondary"
                              className="absolute top-2 right-2 text-xs font-semibold bg-primary text-white border-0 shadow-lg"
                            >
                              {product.tag}
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

        {/* ⏳ Deal of the Day */}
        {deals.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <Clock className="h-6 w-6 text-red-500" />
              <h3 className="text-2xl font-bold text-gray-900">Deal of the Day</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {deals.map((deal) => (
                <Card key={deal._id} className="overflow-hidden hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-red-50 to-orange-50">
                  <div className="md:flex">
                    <div className="md:w-1/2 relative overflow-hidden">
                      <img
                        src={deal.image || "https://via.placeholder.com/250x150"}
                        alt={deal.title}
                        className="w-full h-64 md:h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                      <Badge variant="destructive" className="absolute top-3 left-3">
                        Limited Time
                      </Badge>
                    </div>
                    <div className="md:w-1/2 p-6 flex flex-col justify-between">
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 mb-2">{deal.title}</h4>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{deal.description}</p>
                      </div>
                      <div>
                        <div className="bg-white rounded-lg p-3 mb-4 text-center border-2 border-red-500">
                          <p className="text-xs text-gray-600 mb-1">Time Remaining</p>
                          <p className="font-mono text-lg font-bold text-red-600">
                            {countdowns[deal._id] || "Loading..."}
                          </p>
                        </div>
                        <Button
                          variant="destructive"
                          className="w-full"
                          onClick={() => navigate(`/post/${deal._id}`)}
                        >
                          Grab Deal
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

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
