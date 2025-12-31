import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Search, AlertCircle, ArrowRight, Sparkles, TrendingUp, BookOpen, Zap } from "lucide-react";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

function SearchResultsPage() {
  const [posts, setPosts] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const query = new URLSearchParams(useLocation().search).get("q")?.toLowerCase() || "";

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const baseUrl = import.meta.env.MODE === "development"
          ? "http://localhost:5000/api"
          : "https://nexverce-backend.onrender.com/api";

        const [postsResponse, blogsResponse] = await Promise.all([
          fetch(`${baseUrl}/posts`),
          fetch(`${baseUrl}/blogs`)
        ]);

        if (!postsResponse.ok || !blogsResponse.ok) {
          throw new Error("Failed to fetch content");
        }

        const postsData = await postsResponse.json();
        const blogsData = await blogsResponse.json();

        const publishedPosts = postsData.filter((p) => p.status === "published");
        const publishedBlogs = blogsData.filter((b) => b.status === "published");

        setPosts(publishedPosts);
        setBlogs(publishedBlogs);
      } catch (err) {
        console.error("Error fetching content:", err);
        setError("Failed to load search results.");
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  // Filter posts that match the search query
  const filteredPosts = posts.filter((post) => {
    const searchText = `${post.title} ${post.description} ${post.category} ${post.tag}`.toLowerCase();
    return searchText.includes(query);
  });

  // Filter blogs that match the search query
  const filteredBlogs = blogs.filter((blog) => {
    const searchText = `${blog.title} ${blog.description} ${blog.category} ${blog.tags?.join(" ")}`.toLowerCase();
    return searchText.includes(query);
  });

  const totalResults = filteredPosts.length + filteredBlogs.length;

  // Category icons mapping
  const categoryIcons = {
    "education": BookOpen,
    "finance": TrendingUp,
    "technology": Zap,
    "health": Sparkles,
    "marketing": TrendingUp,
    "lifestyle": Sparkles
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm mb-6">
            <Search className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4">
            Search Results
          </h1>
          <p className="text-lg md:text-xl text-purple-100 max-w-2xl mx-auto">
            Showing results for: <span className="font-bold text-white">"{query}"</span>
          </p>
          {!loading && (
            <div className="mt-6">
              <Badge className="bg-white/20 backdrop-blur-sm text-white border-0 px-6 py-2 text-base">
                {totalResults} {totalResults === 1 ? "Result" : "Results"} Found
              </Badge>
            </div>
          )}
        </div>
      </section>

      {/* Results Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            // Loading State
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary mb-6"></div>
              <p className="text-lg text-gray-600">Searching for "{query}"...</p>
            </div>
          ) : error ? (
            // Error State
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 mb-6">
                <AlertCircle className="h-10 w-10 text-red-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Oops! Something went wrong</h2>
              <p className="text-lg text-gray-600">{error}</p>
            </div>
          ) : totalResults === 0 ? (
            // Empty State
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-purple-100 mb-6">
                <Search className="h-12 w-12 text-purple-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">No results found</h2>
              <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                We couldn't find any content matching "<span className="font-semibold text-primary">{query}</span>". Try different keywords or browse our categories.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/">
                  <Button variant="premium" size="lg">
                    <ArrowRight className="mr-2 h-5 w-5 rotate-180" />
                    Back to Home
                  </Button>
                </Link>
                <Link to="/blog">
                  <Button variant="outline" size="lg">
                    Explore Blog
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* Products Section */}
              {filteredPosts.length > 0 && (
                <div className="mb-16">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                      <Sparkles className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                        Products & Solutions
                      </h2>
                      <p className="text-gray-600">{filteredPosts.length} {filteredPosts.length === 1 ? "result" : "results"}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPosts.map((post) => {
                      const CategoryIcon = categoryIcons[post.category?.toLowerCase()] || Sparkles;
                      return (
                        <Card
                          key={post._id}
                          className="overflow-hidden hover:shadow-2xl transition-all duration-500 group border-2 border-gray-100 hover:border-primary bg-white hover:-translate-y-2"
                        >
                          <Link to={`/post/${post._id}`}>
                            <div className="relative h-48 overflow-hidden bg-gradient-to-br from-purple-100 to-blue-100">
                              <img
                                src={post.image || "https://via.placeholder.com/400x300?text=No+Image"}
                                alt={post.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                loading="lazy"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                              {post.tag && (
                                <Badge className="absolute top-4 right-4 shadow-lg bg-primary text-white">
                                  {post.tag}
                                </Badge>
                              )}
                            </div>
                            <CardHeader>
                              <div className="flex items-center gap-2 mb-2">
                                <div className="p-1.5 rounded-lg bg-gradient-to-br from-purple-50 to-blue-50">
                                  <CategoryIcon className="h-4 w-4 text-primary" />
                                </div>
                                {post.category && (
                                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                    {post.category}
                                  </span>
                                )}
                              </div>
                              <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                                {post.title}
                              </CardTitle>
                              <CardDescription className="line-clamp-3">
                                {post.description || "No description available."}
                              </CardDescription>
                            </CardHeader>
                            <CardFooter>
                              <Button variant="ghost" className="w-full group-hover:bg-primary group-hover:text-white transition-all">
                                Read More
                                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                              </Button>
                            </CardFooter>
                          </Link>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Blogs Section */}
              {filteredBlogs.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                      <BookOpen className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                        Blog Articles
                      </h2>
                      <p className="text-gray-600">{filteredBlogs.length} {filteredBlogs.length === 1 ? "result" : "results"}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredBlogs.map((blog) => {
                      const CategoryIcon = categoryIcons[blog.category?.toLowerCase()] || BookOpen;
                      return (
                        <Card
                          key={blog._id}
                          className="overflow-hidden hover:shadow-2xl transition-all duration-500 group border-2 border-gray-100 hover:border-blue-400 bg-white hover:-translate-y-2"
                        >
                          <Link to={`/post/${blog._id}`}>
                            <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-100 to-cyan-100">
                              <img
                                src={blog.image || "https://via.placeholder.com/400x300?text=No+Image"}
                                alt={blog.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                loading="lazy"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                              <Badge className="absolute top-4 left-4 shadow-lg bg-blue-600 text-white">
                                Blog
                              </Badge>
                            </div>
                            <CardHeader>
                              <div className="flex items-center gap-2 mb-2">
                                <div className="p-1.5 rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50">
                                  <CategoryIcon className="h-4 w-4 text-blue-600" />
                                </div>
                                {blog.category && (
                                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                    {blog.category}
                                  </span>
                                )}
                              </div>
                              <CardTitle className="text-lg group-hover:text-blue-600 transition-colors line-clamp-2">
                                {blog.title}
                              </CardTitle>
                              <CardDescription className="line-clamp-3">
                                {blog.description || "No description available."}
                              </CardDescription>
                            </CardHeader>
                            <CardFooter>
                              <Button variant="ghost" className="w-full group-hover:bg-blue-600 group-hover:text-white transition-all">
                                Read Article
                                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                              </Button>
                            </CardFooter>
                          </Link>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default SearchResultsPage;
