import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BookOpen, ArrowRight, Folder, Sparkles, Calendar, Clock } from "lucide-react";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

// Use local backend in development, production in production
const API_BASE =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/blogs"
    : "https://nexverce-backend.onrender.com/api/blogs";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all"); // all, category filter

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await fetch(API_BASE);
        if (!res.ok) throw new Error("Failed to fetch blogs");

        const data = await res.json();

        // Only show published blogs
        const published = data.filter((blog) => blog.status === "published");
        setBlogs(published);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Get unique categories from blogs
  const categories = [...new Set(blogs.map((blog) => blog.category))].filter(Boolean);

  // Filter blogs
  const filteredBlogs =
    filter === "all"
      ? blogs
      : blogs.filter((blog) => blog.category === filter);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
          <h2 className="mt-4 text-lg font-medium text-gray-600">Loading blogs...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-red-600 mb-4">Error: {error}</h2>
          <Link to="/">
            <Button variant="premium">
              ← Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen py-20 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* HEADER */}
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-gradient-to-r from-primary to-purple-600 text-white border-0 px-4 py-1.5 shadow-lg">
            <BookOpen className="h-3.5 w-3.5 mr-1.5" />
            Blog Center
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Nexverce Blogs
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover insights, guides, and stories from our experts
          </p>
        </div>

        {/* FILTERS */}
        {categories.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <Button
              variant={filter === "all" ? "premium" : "outline"}
              size="sm"
              onClick={() => setFilter("all")}
            >
              All
            </Button>
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={filter === cat ? "premium" : "outline"}
                size="sm"
                onClick={() => setFilter(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
        )}

        {/* BLOG GRID */}
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-primary/10 to-purple-600/10 mb-6">
              <Sparkles className="h-12 w-12 text-primary" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-3">No blogs found</h3>
            <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
              Check back later for new content! We're working on bringing you amazing stories.
            </p>
            <Link to="/">
              <Button className="bg-gradient-to-r from-primary to-purple-600 hover:from-purple-600 hover:to-primary text-white shadow-lg">
                <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
                Back to Home
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <Link to={`/post/${blog._id}`} key={blog._id}>
                <Card className="h-full overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group cursor-pointer border-2 border-gray-100 hover:border-primary/50 bg-white">
                  {/* IMAGE */}
                  {blog.image ? (
                    <div className="relative h-56 overflow-hidden bg-gradient-to-br from-primary/5 to-purple-600/5">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {blog.tag && (
                        <Badge className="absolute top-3 right-3 bg-primary text-white border-0 shadow-lg">
                          {blog.tag}
                        </Badge>
                      )}
                    </div>
                  ) : (
                    <div className="h-56 bg-gradient-to-br from-primary/10 to-purple-600/10 flex items-center justify-center">
                      <BookOpen className="h-16 w-16 text-primary/40" />
                    </div>
                  )}

                  {/* CONTENT */}
                  <CardHeader className="pb-4">
                    {blog.category && (
                      <div className="flex items-center gap-1.5 text-sm text-primary mb-2">
                        <Folder className="h-4 w-4" />
                        <span className="font-medium">{blog.category}</span>
                      </div>
                    )}
                    <CardTitle className="text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors duration-300 leading-tight">
                      {blog.title}
                    </CardTitle>
                    {blog.description && (
                      <CardDescription className="line-clamp-3 text-gray-600 leading-relaxed mt-2">
                        {blog.description}
                      </CardDescription>
                    )}
                  </CardHeader>

                  <CardFooter className="pt-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full group-hover:bg-primary/5 group-hover:text-primary transition-all duration-300 font-semibold"
                    >
                      Read Full Article
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
