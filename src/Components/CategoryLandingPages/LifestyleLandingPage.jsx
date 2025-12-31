import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Film,
  Shield,
  Search,
  CheckCircle2,
  Users,
  Award,
  Activity,
  Bot,
  MessageSquare,
  Sparkles,
  TrendingUp,
  Zap,
  Gamepad2,
  Music,
  Tv,
  Star,
  Target
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";

export default function LifestyleLandingPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Stats data
  const stats = [
    { icon: Activity, label: "Platforms Tested", value: "400+", color: "text-pink-600" },
    { icon: Users, label: "Entertainment Fans", value: "30K+", color: "text-rose-600" },
    { icon: Shield, label: "Quality Verified", value: "100%", color: "text-fuchsia-600" },
    { icon: Award, label: "Expert Reviews", value: "350+", color: "text-purple-600" }
  ];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const baseUrl = import.meta.env.MODE === "development"
          ? "http://localhost:5000/api"
          : "https://nexverce-backend.onrender.com/api";

        const [postsResponse, blogsResponse] = await Promise.all([
          fetch(`${baseUrl}/posts`),
          fetch(`${baseUrl}/blogs`)
        ]);

        const postsData = await postsResponse.json();
        const blogsData = await blogsResponse.json();
        const allContent = [...postsData, ...blogsData];

        const filtered = allContent.filter(
          (post) =>
            post.status === "published" &&
            post.category &&
            post.category.trim().toLowerCase() === "lifestyle"
        );

        setPosts(filtered);
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Dark Pink/Purple/Fuchsia Theme */}
      <section className="relative min-h-screen flex items-center py-20 bg-gradient-to-br from-slate-900 via-fuchsia-900 to-purple-900 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-fuchsia-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-400 rounded-full mix-blend-overlay filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-400 to-purple-500 rounded-full blur-2xl opacity-60 animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-fuchsia-500 via-purple-500 to-pink-600 p-5 rounded-full shadow-2xl">
                  <Film className="h-12 w-12 text-white" strokeWidth={2} />
                </div>
              </div>
            </div>

            {/* Badge */}
            <Badge className="mb-4 bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white border-0 px-6 py-2 text-base shadow-lg">
              <Target className="h-4 w-4 mr-2" />
              Lifestyle Solutions
            </Badge>

            {/* Heading */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
              Enhance{" "}
              <span className="bg-gradient-to-r from-fuchsia-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                YOUR Lifestyle
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base md:text-lg lg:text-xl text-fuchsia-100 max-w-4xl mx-auto mb-6 leading-relaxed">
              Too many streaming options? Gaming library overwhelming? Want entertainment that matches YOUR taste?
              We guide you from YOUR preferences to the perfect platforms — with value, variety, and zero regrets.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Button
                size="lg"
                className="bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:from-fuchsia-600 hover:to-purple-700 text-white font-bold text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all duration-300 group"
                onClick={() => document.getElementById('entertainment-products').scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Lifestyle Solutions
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-fuchsia-400 text-fuchsia-400 hover:bg-fuchsia-400 hover:text-white font-bold text-lg px-8 py-6 bg-transparent"
                onClick={() => document.getElementById('our-process').scrollIntoView({ behavior: 'smooth' })}
              >
                How We Guide You
                <Search className="ml-2 h-5 w-5" />
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {stats.map((stat, index) => {
                const StatIcon = stat.icon;
                return (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20">
                    <StatIcon className={`h-6 w-6 mx-auto mb-2 text-fuchsia-400`} />
                    <div className="text-2xl font-bold bg-gradient-to-r from-fuchsia-400 to-purple-400 bg-clip-text text-transparent mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs text-fuchsia-100 font-medium">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Our Research Process Section */}
      <section id="our-process" className="py-20 bg-gradient-to-br from-fuchsia-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="premium" className="mb-4">
              <Search className="h-4 w-4 mr-2" />
              Our Review Methodology
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              How We Evaluate Entertainment Platforms
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              At Nexverce, we test streaming services and entertainment platforms to ensure they deliver quality content and value.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Search,
                title: "Platform Comparison",
                description: "We analyze content libraries, exclusive releases, and pricing across all major streaming and gaming platforms."
              },
              {
                icon: Tv,
                title: "Content Quality Review",
                description: "We evaluate video quality, audio options, original content, and overall catalog diversity."
              },
              {
                icon: Gamepad2,
                title: "Performance Testing",
                description: "We test streaming speed, loading times, offline features, and cross-device compatibility."
              },
              {
                icon: Users,
                title: "User Experience Check",
                description: "We assess interface design, search functionality, recommendations, and ease of navigation."
              },
              {
                icon: Star,
                title: "Value Assessment",
                description: "We compare subscription costs, available plans, family sharing, and special features."
              },
              {
                icon: Award,
                title: "Expert Verification",
                description: "Our entertainment specialists provide final ratings based on quality and overall experience."
              }
            ].map((step, index) => {
              const StepIcon = step.icon;
              return (
                <Card key={index} className="border-2 border-fuchsia-100 hover:border-fuchsia-300 hover:shadow-xl transition-all duration-300 group">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-gradient-to-br from-fuchsia-500 to-purple-600 p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                        <StepIcon className="h-6 w-6 text-white" />
                      </div>
                      <Badge variant="secondary" className="text-sm font-bold">
                        Step {index + 1}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl font-bold group-hover:text-fuchsia-600 transition-colors">
                      {step.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 leading-relaxed">
                      {step.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Selection Criteria Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="premium" className="mb-4">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Quality Standards
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              What We Look For
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Every entertainment platform on Nexverce is verified for quality and value
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Star, title: "Premium Content", desc: "Extensive library with exclusive originals and popular titles" },
              { icon: Tv, title: "HD/4K Quality", desc: "High-definition streaming with support for 4K and HDR content" },
              { icon: Gamepad2, title: "Multi-Device Access", desc: "Seamless streaming across TV, mobile, tablet, and desktop" },
              { icon: Music, title: "Diverse Catalog", desc: "Wide variety of genres, languages, and entertainment options" },
              { icon: Zap, title: "Fast Streaming", desc: "Minimal buffering with adaptive quality and offline downloads" },
              { icon: Users, title: "Family Features", desc: "Multiple profiles, parental controls, and family-friendly plans" }
            ].map((criteria, index) => {
              const CriteriaIcon = criteria.icon;
              return (
                <div key={index} className="flex items-start gap-4 p-6 bg-gradient-to-br from-fuchsia-50 to-purple-50 rounded-xl border border-fuchsia-100 hover:shadow-lg transition-shadow">
                  <div className="bg-gradient-to-r from-fuchsia-500 to-purple-600 p-3 rounded-lg flex-shrink-0">
                    <CriteriaIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-1">{criteria.title}</h3>
                    <p className="text-gray-600 text-sm">{criteria.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Future with AI Section */}
      <section className="py-20 bg-gradient-to-br from-fuchsia-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-slate-900 via-fuchsia-900 to-purple-900 rounded-3xl p-12 md:p-16 shadow-2xl relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-400 rounded-full opacity-10 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-400 rounded-full opacity-10 blur-3xl"></div>

            <div className="relative z-10 text-center text-white">
              <div className="flex justify-center mb-6">
                <div className="bg-gradient-to-r from-fuchsia-500 to-purple-500 p-4 rounded-full">
                  <Bot className="h-12 w-12 text-white" />
                </div>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                AI-Powered Entertainment Guide
              </h2>

              <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-fuchsia-100 leading-relaxed">
                We're developing an intelligent AI assistant to help you find the perfect entertainment for your mood.
                Get personalized recommendations, discover hidden gems, and never waste time scrolling.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
                {[
                  { icon: MessageSquare, title: "Nexverce Chatbot", desc: "Ask for recommendations based on your mood and preferences" },
                  { icon: Sparkles, title: "Smart Discovery", desc: "AI suggests shows, movies, and games tailored to your taste" },
                  { icon: TrendingUp, title: "Trend Alerts", desc: "Stay updated with trending content across all platforms" }
                ].map((feature, index) => {
                  const FeatureIcon = feature.icon;
                  return (
                    <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                      <FeatureIcon className="h-8 w-8 text-fuchsia-400 mx-auto mb-3" />
                      <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                      <p className="text-sm text-fuchsia-100">{feature.desc}</p>
                    </div>
                  );
                })}
              </div>

              <Badge className="bg-gradient-to-r from-fuchsia-500 to-purple-500 text-white font-bold px-6 py-2 text-sm border-0">
                <Zap className="h-4 w-4 mr-2" />
                Coming Soon
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="entertainment-products" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="premium" className="mb-4">
              <Film className="h-4 w-4 mr-2" />
              Featured Platforms
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Recommended Entertainment
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Browse our curated collection of verified streaming and gaming platforms
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-fuchsia-600 border-r-transparent"></div>
              <p className="mt-4 text-gray-600">Loading entertainment platforms...</p>
            </div>
          ) : posts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {posts.map((post) => (
                <Link key={post._id} to={`/post/${post._id}`}>
                  <Card className="h-full overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer border border-gray-200 hover:border-fuchsia-500 hover:scale-[1.03]">
                    <div className="relative h-44 overflow-hidden bg-gradient-to-br from-fuchsia-100 to-purple-100">
                      <img
                        src={post.image || "https://via.placeholder.com/400x300"}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {(post.tag || post.tags?.[0]) && (
                        <Badge variant="premium" className="absolute top-3 right-3 text-xs shadow-lg">
                          {post.tag || post.tags?.[0]}
                        </Badge>
                      )}
                    </div>
                    <CardHeader className="space-y-2 p-4">
                      <CardTitle className="text-base font-bold line-clamp-2 leading-tight group-hover:text-fuchsia-600 transition-colors">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2 text-sm text-gray-600">
                        {post.description}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="flex items-center justify-between p-4 pt-0">
                      {post.price && (
                        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r from-fuchsia-500/10 to-purple-600/10 rounded-lg">
                          <span className="text-fuchsia-600 font-bold text-base">${post.price}</span>
                        </div>
                      )}
                      <Button variant="ghost" size="sm" className="ml-auto h-8 px-3 text-xs font-semibold group-hover:bg-fuchsia-600 group-hover:text-white transition-all">
                        View
                        <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                      </Button>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No entertainment platforms available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-fuchsia-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-slate-900 via-fuchsia-900 to-purple-900 rounded-3xl p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/10 to-purple-500/10"></div>
            <div className="relative z-10">
              <Film className="h-12 w-12 text-fuchsia-400 mx-auto mb-6" strokeWidth={2} />
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Upgrade Your Entertainment
              </h2>
              <p className="text-lg text-fuchsia-100 mb-8">
                Join thousands of entertainment lovers who trust Nexverce to find the best streaming and gaming platforms
              </p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-fuchsia-500 to-purple-500 hover:from-fuchsia-600 hover:to-purple-600 text-white font-bold px-8 py-6 shadow-xl"
                onClick={() => document.getElementById('entertainment-products').scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Entertainment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
