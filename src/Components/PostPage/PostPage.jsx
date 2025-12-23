import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Tag, ExternalLink, Loader2 } from "lucide-react";
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
      <div className="relative bg-gradient-to-br from-purple-50 via-white to-blue-50 border-b-2 border-gray-100 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-200/30 to-blue-200/30 rounded-full blur-3xl -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-blue-200/30 to-purple-200/30 rounded-full blur-3xl -ml-40 -mb-40"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">

          {/* Back Button and Meta - Single Line */}
          <div className="flex items-center justify-between mb-8">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="hover:bg-white/60 backdrop-blur-sm"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>

            {/* Meta Information on same line */}
            <div className="flex items-center gap-3 text-sm">
              {post.category && (
                <Link
                  to={`/category/${post.category.toLowerCase()}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200 hover:border-primary hover:bg-white transition-all group"
                >
                  <Tag className="h-3.5 w-3.5 text-primary" />
                  <span className="font-medium text-gray-700 group-hover:text-primary">{post.category}</span>
                </Link>
              )}
              {post.createdAt && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200">
                  <Calendar className="h-3.5 w-3.5 text-gray-500" />
                  <span className="text-gray-600 font-medium">{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
              )}
              {post.tag && (
                <Badge variant="premium" className="shadow-md">{post.tag}</Badge>
              )}
            </div>
          </div>

          {/* Title and Description - Using Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Left: Title & Description */}
            <div className="lg:col-span-2">
              <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-gray-900 leading-[1.15] mb-4">
                <span className="bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 bg-clip-text text-transparent">
                  {post.title}
                </span>
              </h1>

              {/* Description/Excerpt */}
              {(post.description || post.excerpt) && (
                <p className="text-base md:text-lg text-gray-600 leading-relaxed font-medium">
                  {post.description || post.excerpt}
                </p>
              )}
            </div>

            {/* Right: Quick Info Card */}
            <div className="lg:col-span-1">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl border-2 border-gray-200 p-5 shadow-lg">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Quick Info</h3>
                <div className="space-y-3 text-sm">
                  {post.category && (
                    <div className="flex items-center gap-2 text-gray-700">
                      <Tag className="h-4 w-4 text-primary" />
                      <span className="font-medium">{post.category}</span>
                    </div>
                  )}
                  {post.createdAt && (
                    <div className="flex items-center gap-2 text-gray-700">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span>{new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                  )}
                  {isProduct && post.price && (
                    <div className="pt-3 border-t border-gray-200">
                      <div className="text-3xl font-black bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
                        {symbol}{post.price}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* Main Content - Left Side */}
          <div className="lg:col-span-3">

            {/* Block Editor Content - Display exactly as created in admin */}
            {post.contentBlocks && post.contentBlocks.length > 0 ? (
              <div className="preview-content-body">
                <BlockRenderer blocks={post.contentBlocks} />
              </div>
            ) : (
              <>
                {/* Fallback: If no contentBlocks, show traditional layout */}

                {/* Featured Image */}
                {post.image && (
                  <div className="mb-8 rounded-2xl overflow-hidden shadow-2xl border-2 border-gray-100 hover:border-primary/30 transition-all">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}

                {/* Description or Excerpt */}
                {(post.description || post.excerpt) && (
                  <div className="mb-8 p-6 bg-gradient-to-r from-purple-50/50 to-blue-50/50 rounded-xl border border-gray-100">
                    <p className="text-xl text-gray-800 leading-relaxed font-medium">
                      {post.description || post.excerpt}
                    </p>
                  </div>
                )}

                {/* Legacy HTML content support */}
                {post.content && (
                  <div
                    className="prose prose-lg max-w-none mb-8"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                )}
              </>
            )}

          </div>

          {/* Sidebar - Right Side */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-6">

              {/* Price & CTA Card */}
              {isProduct && (
                <Card className="border-0 shadow-2xl overflow-hidden bg-gradient-to-br from-white via-purple-50/30 to-blue-50/30">
                  <div className="h-1.5 bg-gradient-to-r from-[#667eea] via-[#764ba2] to-[#667eea]"></div>
                  <CardContent className="p-0">
                    {/* Price Section */}
                    <div className="relative bg-gradient-to-br from-[#667eea] to-[#764ba2] p-8 text-white">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>

                      <div className="relative z-10">
                        <p className="text-sm font-semibold uppercase tracking-wider mb-2 text-white/80">Special Price</p>
                        <div className="flex items-end justify-center gap-2 mb-3">
                          {post.originalPrice && post.originalPrice > post.price && (
                            <span className="text-2xl line-through text-white/60 font-medium">
                              {symbol}{post.originalPrice}
                            </span>
                          )}
                        </div>
                        <div className="text-6xl font-black text-white mb-2 text-center tracking-tight">
                          {symbol}{post.price}
                        </div>
                        {post.originalPrice && post.originalPrice > post.price && (
                          <div className="flex justify-center">
                            <Badge className="bg-white/20 text-white border-white/30 shadow-lg backdrop-blur-sm px-3 py-1">
                              Save {Math.round(((post.originalPrice - post.price) / post.originalPrice) * 100)}%
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className="p-6">
                      {(post.affiliateLink || post.referralLink) && (
                        <a
                          href={post.affiliateLink || post.referralLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block mb-4"
                        >
                          <Button
                            variant="premium"
                            size="lg"
                            className="w-full shadow-xl hover:shadow-2xl transition-all group text-base font-bold py-6 hover:scale-105"
                          >
                            <span>Get It Now</span>
                            <ExternalLink className="ml-2 h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          </Button>
                        </a>
                      )}

                      {/* Trust Badges */}
                      <div className="flex items-center justify-center gap-4 text-xs text-gray-600 mb-4">
                        <div className="flex items-center gap-1">
                          <span className="text-green-500">✓</span>
                          <span>Verified</span>
                        </div>
                        <div className="h-4 w-px bg-gray-300"></div>
                        <div className="flex items-center gap-1">
                          <span className="text-blue-500">🔒</span>
                          <span>Secure</span>
                        </div>
                        <div className="h-4 w-px bg-gray-300"></div>
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-500">⚡</span>
                          <span>Fast</span>
                        </div>
                      </div>

                      {/* Product Features */}
                      {post.features && post.features.length > 0 && (
                        <div className="pt-4 border-t border-gray-200">
                          <h4 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide flex items-center gap-2">
                            <span className="text-primary">✨</span>
                            What's Included
                          </h4>
                          <ul className="space-y-3">
                            {post.features.slice(0, 5).map((feature, index) => (
                              <li key={index} className="flex items-start gap-3 text-sm text-gray-700">
                                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-xs mt-0.5">
                                  ✓
                                </span>
                                <span className="leading-relaxed">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Referral Link Card (Separate for non-products or additional link) */}
              {(post.affiliateLink || post.referralLink) && !isProduct && (
                <Card className="border-2 border-gray-200 shadow-lg hover:shadow-xl transition-all">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide flex items-center gap-2">
                      <ExternalLink className="h-4 w-4 text-primary" />
                      Learn More
                    </h3>
                    <a
                      href={post.affiliateLink || post.referralLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Button
                        variant="outline"
                        className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all group font-semibold"
                      >
                        Visit Link
                        <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              )}

              {/* Category Card */}
              {post.category && (
                <Card className="border-2 border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide flex items-center gap-2">
                      <Tag className="h-4 w-4 text-primary" />
                      Category
                    </h3>
                    <Link to={`/category/${post.category.toLowerCase()}`}>
                      <Button variant="outline" className="w-full hover:bg-gradient-to-r hover:from-[#667eea] hover:to-[#764ba2] hover:text-white hover:border-transparent transition-all">
                        Explore {post.category}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )}

              {/* Meta Information Card */}
              <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border border-gray-200 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wide">Post Info</h3>
                  <div className="space-y-3 text-sm">
                    {post.createdAt && (
                      <div className="flex items-center gap-2 text-gray-700">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span>{new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      </div>
                    )}
                    {post.tag && (
                      <div className="flex items-center gap-2">
                        <Badge variant="premium" className="shadow-md">{post.tag}</Badge>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
