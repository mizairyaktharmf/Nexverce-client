import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  DollarSign,
  Shield,
  Search,
  CheckCircle,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Users,
  Award,
  Zap,
  Target,
  Lock,
  Eye,
  BarChart3,
  ClipboardCheck,
  Bot,
  MessageSquare,
  Wallet,
  PiggyBank,
  LineChart,
  CircleDollarSign,
} from "lucide-react";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export default function FinanceLandingPage() {
  const navigate = useNavigate();
  const [financePosts, setFinancePosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFinancePosts = async () => {
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
            post.category.trim().toLowerCase() === "finance"
        );

        setFinancePosts(filtered);
      } catch (err) {
        console.error("Failed to fetch finance posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFinancePosts();
  }, []);

  const researchProcess = [
    {
      icon: Search,
      title: "Market Research",
      description: "We monitor 30+ financial platforms, fintech apps, and investment tools daily to discover innovative solutions.",
      gradient: "from-blue-600 to-cyan-600",
      bgGradient: "from-blue-50 to-cyan-50"
    },
    {
      icon: Shield,
      title: "Security Verification",
      description: "We verify regulatory compliance, encryption standards, data protection, and security certifications.",
      gradient: "from-cyan-600 to-teal-600",
      bgGradient: "from-cyan-50 to-teal-50"
    },
    {
      icon: BarChart3,
      title: "Performance Analysis",
      description: "Our financial experts analyze features, fees, returns, user experience, and market reputation.",
      gradient: "from-teal-600 to-emerald-600",
      bgGradient: "from-teal-50 to-emerald-50"
    },
    {
      icon: ClipboardCheck,
      title: "Due Diligence",
      description: "Every platform undergoes strict evaluation: licensing, transparency, customer support, and track record.",
      gradient: "from-emerald-600 to-green-600",
      bgGradient: "from-emerald-50 to-green-50"
    },
    {
      icon: CheckCircle,
      title: "Expert Reviews",
      description: "We create detailed comparisons with pricing, pros, cons, features, and honest recommendations.",
      gradient: "from-green-600 to-lime-600",
      bgGradient: "from-green-50 to-lime-50"
    },
    {
      icon: Award,
      title: "Trusted Publication",
      description: "Only the most secure, reliable, and valuable financial tools make it to Nexverce.",
      gradient: "from-amber-600 to-yellow-600",
      bgGradient: "from-amber-50 to-yellow-50"
    }
  ];

  const stats = [
    { icon: LineChart, label: "Financial Tools Reviewed", value: "400+", color: "text-blue-600" },
    { icon: Users, label: "Investors Served", value: "15K+", color: "text-emerald-600" },
    { icon: Shield, label: "Security Verified", value: "100%", color: "text-cyan-600" },
    { icon: Award, label: "Expert Ratings", value: "250+", color: "text-amber-600" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Blue/Gold/Green Theme */}
      <section className="relative py-20 lg:py-28 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-400 rounded-full mix-blend-overlay filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            {/* Icon */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full blur-2xl opacity-60 animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 p-6 rounded-full shadow-2xl">
                  <DollarSign className="h-16 w-16 text-white" strokeWidth={2} />
                </div>
              </div>
            </div>

            {/* Badge */}
            <Badge className="mb-6 bg-gradient-to-r from-amber-500 to-yellow-600 text-white border-0 px-6 py-2 text-base shadow-lg">
              <Shield className="h-4 w-4 mr-2" />
              Verified Financial & Investment Tools
            </Badge>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white mb-6 leading-tight">
              Build Your Wealth with{" "}
              <span className="bg-gradient-to-r from-amber-400 via-yellow-400 to-emerald-400 bg-clip-text text-transparent">
                Trusted Financial Tools
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl lg:text-2xl text-blue-100 max-w-4xl mx-auto mb-10 leading-relaxed">
              Discover secure investment platforms, budgeting apps, and financial tools —
              rigorously vetted, security-verified, and recommended by our expert financial analysts at Nexverce.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white font-bold text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all duration-300 group"
                onClick={() => document.getElementById('finance-products').scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Financial Tools
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-white font-bold text-lg px-8 py-6 bg-transparent"
                onClick={() => document.getElementById('our-process').scrollIntoView({ behavior: 'smooth' })}
              >
                Our Vetting Process
                <Search className="ml-2 h-5 w-5" />
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => {
                const StatIcon = stat.icon;
                return (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                    <StatIcon className={`h-8 w-8 mx-auto mb-3 text-amber-400`} />
                    <div className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-blue-100 font-medium">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Our Research Process Section */}
      <section id="our-process" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-0 px-4 py-1.5 shadow-lg">
              <Target className="h-4 w-4 mr-2" />
              Our Process
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              How We Vet{" "}
              <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent">
                Financial Products
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive 6-step process ensures only secure, reliable, and valuable financial tools reach you
            </p>
          </div>

          {/* Process Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {researchProcess.map((step, index) => {
              const StepIcon = step.icon;
              return (
                <Card
                  key={index}
                  className="relative overflow-hidden border-2 border-gray-100 hover:border-blue-400 transition-all duration-300 hover:shadow-2xl group"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

                  <CardHeader className="relative z-10 p-6">
                    {/* Step Number */}
                    <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
                      <span className="text-blue-700 font-bold text-sm">{index + 1}</span>
                    </div>

                    {/* Icon */}
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.gradient} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                      <StepIcon className="h-7 w-7 text-white" />
                    </div>

                    {/* Title */}
                    <CardTitle className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">
                      {step.title}
                    </CardTitle>

                    {/* Description */}
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
            <Badge className="mb-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-0 px-4 py-1.5 shadow-lg">
              <CheckCircle className="h-4 w-4 mr-2" />
              Quality Standards
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What We Evaluate in{" "}
              <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                Every Financial Tool
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Lock, title: "Security & Compliance", desc: "Bank-level encryption, regulatory licenses (SEC, FINRA), and data protection standards", color: "from-blue-600 to-cyan-600" },
              { icon: Award, title: "Track Record", desc: "Company history, financial stability, audit reports, and industry reputation", color: "from-cyan-600 to-teal-600" },
              { icon: Users, title: "User Trust", desc: "Verified customer reviews, ratings, testimonials, and independent third-party assessments", color: "from-teal-600 to-emerald-600" },
              { icon: CircleDollarSign, title: "Fees & Transparency", desc: "Clear pricing structure, hidden fees analysis, and value-for-money evaluation", color: "from-emerald-600 to-green-600" },
              { icon: Zap, title: "Platform Quality", desc: "User interface, mobile app performance, customer support, and ease of use", color: "from-green-600 to-lime-600" },
              { icon: TrendingUp, title: "Performance", desc: "ROI potential, feature set, integration capabilities, and growth tools", color: "from-amber-600 to-yellow-600" }
            ].map((criteria, index) => {
              const CriteriaIcon = criteria.icon;
              return (
                <div
                  key={index}
                  className="flex items-start gap-4 p-6 bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-blue-100 hover:border-blue-400 group"
                >
                  <div className={`flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br ${criteria.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <CriteriaIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-1 group-hover:text-blue-700 transition-colors">
                      {criteria.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{criteria.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Future with AI Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 rounded-3xl p-12 md:p-16 shadow-2xl relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400 rounded-full opacity-10 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-400 rounded-full opacity-10 blur-3xl"></div>

            <div className="relative z-10 text-center text-white">
              <div className="flex justify-center mb-6">
                <div className="bg-gradient-to-r from-amber-500 to-yellow-500 p-4 rounded-full">
                  <Bot className="h-12 w-12 text-white" />
                </div>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                AI-Powered Financial Advisor
              </h2>

              <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-blue-100 leading-relaxed">
                We're developing an intelligent AI assistant that will transform how you discover and manage financial tools.
                Get personalized investment recommendations, portfolio insights, and expert financial guidance — powered by cutting-edge AI.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
                {[
                  { icon: MessageSquare, title: "Smart Financial Advisor", desc: "24/7 AI-powered financial product recommendations" },
                  { icon: Wallet, title: "Portfolio Optimization", desc: "AI analyzes your goals and suggests best tools" },
                  { icon: TrendingUp, title: "Market Intelligence", desc: "Real-time insights and financial trend predictions" }
                ].map((feature, index) => {
                  const FeatureIcon = feature.icon;
                  return (
                    <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                      <FeatureIcon className="h-8 w-8 text-amber-400 mx-auto mb-3" />
                      <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                      <p className="text-sm text-blue-100">{feature.desc}</p>
                    </div>
                  );
                })}
              </div>

              <Badge className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-bold px-6 py-2 text-sm border-0">
                <Zap className="h-4 w-4 mr-2" />
                Coming Soon
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Finance Products Section */}
      <section id="finance-products" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-gradient-to-r from-amber-500 to-yellow-600 text-white border-0 px-4 py-1.5 shadow-lg">
              <DollarSign className="h-4 w-4 mr-2" />
              Featured Products
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Explore Our{" "}
              <span className="bg-gradient-to-r from-blue-600 via-emerald-600 to-amber-600 bg-clip-text text-transparent">
                Finance Collection
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {financePosts.length} carefully vetted financial and investment tools to help you build and manage your wealth
            </p>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
              <p className="mt-4 text-gray-600">Loading financial products...</p>
            </div>
          ) : financePosts.length === 0 ? (
            <div className="text-center py-20">
              <DollarSign className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No products yet</h3>
              <p className="text-gray-600">We're working on adding powerful financial tools. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {financePosts.map((post) => (
                <Link key={post._id} to={`/post/${post._id}`}>
                  <Card className="h-full overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer border-2 border-gray-100 hover:border-blue-400 hover:scale-[1.03] flex flex-col bg-white">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-slate-100 to-blue-100">
                      <img
                        src={post.image || "https://via.placeholder.com/400x300"}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      {/* Tag Badge */}
                      {(post.tag || post.tags?.[0]) && (
                        <Badge className="absolute top-3 right-3 bg-blue-600 text-white border-0 shadow-lg">
                          {post.tag || post.tags?.[0]}
                        </Badge>
                      )}

                      {/* Finance Icon */}
                      <div className="absolute top-3 left-3 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-full p-2 shadow-lg">
                        <DollarSign className="h-4 w-4 text-white" strokeWidth={2.5} />
                      </div>
                    </div>

                    {/* Content */}
                    <CardHeader className="flex-grow p-5">
                      <CardTitle className="text-lg font-bold line-clamp-2 text-gray-900 group-hover:text-blue-700 transition-colors duration-300 mb-2">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                        {post.description}
                      </CardDescription>
                    </CardHeader>

                    {/* Footer */}
                    <CardFooter className="p-5 pt-0 mt-auto">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full border-2 border-blue-600 text-blue-700 hover:bg-blue-600 hover:text-white font-semibold transition-all duration-300 group-hover:shadow-lg"
                      >
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          {/* View All Button */}
          {financePosts.length > 0 && (
            <div className="text-center mt-12">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold px-8 py-6 shadow-xl"
                onClick={() => navigate('/category/finance')}
              >
                View All Financial Tools
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 rounded-3xl p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-emerald-500/10"></div>
            <div className="relative z-10">
              <PiggyBank className="h-12 w-12 text-amber-400 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Start Building Your Wealth Today
              </h2>
              <p className="text-lg text-blue-100 mb-8">
                Join thousands of smart investors who trust Nexverce for secure and reliable financial product recommendations
              </p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-bold px-8 py-6 shadow-xl"
                onClick={() => document.getElementById('finance-products').scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Financial Tools
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
