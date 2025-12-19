import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BookOpen, ArrowRight, Folder } from "lucide-react";
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
    <section className="min-h-screen py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <BookOpen className="h-8 w-8 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Nexverce Blogs</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
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
          <div className="text-center py-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No blogs found</h3>
            <p className="text-gray-600">Check back later for new content!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map((blog) => (
              <Link to={`/post/${blog._id}`} key={blog._id}>
                <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer border-2 hover:border-primary">
                  {/* IMAGE */}
                  {blog.image ? (
                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-purple-100 to-blue-100">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      {blog.tag && (
                        <Badge variant="premium" className="absolute top-3 right-3">
                          {blog.tag}
                        </Badge>
                      )}
                    </div>
                  ) : (
                    <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-500">
                      <BookOpen className="h-12 w-12" />
                    </div>
                  )}

                  {/* CONTENT */}
                  <CardHeader>
                    <CardTitle className="text-xl line-clamp-2 group-hover:text-primary transition-colors">
                      {blog.title}
                    </CardTitle>
                    {blog.description && (
                      <CardDescription className="line-clamp-3">
                        {blog.description}
                      </CardDescription>
                    )}
                  </CardHeader>

                  <CardFooter className="flex items-center justify-between">
                    {blog.category && (
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Folder className="h-4 w-4" />
                        <span>{blog.category}</span>
                      </div>
                    )}
                    <Button variant="ghost" size="sm" className="ml-auto group-hover:text-primary">
                      Read More
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
