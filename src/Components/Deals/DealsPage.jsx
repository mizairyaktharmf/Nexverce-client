import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Tag, TrendingDown, Clock, ArrowRight, Flame, Gift } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";

export default function DealsPage() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, expiring-soon, best-deals

  useEffect(() => {
    fetchDeals();
  }, []);

  const fetchDeals = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/deals`);
      const data = await response.json();
      setDeals(data);
    } catch (error) {
      console.error("Error fetching deals:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredDeals = deals.filter(deal => {
    if (filter === "all") return true;
    if (filter === "expiring-soon") {
      const expiryDate = new Date(deal.expiryDate);
      const daysLeft = Math.ceil((expiryDate - new Date()) / (1000 * 60 * 60 * 24));
      return daysLeft <= 3;
    }
    if (filter === "best-deals") return deal.discount >= 50;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/30">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-4 rounded-full">
              <Tag className="h-12 w-12 text-white" />
            </div>
          </div>
          <Badge className="mb-6 bg-gradient-to-r from-purple-500 to-blue-600 text-white border-0 px-6 py-2 text-base shadow-lg">
            <Flame className="h-4 w-4 mr-2" />
            Hot Deals & Offers
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6">
            Today's Best <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Deals</span>
          </h1>
          <p className="text-lg md:text-xl text-purple-100 max-w-3xl mx-auto mb-8">
            Discover exclusive discounts, limited-time offers, and unbeatable prices on products you love
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap justify-center gap-3">
          <Button
            onClick={() => setFilter("all")}
            variant={filter === "all" ? "default" : "outline"}
            className={filter === "all" ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white" : ""}
          >
            All Deals
          </Button>
          <Button
            onClick={() => setFilter("expiring-soon")}
            variant={filter === "expiring-soon" ? "default" : "outline"}
            className={filter === "expiring-soon" ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white" : ""}
          >
            <Clock className="h-4 w-4 mr-2" />
            Expiring Soon
          </Button>
          <Button
            onClick={() => setFilter("best-deals")}
            variant={filter === "best-deals" ? "default" : "outline"}
            className={filter === "best-deals" ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white" : ""}
          >
            <TrendingDown className="h-4 w-4 mr-2" />
            50%+ OFF
          </Button>
        </div>
      </section>

      {/* Deals Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading deals...</p>
          </div>
        ) : filteredDeals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDeals.map((deal) => (
              <Card key={deal._id} className="group hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 overflow-hidden">
                <div className="relative">
                  {deal.image && (
                    <img src={deal.image} alt={deal.title} className="w-full h-48 object-cover" />
                  )}
                  {deal.discount && (
                    <Badge className="absolute top-4 right-4 bg-red-500 text-white font-bold text-lg px-3 py-1">
                      {deal.discount}% OFF
                    </Badge>
                  )}
                  {deal.isFeatured && (
                    <Badge className="absolute top-4 left-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold">
                      <Flame className="h-3 w-3 mr-1" />
                      HOT
                    </Badge>
                  )}
                </div>
                <CardHeader>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {deal.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {deal.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-500 line-through">${deal.originalPrice}</p>
                      <p className="text-3xl font-bold text-primary">${deal.dealPrice}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Save</p>
                      <p className="text-2xl font-bold text-green-600">${deal.originalPrice - deal.dealPrice}</p>
                    </div>
                  </div>
                  {deal.expiryDate && (
                    <div className="flex items-center gap-2 text-sm text-orange-600 bg-orange-50 px-3 py-2 rounded-lg">
                      <Clock className="h-4 w-4" />
                      Expires: {new Date(deal.expiryDate).toLocaleDateString()}
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Link to={`/post/${deal._id}`} className="w-full">
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold">
                      View Deal
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Gift className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-600">No deals found</p>
          </div>
        )}
      </section>
    </div>
  );
}
