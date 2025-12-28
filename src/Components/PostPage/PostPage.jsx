import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Tag, ExternalLink, Loader2 } from "lucide-react";
import API_BASE from "../../Config/Api";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import BlockRenderer from "../BlockRenderer";
import { trackPostView, trackAffiliateClickBackend } from "../../utils/trackingAnalytics";
import { trackPostView as trackPostViewGA, trackAffiliateClick } from "../../utils/analytics";

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

        // Track post view in both analytics systems
        if (data._id || data.id) {
          const postId = data._id || data.id;
          const postTitle = data.title || "Untitled";
          const postCategory = data.category || "Uncategorized";

          // Track in backend analytics
          trackPostView(postId);

          // Track in Google Analytics
          trackPostViewGA(postId, postTitle, postCategory);
        }
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

  // Handle affiliate link click
  const handleAffiliateClick = (affiliateUrl) => {
    if (post && (post._id || post.id)) {
      const postId = post._id || post.id;
      const postTitle = post.title || "Untitled";

      // Track in backend analytics
      trackAffiliateClickBackend(postId, affiliateUrl);

      // Track in Google Analytics
      trackAffiliateClick(affiliateUrl, postTitle);
    }
  };

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
      <div className="relative bg-gradient-to-br from-purple-50 via-white to-blue-50 border-b border-gray-200 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-200/30 to-blue-200/30 rounded-full blur-3xl -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-blue-200/30 to-purple-200/30 rounded-full blur-3xl -ml-40 -mb-40"></div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">

          {/* Back Button */}
          <div className="mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="hover:bg-white/60 backdrop-blur-sm text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </div>

          {/* Category and Tag Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            {post.category && (
              <Link
                to={`/category/${post.category.toLowerCase()}`}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-md border border-gray-300 hover:border-primary hover:bg-white transition-all group text-sm font-medium"
              >
                <Tag className="h-3.5 w-3.5 text-primary" />
                <span className="text-gray-700 group-hover:text-primary">{post.category}</span>
              </Link>
            )}
            {post.tag && (
              <Badge variant="premium" className="shadow-sm text-sm px-3 py-1">{post.tag}</Badge>
            )}
          </div>

          {/* Title - Enhanced Typography */}
          <div className="max-w-full pr-0">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight mb-6 bg-gradient-to-r from-gray-900 via-[#667eea] to-gray-900 bg-clip-text text-transparent" style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif' }}>
              {post.title}
            </h1>

            {/* Meta Information Row */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-gray-600 mb-8 pb-8 border-b border-gray-200">
              {post.createdAt && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <time dateTime={new Date(post.createdAt).toISOString()} className="font-medium">
                    {new Date(post.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                </div>
              )}
              {isProduct && post.price && (
                <div className="flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-primary/10 to-purple-600/10 rounded-md border border-primary/20">
                  <span className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                    {symbol}{post.price}
                  </span>
                </div>
              )}
            </div>

            {/* Description/Excerpt - Enhanced */}
            {(post.description || post.excerpt) && (
              <div className="prose prose-lg max-w-none">
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-normal">
                  {post.description || post.excerpt}
                </p>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* Sidebar - Right Side */}
          <div className="lg:col-span-1 order-first lg:order-last">
            <div className="sticky top-20 space-y-6">

              {/* Featured Image Card */}
              {post.image && (
                <Card className="overflow-hidden border-2 border-gray-100 shadow-lg hover:shadow-xl transition-all">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-auto object-cover"
                  />
                </Card>
              )}

              {/* Price & CTA Card */}
              {isProduct && (
                <Card className="border-2 border-gray-100 shadow-lg overflow-hidden">
                  <CardContent className="p-0">
                    {/* Price Section with Brand Colors */}
                    <div className="bg-gradient-to-br from-[#667eea] to-[#764ba2] p-6 text-white">
                      <div className="text-center">
                        <p className="text-xs font-bold uppercase tracking-widest mb-1 text-white/90">Price</p>
                        <div className="text-5xl font-black text-white mb-1">
                          {symbol}{post.price}
                        </div>
                        {post.originalPrice && post.originalPrice > post.price && (
                          <>
                            <p className="text-sm line-through text-white/70 mb-2">
                              {symbol}{post.originalPrice}
                            </p>
                            <Badge className="bg-white text-primary font-bold text-xs px-3 py-1">
                              {Math.round(((post.originalPrice - post.price) / post.originalPrice) * 100)}% OFF
                            </Badge>
                          </>
                        )}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className="p-5 bg-white">
                      {(post.affiliateLink || post.referralLink) && (
                        <a
                          href={post.affiliateLink || post.referralLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block"
                          onClick={() => handleAffiliateClick(post.affiliateLink || post.referralLink)}
                        >
                          <Button
                            variant="premium"
                            size="lg"
                            className="w-full shadow-lg hover:shadow-xl transition-all group text-base font-bold py-5"
                          >
                            <span>Enroll Now</span>
                            <ExternalLink className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </a>
                      )}

                      {/* Trust Indicators */}
                      <div className="grid grid-cols-3 gap-2 mt-4 text-center text-xs">
                        <div className="flex flex-col items-center">
                          <span className="text-green-500 text-lg mb-1">✓</span>
                          <span className="text-gray-600 font-medium">Verified</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="text-blue-500 text-lg mb-1">🔒</span>
                          <span className="text-gray-600 font-medium">Secure</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="text-yellow-500 text-lg mb-1">⚡</span>
                          <span className="text-gray-600 font-medium">Fast</span>
                        </div>
                      </div>

                      {/* Product Features - Clean List */}
                      {post.features && post.features.length > 0 && (
                        <div className="pt-5 border-t border-gray-200">
                          <h4 className="font-bold text-gray-900 mb-3 text-sm">
                            This course includes:
                          </h4>
                          <ul className="space-y-2.5">
                            {post.features.slice(0, 6).map((feature, index) => (
                              <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                                <span className="flex-shrink-0 w-4 h-4 rounded-sm bg-green-500 flex items-center justify-center text-white font-bold text-xs mt-0.5">
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
                      onClick={() => handleAffiliateClick(post.affiliateLink || post.referralLink)}
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

          {/* Main Content - Left Side */}
          <div className="lg:col-span-3">

            {/* Block Editor Content - Display exactly as created in admin */}
            {post.contentBlocks && post.contentBlocks.length > 0 ? (
              <div className="preview-content-body bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <BlockRenderer blocks={post.contentBlocks} />
              </div>
            ) : (
              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                {/* Fallback: If no contentBlocks, show traditional layout */}

                {/* Description or Excerpt */}
                {(post.description || post.excerpt) && (
                  <div className="mb-6 p-5 bg-gradient-to-r from-purple-50/50 to-blue-50/50 rounded-lg border border-gray-200">
                    <p className="text-lg text-gray-800 leading-relaxed">
                      {post.description || post.excerpt}
                    </p>
                  </div>
                )}

                {/* Legacy HTML content support */}
                {post.content && (
                  <div
                    className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                )}
              </div>
            )}

          </div>
        </div>
      </div>
    </article>
  );
}
