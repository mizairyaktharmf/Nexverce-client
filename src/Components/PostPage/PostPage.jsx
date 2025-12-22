import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Tag, DollarSign, ExternalLink, Loader2 } from "lucide-react";
import API_BASE from "../../Config/Api";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import BlockRenderer from "../BlockRenderer";

export default function PostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Currency symbols
  const currencySymbols = {
    USD: "$",
    EUR: "€",
    AED: "د.إ",
    LKR: "Rs ",
    JPY: "¥",
    INR: "₹",
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE}/${id}`);

        if (!response.ok) {
          throw new Error("Post not found");
        }

        const data = await response.json();
        setPost(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-gray-600">Loading post...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Post Not Found</h2>
          <p className="text-gray-600 mb-6">{error || "The post you're looking for doesn't exist."}</p>
          <Button variant="premium" onClick={() => navigate("/")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const symbol = currencySymbols[post.currency] || "";
  const isProduct = post.price !== undefined && post.price !== null;

  return (
    <article className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-50 via-white to-blue-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

          {/* Back Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            {post.category && (
              <div className="flex items-center gap-1">
                <Tag className="h-4 w-4" />
                <Link to={`/category/${post.category.toLowerCase()}`} className="hover:text-primary">
                  {post.category}
                </Link>
              </div>
            )}
            {post.createdAt && (
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              </div>
            )}
            {post.tag && (
              <Badge variant="premium">{post.tag}</Badge>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Featured Image */}
            {post.image && (
              <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-auto object-cover"
                />
              </div>
            )}

            {/* Description or Excerpt */}
            {(post.description || post.excerpt) && (
              <div className="mb-8">
                <p className="text-lg text-gray-700 leading-relaxed">
                  {post.description || post.excerpt}
                </p>
              </div>
            )}

            {/* Rich Content (for blogs/products with contentBlocks) */}
            {post.contentBlocks && post.contentBlocks.length > 0 && (
              <div className="prose prose-lg max-w-none mb-8">
                <BlockRenderer blocks={post.contentBlocks} />
              </div>
            )}

            {/* Legacy HTML content support (if no contentBlocks) */}
            {(!post.contentBlocks || post.contentBlocks.length === 0) && post.content && (
              <div
                className="prose prose-lg max-w-none mb-8"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            )}

            {/* Product Details */}
            {isProduct && (
              <Card className="mb-8 border-2 border-primary/20">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Details</h2>
                  {post.features && post.features.length > 0 && (
                    <div className="mb-4">
                      <h3 className="font-semibold text-gray-900 mb-2">Features:</h3>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        {post.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">

              {/* Price Card (for products) */}
              {isProduct && (
                <Card className="mb-6 border-2 border-primary shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 text-3xl font-bold text-primary mb-4">
                      <DollarSign className="h-8 w-8" />
                      <span>{symbol}{post.price}</span>
                    </div>

                    {(post.affiliateLink || post.referralLink) && (
                      <a
                        href={post.affiliateLink || post.referralLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="premium" size="lg" className="w-full shadow-lg hover:shadow-xl transition-all">
                          Buy Now
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                      </a>
                    )}

                    {post.originalPrice && post.originalPrice > post.price && (
                      <div className="mt-4 text-center">
                        <p className="text-sm text-gray-600">Original Price:</p>
                        <p className="text-lg line-through text-gray-400">{symbol}{post.originalPrice}</p>
                        <Badge variant="destructive" className="mt-2">
                          Save {Math.round(((post.originalPrice - post.price) / post.originalPrice) * 100)}%
                        </Badge>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Category Link */}
              {post.category && (
                <Card className="border border-gray-200">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-3">Category</h3>
                    <Link to={`/category/${post.category.toLowerCase()}`}>
                      <Button variant="outline" className="w-full">
                        Explore {post.category}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
