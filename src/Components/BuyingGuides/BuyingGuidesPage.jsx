import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Search, ArrowRight, Lightbulb, CheckCircle2 } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";

export default function BuyingGuidesPage() {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = ["All", "Technology", "Health", "Finance", "Education", "Marketing", "Lifestyle"];

  useEffect(() => {
    fetchGuides();
  }, []);

  const fetchGuides = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/buying-guides`);
      const data = await response.json();
      setGuides(data);
    } catch (error) {
      console.error("Error fetching guides:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredGuides = guides.filter(guide => {
    const matchesCategory = selectedCategory === "all" || guide.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          guide.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-4 rounded-full">
              <Lightbulb className="h-12 w-12 text-white" />
            </div>
          </div>
          <Badge className="mb-6 bg-gradient-to-r from-purple-500 to-blue-600 text-white border-0 px-6 py-2 text-base shadow-lg">
            <BookOpen className="h-4 w-4 mr-2" />
            Expert Buying Guides
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6">
            Make Informed <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Purchase Decisions</span>
          </h1>
          <p className="text-lg md:text-xl text-purple-100 max-w-3xl mx-auto mb-8">
            Comprehensive guides to help you choose the perfect product for your needs
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search buying guides..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 pl-14 text-lg border-2 border-purple-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400" />
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-gradient-to-r from-purple-50 to-blue-50 py-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category.toLowerCase())}
                variant={selectedCategory === category.toLowerCase() ? "default" : "outline"}
                className={selectedCategory === category.toLowerCase()
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold"
                  : "font-semibold"}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading guides...</p>
          </div>
        ) : filteredGuides.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGuides.map((guide) => (
              <Card key={guide._id} className="group hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 flex flex-col">
                {guide.image && (
                  <div className="relative overflow-hidden">
                    <img
                      src={guide.image}
                      alt={guide.title}
                      className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {guide.category && (
                      <Badge className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                        {guide.category}
                      </Badge>
                    )}
                  </div>
                )}
                <CardHeader className="flex-grow">
                  <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                    {guide.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-3 text-base">
                    {guide.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {guide.keyPoints && guide.keyPoints.length > 0 && (
                    <ul className="space-y-2">
                      {guide.keyPoints.slice(0, 3).map((point, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                          <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
                <CardFooter>
                  <Link to={`/buying-guide/${guide._id}`} className="w-full">
                    <Button
                      variant="outline"
                      className="w-full group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-600 group-hover:text-white font-semibold border-2 transition-all"
                    >
                      Read Full Guide
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Lightbulb className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-600">No guides found</p>
            <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
          </div>
        )}
      </section>
    </div>
  );
}
