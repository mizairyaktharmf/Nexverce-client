import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  TrendingUp,
  Shield,
  Search,
  CheckCircle2,
  Users,
  Award,
  Activity,
  Bot,
  MessageSquare,
  Sparkles,
  Zap,
  Target,
  BarChart3,
  Mail,
  Globe
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";

export default function MarketingLandingPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Stats data
  const stats = [
    { icon: Activity, label: "Tools Reviewed", value: "600+", color: "text-orange-600" },
    { icon: Users, label: "Marketers Helped", value: "15K+", color: "text-amber-600" },
    { icon: Shield, label: "ROI Verified", value: "100%", color: "text-yellow-600" },
    { icon: Award, label: "Case Studies", value: "250+", color: "text-red-600" }
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
            post.category.trim().toLowerCase() === "marketing"
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
      {/* Hero Section - Dark Orange/Amber Theme */}
      <section className="relative py-20 lg:py-28 bg-gradient-to-br from-slate-900 via-orange-900 to-amber-900 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-400 rounded-full mix-blend-overlay filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            {/* Icon */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-500 rounded-full blur-2xl opacity-60 animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-600 p-6 rounded-full shadow-2xl">
                  <TrendingUp className="h-16 w-16 text-white" strokeWidth={2} />
                </div>
              </div>
            </div>

            {/* Badge */}
            <Badge className="mb-6 bg-gradient-to-r from-orange-500 to-amber-600 text-white border-0 px-6 py-2 text-base shadow-lg">
              <Target className="h-4 w-4 mr-2" />
              Business Solutions
            </Badge>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white mb-6 leading-tight">
              Scale{" "}
              <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
                YOUR Business
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl lg:text-2xl text-orange-100 max-w-4xl mx-auto mb-10 leading-relaxed">
              Struggling to get customers? Marketing budget wasted? Don't know which tools actually work?
              We guide you from YOUR business challenge to solutions that deliver real ROI — with strategy, clarity, and results.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all duration-300 group"
                onClick={() => document.getElementById('marketing-products').scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Business Solutions
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white font-bold text-lg px-8 py-6 bg-transparent"
                onClick={() => document.getElementById('our-process').scrollIntoView({ behavior: 'smooth' })}
              >
                How We Guide You
                <Search className="ml-2 h-5 w-5" />
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => {
                const StatIcon = stat.icon;
                return (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                    <StatIcon className={`h-8 w-8 mx-auto mb-3 text-orange-400`} />
                    <div className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-orange-100 font-medium">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Our Research Process Section */}
      <section id="our-process" className="py-20 bg-gradient-to-br from-orange-50 via-white to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="premium" className="mb-4">
              <Search className="h-4 w-4 mr-2" />
              Our Evaluation Process
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              How We Evaluate Marketing Tools
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              At Nexverce, we test marketing platforms thoroughly to ensure they deliver real results for your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Search,
                title: "Market Analysis",
                description: "We research the latest marketing platforms, comparing features, pricing, and user feedback."
              },
              {
                icon: Target,
                title: "Feature Testing",
                description: "We test automation, analytics, CRM integration, and all core features in real campaigns."
              },
              {
                icon: BarChart3,
                title: "Performance Tracking",
                description: "We measure ROI, conversion rates, and campaign performance to verify effectiveness."
              },
              {
                icon: Users,
                title: "Ease of Use Check",
                description: "We evaluate the learning curve, interface design, and how quickly you can launch campaigns."
              },
              {
                icon: Globe,
                title: "Integration Compatibility",
                description: "We verify compatibility with popular platforms like Shopify, WordPress, and CRMs."
              },
              {
                icon: Award,
                title: "Expert Approval",
                description: "Our marketing specialists verify each tool meets professional standards before recommendation."
              }
            ].map((step, index) => {
              const StepIcon = step.icon;
              return (
                <Card key={index} className="border-2 border-orange-100 hover:border-orange-300 hover:shadow-xl transition-all duration-300 group">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-gradient-to-br from-orange-500 to-amber-600 p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                        <StepIcon className="h-6 w-6 text-white" />
                      </div>
                      <Badge variant="secondary" className="text-sm font-bold">
                        Step {index + 1}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl font-bold group-hover:text-orange-600 transition-colors">
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
              Every marketing tool on Nexverce is verified against our strict quality criteria
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Zap, title: "Proven ROI", desc: "Must demonstrate measurable results and positive return on investment" },
              { icon: Target, title: "Advanced Features", desc: "Comprehensive automation, analytics, and targeting capabilities" },
              { icon: Globe, title: "Easy Integration", desc: "Seamless connection with your existing tools and platforms" },
              { icon: Users, title: "User-Friendly Interface", desc: "Intuitive dashboard that doesn't require extensive training" },
              { icon: BarChart3, title: "Actionable Analytics", desc: "Clear reporting and insights to optimize your campaigns" },
              { icon: Mail, title: "Reliable Support", desc: "Responsive customer service and helpful documentation" }
            ].map((criteria, index) => {
              const CriteriaIcon = criteria.icon;
              return (
                <div key={index} className="flex items-start gap-4 p-6 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border border-orange-100 hover:shadow-lg transition-shadow">
                  <div className="bg-gradient-to-r from-orange-500 to-amber-600 p-3 rounded-lg flex-shrink-0">
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
      <section className="py-20 bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-slate-900 via-orange-900 to-amber-900 rounded-3xl p-12 md:p-16 shadow-2xl relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-400 rounded-full opacity-10 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-400 rounded-full opacity-10 blur-3xl"></div>

            <div className="relative z-10 text-center text-white">
              <div className="flex justify-center mb-6">
                <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-4 rounded-full">
                  <Bot className="h-12 w-12 text-white" />
                </div>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                AI-Powered Marketing Assistant
              </h2>

              <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-orange-100 leading-relaxed">
                We're building an intelligent AI assistant to help you choose the perfect marketing tools for your business.
                Get personalized recommendations, strategy insights, and campaign optimization tips.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
                {[
                  { icon: MessageSquare, title: "Nexverce Chatbot", desc: "Get instant tool recommendations based on your goals" },
                  { icon: Sparkles, title: "Smart Tool Matching", desc: "AI matches you with tools perfect for your niche and budget" },
                  { icon: TrendingUp, title: "Strategy Insights", desc: "Receive AI-powered marketing strategies and growth tips" }
                ].map((feature, index) => {
                  const FeatureIcon = feature.icon;
                  return (
                    <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                      <FeatureIcon className="h-8 w-8 text-orange-400 mx-auto mb-3" />
                      <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                      <p className="text-sm text-orange-100">{feature.desc}</p>
                    </div>
                  );
                })}
              </div>

              <Badge className="bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold px-6 py-2 text-sm border-0">
                <Zap className="h-4 w-4 mr-2" />
                Coming Soon
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="marketing-products" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="premium" className="mb-4">
              <TrendingUp className="h-4 w-4 mr-2" />
              Featured Tools
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Recommended Marketing Tools
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Browse our curated collection of verified marketing and business platforms
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-orange-600 border-r-transparent"></div>
              <p className="mt-4 text-gray-600">Loading marketing tools...</p>
            </div>
          ) : posts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {posts.map((post) => (
                <Link key={post._id} to={`/post/${post._id}`}>
                  <Card className="h-full overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer border border-gray-200 hover:border-orange-500 hover:scale-[1.03]">
                    <div className="relative h-44 overflow-hidden bg-gradient-to-br from-orange-100 to-amber-100">
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
                      <CardTitle className="text-base font-bold line-clamp-2 leading-tight group-hover:text-orange-600 transition-colors">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2 text-sm text-gray-600">
                        {post.description}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="flex items-center justify-between p-4 pt-0">
                      {post.price && (
                        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r from-orange-500/10 to-amber-600/10 rounded-lg">
                          <span className="text-orange-600 font-bold text-base">${post.price}</span>
                        </div>
                      )}
                      <Button variant="ghost" size="sm" className="ml-auto h-8 px-3 text-xs font-semibold group-hover:bg-orange-600 group-hover:text-white transition-all">
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
              <p className="text-gray-600">No marketing tools available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-orange-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-slate-900 via-orange-900 to-amber-900 rounded-3xl p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-amber-500/10"></div>
            <div className="relative z-10">
              <TrendingUp className="h-12 w-12 text-orange-400 mx-auto mb-6" strokeWidth={2} />
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Scale Your Marketing Today
              </h2>
              <p className="text-lg text-orange-100 mb-8">
                Join thousands of marketers who trust Nexverce to find the best tools for business growth
              </p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold px-8 py-6 shadow-xl"
                onClick={() => document.getElementById('marketing-products').scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Marketing Tools
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
