import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Laptop,
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
  Cpu,
  Code,
  Smartphone,
  Headphones,
  Target
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";

export default function TechnologyLandingPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Stats data
  const stats = [
    { icon: Activity, label: "Gadgets Tested", value: "800+", color: "text-purple-600" },
    { icon: Users, label: "Tech Enthusiasts", value: "25K+", color: "text-indigo-600" },
    { icon: Shield, label: "Security Verified", value: "100%", color: "text-violet-600" },
    { icon: Award, label: "Expert Reviews", value: "500+", color: "text-blue-600" }
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
            post.category.trim().toLowerCase() === "technology"
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
      {/* Hero Section - Dark Purple/Indigo Theme */}
      <section className="relative min-h-screen flex items-center py-20 bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-400 rounded-full mix-blend-overlay filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full blur-2xl opacity-60 animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-purple-500 via-indigo-500 to-violet-600 p-5 rounded-full shadow-2xl">
                  <Laptop className="h-12 w-12 text-white" strokeWidth={2} />
                </div>
              </div>
            </div>

            {/* Badge */}
            <Badge className="mb-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white border-0 px-6 py-2 text-base shadow-lg">
              <Target className="h-4 w-4 mr-2" />
              Productivity Solutions
            </Badge>

            {/* Heading */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
              Optimize{" "}
              <span className="bg-gradient-to-r from-purple-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
                YOUR Workflow
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base md:text-lg lg:text-xl text-indigo-100 max-w-4xl mx-auto mb-6 leading-relaxed">
              Overwhelmed by too many tools? Not sure which software fits YOUR needs? Want to work smarter, not harder?
              We guide you from YOUR workflow problems to tech solutions that actually boost YOUR productivity.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all duration-300 group"
                onClick={() => document.getElementById('tech-products').scrollIntoView({ behavior: 'smooth' })}
              >
                Browse Tech Products
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white font-bold text-lg px-8 py-6 bg-transparent"
                onClick={() => document.getElementById('our-process').scrollIntoView({ behavior: 'smooth' })}
              >
                Our Review Process
                <Search className="ml-2 h-5 w-5" />
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {stats.map((stat, index) => {
                const StatIcon = stat.icon;
                return (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20">
                    <StatIcon className={`h-6 w-6 mx-auto mb-2 text-purple-400`} />
                    <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs text-indigo-100 font-medium">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Our Research Process Section */}
      <section id="our-process" className="py-20 bg-gradient-to-br from-purple-50 via-white to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="premium" className="mb-4">
              <Search className="h-4 w-4 mr-2" />
              Our Review Methodology
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              How We Test Technology
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              At Nexverce, we don't just list products — we research, test, and verify every tech solution before recommending it to you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Search,
                title: "Market Research",
                description: "We analyze trending tech products, user reviews, and industry reports to identify top contenders."
              },
              {
                icon: Cpu,
                title: "Performance Testing",
                description: "Each gadget and software is tested for speed, efficiency, and real-world performance metrics."
              },
              {
                icon: Shield,
                title: "Security Analysis",
                description: "We verify privacy policies, encryption standards, and data protection measures."
              },
              {
                icon: Users,
                title: "User Experience Review",
                description: "We evaluate ease of use, interface design, customer support, and overall user satisfaction."
              },
              {
                icon: Code,
                title: "Compatibility Check",
                description: "We test across multiple devices, operating systems, and platforms to ensure broad compatibility."
              },
              {
                icon: Award,
                title: "Expert Verification",
                description: "Our tech specialists provide final approval based on quality, value, and innovation standards."
              }
            ].map((step, index) => {
              const StepIcon = step.icon;
              return (
                <Card key={index} className="border-2 border-purple-100 hover:border-purple-300 hover:shadow-xl transition-all duration-300 group">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                        <StepIcon className="h-6 w-6 text-white" />
                      </div>
                      <Badge variant="secondary" className="text-sm font-bold">
                        Step {index + 1}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl font-bold group-hover:text-purple-600 transition-colors">
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
              Every tech product on Nexverce meets our rigorous quality criteria
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Zap, title: "Performance & Speed", desc: "Must deliver fast, reliable, and efficient performance" },
              { icon: Shield, title: "Security & Privacy", desc: "Strong encryption, data protection, and user privacy safeguards" },
              { icon: Smartphone, title: "Cross-Platform Support", desc: "Works seamlessly across devices and operating systems" },
              { icon: Users, title: "User-Friendly Design", desc: "Intuitive interface with minimal learning curve" },
              { icon: Award, title: "Value for Money", desc: "Competitive pricing with excellent features and quality" },
              { icon: Headphones, title: "Customer Support", desc: "Responsive support team and comprehensive documentation" }
            ].map((criteria, index) => {
              const CriteriaIcon = criteria.icon;
              return (
                <div key={index} className="flex items-start gap-4 p-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl border border-purple-100 hover:shadow-lg transition-shadow">
                  <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-3 rounded-lg flex-shrink-0">
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
      <section className="py-20 bg-gradient-to-br from-purple-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 rounded-3xl p-12 md:p-16 shadow-2xl relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-400 rounded-full opacity-10 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400 rounded-full opacity-10 blur-3xl"></div>

            <div className="relative z-10 text-center text-white">
              <div className="flex justify-center mb-6">
                <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-4 rounded-full">
                  <Bot className="h-12 w-12 text-white" />
                </div>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                AI-Powered Tech Advisor
              </h2>

              <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-indigo-100 leading-relaxed">
                We're developing an intelligent AI assistant to help you find the perfect tech solutions.
                Get instant recommendations, compare products, and receive personalized tech advice.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
                {[
                  { icon: MessageSquare, title: "Nexverce Chatbot", desc: "Ask questions and get instant tech recommendations" },
                  { icon: Sparkles, title: "Smart Comparison", desc: "AI-powered product comparisons based on your needs" },
                  { icon: TrendingUp, title: "Trend Analysis", desc: "Stay updated with emerging tech trends and innovations" }
                ].map((feature, index) => {
                  const FeatureIcon = feature.icon;
                  return (
                    <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                      <FeatureIcon className="h-8 w-8 text-purple-400 mx-auto mb-3" />
                      <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                      <p className="text-sm text-indigo-100">{feature.desc}</p>
                    </div>
                  );
                })}
              </div>

              <Badge className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold px-6 py-2 text-sm border-0">
                <Zap className="h-4 w-4 mr-2" />
                Coming Soon
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="tech-products" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="premium" className="mb-4">
              <Laptop className="h-4 w-4 mr-2" />
              Featured Products
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Recommended Tech Products
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Browse our curated collection of verified technology and gadgets
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-purple-600 border-r-transparent"></div>
              <p className="mt-4 text-gray-600">Loading tech products...</p>
            </div>
          ) : posts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {posts.map((post) => (
                <Link key={post._id} to={`/post/${post._id}`}>
                  <Card className="h-full overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer border border-gray-200 hover:border-purple-500 hover:scale-[1.03]">
                    <div className="relative h-44 overflow-hidden bg-gradient-to-br from-purple-100 to-indigo-100">
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
                      <CardTitle className="text-base font-bold line-clamp-2 leading-tight group-hover:text-purple-600 transition-colors">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2 text-sm text-gray-600">
                        {post.description}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="flex items-center justify-between p-4 pt-0">
                      {post.price && (
                        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r from-purple-500/10 to-indigo-600/10 rounded-lg">
                          <span className="text-purple-600 font-bold text-base">${post.price}</span>
                        </div>
                      )}
                      <Button variant="ghost" size="sm" className="ml-auto h-8 px-3 text-xs font-semibold group-hover:bg-purple-600 group-hover:text-white transition-all">
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
              <p className="text-gray-600">No tech products available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 rounded-3xl p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-indigo-500/10"></div>
            <div className="relative z-10">
              <Laptop className="h-12 w-12 text-purple-400 mx-auto mb-6" strokeWidth={2} />
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Upgrade Your Tech Today
              </h2>
              <p className="text-lg text-indigo-100 mb-8">
                Join thousands of tech enthusiasts who trust Nexverce to simplify their digital life
              </p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-bold px-8 py-6 shadow-xl"
                onClick={() => document.getElementById('tech-products').scrollIntoView({ behavior: 'smooth' })}
              >
                Browse Tech Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
