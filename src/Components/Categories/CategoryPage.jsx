import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowRight, Sparkles, Grid3x3 } from "lucide-react";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

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
    career: "Career",
    business: "Business",
    entertainment: "Entertainment",
  };

  const categoryName = slugToCategoryMap[slug] || slug;

  // Currency symbol support (expanded for all currencies)
  const currencySymbols = {
    USD: "$",
    EUR: "€",
    AED: "AED ",
    LKR: "Rs ",
    JPY: "¥",
    INR: "₹",
    GBP: "£",
    CAD: "C$",
    AUD: "A$",
    CNY: "¥",
    KRW: "₩",
  };

  useEffect(() => {
    const fetchCategoryPosts = async () => {
      try {
        setLoading(true);

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

        // Combine posts and blogs
        const allContent = [...postsData, ...blogsData];

        // Filter by category and published status
        const filtered = allContent.filter(
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
    <section className="min-h-screen py-20 bg-gradient-to-br from-purple-50 via-white to-blue-50 relative overflow-hidden">
      {/* Animated Blob Decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="premium" className="mb-6 shadow-lg hover:shadow-xl transition-shadow">
            <Grid3x3 className="h-4 w-4 mr-2" />
            Category
          </Badge>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            {categoryName}{" "}
            <span className="bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
              Collection
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            Explore {categoryPosts.length} {categoryPosts.length === 1 ? 'curated product' : 'curated products'} in this category
          </p>

          <div className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-primary/10 via-purple-500/10 to-primary/10 rounded-full border border-primary/20 shadow-sm">
            <Sparkles className="h-5 w-5 text-primary animate-pulse" />
            <span className="text-sm font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Premium Verified Offers</span>
            <Sparkles className="h-5 w-5 text-purple-600 animate-pulse" />
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categoryPosts.map((post) => {
            const symbol = currencySymbols[post.currency] || "";

            return (
              <Link key={post._id} to={`/post/${post._id}`}>
                <Card className="h-full overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer border border-gray-200 hover:border-primary/50 hover:scale-[1.03] flex flex-col bg-white rounded-xl">
                  {/* Image - Smaller Fixed Height */}
                  <div className="relative h-44 overflow-hidden bg-gradient-to-br from-purple-100 to-blue-100 flex-shrink-0">
                    <img
                      src={post.image || "https://via.placeholder.com/400x300"}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Tag Badge */}
                    {(post.tag || post.tags?.[0]) && (
                      <Badge variant="premium" className="absolute top-3 right-3 text-xs shadow-lg">
                        {post.tag || post.tags?.[0]}
                      </Badge>
                    )}
                  </div>

                  {/* Content - Compact */}
                  <CardHeader className="space-y-2 flex-grow p-4">
                    <CardTitle className="text-base font-bold line-clamp-2 leading-tight group-hover:text-primary transition-colors duration-300">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2 text-sm text-gray-600 leading-snug">
                      {post.description}
                    </CardDescription>
                  </CardHeader>

                  {/* Footer - Compact */}
                  <CardFooter className="flex items-center justify-between p-4 pt-0 mt-auto">
                    {post.price ? (
                      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r from-primary/10 to-purple-600/10 rounded-lg">
                        <span className="text-primary font-bold text-base whitespace-nowrap">{symbol}{post.price}</span>
                      </div>
                    ) : (
                      <div></div>
                    )}
                    <Button variant="ghost" size="sm" className="ml-auto h-8 px-3 text-xs font-semibold group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      View
                      <ArrowRight className="ml-1.5 h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
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
