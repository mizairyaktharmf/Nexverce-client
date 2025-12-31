import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Heart,
  Shield,
  Search,
  CheckCircle,
  Sparkles,
  ArrowRight,
  Activity,
  Users,
  TrendingUp,
  Zap,
  Target,
  Award,
  Eye,
  FlaskConical,
  ClipboardCheck,
  Bot,
  MessageSquare,
} from "lucide-react";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export default function HealthLandingPage() {
  const navigate = useNavigate();
  const [healthPosts, setHealthPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHealthPosts = async () => {
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
            post.category.trim().toLowerCase() === "health"
        );

        setHealthPosts(filtered);
      } catch (err) {
        console.error("Failed to fetch health posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHealthPosts();
  }, []);

  const researchProcess = [
    {
      icon: Search,
      title: "Discovery Phase",
      description: "We scan 20+ trusted health platforms daily to find the most promising wellness products and fitness tools.",
      gradient: "from-green-400 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50"
    },
    {
      icon: Eye,
      title: "Expert Evaluation",
      description: "Our health researchers analyze each product's features, scientific backing, and real-world effectiveness.",
      gradient: "from-emerald-500 to-teal-500",
      bgGradient: "from-emerald-50 to-teal-50"
    },
    {
      icon: FlaskConical,
      title: "Testing & Verification",
      description: "We test products ourselves when possible, checking usability, accuracy, and quality standards.",
      gradient: "from-teal-500 to-cyan-500",
      bgGradient: "from-teal-50 to-cyan-50"
    },
    {
      icon: ClipboardCheck,
      title: "Quality Assurance",
      description: "Every product must meet our strict criteria: safety, effectiveness, user reviews, and value for money.",
      gradient: "from-cyan-500 to-blue-500",
      bgGradient: "from-cyan-50 to-blue-50"
    },
    {
      icon: CheckCircle,
      title: "Content Creation",
      description: "We craft detailed, honest reviews with pros, cons, pricing, and our expert recommendations.",
      gradient: "from-blue-500 to-indigo-500",
      bgGradient: "from-blue-50 to-indigo-50"
    },
    {
      icon: Sparkles,
      title: "Publication",
      description: "Only the best health products make it to Nexverce, ensuring you get top-quality recommendations.",
      gradient: "from-indigo-500 to-purple-500",
      bgGradient: "from-indigo-50 to-purple-50"
    }
  ];

  const stats = [
    { icon: Activity, label: "Products Analyzed", value: "500+", color: "text-green-600" },
    { icon: Users, label: "Happy Users", value: "10K+", color: "text-emerald-600" },
    { icon: Shield, label: "Verified Quality", value: "100%", color: "text-teal-600" },
    { icon: Award, label: "Expert Reviews", value: "300+", color: "text-cyan-600" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Dark Green Theme */}
      <section className="relative py-20 lg:py-28 bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-800 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-400 rounded-full mix-blend-overlay filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            {/* Icon */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full blur-2xl opacity-60 animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 p-6 rounded-full shadow-2xl">
                  <Heart className="h-16 w-16 text-white" strokeWidth={2} />
                </div>
              </div>
            </div>

            {/* Badge */}
            <Badge className="mb-6 bg-gradient-to-r from-emerald-500 to-green-600 text-white border-0 px-6 py-2 text-base shadow-lg">
              <Target className="h-4 w-4 mr-2" />
              Health Solutions
            </Badge>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white mb-6 leading-tight">
              Find Health Solutions That Work for{" "}
              <span className="bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent">
                YOUR Body
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl lg:text-2xl text-emerald-100 max-w-4xl mx-auto mb-10 leading-relaxed">
              Struggling with weight loss? Can't stay consistent with fitness? Want better sleep or mental wellness?
              We guide you from YOUR problem to the right solution — with honesty, science, and real results.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all duration-300 group"
                onClick={() => document.getElementById('health-products').scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Health Solutions
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-white font-bold text-lg px-8 py-6 bg-transparent"
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
                    <StatIcon className={`h-8 w-8 mx-auto mb-3 text-emerald-400`} />
                    <div className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-emerald-100 font-medium">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Our Research Process Section */}
      <section id="our-process" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 px-4 py-1.5 shadow-lg">
              <Target className="h-4 w-4 mr-2" />
              Our Process
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              How We Research{" "}
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Health Products
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our rigorous 6-step process ensures only the best health and fitness products reach you
            </p>
          </div>

          {/* Process Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {researchProcess.map((step, index) => {
              const StepIcon = step.icon;
              return (
                <Card
                  key={index}
                  className="relative overflow-hidden border-2 border-gray-100 hover:border-green-400 transition-all duration-300 hover:shadow-2xl group"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

                  <CardHeader className="relative z-10 p-6">
                    {/* Step Number */}
                    <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
                      <span className="text-green-700 font-bold text-sm">{index + 1}</span>
                    </div>

                    {/* Icon */}
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.gradient} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                      <StepIcon className="h-7 w-7 text-white" />
                    </div>

                    {/* Title */}
                    <CardTitle className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-700 transition-colors">
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
      <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 px-4 py-1.5 shadow-lg">
              <CheckCircle className="h-4 w-4 mr-2" />
              Quality Standards
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What We Look For in{" "}
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Every Product
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Shield, title: "Safety First", desc: "FDA approval, medical certifications, and safety standards compliance" },
              { icon: Award, title: "Proven Effectiveness", desc: "Scientific research, clinical studies, and real-world results" },
              { icon: Users, title: "User Reviews", desc: "Verified customer feedback, ratings, and testimonials" },
              { icon: TrendingUp, title: "Value for Money", desc: "Competitive pricing, features offered, and return on investment" },
              { icon: Zap, title: "Ease of Use", desc: "User-friendly interface, accessibility, and customer support" },
              { icon: Target, title: "Goal Alignment", desc: "Helps users achieve specific health and fitness objectives" }
            ].map((criteria, index) => {
              const CriteriaIcon = criteria.icon;
              return (
                <div
                  key={index}
                  className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-green-100 hover:border-green-400 group"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <CriteriaIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-1 group-hover:text-green-700 transition-colors">
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-800 rounded-3xl p-12 md:p-16 shadow-2xl relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400 rounded-full opacity-10 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-400 rounded-full opacity-10 blur-3xl"></div>

            <div className="relative z-10 text-center text-white">
              <div className="flex justify-center mb-6">
                <div className="bg-gradient-to-r from-emerald-500 to-green-500 p-4 rounded-full">
                  <Bot className="h-12 w-12 text-white" />
                </div>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                AI-Powered Health Assistant
              </h2>

              <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-emerald-100 leading-relaxed">
                We're building an AI-powered health assistant that will revolutionize how you discover wellness products.
                Get personalized recommendations, instant answers, and expert guidance — all powered by artificial intelligence.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
                {[
                  { icon: MessageSquare, title: "Nexverce Chatbot", desc: "24/7 AI assistant for product recommendations" },
                  { icon: Sparkles, title: "Smart Matching", desc: "AI finds perfect products based on your goals" },
                  { icon: TrendingUp, title: "Predictive Insights", desc: "Data-driven health trends and predictions" }
                ].map((feature, index) => {
                  const FeatureIcon = feature.icon;
                  return (
                    <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                      <FeatureIcon className="h-8 w-8 text-emerald-400 mx-auto mb-3" />
                      <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                      <p className="text-sm text-emerald-100">{feature.desc}</p>
                    </div>
                  );
                })}
              </div>

              <Badge className="bg-gradient-to-r from-emerald-500 to-green-500 text-white font-bold px-6 py-2 text-sm border-0">
                <Zap className="h-4 w-4 mr-2" />
                Coming Soon
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Health Products Section */}
      <section id="health-products" className="py-20 bg-gradient-to-br from-green-50 via-white to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 px-4 py-1.5 shadow-lg">
              <Heart className="h-4 w-4 mr-2" />
              Featured Products
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Explore Our{" "}
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Health Collection
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {healthPosts.length} carefully curated health and fitness products to help you achieve your wellness goals
            </p>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-green-600 border-r-transparent"></div>
              <p className="mt-4 text-gray-600">Loading health products...</p>
            </div>
          ) : healthPosts.length === 0 ? (
            <div className="text-center py-20">
              <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No products yet</h3>
              <p className="text-gray-600">We're working on adding amazing health products. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {healthPosts.map((post) => (
                <Link key={post._id} to={`/post/${post._id}`}>
                  <Card className="h-full overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer border-2 border-gray-100 hover:border-green-400 hover:scale-[1.03] flex flex-col bg-white">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-green-100 to-emerald-100">
                      <img
                        src={post.image || "https://via.placeholder.com/400x300"}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      {/* Tag Badge */}
                      {(post.tag || post.tags?.[0]) && (
                        <Badge className="absolute top-3 right-3 bg-green-600 text-white border-0 shadow-lg">
                          {post.tag || post.tags?.[0]}
                        </Badge>
                      )}

                      {/* Health Icon */}
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                        <Heart className="h-4 w-4 text-green-600 fill-green-600" />
                      </div>
                    </div>

                    {/* Content */}
                    <CardHeader className="flex-grow p-5">
                      <CardTitle className="text-lg font-bold line-clamp-2 text-gray-900 group-hover:text-green-700 transition-colors duration-300 mb-2">
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
                        className="w-full border-2 border-green-600 text-green-700 hover:bg-green-600 hover:text-white font-semibold transition-all duration-300 group-hover:shadow-lg"
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
          {healthPosts.length > 0 && (
            <div className="text-center mt-12">
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold px-8 py-6 shadow-xl"
                onClick={() => navigate('/category/health')}
              >
                View All Health Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-emerald-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-800 rounded-3xl p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-green-500/10"></div>
            <div className="relative z-10">
              <Heart className="h-12 w-12 text-emerald-400 mx-auto mb-6" strokeWidth={2} />
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Start Your Health Journey Today
              </h2>
              <p className="text-lg text-emerald-100 mb-8">
                Join thousands of users who trust Nexverce for their health and wellness product recommendations
              </p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-bold px-8 py-6 shadow-xl"
                onClick={() => document.getElementById('health-products').scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Health Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
