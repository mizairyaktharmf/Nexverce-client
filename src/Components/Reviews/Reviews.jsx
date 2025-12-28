import { Star, ArrowRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export default function Reviews({ blogs }) {
  // Show only first 6 blogs
  const reviewBlogs = blogs.slice(0, 6);

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-200/20 to-blue-200/20 rounded-full blur-3xl -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-blue-200/20 to-purple-200/20 rounded-full blur-3xl -ml-40 -mb-40"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-gradient-to-r from-primary to-purple-600 text-white border-0 px-4 py-1.5 shadow-lg">
            <Star className="h-3.5 w-3.5 mr-1.5 fill-white" />
            Reviews & Insights
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Expert{" "}
            <span className="bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
              Reviews
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            In-depth reviews and insights from our team of experts
          </p>
        </div>

        {/* Reviews Grid */}
        {reviewBlogs.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 mb-6">
              <BookOpen className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No reviews yet</h3>
            <p className="text-lg text-gray-600 max-w-md mx-auto">
              Check back soon for expert reviews and insights
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviewBlogs.map((blog) => (
              <Link to={`/post/${blog._id}`} key={blog._id}>
                <Card className="h-full overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer border-2 border-gray-100 hover:border-primary/50 hover:scale-105 flex flex-col bg-white">

                  {/* Image */}
                  {blog.image ? (
                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-purple-100 to-blue-100 flex-shrink-0">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Tag Badge */}
                      {blog.tag && (
                        <Badge variant="premium" className="absolute top-4 right-4 shadow-lg">
                          {blog.tag}
                        </Badge>
                      )}

                      {/* Review Star Icon */}
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                        <Star className="h-4 w-4 text-primary fill-primary" />
                      </div>
                    </div>
                  ) : (
                    <div className="relative h-48 bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center flex-shrink-0">
                      <BookOpen className="h-16 w-16 text-primary/40" />

                      {/* Tag Badge on empty state */}
                      {blog.tag && (
                        <Badge variant="premium" className="absolute top-4 right-4 shadow-lg">
                          {blog.tag}
                        </Badge>
                      )}
                    </div>
                  )}

                  {/* Content */}
                  <CardHeader className="space-y-3 flex-grow p-6">
                    {blog.category && (
                      <div className="flex items-center gap-1.5 text-sm text-gray-500">
                        <span className="font-medium">{blog.category}</span>
                      </div>
                    )}
                    <CardTitle className="text-xl font-bold line-clamp-2 group-hover:bg-gradient-to-r group-hover:from-[#667eea] group-hover:to-[#764ba2] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                      {blog.title}
                    </CardTitle>
                    {(blog.excerpt || blog.description) && (
                      <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                        {blog.excerpt || blog.description}
                      </p>
                    )}
                    {blog.readingTime && (
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <BookOpen className="h-3.5 w-3.5" />
                        <span>{blog.readingTime}</span>
                      </div>
                    )}
                  </CardHeader>

                  {/* Footer */}
                  <CardFooter className="pt-0 pb-6 px-6 mt-auto">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full group-hover:bg-gradient-to-r group-hover:from-[#667eea] group-hover:to-[#764ba2] group-hover:text-white group-hover:border-transparent transition-all duration-300 font-semibold border-2"
                    >
                      Read Review
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {/* View All Reviews Link */}
        {reviewBlogs.length > 0 && (
          <div className="text-center mt-12">
            <Link to="/blogs">
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-primary text-primary hover:bg-gradient-to-r hover:from-[#667eea] hover:to-[#764ba2] hover:text-white hover:border-transparent transition-all duration-300 font-semibold px-8"
              >
                View All Reviews
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        )}

      </div>
    </section>
  );
}
