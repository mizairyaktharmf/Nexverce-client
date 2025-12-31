import { useNavigate } from "react-router-dom";
import {
  Lightbulb,
  Target,
  Brain,
  CheckCircle,
  XCircle,
  ArrowRight,
  Users,
  Shield,
  Zap,
  Award,
  TrendingUp,
  Search,
  Heart,
  MessageSquare,
  Sparkles,
  Clock,
  AlertTriangle
} from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";

export default function SolutionsPage() {
  const navigate = useNavigate();

  const problemsWeSolve = [
    {
      icon: Search,
      problem: "Information Overload",
      pain: "Too many options, conflicting reviews, endless research",
      solution: "We filter the noise and show you what actually matters for YOUR situation"
    },
    {
      icon: AlertTriangle,
      problem: "Fear of Wrong Decision",
      pain: "Scared of wasting money on something that won't work",
      solution: "We tell you who it's for AND who it's NOT for — honest guidance, no pressure"
    },
    {
      icon: Clock,
      problem: "No Time to Research",
      pain: "Hours spent comparing specs, prices, and reading reviews",
      solution: "We've done the research. Get expert insights in minutes, not days"
    },
    {
      icon: Brain,
      problem: "Don't Know What You Need",
      pain: "Confused about requirements, unsure what will actually solve your problem",
      solution: "Start with YOUR problem. Our guided approach helps you understand first, then decide"
    }
  ];

  const howItWorks = [
    {
      step: "01",
      title: "Tell Us Your Problem",
      description: "Not 'what product do you want?' but 'what problem are you solving?' We start with understanding YOUR unique situation, needs, and goals.",
      icon: MessageSquare,
      color: "from-purple-500 to-blue-500"
    },
    {
      step: "02",
      title: "Get Educated First",
      description: "Before showing products, we explain the problem, why people fail, and what types of solutions exist. Knowledge before selling.",
      icon: Lightbulb,
      color: "from-blue-500 to-cyan-500"
    },
    {
      step: "03",
      title: "See Solution Types",
      description: "We show different approaches (not just products) — lifestyle, tools, services, strategies. You understand ALL your options.",
      icon: Target,
      color: "from-cyan-500 to-teal-500"
    },
    {
      step: "04",
      title: "Honest Recommendations",
      description: "Then we recommend 1-2 solutions that fit YOUR needs. With clear 'who it's for' and 'who should avoid this' guidance.",
      icon: Shield,
      color: "from-teal-500 to-green-500"
    },
    {
      step: "05",
      title: "Decide with Confidence",
      description: "You make the final call — but with clarity, understanding, and trust. Not pressure, just honest guidance.",
      icon: CheckCircle,
      color: "from-green-500 to-emerald-500"
    }
  ];

  const whatMakesUsDifferent = [
    {
      icon: Target,
      title: "Problem-First, Not Product-First",
      traditional: "Here's a product. Buy it.",
      nexverce: "What's your problem? Let's understand it first."
    },
    {
      icon: Shield,
      title: "We Warn You, Not Just Sell",
      traditional: "Everything is 'amazing' and 'best'",
      nexverce: "We tell you who should NOT buy this"
    },
    {
      icon: Brain,
      title: "Education Before Transaction",
      traditional: "Click here to buy now!",
      nexverce: "Here's why people fail. Here's what actually works."
    },
    {
      icon: Heart,
      title: "Your Trust Over Our Commission",
      traditional: "Recommends what pays most",
      nexverce: "Recommends what fits YOU best — even if it pays less"
    }
  ];

  const solutionDomains = [
    {
      title: "Health Solutions",
      desc: "Weight loss, fitness, mental wellness, nutrition — find what works for YOUR body and lifestyle",
      icon: Heart,
      path: "/category/health",
      color: "from-pink-500 to-red-500"
    },
    {
      title: "Money Solutions",
      desc: "Investing, budgeting, side income, financial tools — build the financial future YOU want",
      icon: TrendingUp,
      path: "/category/finance",
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Business Solutions",
      desc: "Marketing, productivity, automation, growth — scale YOUR business the right way",
      icon: Zap,
      path: "/category/marketing",
      color: "from-yellow-500 to-orange-500"
    },
    {
      title: "Learning Solutions",
      desc: "Courses, certifications, skills, career — invest in YOUR personal growth",
      icon: Award,
      path: "/category/education",
      color: "from-blue-500 to-indigo-500"
    },
    {
      title: "Productivity Solutions",
      desc: "Time management, focus, organization, efficiency — optimize YOUR workflow",
      icon: Clock,
      path: "/category/technology",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Lifestyle Solutions",
      desc: "Travel, hobbies, personal development, relationships — enhance YOUR quality of life",
      icon: Sparkles,
      path: "/category/lifestyle",
      color: "from-cyan-500 to-blue-500"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-gradient-to-r from-purple-500 to-blue-600 text-white border-0 px-6 py-2 text-base">
              <Sparkles className="h-4 w-4 mr-2" />
              The Nexverce Solution Framework
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6">
              We Don't Just Sell Products.<br />
              We <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Solve Problems</span>
            </h1>

            <p className="text-lg md:text-xl text-purple-100 mb-8 leading-relaxed">
              Confused? Overwhelmed? Don't know what's right for you? You're not alone.
              Nexverce transforms decision paralysis into confident action.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate("/product-finder")}
                className="bg-white text-purple-600 hover:bg-purple-50 font-bold text-lg px-8 py-6 rounded-xl shadow-xl"
              >
                <Target className="mr-2 h-5 w-5" />
                Find Your Solution
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                onClick={() => navigate("/community")}
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6 rounded-xl"
              >
                <Users className="mr-2 h-5 w-5" />
                Join Community
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Problems We Solve */}
      <section className="py-20 bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              The Real Problems We <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Solve</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We understand your pain points — because we've been there too
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {problemsWeSolve.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <Card key={idx} className="border-2 border-purple-100 hover:border-purple-300 hover:shadow-xl transition-all">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{item.problem}</h3>
                        <div className="mb-3">
                          <div className="flex items-start gap-2 mb-2">
                            <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-gray-600 italic">"{item.pain}"</p>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-gray-900 font-medium">{item.solution}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              How Nexverce <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Works</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From confusion to clarity in 5 simple steps
            </p>
          </div>

          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-purple-200 via-blue-200 to-green-200 -z-10"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
              {howItWorks.map((step, idx) => {
                const IconComponent = step.icon;
                return (
                  <div key={idx} className="relative">
                    <Card className="border-2 border-gray-100 hover:border-purple-300 hover:shadow-xl transition-all h-full">
                      <CardContent className="p-6 text-center">
                        <div className="relative">
                          <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                            <IconComponent className="h-8 w-8 text-white" />
                          </div>
                          <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-white border-4 border-purple-500 flex items-center justify-center">
                            <span className="text-xs font-bold text-purple-600">{step.step}</span>
                          </div>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-3">{step.title}</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-20 bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              Nexverce vs <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Traditional Sites</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We're not just different — we're built for YOU, not for us
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {whatMakesUsDifferent.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <Card key={idx} className="border-2 border-purple-100 hover:shadow-xl transition-all">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-xl">{item.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded">
                        <div className="flex items-start gap-2">
                          <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-xs font-semibold text-red-700 mb-1">Traditional Approach</p>
                            <p className="text-sm text-gray-700">{item.traditional}</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded">
                        <div className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-xs font-semibold text-green-700 mb-1">Nexverce Way</p>
                            <p className="text-sm text-gray-700 font-medium">{item.nexverce}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Solution Domains */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              Explore <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Solution Domains</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Whatever your challenge, we have a solution path for you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutionDomains.map((domain, idx) => {
              const IconComponent = domain.icon;
              return (
                <Card
                  key={idx}
                  className="border-2 border-gray-100 hover:border-purple-300 hover:shadow-2xl transition-all cursor-pointer group"
                  onClick={() => navigate(domain.path)}
                >
                  <CardContent className="p-8">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${domain.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                      {domain.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {domain.desc}
                    </p>
                    <div className="flex items-center text-primary font-semibold group-hover:translate-x-2 transition-transform">
                      Explore Solutions <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Stop Guessing and Start Knowing?
          </h2>
          <p className="text-purple-100 text-lg mb-8 leading-relaxed">
            Join 250,000+ users who trust Nexverce to guide them from confusion to clarity
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate("/product-finder")}
              className="bg-white text-purple-600 hover:bg-purple-50 font-bold text-lg px-8 py-6 rounded-xl"
            >
              <Target className="mr-2 h-5 w-5" />
              Take the Solution Quiz
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              onClick={() => navigate("/community")}
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6 rounded-xl"
            >
              <Users className="mr-2 h-5 w-5" />
              Join 50K+ Members
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
