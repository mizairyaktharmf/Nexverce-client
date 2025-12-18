import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowRight, DollarSign } from "lucide-react";
import API_BASE from "../../Config/Api";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";

function CategoryPage() {
  const { slug } = useParams();
  const [categoryPosts, setCategoryPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Category mapping
  const slugToCategoryMap = {
    education: "Education",
    finance: "Finance",
    technology: "Technology",
    health: "Health",
    marketing: "Marketing",
    lifestyle: "Lifestyle",
  };

  const categoryName = slugToCategoryMap[slug] || slug;

  // Currency symbol support (same as PostPage)
  const currencySymbols = {
    USD: "$",
    EUR: "€",
    AED: "د.إ",
    LKR: "Rs ",
    JPY: "¥",
    INR: "₹",
  };

  useEffect(() => {
    const fetchCategoryPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_BASE);
        if (!response.ok) throw new Error("Failed to fetch posts");
        const data = await response.json();

        const filtered = data.filter(
          (post) =>
            post.status === "published" &&
            post.category &&
            post.category.trim().toLowerCase() ===
              categoryName.trim().toLowerCase()
        );

        setCategoryPosts(filtered);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryPosts();
  }, [categoryName]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
          <h3 className="mt-4 text-lg font-medium text-gray-600">Loading posts...</h3>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-600">
          <h3 className="text-lg font-medium">Error: {error}</h3>
        </div>
      </div>
    );
  }

  if (categoryPosts.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">No posts found in "{categoryName}"</h2>
          <Link to="/">
            <Button variant="premium" className="mt-4">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-1 w-12 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded"></div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{categoryName}</h1>
          </div>
          <p className="text-gray-600">Explore {categoryPosts.length} {categoryPosts.length === 1 ? 'post' : 'posts'} in this category</p>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryPosts.map((post) => {
            const symbol = currencySymbols[post.currency] || "";

            return (
              <Link key={post._id} to={`/post/${post._id}`}>
                <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer border-2 hover:border-primary">
                  {post.image && (
                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-purple-100 to-blue-100">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      {post.tag && (
                        <Badge variant="premium" className="absolute top-3 right-3">
                          {post.tag}
                        </Badge>
                      )}
                    </div>
                  )}

                  <CardHeader>
                    <CardTitle className="text-xl line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      {post.description}
                    </CardDescription>
                  </CardHeader>

                  <CardFooter className="flex items-center justify-between">
                    {post.price && (
                      <div className="flex items-center gap-1 text-primary font-bold text-lg">
                        <DollarSign className="h-5 w-5" />
                        <span>{symbol}{post.price}</span>
                      </div>
                    )}
                    <Button variant="ghost" size="sm" className="ml-auto group-hover:text-primary">
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default CategoryPage;
