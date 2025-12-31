import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
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
  FileText,
  Lightbulb,
  Target,
  PenTool
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

export default function BlogLandingPage() {
  const navigate = useNavigate();

  // Stats data
  const stats = [
    { icon: Activity, label: "Articles Published", value: "200+", color: "text-purple-600" },
    { icon: Users, label: "Monthly Readers", value: "50K+", color: "text-blue-600" },
    { icon: Shield, label: "Expert Writers", value: "15+", color: "text-green-600" },
    { icon: Award, label: "Topics Covered", value: "100+", color: "text-orange-600" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Premium Dark Theme with Gradient */}
      <section className="relative py-20 lg:py-28 bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-400 rounded-full mix-blend-overlay filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            {/* Icon */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full blur-2xl opacity-60 animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-purple-500 via-blue-500 to-pink-600 p-6 rounded-full shadow-2xl">
                  <BookOpen className="h-16 w-16 text-white" strokeWidth={2} />
                </div>
              </div>
            </div>

            {/* Badge */}
            <Badge className="mb-6 bg-gradient-to-r from-purple-500 to-blue-600 text-white border-0 px-6 py-2 text-base shadow-lg">
              <Shield className="h-4 w-4 mr-2" />
              Nexverce Blog - Insights & Reviews
            </Badge>

            {/* Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white mb-6 leading-tight px-4">
              Your Source for{" "}
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 bg-clip-text text-transparent">
                Product Insights
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-purple-100 max-w-4xl mx-auto mb-10 leading-relaxed px-4">
              At Nexverce, we don't just recommend products — we dive deep into research, comparisons,
              and real-world testing to help you make informed decisions. Our blog is your guide to
              discovering the best tools, apps, and platforms across every category.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 px-4">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white font-bold text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all duration-300 group"
                onClick={() => navigate('/blogs')}
              >
                Explore All Blogs
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white font-bold text-lg px-8 py-6 bg-transparent"
                onClick={() => document.getElementById('our-process').scrollIntoView({ behavior: 'smooth' })}
              >
                How We Review
                <Search className="ml-2 h-5 w-5" />
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-4xl mx-auto px-4">
              {stats.map((stat, index) => {
                const StatIcon = stat.icon;
                return (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg border border-white/20">
                    <StatIcon className={`h-6 w-6 md:h-8 md:w-8 mx-auto mb-2 md:mb-3 text-purple-400`} />
                    <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs md:text-sm text-purple-100 font-medium">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Our Content Creation Process */}
      <section id="our-process" className="py-20 bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="premium" className="mb-4">
              <Search className="h-4 w-4 mr-2" />
              Our Writing Process
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              How We Create In-Depth Product Reviews
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Every Nexverce blog post goes through rigorous research, hands-on testing, and expert analysis
              to bring you honest, detailed product comparisons.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Search,
                title: "Deep Market Research",
                description: "We analyze hundreds of products in each category, studying features, pricing, user reviews, and market trends to identify the best options."
              },
              {
                icon: Target,
                title: "Hands-On Testing",
                description: "Our team personally tests each product, evaluating real-world performance, usability, and whether it delivers on its promises."
              },
              {
                icon: FileText,
                title: "Feature Comparison",
                description: "We create detailed side-by-side comparisons, breaking down features, pricing tiers, pros and cons to help you choose wisely."
              },
              {
                icon: Users,
                title: "User Feedback Analysis",
                description: "We collect insights from real users across forums, reviews, and social media to understand actual customer experiences."
              },
              {
                icon: PenTool,
                title: "Expert-Written Content",
                description: "Our specialized writers craft clear, unbiased articles with actionable insights, not just generic product descriptions."
              },
              {
                icon: Award,
                title: "Regular Updates",
                description: "We continuously update our content to reflect new features, pricing changes, and emerging alternatives in the market."
              }
            ].map((step, index) => {
              const StepIcon = step.icon;
              return (
                <Card key={index} className="border-2 border-purple-100 hover:border-purple-300 hover:shadow-xl transition-all duration-300 group">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-gradient-to-br from-purple-500 to-blue-600 p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
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

      {/* What Makes Our Blog Different */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="premium" className="mb-4">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Why Choose Nexverce Blog
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              What Makes Us Different
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We're not just another review site — we're your trusted advisor in navigating the crowded marketplace
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Shield, title: "Honest & Unbiased", desc: "We prioritize truth over commissions. If a product doesn't deliver, we tell you." },
              { icon: Lightbulb, title: "Practical Insights", desc: "No fluff — just actionable advice based on real testing and research." },
              { icon: Target, title: "Comparison-Focused", desc: "We don't review in isolation. Every post compares alternatives to help you choose." },
              { icon: Zap, title: "Updated Regularly", desc: "Products evolve. We update our content to reflect the latest features and pricing." },
              { icon: Users, title: "Community-Driven", desc: "We listen to our readers and cover the products YOU want to learn about." },
              { icon: Award, title: "Expert Writers", desc: "Our team includes specialists in tech, finance, health, marketing, and more." }
            ].map((item, index) => {
              const ItemIcon = item.icon;
              return (
                <div key={index} className="flex items-start gap-4 p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl border border-purple-100 hover:shadow-lg transition-shadow">
                  <div className="bg-gradient-to-r from-purple-500 to-blue-600 p-3 rounded-lg flex-shrink-0">
                    <ItemIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Future with AI Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 rounded-3xl p-12 md:p-16 shadow-2xl relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-400 rounded-full opacity-10 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400 rounded-full opacity-10 blur-3xl"></div>

            <div className="relative z-10 text-center text-white">
              <div className="flex justify-center mb-6">
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-4 rounded-full">
                  <Bot className="h-12 w-12 text-white" />
                </div>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                AI-Powered Blog Assistant Coming Soon
              </h2>

              <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-purple-100 leading-relaxed">
                We're building an intelligent AI chatbot that will help you find the perfect blog posts,
                get instant product comparisons, and receive personalized recommendations based on your needs.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
                {[
                  { icon: MessageSquare, title: "Ask Nexverce AI", desc: "Chat with our AI to find relevant blog posts instantly" },
                  { icon: Sparkles, title: "Smart Summaries", desc: "Get AI-generated summaries of long-form reviews" },
                  { icon: TrendingUp, title: "Personalized Picks", desc: "Receive tailored product suggestions based on your preferences" }
                ].map((feature, index) => {
                  const FeatureIcon = feature.icon;
                  return (
                    <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                      <FeatureIcon className="h-8 w-8 text-purple-400 mx-auto mb-3" />
                      <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                      <p className="text-sm text-purple-100">{feature.desc}</p>
                    </div>
                  );
                })}
              </div>

              <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold px-6 py-2 text-sm border-0">
                <Zap className="h-4 w-4 mr-2" />
                Coming Soon
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 rounded-3xl p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10"></div>
            <div className="relative z-10">
              <BookOpen className="h-12 w-12 text-purple-400 mx-auto mb-6" strokeWidth={2} />
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Discover Your Next Favorite Product?
              </h2>
              <p className="text-lg text-purple-100 mb-8">
                Browse our comprehensive blog library covering tech, finance, health, marketing, education, and lifestyle
              </p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold px-8 py-6 shadow-xl"
                onClick={() => navigate('/blogs')}
              >
                Explore All Blogs
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
